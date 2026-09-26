/**
 * A mover: a small agent that travels from a start node to a target node
 * along a precomputed route, purely to make routing and re-routing visible
 * on the map. Not a delivery agent — there is no domain behind it.
 */

/** A rider counts as "stuck in traffic" when its road runs below this share of free-flow speed. */
export const CONGESTED_FACTOR = 0.62;

let nextMoverId = 1;

/**
 * @param {number} startNode
 * @param {import('../core/graph.js').Graph} graph
 * @param {{ speedFactor?: number, algorithm?: string, color?: string }} [opts]
 */
export function createMover(startNode, graph, opts = {}) {
  return {
    id: nextMoverId++,
    x: graph.nodeX[startNode],
    y: graph.nodeY[startNode],
    node: startNode,
    targetNode: null,
    speedFactor: opts.speedFactor ?? 1,
    algorithm: opts.algorithm ?? 'dijkstra',
    color: opts.color ?? null,
    heading: 0, // radians, purely for sprite orientation
    speedMps: 0, // current effective speed, for the rider HUD
    congested: false,
    route: null, // { nodes: number[], edges: number[], edgeIndex: number, edgeProgress: number }
    stats: { distanceM: 0, elapsedSec: 0, reroutes: 0 },
    arrived: false,
    status: 'moving',
  };
}

/**
 * Assign (or replace) a mover's route. Resets progress to the start of the
 * new route's first edge.
 * @param {*} mover
 * @param {{ nodes: number[], edges: number[] }} route
 */
export function setRoute(mover, route) {
  mover.route = route ? { nodes: route.nodes, edges: route.edges, edgeIndex: 0, edgeProgress: 0 } : null;
  mover.targetNode = route ? route.nodes[route.nodes.length - 1] : null;
  mover.arrived = false;
  mover.status = 'moving';
}

/**
 * Advance a mover by `dt` simulated seconds along its current route.
 * @param {*} mover
 * @param {import('../core/graph.js').Graph} graph
 * @param {number} dt
 * @param {(roadClass: string, simTime: number, edgeId: number) => number} trafficFactor
 * @param {number} simTime
 * @returns {boolean} true if the mover arrived at its target this tick
 */
export function stepMover(mover, graph, dt, trafficFactor, simTime) {
  if (!mover.route || mover.arrived) return false;
  let timeLeft = dt;
  const route = mover.route;

  while (timeLeft > 0 && route.edgeIndex < route.edges.length) {
    const e = route.edges[route.edgeIndex];
    if (route.edgeProgress === 0 && graph.edgeClosed[e] === 1) {
      mover.status = 'blocked';
      mover.speedMps = 0;
      mover.congested = false;
      break;
    }
    const factor = trafficFactor ? trafficFactor(graph.edge(e).roadClass, simTime, e) : 1;
    const speed = Math.max(0.1, graph.edgeSpeed[e] * factor * mover.speedFactor);
    mover.status = 'moving';
    mover.speedMps = speed;
    mover.congested = factor < CONGESTED_FACTOR;
    const metresLeftOnEdge = graph.edgeLength[e] - route.edgeProgress;
    const timeToEdgeEnd = metresLeftOnEdge / speed;

    if (timeToEdgeEnd > timeLeft) {
      route.edgeProgress += speed * timeLeft;
      mover.stats.distanceM += speed * timeLeft;
      timeLeft = 0;
    } else {
      mover.stats.distanceM += metresLeftOnEdge;
      timeLeft -= timeToEdgeEnd;
      route.edgeIndex++;
      route.edgeProgress = 0;
    }
  }

  updateMoverPosition(mover, graph);
  mover.stats.elapsedSec += dt;

  if (route.edgeIndex >= route.edges.length) {
    mover.arrived = true;
    mover.status = 'arrived';
    mover.node = mover.targetNode;
    return true;
  }
  return false;
}

/** Recompute mover.x/y (and heading) by interpolating along its current edge. */
function updateMoverPosition(mover, graph) {
  const route = mover.route;
  if (!route) return;
  if (route.edgeIndex >= route.edges.length) {
    const last = route.nodes[route.nodes.length - 1];
    mover.x = graph.nodeX[last];
    mover.y = graph.nodeY[last];
    mover.speedMps = 0;
    return;
  }
  const e = route.edges[route.edgeIndex];
  const from = graph.edgeFrom[e];
  const to = graph.edgeTo[e];
  const t = graph.edgeLength[e] === 0 ? 0 : route.edgeProgress / graph.edgeLength[e];
  mover.x = graph.nodeX[from] + (graph.nodeX[to] - graph.nodeX[from]) * t;
  mover.y = graph.nodeY[from] + (graph.nodeY[to] - graph.nodeY[from]) * t;
  mover.node = from;
  mover.heading = Math.atan2(graph.nodeY[to] - graph.nodeY[from], graph.nodeX[to] - graph.nodeX[from]);
}

/**
 * Remaining distance and estimated time for a mover's current route, taking
 * live traffic into account. Used by the rider HUD for a live ETA.
 * @returns {{ distanceM: number, etaSec: number, edgesLeft: number }}
 */
export function remainingRoute(mover, graph, trafficFactor, simTime) {
  const route = mover.route;
  if (!route || mover.arrived) return { distanceM: 0, etaSec: 0, edgesLeft: 0 };

  let distanceM = 0;
  let etaSec = 0;
  for (let i = route.edgeIndex; i < route.edges.length; i++) {
    const e = route.edges[i];
    const metres = graph.edgeLength[e] - (i === route.edgeIndex ? route.edgeProgress : 0);
    if (metres <= 0) continue;
    const factor = trafficFactor ? trafficFactor(graph.edge(e).roadClass, simTime, e) : 1;
    const speed = Math.max(0.1, graph.edgeSpeed[e] * factor * mover.speedFactor);
    distanceM += metres;
    etaSec += metres / speed;
  }
  return { distanceM, etaSec, edgesLeft: route.edges.length - route.edgeIndex };
}

/** Street name of the edge a mover is currently travelling along, if known. */
export function currentStreet(mover, graph) {
  const route = mover.route;
  if (!route || route.edgeIndex >= route.edges.length) return null;
  const e = route.edges[route.edgeIndex];
  return graph.edge(e).name ?? graph.edgeName?.[e] ?? null;
}
