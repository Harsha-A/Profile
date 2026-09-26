import { MinHeap } from '../core/heap.js';
import { edgeCost } from './edge-cost.js';
import { reconstructPath } from './path-utils.js';

/**
 * Dijkstra's algorithm: optimal travel-time path from source to target.
 * Reuses caller-agnostic scratch buffers each call (allocates fresh typed
 * arrays sized to the graph, which is cheap relative to the search itself).
 *
 * @param {import('../core/graph.js').Graph} graph
 * @param {number} source
 * @param {number} target
 * @param {{ simTime?: number, trafficFactor?: Function }} [opts]
 */
export function dijkstra(graph, source, target, opts = {}) {
  const { simTime = 0, trafficFactor } = opts;
  const n = graph.nodeCount;
  const dist = new Float64Array(n).fill(Infinity);
  const prev = new Int32Array(n).fill(-1);
  const heap = new MinHeap(Math.min(n, 1024));

  dist[source] = 0;
  heap.push(0, source);
  let explored = 0;
  let maxHeapSize = 1;

  while (heap.size) {
    maxHeapSize = Math.max(maxHeapSize, heap.size);
    const { priority: d, value: u } = heap.pop();
    if (d > dist[u]) continue; // stale (lazily-deleted) heap entry
    explored++;
    if (u === target) break;
    for (const e of graph.outEdges(u)) {
      const v = graph.edgeTo[e];
      const c = edgeCost(graph, e, simTime, trafficFactor);
      if (c === Infinity) continue;
      const nd = d + c;
      if (nd < dist[v]) {
        dist[v] = nd;
        prev[v] = e;
        heap.push(nd, v);
      }
    }
  }

  const path = reconstructPath(prev, graph, source, target);
  return { path, cost: dist[target], explored, maxHeapSize };
}

/**
 * Step generator version of Dijkstra, for visualisation. Yields one event
 * per settle/relax, then a final `done` event with the same result shape
 * as {@link dijkstra}. Shares the exact same relaxation logic.
 */
export function* dijkstraSteps(graph, source, target, opts = {}) {
  const { simTime = 0, trafficFactor } = opts;
  const n = graph.nodeCount;
  const dist = new Float64Array(n).fill(Infinity);
  const prev = new Int32Array(n).fill(-1);
  const settled = new Uint8Array(n);
  const heap = new MinHeap(Math.min(n, 1024));

  dist[source] = 0;
  heap.push(0, source);
  let explored = 0;
  let maxHeapSize = 1;

  while (heap.size) {
    maxHeapSize = Math.max(maxHeapSize, heap.size);
    const { priority: d, value: u } = heap.pop();
    if (settled[u]) continue;
    if (d > dist[u]) continue;
    settled[u] = 1;
    explored++;
    yield {
      type: 'settle',
      node: u,
      dist: d,
      g: d,
      h: 0,
      f: d,
      parent: parentNode(prev[u], graph),
      frontierTop: frontierTopFromHeap(heap, (node, f) => !settled[node] && f <= dist[node]),
    };
    if (u === target) break;
    for (const e of graph.outEdges(u)) {
      const v = graph.edgeTo[e];
      const c = edgeCost(graph, e, simTime, trafficFactor);
      if (c === Infinity) continue;
      const nd = d + c;
      if (nd < dist[v]) {
        dist[v] = nd;
        prev[v] = e;
        heap.push(nd, v);
        yield { type: 'relax', edge: e, node: v, dist: nd, g: nd, h: 0, f: nd, from: u };
      }
    }
  }

  const path = reconstructPath(prev, graph, source, target);
  yield { type: 'done', path, cost: dist[target], explored, maxHeapSize };
}

function parentNode(edge, graph) {
  return edge === -1 ? -1 : graph.edgeFrom[edge];
}

function frontierTopFromHeap(heap, isLive) {
  const top = [];
  const stack = heap.size ? [0] : [];
  while (stack.length) {
    const i = stack.pop();
    if (i >= heap._size) continue;
    const f = heap._priority[i];
    if (top.length === 5 && f > top[4].f) continue;
    const node = heap._value[i];
    if (isLive(node, f)) insertFrontierTop(top, { node, f });
    const left = i * 2 + 1;
    const right = left + 1;
    if (right < heap._size) stack.push(right);
    if (left < heap._size) stack.push(left);
  }
  return top;
}

function insertFrontierTop(top, entry) {
  top.push(entry);
  top.sort((a, b) => a.f - b.f);
  if (top.length > 5) top.pop();
}
