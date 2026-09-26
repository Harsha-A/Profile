import { MinHeap } from '../core/heap.js';
import { edgeCost } from './edge-cost.js';
import { reconstructPath } from './path-utils.js';
import { dist as euclid } from '../core/geometry.js';

/**
 * Default admissible heuristic: straight-line distance to the target
 * divided by the fastest speed anywhere in the graph. No edge can be
 * crossed faster than that, so this never overestimates the true cost.
 */
export function euclideanHeuristic(graph, target) {
  const tx = graph.nodeX[target];
  const ty = graph.nodeY[target];
  const maxSpeed = graph.maxSpeed || 1;
  const scale = graph.heuristicScale ?? 1;
  return (node) => (euclid(graph.nodeX[node], graph.nodeY[node], tx, ty) / maxSpeed) * scale;
}

/**
 * A* search. Priority is g(n) + h(n). Pass an `overestimateFactor` above 1
 * to demonstrate an inadmissible heuristic that runs faster but can return
 * a suboptimal path.
 *
 * @param {import('../core/graph.js').Graph} graph
 * @param {number} source
 * @param {number} target
 * @param {{ simTime?: number, trafficFactor?: Function, heuristic?: (node: number) => number, overestimateFactor?: number }} [opts]
 */
export function astar(graph, source, target, opts = {}) {
  const { simTime = 0, trafficFactor, overestimateFactor = 1 } = opts;
  const h = opts.heuristic ?? euclideanHeuristic(graph, target);
  const n = graph.nodeCount;
  const dist = new Float64Array(n).fill(Infinity);
  const prev = new Int32Array(n).fill(-1);
  const settled = new Uint8Array(n);
  const heap = new MinHeap(Math.min(n, 1024));

  dist[source] = 0;
  heap.push(h(source) * overestimateFactor, source);
  let explored = 0;
  let maxHeapSize = 1;

  while (heap.size) {
    maxHeapSize = Math.max(maxHeapSize, heap.size);
    const { value: u } = heap.pop();
    if (settled[u]) continue; // stale duplicate entry, already finalised
    settled[u] = 1;
    const d = dist[u];
    explored++;
    if (u === target) break;
    for (const e of graph.outEdges(u)) {
      const v = graph.edgeTo[e];
      if (settled[v]) continue;
      const c = edgeCost(graph, e, simTime, trafficFactor);
      if (c === Infinity) continue;
      const nd = d + c;
      if (nd < dist[v]) {
        dist[v] = nd;
        prev[v] = e;
        heap.push(nd + h(v) * overestimateFactor, v);
      }
    }
  }

  const path = reconstructPath(prev, graph, source, target);
  return { path, cost: dist[target], explored, maxHeapSize };
}

/** Step generator version of A*, for visualisation. */
export function* astarSteps(graph, source, target, opts = {}) {
  const { simTime = 0, trafficFactor, overestimateFactor = 1 } = opts;
  const h = opts.heuristic ?? euclideanHeuristic(graph, target);
  const n = graph.nodeCount;
  const dist = new Float64Array(n).fill(Infinity);
  const prev = new Int32Array(n).fill(-1);
  const settled = new Uint8Array(n);
  const heap = new MinHeap(Math.min(n, 1024));

  dist[source] = 0;
  heap.push(h(source) * overestimateFactor, source);
  let explored = 0;
  let maxHeapSize = 1;

  while (heap.size) {
    maxHeapSize = Math.max(maxHeapSize, heap.size);
    const { priority: f, value: u } = heap.pop();
    if (settled[u]) continue;
    settled[u] = 1;
    const d = dist[u];
    const hu = h(u);
    explored++;
    yield {
      type: 'settle',
      node: u,
      dist: d,
      g: d,
      h: hu,
      f,
      parent: parentNode(prev[u], graph),
      frontierTop: frontierTopFromHeap(heap, (node, priority) => (
        !settled[node] && priority <= dist[node] + h(node) * overestimateFactor
      )),
    };
    if (u === target) break;
    for (const e of graph.outEdges(u)) {
      const v = graph.edgeTo[e];
      if (settled[v]) continue;
      const c = edgeCost(graph, e, simTime, trafficFactor);
      if (c === Infinity) continue;
      const nd = d + c;
      if (nd < dist[v]) {
        dist[v] = nd;
        prev[v] = e;
        const hv = h(v);
        const nf = nd + hv * overestimateFactor;
        heap.push(nf, v);
        yield { type: 'relax', edge: e, node: v, dist: nd, g: nd, h: hv, f: nf, from: u };
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
