import { Rng } from '../core/rng.js';
import { Graph } from '../core/graph.js';
import { largestScc } from '../algorithms/components.js';
import { generateStreetNames } from './names.js';

const KMH_TO_MPS = 1000 / 3600;
const DEFAULT_SPEEDS_KMH = { highway: 60, arterial: 40, local: 20, bridge: 30 };

const DEFAULT_OPTIONS = {
  cols: 45,
  rows: 30,
  spacingM: 120,
  jitterM: 25,
  dropRate: 0.15,
  oneWayRate: 0.1,
  river: true,
  bridges: 3,
  diagonals: 6,
  speedsKmh: DEFAULT_SPEEDS_KMH,
};

/**
 * Build a deterministic procedural city: a jittered grid of intersections
 * with local streets, a few arterial rows/columns, a ring road, diagonal
 * shortcuts, an optional river crossed only by a handful of bridges, and
 * ~10% one-way local streets — cleaned up to its largest strongly
 * connected component so every node can reach every other node.
 *
 * @param {number} seed
 * @param {Partial<typeof DEFAULT_OPTIONS>} [options]
 * @returns {{ graph: Graph, meta: object }}
 */
export function generateCity(seed, options = {}) {
  const cfg = { ...DEFAULT_OPTIONS, ...options, speedsKmh: { ...DEFAULT_SPEEDS_KMH, ...options.speedsKmh } };
  const rng = new Rng(seed);
  const speeds = Object.fromEntries(
    Object.entries(cfg.speedsKmh).map(([k, v]) => [k, v * KMH_TO_MPS])
  );

  const { cols, rows, spacingM, jitterM } = cfg;
  const gridRng = rng.fork('grid');
  const nodeCount = cols * rows;
  /** grid (r,c) -> node id */
  const id = (r, c) => r * cols + c;

  // 1. Grid: jittered intersections.
  const gx = new Float64Array(nodeCount);
  const gy = new Float64Array(nodeCount);
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const i = id(r, c);
      gx[i] = c * spacingM + gridRng.float() * 2 * jitterM - jitterM;
      gy[i] = r * spacingM + gridRng.float() * 2 * jitterM - jitterM;
    }
  }

  // 2/3/4. Choose arterial rows/cols (interior only, so the ring stays highway).
  const arterialRng = rng.fork('arterials');
  const arterialRows = pickUnique(arterialRng, 1, rows - 2, arterialRng.int(2, 4));
  const arterialCols = pickUnique(arterialRng, 1, cols - 2, arterialRng.int(2, 4));

  // 6. River: a horizontal cut between two interior rows, crossed only by bridges.
  const riverRng = rng.fork('river');
  const hasRiver = cfg.river && rows > 6;
  const riverRow = hasRiver ? riverRng.int(Math.floor(rows * 0.35), Math.ceil(rows * 0.65)) : -1;
  const bridgeCols = hasRiver ? pickUnique(riverRng, 0, cols, Math.min(cfg.bridges, cols)) : [];
  const bridgeColSet = new Set(bridgeCols);

  // Edge builder: `key` de-dupes so we never emit the same undirected road twice.
  const edgeRng = rng.fork('edges');
  const edges = [];
  const seenUndirected = new Set();

  function isBoundary(r, c) {
    return r === 0 || r === rows - 1 || c === 0 || c === cols - 1;
  }

  function classFor(r1, c1, r2, c2) {
    if (isBoundary(r1, c1) && isBoundary(r2, c2) && (r1 === r2 || c1 === c2)) {
      // Only the outer ring's own edges are highway, not every boundary-touching edge.
      const onRing =
        (r1 === 0 && r2 === 0) ||
        (r1 === rows - 1 && r2 === rows - 1) ||
        (c1 === 0 && c2 === 0) ||
        (c1 === cols - 1 && c2 === cols - 1);
      if (onRing) return 'highway';
    }
    if (r1 === r2 && arterialRows.includes(r1)) return 'arterial';
    if (c1 === c2 && arterialCols.includes(c1)) return 'arterial';
    return 'local';
  }

  /** Add a two-way road unless it's later thinned or made one-way. */
  function addRoad(r1, c1, r2, c2, { crossesRiver = false } = {}) {
    const a = id(r1, c1);
    const b = id(r2, c2);
    const key = a < b ? `${a}:${b}` : `${b}:${a}`;
    if (seenUndirected.has(key)) return;
    seenUndirected.add(key);

    let roadClass = classFor(r1, c1, r2, c2);
    if (crossesRiver) {
      if (!bridgeColSet.has(Math.min(c1, c2))) return; // deleted: no bridge here
      roadClass = 'bridge';
    }

    // Local streets may be dropped or made one-way; arterial/highway/bridge/diagonals never are.
    const thinnable = roadClass === 'local';
    if (thinnable && edgeRng.chance(cfg.dropRate)) return;

    const oneWay = thinnable && edgeRng.chance(cfg.oneWayRate);
    const forwardOnly = oneWay && edgeRng.chance(0.5);
    const length = dist(gx[a], gy[a], gx[b], gy[b]);
    const speed = speeds[roadClass];

    if (!oneWay || forwardOnly) edges.push({ from: a, to: b, length, speed, roadClass });
    if (!oneWay || !forwardOnly) edges.push({ from: b, to: a, length, speed, roadClass });
  }

  // Horizontal and vertical neighbour roads (includes the ring at the boundary).
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (c + 1 < cols) addRoad(r, c, r, c + 1);
      if (r + 1 < rows) {
        const crossesRiver = hasRiver && r === riverRow;
        addRoad(r, c, r + 1, c, { crossesRiver });
      }
    }
  }

  // 5. Diagonal shortcuts: a handful of random NE-SW or NW-SE two-way local links.
  const diagRng = rng.fork('diagonals');
  for (let i = 0; i < cfg.diagonals; i++) {
    const r = diagRng.int(0, rows - 1);
    const c = diagRng.int(0, cols - 1);
    const goingRight = diagRng.chance();
    const r2 = r + 1;
    const c2 = goingRight ? c + 1 : c - 1;
    if (c2 < 0 || c2 >= cols) continue;
    const a = id(r, c);
    const b = id(r2, c2);
    const length = dist(gx[a], gy[a], gx[b], gy[b]);
    const speed = speeds.local;
    edges.push({ from: a, to: b, length, speed, roadClass: 'local' });
    edges.push({ from: b, to: a, length, speed, roadClass: 'local' });
  }

  // Build a first-pass graph, then keep only its largest strongly connected component.
  const nodes = Array.from({ length: nodeCount }, (_, i) => ({ x: gx[i], y: gy[i] }));
  const rawGraph = new Graph(nodes, edges);
  const keep = largestScc(rawGraph);

  const { graph, oldToNew } = renumberToSubset(rawGraph, keep);

  const namesRng = rng.fork('names');
  const { rowNames, colNames } = generateStreetNames(namesRng, rows, cols);

  return {
    graph,
    meta: {
      seed,
      cols,
      rows,
      nodeCount: graph.nodeCount,
      edgeCount: graph.edgeCount,
      river: hasRiver,
      riverRow,
      bridgeCols,
      arterialRows,
      arterialCols,
      streetNames: { rowNames, colNames },
      oldToNew,
    },
  };
}

function dist(x1, y1, x2, y2) {
  return Math.hypot(x2 - x1, y2 - y1);
}

/** `count` distinct integers in [min, max), sorted ascending. */
function pickUnique(rng, min, max, count) {
  const span = Math.max(0, max - min);
  count = Math.min(count, span);
  const chosen = new Set();
  while (chosen.size < count) chosen.add(rng.int(min, max));
  return [...chosen].sort((a, b) => a - b);
}

/**
 * Keep only nodes in `keepSet`, renumbering them to a dense 0..k-1 range,
 * and rebuild the graph from the surviving edges.
 */
function renumberToSubset(graph, keepSet) {
  const oldToNew = new Map();
  const newNodes = [];
  for (let i = 0; i < graph.nodeCount; i++) {
    if (!keepSet.has(i)) continue;
    oldToNew.set(i, newNodes.length);
    newNodes.push({ x: graph.nodeX[i], y: graph.nodeY[i] });
  }

  const newEdges = [];
  for (let e = 0; e < graph.edgeCount; e++) {
    const from = graph.edgeFrom[e];
    const to = graph.edgeTo[e];
    if (!keepSet.has(from) || !keepSet.has(to)) continue;
    newEdges.push({
      from: oldToNew.get(from),
      to: oldToNew.get(to),
      length: graph.edgeLength[e],
      speed: graph.edgeSpeed[e],
      roadClass: ['highway', 'arterial', 'local', 'bridge'][graph.edgeClass[e]],
      closed: graph.edgeClosed[e] === 1,
    });
  }

  return { graph: new Graph(newNodes, newEdges), oldToNew };
}
