/** Shared helpers for reconstructing and measuring paths from a search's `prev` edge array. */

/**
 * Walk `prev` (edge id that led to each node, or -1) backward from target to
 * source and return the node sequence, or null if unreachable.
 * @param {Int32Array} prev
 * @param {import('../core/graph.js').Graph} graph
 * @param {number} source
 * @param {number} target
 */
export function reconstructPath(prev, graph, source, target) {
  if (source === target) return { nodes: [source], edges: [] };
  if (prev[target] === -1) return null;
  const nodes = [target];
  let cur = target;
  const edges = [];
  while (cur !== source) {
    const e = prev[cur];
    if (e === -1) return null;
    edges.push(e);
    cur = graph.edgeFrom[e];
    nodes.push(cur);
    if (nodes.length > graph.nodeCount + 1) return null; // safety against cycles
  }
  nodes.reverse();
  edges.reverse();
  return { nodes, edges };
}

/** Sum of edge lengths (metres) along a path produced by reconstructPath. */
export function pathLength(graph, path) {
  if (!path) return Infinity;
  let total = 0;
  for (const e of path.edges) total += graph.edgeLength[e];
  return total;
}

/** Flattened [x, y] polyline for rendering, following curved `geometry` where present. */
export function pathToPolyline(graph, path) {
  if (!path) return [];
  const pts = [];
  for (let i = 0; i < path.nodes.length; i++) {
    const n = path.nodes[i];
    pts.push([graph.nodeX[n], graph.nodeY[n]]);
    if (i < path.edges.length) {
      const geom = graph.edgeGeometry[path.edges[i]];
      if (geom) for (const p of geom) pts.push(p);
    }
  }
  return pts;
}
