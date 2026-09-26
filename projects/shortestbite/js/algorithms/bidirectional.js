import { MinHeap } from '../core/heap.js';
import { edgeCost } from './edge-cost.js';

/**
 * Bidirectional Dijkstra: alternates a forward search (from source, forward
 * graph) and a backward search (from target, reverse graph), and stops as
 * soon as the two frontiers' combined lower bound reaches the best full
 * path found so far — not merely when they first touch, which is a classic
 * bug that can return a suboptimal path.
 *
 * @param {import('../core/graph.js').Graph} graph
 * @param {number} source
 * @param {number} target
 * @param {{ simTime?: number, trafficFactor?: Function }} [opts]
 */
export function bidirectionalDijkstra(graph, source, target, opts = {}) {
  const { simTime = 0, trafficFactor } = opts;
  const n = graph.nodeCount;

  const distF = new Float64Array(n).fill(Infinity);
  const distB = new Float64Array(n).fill(Infinity);
  const prevF = new Int32Array(n).fill(-1); // edge id, forward graph
  const prevB = new Int32Array(n).fill(-1); // edge id, reverse graph
  const settledF = new Uint8Array(n);
  const settledB = new Uint8Array(n);
  const heapF = new MinHeap(Math.min(n, 1024));
  const heapB = new MinHeap(Math.min(n, 1024));

  distF[source] = 0;
  distB[target] = 0;
  heapF.push(0, source);
  heapB.push(0, target);

  let best = Infinity;
  let meetNode = -1;
  let explored = 0;
  let maxHeapSize = 2;

  if (source === target) {
    return { path: { nodes: [source], edges: [] }, cost: 0, explored: 1, maxHeapSize: 1 };
  }

  while (heapF.size && heapB.size) {
    maxHeapSize = Math.max(maxHeapSize, heapF.size + heapB.size);
    const topF = heapF.peek();
    const topB = heapB.peek();
    if (topF + topB >= best) break; // proven optimal: cannot improve further

    // Forward step.
    {
      const { priority: d, value: u } = heapF.pop();
      if (!(d > distF[u])) {
        if (!settledF[u]) {
          settledF[u] = 1;
          explored++;
          for (const e of graph.outEdges(u)) {
            const v = graph.edgeTo[e];
            const c = edgeCost(graph, e, simTime, trafficFactor);
            if (c === Infinity) continue;
            const nd = d + c;
            if (nd < distF[v]) {
              distF[v] = nd;
              prevF[v] = e;
              heapF.push(nd, v);
              if (settledB[v] && distF[v] + distB[v] < best) {
                best = distF[v] + distB[v];
                meetNode = v;
              }
            }
          }
          if (settledB[u] && distF[u] + distB[u] < best) {
            best = distF[u] + distB[u];
            meetNode = u;
          }
        }
      }
    }

    if (!(heapF.size && heapB.size)) break;

    // Backward step (reverse graph: edges point from v to u, so we relax inEdges).
    {
      const { priority: d, value: u } = heapB.pop();
      if (!(d > distB[u])) {
        if (!settledB[u]) {
          settledB[u] = 1;
          explored++;
          for (const e of graph.inEdges(u)) {
            const v = graph.edgeFrom[e];
            const c = edgeCost(graph, e, simTime, trafficFactor);
            if (c === Infinity) continue;
            const nd = d + c;
            if (nd < distB[v]) {
              distB[v] = nd;
              prevB[v] = e;
              heapB.push(nd, v);
              if (settledF[v] && distF[v] + distB[v] < best) {
                best = distF[v] + distB[v];
                meetNode = v;
              }
            }
          }
          if (settledF[u] && distF[u] + distB[u] < best) {
            best = distF[u] + distB[u];
            meetNode = u;
          }
        }
      }
    }
  }

  if (meetNode === -1) {
    return { path: null, cost: Infinity, explored, maxHeapSize };
  }

  const path = stitchPath(graph, prevF, prevB, source, target, meetNode);
  return { path, cost: best, explored, maxHeapSize };
}

/** Build the full node/edge path from the forward half, meet node, and backward half. */
function stitchPath(graph, prevF, prevB, source, target, meetNode) {
  const forwardNodes = [meetNode];
  const forwardEdges = [];
  let cur = meetNode;
  while (cur !== source) {
    const e = prevF[cur];
    if (e === -1) return null;
    forwardEdges.push(e);
    cur = graph.edgeFrom[e];
    forwardNodes.push(cur);
  }
  forwardNodes.reverse();
  forwardEdges.reverse();

  const backwardNodes = [];
  const backwardEdges = [];
  cur = meetNode;
  while (cur !== target) {
    // prevB[cur] is the forward-direction edge (edgeFrom === cur) discovered
    // by the backward search; its `to` end is the parent, one step closer
    // to the target.
    const e = prevB[cur];
    if (e === -1) return null;
    backwardEdges.push(e);
    cur = graph.edgeTo[e];
    backwardNodes.push(cur);
  }

  return {
    nodes: [...forwardNodes, ...backwardNodes],
    edges: [...forwardEdges, ...backwardEdges],
  };
}
