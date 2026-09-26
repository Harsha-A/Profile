/**
 * Turn-by-turn directions derived purely from route geometry and road class
 * (the graph carries no street names).
 *
 * Angle convention: bearings are `Math.atan2(dy, dx)` in degrees on the flat
 * metre plane where x grows east and y grows DOWN (south). So 0° = east and
 * angles increase clockwise on screen (90° = south). A positive turn delta is
 * therefore a right turn, negative is left.
 */

import { formatDistance } from './format.js';

const STRAIGHT_MAX = 25;
const SLIGHT_MAX = 60;
const TURN_MAX = 135;
const UTURN_MIN = 165;

const ROAD_WORDS = {
  highway: 'main road',
  arterial: 'arterial',
  local: 'side street',
  bridge: 'bridge',
};
const COMPASS = ['north', 'northeast', 'east', 'southeast', 'south', 'southwest', 'west', 'northwest'];

/** @typedef {{ index: number, icon: string, text: string, distanceM: number, nodes: number[], edges: number[] }} Step */

function roadWord(roadClass) {
  return ROAD_WORDS[roadClass] ?? 'road';
}

function bearing(x0, y0, x1, y1) {
  const dx = x1 - x0;
  const dy = y1 - y0;
  if (Math.abs(dx) < 1e-9 && Math.abs(dy) < 1e-9) return NaN;
  return (Math.atan2(dy, dx) * 180) / Math.PI;
}

/**
 * Entry and exit bearing of an edge. Curved edges use the first/last polyline
 * segment so the turn is measured at the junction, not along the chord.
 */
function edgeBearings(graph, e) {
  const fx = graph.nodeX[graph.edgeFrom[e]];
  const fy = graph.nodeY[graph.edgeFrom[e]];
  const tx = graph.nodeX[graph.edgeTo[e]];
  const ty = graph.nodeY[graph.edgeTo[e]];
  const geom = graph.edgeGeometry?.[e];
  const chord = bearing(fx, fy, tx, ty);
  if (!geom || geom.length === 0) return { start: chord, end: chord };
  const first = geom[0];
  const last = geom[geom.length - 1];
  const start = bearing(fx, fy, first[0], first[1]);
  const end = bearing(last[0], last[1], tx, ty);
  return {
    start: Number.isNaN(start) ? chord : start,
    end: Number.isNaN(end) ? chord : end,
  };
}

/** Signed smallest difference b - a in (-180, 180]. */
function turnDelta(a, b) {
  let d = (b - a) % 360;
  if (d > 180) d -= 360;
  if (d <= -180) d += 360;
  return d;
}

function compassWord(deg) {
  // Screen angle (0 = east, clockwise) → compass (0 = north, clockwise).
  const compass = (((deg + 90) % 360) + 360) % 360;
  return COMPASS[Math.round(compass / 45) % 8];
}

function manoeuvre(delta) {
  const abs = Math.abs(delta);
  const right = delta > 0;
  if (abs < STRAIGHT_MAX) return { icon: '↑', verb: 'Continue' };
  if (abs < SLIGHT_MAX) return { icon: right ? '↗' : '↖', verb: right ? 'Slight right' : 'Slight left' };
  if (abs <= TURN_MAX) return { icon: right ? '→' : '←', verb: right ? 'Turn right' : 'Turn left' };
  if (abs >= UTURN_MIN) return { icon: right ? '↱' : '↰', verb: 'Make a U-turn' };
  return { icon: right ? '↱' : '↰', verb: right ? 'Sharp right' : 'Sharp left' };
}

/**
 * Build turn-by-turn steps for a path. Consecutive edges merge while the turn
 * between them is under 25° and the road class is unchanged.
 * Never throws: a null path returns [], a 0-edge path returns a single arrive step.
 * @param {import('../core/graph.js').Graph} graph
 * @param {{ nodes: number[], edges: number[] } | null} path
 * @returns {Step[]}
 */
export function buildDirections(graph, path) {
  const nodes = path?.nodes ?? [];
  const edges = path?.edges ?? [];
  if (!graph || nodes.length === 0) return [];
  const lastNode = nodes[nodes.length - 1];

  if (edges.length === 0) {
    return [
      { index: 0, icon: '🏠', text: 'You are already at the drop-off', distanceM: 0, nodes: [lastNode], edges: [] },
    ];
  }

  const classOf = (e) => graph.edge(e).roadClass;
  // Groups: { start (edge index), end (inclusive), delta, classChanged, heading }
  const groups = [];
  let cur = null;
  let prevEnd = NaN;
  let prevClass = null;

  for (let i = 0; i < edges.length; i++) {
    const e = edges[i];
    const cls = classOf(e);
    const { start, end } = edgeBearings(graph, e);

    if (!cur) {
      cur = { start: i, end: i, delta: 0, classChanged: false, heading: start, cls };
    } else {
      const delta = Number.isNaN(start) || Number.isNaN(prevEnd) ? 0 : turnDelta(prevEnd, start);
      const classChanged = cls !== prevClass;
      if (Math.abs(delta) < STRAIGHT_MAX && !classChanged) {
        cur.end = i;
      } else {
        groups.push(cur);
        cur = { start: i, end: i, delta, classChanged, heading: start, cls };
      }
    }
    if (Number.isNaN(cur.heading)) cur.heading = start;
    // Degenerate (zero-length) edges keep the previous heading.
    if (!Number.isNaN(end)) prevEnd = end;
    prevClass = cls;
  }
  groups.push(cur);

  /** @type {Step[]} */
  const steps = [];
  for (let g = 0; g < groups.length; g++) {
    const grp = groups[g];
    const stepEdges = edges.slice(grp.start, grp.end + 1);
    const stepNodes = nodes.slice(grp.start, grp.end + 2);
    let distanceM = 0;
    for (const e of stepEdges) distanceM += graph.edgeLength[e];
    const road = roadWord(grp.cls);

    let icon;
    let text;
    if (g === 0) {
      icon = '↑';
      const dir = Number.isNaN(grp.heading) ? '' : `${compassWord(grp.heading)} `;
      text = `Head ${dir}on the ${road}`;
    } else {
      const m = manoeuvre(grp.delta);
      icon = m.icon;
      text = grp.classChanged ? `${m.verb} onto the ${road}` : m.verb;
    }
    steps.push({ index: g, icon, text, distanceM, nodes: stepNodes, edges: stepEdges });
  }

  steps.push({
    index: steps.length,
    icon: '🏠',
    text: 'Arrive at the drop-off',
    distanceM: 0,
    nodes: [lastNode],
    edges: [],
  });
  return steps;
}

/**
 * Create the directions panel controller.
 * @param {{
 *   panelEl: HTMLElement,
 *   listEl: HTMLOListElement,
 *   onHoverStep?: (step: Step) => void,
 *   onLeave?: () => void,
 * }} opts
 * @returns {{ show: (steps: Step[]) => void, hide: () => void, clear: () => void }}
 */
export function createDirections({ panelEl, listEl, onHoverStep, onLeave }) {
  let steps = [];
  let hovered = null;

  listEl.addEventListener('mouseover', (event) => {
    const li = event.target instanceof Element ? event.target.closest('li') : null;
    if (!li || li === hovered || !listEl.contains(li)) return;
    hovered = li;
    const step = steps[Number(li.dataset.index)];
    if (step) onHoverStep?.(step);
  });
  listEl.addEventListener('mouseleave', () => {
    hovered = null;
    onLeave?.();
  });

  function clear() {
    listEl.replaceChildren();
    steps = [];
    hovered = null;
  }

  function show(nextSteps) {
    clear();
    steps = Array.isArray(nextSteps) ? nextSteps : [];
    const frag = document.createDocumentFragment();
    steps.forEach((step, i) => {
      const li = document.createElement('li');
      li.dataset.index = String(i);

      const icon = document.createElement('span');
      icon.className = 'dir-icon';
      icon.textContent = step.icon;
      const text = document.createElement('span');
      text.textContent = step.text;
      li.append(icon, text);

      if (step.distanceM > 0) {
        const dist = document.createElement('span');
        dist.className = 'dir-dist';
        dist.textContent = formatDistance(step.distanceM);
        li.append(dist);
      }
      frag.append(li);
    });
    listEl.append(frag);
    panelEl.hidden = false;
  }

  function hide() {
    panelEl.hidden = true;
  }

  return { show, hide, clear };
}
