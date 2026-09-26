import { Graph } from '../core/graph.js';
import { bfs, bfsSteps } from '../algorithms/bfs.js';
import { dijkstra, dijkstraSteps } from '../algorithms/dijkstra.js';
import { astar, astarSteps } from '../algorithms/astar.js';
import { FACTS, ALGO } from './facts.js';

const KMH_TO_MPS = 1000 / 3600;
const labels = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
const positions = [
  { x: 60, y: 220 },
  { x: 240, y: 220 },
  { x: 420, y: 220 },
  { x: 135, y: 90 },
  { x: 260, y: 50 },
  { x: 300, y: 360 },
  { x: 600, y: 220 },
];

const speed = (roadClass) => FACTS.speedsKmh[roadClass] * KMH_TO_MPS;
const edges = [
  twoWay(0, 1, 200, speed('arterial'), 'arterial'),
  twoWay(1, 2, 200, speed('arterial'), 'arterial'),
  twoWay(2, 6, 200, speed('arterial'), 'arterial'),
  twoWay(0, 3, 140, speed('local'), 'local'),
  twoWay(3, 4, 100, speed('local'), 'local'),
  twoWay(0, 5, 700, speed('local'), 'local'),
  twoWay(5, 6, 700, speed('local'), 'local'),
].flat();

/** Tiny weighted road graph used by Knowledge traces and diagrams. */
export const DEMO_GRAPH = Object.freeze({
  graph: new Graph(positions, edges),
  labels,
  positions,
});

/** Demo pickup label. */
export const DEMO_FROM = 'A';

/** Demo drop-off label. */
export const DEMO_TO = labels[labels.length - 1];

/** Trace ids supported by {@link buildTrace}. */
export const TRACE_IDS = Object.freeze(['dijkstra-demo', 'astar-demo', 'bfs-demo']);

const TRACE_CONFIG = Object.freeze({
  'dijkstra-demo': {
    algorithm: 'dijkstra',
    caption: `${ALGO.dijkstra.name}: cheapest-time priority`,
    steps: dijkstraSteps,
    run: dijkstra,
  },
  'astar-demo': {
    algorithm: 'astar',
    caption: `${ALGO.astar.name}: cost so far plus straight-line estimate`,
    steps: astarSteps,
    run: astar,
  },
  'bfs-demo': {
    algorithm: 'bfs',
    caption: `${ALGO.bfs.name}: fewest-intersections priority`,
    steps: bfsSteps,
    run: bfs,
  },
});

const HEAD = Object.freeze([
  '#',
  'Intersection',
  'g (cost so far)',
  'h (estimate)',
  'f (priority)',
  'Came from',
  'Queue next',
]);

/**
 * Build a settled-node trace by running the real step generator on DEMO_GRAPH.
 * @param {string} id one of {@link TRACE_IDS}
 * @returns {{ caption: string, head: string[], rows: string[][], result: { path: string[], cost: number, settledCount: number } }}
 */
export function buildTrace(id) {
  const cfg = TRACE_CONFIG[id];
  if (!cfg) throw new Error(`Unknown trace id: ${id}`);

  const source = labels.indexOf(DEMO_FROM);
  const target = labels.indexOf(DEMO_TO);
  const rows = [];
  let final = null;
  for (const step of cfg.steps(DEMO_GRAPH.graph, source, target)) {
    if (step.type === 'settle') rows.push(settleRow(step, rows.length + 1, cfg.algorithm));
    if (step.type === 'done') final = step;
  }
  const fast = cfg.run(DEMO_GRAPH.graph, source, target);
  assertSameResult(id, final, fast);

  return {
    caption: cfg.caption,
    head: [...HEAD],
    rows,
    result: {
      path: labelPath(final.path),
      cost: final.cost,
      settledCount: rows.length,
    },
  };
}

function twoWay(a, b, length, edgeSpeed, roadClass) {
  return [
    { from: a, to: b, length, speed: edgeSpeed, roadClass },
    { from: b, to: a, length, speed: edgeSpeed, roadClass },
  ];
}

function settleRow(step, index, algorithm) {
  const bfsLike = algorithm === 'bfs';
  return [
    String(index),
    labels[step.node],
    bfsLike ? `${step.g} hop${step.g === 1 ? '' : 's'}` : seconds(step.g),
    bfsLike ? '—' : seconds(step.h),
    bfsLike ? `${step.f}` : seconds(step.f),
    step.parent === -1 ? 'Start' : labels[step.parent],
    queueNext(step.frontierTop, bfsLike),
  ];
}

function queueNext(frontierTop, bfsLike) {
  if (!frontierTop?.length) return '—';
  return frontierTop
    .map((entry) => `${labels[entry.node]} (${bfsLike ? entry.f : seconds(entry.f)})`)
    .join(', ');
}

function seconds(value) {
  return Number.isFinite(value) ? `${value.toFixed(1)}s` : '∞';
}

function labelPath(path) {
  return path ? path.nodes.map((node) => labels[node]) : [];
}

function assertSameResult(id, stepped, fast) {
  if (!stepped) throw new Error(`${id} did not yield a done step`);
  const stepPath = JSON.stringify(stepped.path);
  const fastPath = JSON.stringify(fast.path);
  if (stepPath !== fastPath || Math.abs(stepped.cost - fast.cost) > 1e-9) {
    throw new Error(`${id} step result did not match fast result`);
  }
}
