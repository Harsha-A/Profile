/** Live two-rider "algorithm race" scoreboard plus plain-language verdict copy. */

import { remainingRoute } from '../movers/mover.js';
import { formatDuration } from './format.js';

const MEDALS = ['🥇', '🥈', '🥉'];
// Algorithms that knowingly trade route optimality for a cheaper search.
const NON_OPTIMAL_RE = /bfs|over|greedy|weighted/i;

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text != null) node.textContent = text;
  return node;
}

/** Build `Label <b>value</b>` and return the <b> so it can be updated in place. */
function stat(parent, label) {
  const span = el('span', 'racer-stat');
  const labelEl = el('span', 'racer-stat-label', label);
  const b = el('b', null, '—');
  span.append(labelEl, b);
  parent.append(span);
  return b;
}

function formatCount(n) {
  return Number.isFinite(n) ? Math.round(n).toLocaleString() : '—';
}

function kbButton(id, text) {
  const button = el('button', 'kb-link', text);
  button.type = 'button';
  button.dataset.kb = id;
  return button;
}

/**
 * Create the race scoreboard controller.
 * @param {{ el: HTMLElement }} opts `el` is #race-scoreboard.
 * @returns {{
 *   start: (opts: { racers: Array<{ key: string, label: string, color: string, explored: number, plannedEtaSec: number, moverId: any }> }) => void,
 *   update: (opts: { movers: Array<any>, graph: any, trafficFactor?: Function, simTime?: number }) => void,
 *   finish: (opts: { key: string, elapsedSec: number }) => void,
 *   result: () => ({ winnerKey: string, order: Array<{ key: string, label: string, elapsedSec: number, explored: number }> } | null),
 *   hide: () => void,
 *   clear: () => void,
 * }}
 */
export function createRaceBoard({ el: rootEl }) {
  /** @type {Map<string, any>} */
  let entries = new Map();
  let arrivals = [];

  function sectionEl() {
    return rootEl.closest('.race-section');
  }

  function ensureSectionHeader() {
    const section = sectionEl();
    if (!section || section.querySelector(':scope > h2')) return section;
    const heading = el('h2', null, '4 · Race');
    section.insertBefore(heading, rootEl);
    return section;
  }

  function setVisible(visible) {
    const section = ensureSectionHeader();
    rootEl.hidden = !visible;
    if (section) {
      section.hidden = !visible;
      if (visible) requestAnimationFrame(() => section.scrollIntoView({ block: 'nearest' }));
    }
  }

  function clear() {
    rootEl.replaceChildren();
    entries = new Map();
    arrivals = [];
  }

  function start({ racers }) {
    clear();
    ensureSectionHeader();
    const head = el('div', 'scoreboard-head');
    head.append(kbButton('race', 'How races are judged →'));
    rootEl.append(head);

    for (const racer of racers) {
      const block = el('div', 'racer');

      const head = el('div', 'racer-head');
      const swatch = el('span', 'racer-swatch');
      swatch.style.background = racer.color;
      const medal = el('span', 'racer-medal');
      head.append(swatch, el('span', 'racer-name', racer.label), medal);

      const stats = el('div', 'racer-stats');
      const checkedB = stat(stats, 'Checked');
      const plannedB = stat(stats, 'Planned');
      const arrivedB = stat(stats, 'Arrived');
      checkedB.textContent = formatCount(racer.explored);
      plannedB.textContent = formatDuration(racer.plannedEtaSec);

      const bar = el('div', 'racer-bar');
      const fill = el('span');
      fill.style.background = racer.color;
      fill.style.width = '0%';
      bar.append(fill);

      block.append(head, stats, bar);
      rootEl.append(block);

      entries.set(racer.key, {
        racer,
        block,
        medal,
        arrivedB,
        fill,
        totalDistanceM: -1,
        lastWidth: '0%',
        finished: false,
        elapsedSec: NaN,
      });
    }
    setVisible(true);
  }

  function setWidth(entry, progress) {
    // Quantise to 0.1% so sub-pixel changes don't cause a style write each frame.
    const width = `${Math.round(progress * 1000) / 10}%`;
    if (width === entry.lastWidth) return;
    entry.lastWidth = width;
    entry.fill.style.width = width;
  }

  function update({ movers, graph, trafficFactor, simTime }) {
    if (!movers || entries.size === 0) return;
    for (const entry of entries.values()) {
      if (entry.finished) continue;
      let mover = null;
      for (let i = 0; i < movers.length; i++) {
        if (movers[i].id === entry.racer.moverId) {
          mover = movers[i];
          break;
        }
      }
      if (!mover) continue;

      const remaining = remainingRoute(mover, graph, trafficFactor, simTime).distanceM;
      if (entry.totalDistanceM < 0) entry.totalDistanceM = remaining;
      let progress;
      if (entry.totalDistanceM > 0) progress = 1 - remaining / entry.totalDistanceM;
      else progress = mover.arrived ? 1 : 0;
      setWidth(entry, Math.min(1, Math.max(0, progress)));
    }
  }

  function finish({ key, elapsedSec }) {
    const entry = entries.get(key);
    if (!entry || entry.finished) return;
    entry.finished = true;
    entry.elapsedSec = elapsedSec;
    entry.arrivedB.textContent = formatDuration(elapsedSec);
    setWidth(entry, 1);

    const place = arrivals.length;
    arrivals.push(key);
    entry.medal.textContent = MEDALS[place] ?? '';
    if (place === 0) entry.block.classList.add('won');
  }

  function result() {
    if (entries.size === 0 || arrivals.length < entries.size) return null;
    const order = arrivals.map((key) => {
      const { racer, elapsedSec } = entries.get(key);
      return { key, label: racer.label, elapsedSec, explored: racer.explored };
    });
    return { winnerKey: order[0].key, order };
  }

  function hide() {
    setVisible(false);
  }

  return { start, update, finish, result, hide, clear };
}

function sameEdges(a, b) {
  if (!a || !b || a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return false;
  return true;
}

function isNonOptimal(racer) {
  if (typeof racer.optimal === 'boolean') return !racer.optimal;
  return NON_OPTIMAL_RE.test(racer.key ?? '');
}

function effortRatio(more, fewer) {
  if (!(fewer > 0) || !(more > fewer)) return '';
  const r = more / fewer;
  return r >= 1.95 ? ` — ${r.toFixed(r >= 10 ? 0 : 1)}× less searching` : '';
}

/**
 * Plain-language verdict separating "arrived first", "searched least" and
 * "found the genuinely fastest route".
 *
 * Racers are the same objects passed to `start()`, optionally carrying
 * `edges` (route edge ids, for an exact same-route check) and `optimal`
 * (boolean; otherwise inferred from the key: bfs/over/greedy/weighted ⇒ not optimal).
 * Arrivals may be `result().order`, an array of `{ key, elapsedSec }`, or a
 * `{ [key]: elapsedSec }` map.
 * @param {{ racers: Array<any>, arrivals: Array<{ key: string, elapsedSec: number }> | Record<string, number> }} opts
 * @returns {{ headline: string, detail: string }}
 */
export function raceVerdict({ racers, arrivals }) {
  const times = new Map();
  if (Array.isArray(arrivals)) for (const a of arrivals) times.set(a.key, a.elapsedSec);
  else if (arrivals) for (const k of Object.keys(arrivals)) times.set(k, arrivals[k]);

  if (!racers || racers.length < 2) {
    return { headline: 'Not a race', detail: 'Pick two algorithms to race them on the same trip.' };
  }
  const [a, b] = racers;
  const ta = times.get(a.key);
  const tb = times.get(b.key);
  if (!Number.isFinite(ta) || !Number.isFinite(tb)) {
    return { headline: 'Race in progress', detail: 'Both riders are still on the road.' };
  }

  const [lessSearch, moreSearch] = a.explored <= b.explored ? [a, b] : [b, a];
  const searchLine =
    a.explored === b.explored
      ? `Both checked ${formatCount(a.explored)} intersections.`
      : `${lessSearch.label} checked ${formatCount(lessSearch.explored)} intersections vs ${formatCount(moreSearch.explored)}${effortRatio(moreSearch.explored, lessSearch.explored)}.`;

  const planA = a.plannedEtaSec;
  const planB = b.plannedEtaSec;
  const sameRoute =
    a.edges && b.edges
      ? sameEdges(a.edges, b.edges)
      : Math.abs(planA - planB) <= Math.max(1, 0.005 * Math.max(planA, planB));

  if (sameRoute) {
    const headline =
      a.explored === b.explored
        ? 'Same route, same effort — a dead heat'
        : `Same route — ${lessSearch.label} just searched less`;
    return { headline, detail: `They arrive together because they found the same road. ${searchLine}` };
  }

  const [first, second] = ta <= tb ? [a, b] : [b, a];
  const tFirst = Math.min(ta, tb);
  const tSecond = Math.max(ta, tb);
  const margin = formatDuration(tSecond - tFirst);

  if (tSecond - tFirst < 1) {
    return {
      headline: 'Different roads, near-identical arrival',
      detail: `Two routes, less than a second apart. ${searchLine}`,
    };
  }

  const headline = `${first.label} arrived first, ${margin} ahead`;

  // Planned slower but arrived first: conditions changed during the ride.
  if (first.plannedEtaSec > second.plannedEtaSec) {
    return {
      headline,
      detail: `${second.label} planned the faster route, but traffic changed on the way. ${searchLine}`,
    };
  }

  if (isNonOptimal(second) && !isNonOptimal(first)) {
    const tradeoff =
      second.explored < first.explored
        ? `${second.label} checked only ${formatCount(second.explored)} intersections vs ${formatCount(first.explored)} — it traded the fastest route for a cheaper search.`
        : `${second.label} doesn't guarantee the fastest route, and here it searched more (${formatCount(second.explored)} vs ${formatCount(first.explored)}) for a slower one.`;
    return { headline, detail: tradeoff };
  }

  return { headline, detail: `${first.label} found the quicker route. ${searchLine}` };
}
