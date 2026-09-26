import { edgeCost } from '../algorithms/edge-cost.js';
import { peakIntensity, CLASS_SENSITIVITY } from '../city/traffic.js';
import { rerouteThresholdSec } from '../movers/routing.js';
import { FACTS } from './facts.js';
import { DEMO_GRAPH, DEMO_FROM, DEMO_TO } from './examples.js';

/** Diagram ids supported by {@link renderDiagram}. */
export const DIAGRAM_IDS = Object.freeze([
  'demo-graph',
  'edge-cost',
  'search-shapes',
  'traffic-day',
  'reroute-flow',
  'reroute-threshold',
  'twin-edges',
]);

const COLORS = Object.freeze({
  text: 'var(--text, #e6edf3)',
  muted: 'var(--muted, #8b96a5)',
  surface: 'var(--surface-2, #1a212c)',
  border: 'var(--border-strong, #35435a)',
  brand: 'var(--brand, #e34d3a)',
  accent: 'var(--accent, #38bdf8)',
  good: 'var(--good, #4ade80)',
  warn: 'var(--warn, #facc15)',
  bad: 'var(--bad, #f87171)',
});

/**
 * Render a Knowledge diagram as responsive SVG markup.
 * @param {string} id one of {@link DIAGRAM_IDS}
 * @returns {string}
 */
export function renderDiagram(id) {
  if (id === 'demo-graph') return demoGraph();
  if (id === 'edge-cost') return edgeCostDiagram();
  if (id === 'search-shapes') return searchShapes();
  if (id === 'traffic-day') return trafficDay();
  if (id === 'reroute-flow') return rerouteFlow();
  if (id === 'reroute-threshold') return rerouteThreshold();
  if (id === 'twin-edges') return twinEdges();
  throw new Error(`Unknown diagram id: ${id}`);
}

function svg(title, viewBox, body) {
  return `<svg xmlns="http://www.w3.org/2000/svg" role="img" width="100%" viewBox="${viewBox}"><title>${esc(title)}</title>${body}</svg>`;
}

function marker(id, color) {
  return `<defs><marker id="${id}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="${color}"></path></marker></defs>`;
}

function demoGraph() {
  const { graph, labels, positions } = DEMO_GRAPH;
  const seen = new Set();
  const roads = [];
  for (let e = 0; e < graph.edgeCount; e++) {
    const a = graph.edgeFrom[e];
    const b = graph.edgeTo[e];
    const key = a < b ? `${a}:${b}` : `${b}:${a}`;
    if (seen.has(key)) continue;
    seen.add(key);
    const pa = positions[a];
    const pb = positions[b];
    const mx = (pa.x + pb.x) / 2;
    const my = (pa.y + pb.y) / 2;
    roads.push(`<line x1="${pa.x}" y1="${pa.y}" x2="${pb.x}" y2="${pb.y}" stroke="${COLORS.border}" stroke-width="5" stroke-linecap="round"></line>`);
    roads.push(`<text x="${mx}" y="${my - 7}" fill="${COLORS.muted}" font-size="11" text-anchor="middle">${edgeCost(graph, e, 0).toFixed(1)}s</text>`);
  }
  const nodes = labels.map((label, i) => {
    const p = positions[i];
    const isStart = label === DEMO_FROM;
    const isEnd = label === DEMO_TO;
    const fill = isStart ? COLORS.good : isEnd ? COLORS.brand : COLORS.surface;
    const textFill = isStart || isEnd ? '#ffffff' : COLORS.text;
    return `<g><circle cx="${p.x}" cy="${p.y}" r="15" fill="${fill}" stroke="${COLORS.text}" stroke-width="1.5"></circle><text x="${p.x}" y="${p.y + 4}" fill="${textFill}" font-size="12" text-anchor="middle" font-weight="700">${label}</text></g>`;
  }).join('');
  return svg('Demo graph with edge travel-time labels', '0 0 660 410', `${roads.join('')}<text x="20" y="30" fill="${COLORS.text}" font-size="13">Pickup ${DEMO_FROM} → drop-off ${DEMO_TO}</text>${nodes}`);
}

function edgeCostDiagram() {
  const length = 200;
  const speedKmh = FACTS.speedsKmh.arterial;
  const factor = 0.7;
  const seconds = length / ((speedKmh * 1000 / 3600) * factor);
  const body = [
    `<rect x="22" y="48" width="396" height="80" rx="14" fill="${COLORS.surface}" stroke="${COLORS.border}"></rect>`,
    `<line x1="58" y1="88" x2="382" y2="88" stroke="${COLORS.accent}" stroke-width="8" stroke-linecap="round"></line>`,
    `<text x="220" y="35" fill="${COLORS.text}" font-size="14" text-anchor="middle">edge cost = length ÷ (speed × traffic factor)</text>`,
    `<text x="72" y="116" fill="${COLORS.text}" font-size="12">${length} m</text>`,
    `<text x="184" y="116" fill="${COLORS.text}" font-size="12">${speedKmh} km/h</text>`,
    `<text x="292" y="116" fill="${COLORS.text}" font-size="12">factor ${factor}</text>`,
    `<text x="220" y="158" fill="${COLORS.good}" font-size="15" text-anchor="middle">${seconds.toFixed(1)}s to cross this road</text>`,
  ].join('');
  return svg('Edge-cost formula', '0 0 440 180', body);
}

function searchShapes() {
  const caption = (x, text) => `<text x="${x}" y="186" fill="${COLORS.text}" font-size="12" text-anchor="middle">${text}</text>`;
  const body = [
    `<circle cx="70" cy="95" r="58" fill="${COLORS.accent}" fill-opacity="0.08" stroke="${COLORS.accent}" stroke-width="3"></circle>`,
    caption(70, 'Dijkstra: even ripple'),
    `<ellipse cx="245" cy="95" rx="80" ry="36" fill="${COLORS.good}" fill-opacity="0.08" stroke="${COLORS.good}" stroke-width="3"></ellipse>`,
    caption(245, 'A*: stretched toward B'),
    `<path d="M 365 125 C 395 118, 420 92, 465 72" fill="none" stroke="${COLORS.warn}" stroke-width="10" stroke-linecap="round" stroke-opacity="0.85"></path>`,
    caption(415, 'Sloppy A*: thin beam'),
    `<circle cx="545" cy="95" r="52" fill="${COLORS.brand}" fill-opacity="0.08" stroke="${COLORS.brand}" stroke-width="3"></circle>`,
    `<circle cx="649" cy="95" r="52" fill="${COLORS.brand}" fill-opacity="0.08" stroke="${COLORS.brand}" stroke-width="3"></circle>`,
    caption(597, 'Bidirectional: meet in the middle'),
    node(70, 95, 'A', COLORS.good), node(118, 95, 'B', COLORS.brand),
    node(180, 95, 'A', COLORS.good), node(310, 95, 'B', COLORS.brand),
    node(365, 125, 'A', COLORS.good), node(465, 72, 'B', COLORS.brand),
    node(545, 95, 'A', COLORS.good), node(649, 95, 'B', COLORS.brand),
  ].join('');
  return svg('Search pattern comparison', '0 0 715 200', body);
}

function trafficDay() {
  const plot = { x: 46, y: 24, w: 560, h: 145 };
  const points = [];
  const factorPoints = [];
  for (let min = 0; min <= 24 * 60; min += 15) {
    const t = min * 60;
    const intensity = peakIntensity(t);
    const arterial = 1 - CLASS_SENSITIVITY.arterial * intensity;
    const x = plot.x + (min / (24 * 60)) * plot.w;
    points.push(`${x.toFixed(1)},${(plot.y + plot.h - intensity * plot.h).toFixed(1)}`);
    factorPoints.push(`${x.toFixed(1)},${(plot.y + plot.h - arterial * plot.h).toFixed(1)}`);
  }
  const peakLabels = FACTS.rushPeaks.map((time) => {
    const [hh, mm] = time.split(':').map(Number);
    const x = plot.x + (((hh * 60) + mm) / (24 * 60)) * plot.w;
    return `<line x1="${x}" y1="${plot.y}" x2="${x}" y2="${plot.y + plot.h}" stroke="${COLORS.warn}" stroke-dasharray="4 5"></line><text x="${x}" y="${plot.y + plot.h + 18}" fill="${COLORS.warn}" font-size="11" text-anchor="middle">${time}</text>`;
  }).join('');
  const body = [
    axes(plot),
    `<polyline points="${points.join(' ')}" fill="none" stroke="${COLORS.brand}" stroke-width="3"></polyline>`,
    `<polyline points="${factorPoints.join(' ')}" fill="none" stroke="${COLORS.accent}" stroke-width="3"></polyline>`,
    peakLabels,
    `<text x="64" y="18" fill="${COLORS.brand}" font-size="12">rush intensity</text>`,
    `<text x="185" y="18" fill="${COLORS.accent}" font-size="12">arterial factor = 1 − ${FACTS.sensitivity.arterial} × intensity</text>`,
  ].join('');
  return svg('Traffic intensity over a day', '0 0 635 215', body);
}

function rerouteThreshold() {
  const plot = { x: 54, y: 24, w: 530, h: 144 };
  const maxRemaining = 1800;
  const maxThreshold = rerouteThresholdSec(maxRemaining);
  const points = [];
  for (let remaining = 0; remaining <= maxRemaining; remaining += 60) {
    const x = plot.x + (remaining / maxRemaining) * plot.w;
    const y = plot.y + plot.h - (rerouteThresholdSec(remaining) / maxThreshold) * plot.h;
    points.push(`${x.toFixed(1)},${y.toFixed(1)}`);
  }
  const cx = plot.x + (FACTS.rerouteCrossoverSec / maxRemaining) * plot.w;
  const body = [
    axes(plot),
    `<polyline points="${points.join(' ')}" fill="none" stroke="${COLORS.good}" stroke-width="3"></polyline>`,
    `<line x1="${cx}" y1="${plot.y}" x2="${cx}" y2="${plot.y + plot.h}" stroke="${COLORS.warn}" stroke-dasharray="5 5"></line>`,
    `<text x="${cx + 6}" y="${plot.y + plot.h - 8}" fill="${COLORS.warn}" font-size="11">crossover at ${FACTS.rerouteCrossoverSec / 60} min remaining</text>`,
    `<text x="70" y="12" fill="${COLORS.text}" font-size="12">threshold = max(${FACTS.rerouteMinGainSec}s, ${FACTS.rerouteMinGainPct}% × remaining)</text>`,
    `<text x="${plot.x - 6}" y="${plot.y + plot.h - (FACTS.rerouteMinGainSec / maxThreshold) * plot.h + 4}" fill="${COLORS.muted}" font-size="11" text-anchor="end">${FACTS.rerouteMinGainSec}s</text>`,
    `<text x="${plot.x - 6}" y="${plot.y + 4}" fill="${COLORS.muted}" font-size="11" text-anchor="end">${Math.round(maxThreshold)}s</text>`,
    `<text x="${plot.x}" y="${plot.y + plot.h + 18}" fill="${COLORS.muted}" font-size="11">0</text>`,
    `<text x="${plot.x + plot.w}" y="${plot.y + plot.h + 18}" fill="${COLORS.muted}" font-size="11" text-anchor="end">30 min remaining</text>`,
    `<text x="${plot.x + plot.w / 2}" y="${plot.y + plot.h + 34}" fill="${COLORS.muted}" font-size="11" text-anchor="middle">remaining route time →</text>`,
  ].join('');
  return svg('Reroute threshold by remaining route time', '0 0 620 212', body);
}

function rerouteFlow() {
  const id = 'kb-arrow-flow';
  const label = (x, y, text, color, anchor = 'start') =>
    `<text x="${x}" y="${y}" fill="${color}" font-size="11" font-weight="600" text-anchor="${anchor}" paint-order="stroke" stroke="var(--bg, #0b0f14)" stroke-width="3">${text}</text>`;
  const lines2 = (cx, a, b) => `${a}<tspan x="${cx}" dy="14">${b}</tspan>`;
  const boxes = [
    box(10, 14, 150, 68, `${lines2(85, 'Check the route', 'closures: every tick')}<tspan x="85" dy="14">traffic: every ${FACTS.rerouteIntervalSec}s</tspan>`),
    box(200, 20, 150, 56, lines2(275, 'Road ahead', 'closed?')),
    box(390, 20, 150, 56, lines2(465, 'Replan from here:', 'is there a path?')),
    box(580, 20, 130, 56, lines2(645, 'Reroute', 'immediately')),
    box(580, 110, 130, 56, lines2(645, 'Blocked ⛔', 'wait and recheck')),
    box(200, 200, 150, 56, lines2(275, 'Traffic check', `due (every ${FACTS.rerouteIntervalSec}s)?`)),
    box(390, 200, 150, 56, lines2(465, `Saves ≥ max(${FACTS.rerouteMinGainSec}s,`, `${FACTS.rerouteMinGainPct}% of remaining)?`)),
    box(580, 200, 130, 56, lines2(645, 'Reroute', 'to faster route')),
    box(390, 290, 150, 44, 'Keep current route'),
  ].join('');
  const path = (d) => `<path d="${d}" fill="none" stroke="${COLORS.text}" stroke-width="2" marker-end="url(#${id})"></path>`;
  const lines = [
    arrow(160, 48, 198, 48, id),
    arrow(350, 48, 388, 48, id),
    arrow(540, 48, 578, 48, id),
    path('M 465 76 L 465 138 L 578 138'),
    arrow(275, 76, 275, 198, id),
    arrow(350, 228, 388, 228, id),
    arrow(540, 228, 578, 228, id),
    arrow(465, 256, 465, 288, id),
    path('M 275 256 L 275 312 L 388 312'),
  ].join('');
  const labels = [
    label(369, 40, 'yes', COLORS.good, 'middle'),
    label(559, 40, 'yes', COLORS.good, 'middle'),
    label(473, 112, 'no', COLORS.bad),
    label(283, 142, 'no', COLORS.muted),
    label(369, 220, 'yes', COLORS.good, 'middle'),
    label(559, 220, 'yes', COLORS.good, 'middle'),
    label(473, 276, 'no', COLORS.muted),
    label(283, 290, 'no', COLORS.muted),
  ].join('');
  return svg('Reroute decision flow', '0 0 720 344', `${marker(id, COLORS.text)}${lines}${boxes}${labels}`);
}

function twinEdges() {
  const id = 'kb-arrow-twin';
  const body = [
    marker(id, COLORS.text),
    `<text x="145" y="28" fill="${COLORS.text}" font-size="13" text-anchor="middle">Two-way road: two opposite directed edges</text>`,
    arrow(60, 75, 230, 75, id), arrow(230, 105, 60, 105, id),
    `<text x="145" y="98" fill="${COLORS.bad}" font-size="30" text-anchor="middle">⊗</text>`,
    `<text x="145" y="135" fill="${COLORS.muted}" font-size="12" text-anchor="middle">closure covers both</text>`,
    `<text x="440" y="28" fill="${COLORS.text}" font-size="13" text-anchor="middle">One-way road: one directed edge</text>`,
    arrow(355, 90, 525, 90, id),
    `<text x="440" y="135" fill="${COLORS.muted}" font-size="12" text-anchor="middle">only the legal direction exists</text>`,
  ].join('');
  return svg('Twin directed edges and closures', '0 0 590 160', body);
}

function axes({ x, y, w, h }) {
  return `<line x1="${x}" y1="${y + h}" x2="${x + w}" y2="${y + h}" stroke="${COLORS.border}"></line><line x1="${x}" y1="${y}" x2="${x}" y2="${y + h}" stroke="${COLORS.border}"></line>`;
}

function box(x, y, w, h, text) {
  return `<g><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="9" fill="${COLORS.surface}" stroke="${COLORS.border}"></rect><text x="${x + w / 2}" y="${y + 22}" fill="${COLORS.text}" font-size="11" text-anchor="middle">${text}</text></g>`;
}

function arrow(x1, y1, x2, y2, id) {
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${COLORS.text}" stroke-width="2" marker-end="url(#${id})"></line>`;
}

function node(x, y, label, fill) {
  return `<g><circle cx="${x}" cy="${y}" r="13" fill="${fill}" stroke="${COLORS.text}"></circle><text x="${x}" y="${y + 4}" fill="#ffffff" font-size="11" text-anchor="middle">${label}</text></g>`;
}

function esc(value) {
  return String(value).replace(/[&<>"]/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]));
}
