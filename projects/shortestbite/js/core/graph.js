/**
 * Directed road graph stored as flat typed arrays (compressed sparse row),
 * so the search loops allocate nothing per call. Also builds the reverse
 * graph, needed for backward/bidirectional search since one-way streets
 * make the graph directed.
 */

export const ROAD_CLASSES = ['highway', 'arterial', 'local', 'bridge'];
const ROAD_CLASS_CODE = Object.fromEntries(ROAD_CLASSES.map((c, i) => [c, i]));

/** @typedef {{ from: number, to: number, length: number, speed: number, roadClass: string, closed?: boolean, geometry?: [number, number][] }} EdgeInput */

export class Graph {
  /**
   * @param {{ x: number, y: number }[]} nodes
   * @param {EdgeInput[]} edges directed edges; a two-way road is passed as two entries.
   */
  constructor(nodes, edges) {
    const n = nodes.length;
    const m = edges.length;

    this.nodeCount = n;
    this.edgeCount = m;
    this.nodeX = new Float64Array(n);
    this.nodeY = new Float64Array(n);
    for (let i = 0; i < n; i++) {
      this.nodeX[i] = nodes[i].x;
      this.nodeY[i] = nodes[i].y;
    }

    this.edgeFrom = new Int32Array(m);
    this.edgeTo = new Int32Array(m);
    this.edgeLength = new Float64Array(m);
    this.edgeSpeed = new Float64Array(m);
    this.edgeClass = new Uint8Array(m);
    this.edgeClosed = new Uint8Array(m);
    this.edgeGeometry = new Array(m).fill(null);

    for (let e = 0; e < m; e++) {
      const edge = edges[e];
      this.edgeFrom[e] = edge.from;
      this.edgeTo[e] = edge.to;
      this.edgeLength[e] = edge.length;
      this.edgeSpeed[e] = edge.speed;
      this.edgeClass[e] = ROAD_CLASS_CODE[edge.roadClass] ?? ROAD_CLASS_CODE.local;
      this.edgeClosed[e] = edge.closed ? 1 : 0;
      if (edge.geometry) this.edgeGeometry[e] = edge.geometry;
    }

    this.adjStart = buildCsrOffsets(n, this.edgeFrom);
    this.adjEdge = buildCsrOrder(n, m, this.edgeFrom, this.adjStart);

    // Reverse graph: same edges, indexed by `to` instead of `from`.
    this.radjStart = buildCsrOffsets(n, this.edgeTo);
    this.radjEdge = buildCsrOrder(n, m, this.edgeTo, this.radjStart);
    this._reverseEdgeCache = null;

    this.maxSpeed = 0;
    for (let e = 0; e < m; e++) if (this.edgeSpeed[e] > this.maxSpeed) this.maxSpeed = this.edgeSpeed[e];

    // Scale factor applied to the default A* heuristic (see astar.js). Real-world
    // (Phase 2/OSM) graphs set this slightly below 1 to guard against the
    // projection making straight-line distance a hair larger than the true
    // distance, which would otherwise make the heuristic inadmissible.
    this.heuristicScale = 1;
  }

  /** Edge ids leaving `nodeId`, forward direction. */
  outEdges(nodeId) {
    return this.adjEdge.subarray(this.adjStart[nodeId], this.adjStart[nodeId + 1]);
  }

  /** Edge ids arriving at `nodeId` (i.e. outgoing edges of `nodeId` in the reverse graph). */
  inEdges(nodeId) {
    return this.radjEdge.subarray(this.radjStart[nodeId], this.radjStart[nodeId + 1]);
  }

  /** Neighbour node ids reachable directly from `nodeId`. */
  neighbors(nodeId) {
    const out = this.outEdges(nodeId);
    const result = new Array(out.length);
    for (let i = 0; i < out.length; i++) result[i] = this.edgeTo[out[i]];
    return result;
  }

  /** @returns {{ from: number, to: number, length: number, speed: number, roadClass: string, closed: boolean, geometry: [number, number][] | null }} */
  edge(edgeId) {
    return {
      from: this.edgeFrom[edgeId],
      to: this.edgeTo[edgeId],
      length: this.edgeLength[edgeId],
      speed: this.edgeSpeed[edgeId],
      roadClass: ROAD_CLASSES[this.edgeClass[edgeId]],
      closed: this.edgeClosed[edgeId] === 1,
      geometry: this.edgeGeometry[edgeId],
    };
  }

  setClosed(edgeId, closed) {
    this.edgeClosed[edgeId] = closed ? 1 : 0;
  }

  /** The opposite directed edge for the same physical road, or -1 for one-way streets. */
  reverseEdge(edgeId) {
    if (!this._reverseEdgeCache) this._reverseEdgeCache = buildReverseEdgeCache(this);
    return edgeId >= 0 && edgeId < this.edgeCount ? this._reverseEdgeCache[edgeId] : -1;
  }
}

/** Offsets array of length n+1: adjStart[i]..adjStart[i+1] are edge slots for node i. */
function buildCsrOffsets(n, fromArray) {
  const counts = new Int32Array(n + 1);
  for (let e = 0; e < fromArray.length; e++) counts[fromArray[e] + 1]++;
  for (let i = 0; i < n; i++) counts[i + 1] += counts[i];
  return counts;
}

/** Fill edge ids into CSR slot order, given the offsets computed above. */
function buildCsrOrder(n, m, fromArray, offsets) {
  const cursor = offsets.slice(0, n);
  const order = new Int32Array(m);
  for (let e = 0; e < m; e++) {
    const node = fromArray[e];
    order[cursor[node]++] = e;
  }
  return order;
}

function buildReverseEdgeCache(graph) {
  const reverse = new Int32Array(graph.edgeCount);
  reverse.fill(-1);
  for (let e = 0; e < graph.edgeCount; e++) {
    const from = graph.edgeFrom[e];
    const to = graph.edgeTo[e];
    const length = graph.edgeLength[e];
    let bestEdge = -1;
    let bestDelta = Infinity;
    for (let i = graph.adjStart[to]; i < graph.adjStart[to + 1]; i++) {
      const candidate = graph.adjEdge[i];
      if (graph.edgeTo[candidate] !== from) continue;
      const delta = Math.abs(graph.edgeLength[candidate] - length);
      if (delta < bestDelta) {
        bestDelta = delta;
        bestEdge = candidate;
      }
    }
    reverse[e] = bestEdge;
  }
  return reverse;
}
