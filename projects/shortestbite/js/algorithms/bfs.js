import { reconstructPath } from './path-utils.js';

/**
 * Breadth-first search: fewest intersections (hops) from source to target,
 * ignoring edge cost entirely. A useful baseline for showing why weighted
 * search matters — its path can be slower in travel time than Dijkstra's.
 * Closed edges are still impassable.
 *
 * @param {import('../core/graph.js').Graph} graph
 * @param {number} source
 * @param {number} target
 */
export function bfs(graph, source, target) {
  const n = graph.nodeCount;
  const visited = new Uint8Array(n);
  const prev = new Int32Array(n).fill(-1);
  const queue = new Int32Array(n);
  let head = 0;
  let tail = 0;

  visited[source] = 1;
  queue[tail++] = source;
  let explored = 0;

  while (head < tail) {
    const u = queue[head++];
    explored++;
    if (u === target) break;
    for (const e of graph.outEdges(u)) {
      if (graph.edgeClosed[e]) continue;
      const v = graph.edgeTo[e];
      if (visited[v]) continue;
      visited[v] = 1;
      prev[v] = e;
      queue[tail++] = v;
    }
  }

  const path = reconstructPath(prev, graph, source, target);
  const cost = path ? hopCostSeconds(graph, path) : Infinity;
  return { path, cost, explored, maxHeapSize: tail };
}

/** BFS ignores travel time while searching, but we still report the real
 * travel-time cost of the hop-shortest path it found, for fair comparison. */
function hopCostSeconds(graph, path) {
  let total = 0;
  for (const e of path.edges) total += graph.edgeLength[e] / graph.edgeSpeed[e];
  return total;
}

/** Step generator version of BFS, for visualisation. */
export function* bfsSteps(graph, source, target) {
  const n = graph.nodeCount;
  const visited = new Uint8Array(n);
  const prev = new Int32Array(n).fill(-1);
  const hop = new Int32Array(n).fill(-1);
  const queue = [source];
  visited[source] = 1;
  hop[source] = 0;
  let explored = 0;
  let head = 0;

  while (head < queue.length) {
    const u = queue[head++];
    explored++;
    const g = hop[u];
    yield {
      type: 'settle',
      node: u,
      dist: explored,
      g,
      h: 0,
      f: g,
      parent: parentNode(prev[u], graph),
      frontierTop: frontierTopFromQueue(queue, head, hop),
    };
    if (u === target) break;
    for (const e of graph.outEdges(u)) {
      if (graph.edgeClosed[e]) continue;
      const v = graph.edgeTo[e];
      if (visited[v]) continue;
      visited[v] = 1;
      prev[v] = e;
      hop[v] = g + 1;
      queue.push(v);
      yield { type: 'relax', edge: e, node: v, dist: explored + 1, g: hop[v], h: 0, f: hop[v], from: u };
    }
  }

  const path = reconstructPath(prev, graph, source, target);
  const cost = path ? hopCostSeconds(graph, path) : Infinity;
  yield { type: 'done', path, cost, explored, maxHeapSize: queue.length };
}

function parentNode(edge, graph) {
  return edge === -1 ? -1 : graph.edgeFrom[edge];
}

function frontierTopFromQueue(queue, head, hop) {
  const top = [];
  const end = Math.min(queue.length, head + 5);
  for (let i = head; i < end; i++) {
    const node = queue[i];
    top.push({ node, f: hop[node] });
  }
  return top;
}
