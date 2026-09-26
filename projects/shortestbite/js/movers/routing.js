import { bfs } from '../algorithms/bfs.js';
import { dijkstra } from '../algorithms/dijkstra.js';
import { astar } from '../algorithms/astar.js';
import { bidirectionalDijkstra } from '../algorithms/bidirectional.js';
import { setRoute } from './mover.js';

/** How much the "Fast but sloppy" A* inflates its straight-line estimate. */
export const OVERESTIMATE_FACTOR = 2;

/** @type {Record<string, Function>} */
const ALGORITHMS = {
  bfs: (graph, s, t) => bfs(graph, s, t),
  dijkstra: (graph, s, t, opts) => dijkstra(graph, s, t, opts),
  astar: (graph, s, t, opts) => astar(graph, s, t, opts),
  'astar-overestimate': (graph, s, t, opts) => astar(graph, s, t, { ...opts, overestimateFactor: OVERESTIMATE_FACTOR }),
  bidirectional: (graph, s, t, opts) => bidirectionalDijkstra(graph, s, t, opts),
};

export const ALGORITHM_NAMES = Object.keys(ALGORITHMS);

/**
 * Run the named algorithm's fast (non-visualised) version.
 * @param {string} name one of {@link ALGORITHM_NAMES}
 * @param {import('../core/graph.js').Graph} graph
 * @param {number} source
 * @param {number} target
 * @param {{ simTime?: number, trafficFactor?: Function }} [opts]
 */
export function runAlgorithm(name, graph, source, target, opts = {}) {
  const fn = ALGORITHMS[name] ?? ALGORITHMS.dijkstra;
  return fn(graph, source, target, opts);
}

/**
 * Plan a mover's route with the named algorithm and assign it.
 * @returns {boolean} true if a route was found and assigned
 */
export function planRoute(mover, graph, targetNode, opts = {}) {
  const result = runAlgorithm(mover.algorithm, graph, mover.node, targetNode, opts);
  if (!result.path) return false;
  setRoute(mover, result.path);
  return true;
}

/**
 * Re-route a mover if its remaining path is broken (crosses a closed edge)
 * or a meaningfully faster path now exists. A mover always finishes the
 * edge it is currently on before re-planning from that edge's end node.
 *
 * @param {*} mover
 * @param {import('../core/graph.js').Graph} graph
 * @param {number} simTime
 * @param {{ trafficFactor?: Function, minGain?: number, minGainSec?: number, intervalSec?: number }} [opts]
 * @returns {{ rerouted: boolean, oldCost?: number, newCost?: number, reason?: 'closure'|'traffic', check?: object, blocked?: boolean, unblocked?: boolean }}
 */
export function maybeReroute(mover, graph, simTime, opts = {}) {
  if (!mover.route || mover.arrived) return { rerouted: false };
  const { trafficFactor, minGain = 0.05, minGainSec = 30, intervalSec = 10 } = opts;
  const route = mover.route;
  const target = mover.targetNode;

  // A mover always finishes the edge it's already partway across; only
  // replan from the far end if it has actually committed to that edge.
  // If it hasn't started that edge yet, replan from its current node —
  // otherwise a just-closed "next" edge would be assumed already crossed.
  const currentEdge = route.edges[route.edgeIndex];
  if (currentEdge == null) return { rerouted: false };
  const replanFrom = route.edgeProgress > 0 ? graph.edgeTo[currentEdge] : mover.node;
  const remainingStart = route.edgeIndex + (route.edgeProgress > 0 ? 1 : 0);
  const blocked = route.edges.slice(remainingStart).some((e) => graph.edgeClosed[e] === 1);
  const wasBlocked = mover.status === 'blocked';

  if (!blocked && wasBlocked) {
    mover.status = 'moving';
    mover.speedMps = 0;
    mover._nextTrafficRerouteAt = simTime + intervalSec;
    return { rerouted: false, unblocked: true };
  }

  const isBfs = mover.algorithm === 'bfs';
  const trafficDue = !isBfs && (mover._nextTrafficRerouteAt == null || simTime >= mover._nextTrafficRerouteAt);
  if (!blocked && !trafficDue) return { rerouted: false };

  const reason = blocked ? 'closure' : 'traffic';
  const remainingCost = costOfRemaining(graph, route, simTime, trafficFactor, remainingStart);
  const candidate = runAlgorithm(mover.algorithm, graph, replanFrom, target, { simTime, trafficFactor });
  const bestAltSec = candidate.path ? candidate.cost : Infinity;
  const gainSec = Number.isFinite(remainingCost) && Number.isFinite(bestAltSec) ? remainingCost - bestAltSec : 0;
  const thresholdSec = rerouteThresholdSec(remainingCost, { minGain, minGainSec });

  if (!blocked) mover._nextTrafficRerouteAt = simTime + intervalSec;

  if (!candidate.path) {
    if (blocked) {
      mover.status = 'blocked';
      mover.speedMps = 0;
      return {
        rerouted: false,
        blocked: true,
        check: { mover, simTime, remainingSec: remainingCost, bestAltSec, gainSec, thresholdSec, blocked, decision: 'blocked' },
      };
    }
    return { rerouted: false };
  }

  const worthIt = blocked || gainSec >= thresholdSec;
  if (!worthIt) {
    return {
      rerouted: false,
      check: { mover, simTime, remainingSec: remainingCost, bestAltSec, gainSec, thresholdSec, blocked, decision: 'keep' },
    };
  }

  // Splice: keep everything already travelled, replace the rest with the new plan.
  const keepThroughEdge = route.edgeProgress > 0 ? 1 : 0;
  const traveledNodes = route.nodes.slice(0, route.edgeIndex + 1 + keepThroughEdge);
  const traveledEdges = route.edges.slice(0, route.edgeIndex + keepThroughEdge);
  const newRoute = {
    nodes: [...traveledNodes, ...candidate.path.nodes.slice(1)],
    edges: [...traveledEdges, ...candidate.path.edges],
  };
  const progress = route.edgeProgress;
  const idx = route.edgeIndex;
  setRoute(mover, newRoute);
  mover.route.edgeIndex = idx;
  mover.route.edgeProgress = progress;
  mover.stats.reroutes++;

  return {
    rerouted: true,
    oldCost: remainingCost,
    newCost: candidate.cost,
    reason,
    unblocked: wasBlocked,
    check: { mover, simTime, remainingSec: remainingCost, bestAltSec, gainSec, thresholdSec, blocked, decision: 'reroute' },
  };
}

/**
 * The saving a new route must offer before a moving rider switches to it:
 * max(minGainSec, remainingSec × minGain). Pure; shared with the Knowledge calculator.
 * @param {number} remainingSec cost of the rest of the current route
 * @param {{ minGain?: number, minGainSec?: number }} [opts]
 */
export function rerouteThresholdSec(remainingSec, { minGain = 0.05, minGainSec = 30 } = {}) {
  return Math.max(minGainSec, (Number.isFinite(remainingSec) ? remainingSec : 0) * minGain);
}

/**
 * The decision a reroute check reaches, as a pure function of its inputs
 * (mirrors maybeReroute).
 * @returns {'reroute'|'keep'|'blocked'}
 */
export function rerouteDecision({ remainingSec, bestAltSec, blocked = false, minGain = 0.05, minGainSec = 30 }) {
  if (!Number.isFinite(bestAltSec)) return blocked ? 'blocked' : 'keep';
  if (blocked) return 'reroute';
  const gainSec = Number.isFinite(remainingSec) ? remainingSec - bestAltSec : 0;
  return gainSec >= rerouteThresholdSec(remainingSec, { minGain, minGainSec }) ? 'reroute' : 'keep';
}

function costOfRemaining(graph, route, simTime, trafficFactor, startIndex = route.edgeIndex) {
  let total = 0;
  for (let i = startIndex; i < route.edges.length; i++) {
    const e = route.edges[i];
    if (graph.edgeClosed[e]) return Infinity;
    const factor = trafficFactor ? trafficFactor(graph.edge(e).roadClass, simTime, e) : 1;
    total += graph.edgeLength[e] / (graph.edgeSpeed[e] * factor);
  }
  return total;
}
