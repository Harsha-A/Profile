import { Graph, ROAD_CLASSES } from '../core/graph.js';

/** Road geometry is curvier than straight lines; scaling the A* estimate keeps it admissible. */
export const OSM_HEURISTIC_SCALE = 0.995;

/**
 * Build a `Graph` (with the same `{ graph, meta }` shape as `generateCity`)
 * from a preprocessed OSM city JSON file (see `scripts/build-osm-graph.js`).
 * Everything downstream (algorithms, movers, traffic) works unchanged,
 * because the graph is still flat `x`/`y` metres — only the data source and
 * renderer differ from Phase 1.
 *
 * @param {string} name city file name without extension, e.g. "koramangala"
 * @returns {Promise<{ graph: Graph, meta: object }>}
 */
export async function loadCity(name) {
  const res = await fetch(`data/cities/${name}.json`);
  if (!res.ok) throw new Error(`Could not load city "${name}": HTTP ${res.status}`);
  const data = await res.json();
  return buildFromJson(data);
}

/** Build a `{ graph, meta }` pair from an already-parsed city JSON payload (shared with tests). */
export function buildFromJson(data) {
  const nodes = data.nodes.map(([x, y, lat, lng]) => ({ x, y, lat, lng }));
  const edges = data.edges.map(([from, to, length, speed, classCode, geomIndex]) => ({
    from,
    to,
    length,
    speed,
    roadClass: ROAD_CLASSES[classCode] ?? 'local',
    geometry: geomIndex >= 0 ? data.geometry[geomIndex] : null,
  }));

  const graph = new Graph(nodes, edges);
  // Real-world coordinates: the projected-Euclidean heuristic can slightly
  // overestimate true distance away from the projection centre, so shrink it
  // a hair to stay admissible (see PLAN.md section 17.3).
  graph.heuristicScale = OSM_HEURISTIC_SCALE;
  graph.nodeLat = new Float64Array(nodes.length);
  graph.nodeLng = new Float64Array(nodes.length);
  for (let i = 0; i < nodes.length; i++) {
    graph.nodeLat[i] = nodes[i].lat;
    graph.nodeLng[i] = nodes[i].lng;
  }

  return { graph, meta: data.meta };
}
