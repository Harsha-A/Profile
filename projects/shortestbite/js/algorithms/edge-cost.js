import { ROAD_CLASSES } from '../core/graph.js';

/**
 * Edge travel-time cost function shared by every search algorithm.
 * `trafficFactor` must always return a value in (0, 1] so that A*'s
 * straight-line/maxSpeed heuristic never overestimates the true cost.
 *
 * @param {import('../core/graph.js').Graph} graph
 * @param {number} edgeId
 * @param {number} simTime simulated seconds since midnight
 * @param {(roadClass: string, simTime: number, edgeId: number) => number} [trafficFactor]
 * @returns {number} seconds, or Infinity if the edge is closed
 */
export function edgeCost(graph, edgeId, simTime, trafficFactor) {
  if (graph.edgeClosed[edgeId]) return Infinity;
  const factor = trafficFactor
    ? trafficFactor(ROAD_CLASSES[graph.edgeClass[edgeId]], simTime, edgeId)
    : 1;
  return graph.edgeLength[edgeId] / (graph.edgeSpeed[edgeId] * factor);
}
