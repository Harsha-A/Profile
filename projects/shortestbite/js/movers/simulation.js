import { EventBus } from '../core/event-bus.js';
import { SimClock } from '../core/clock.js';
import { Rng } from '../core/rng.js';
import { Traffic } from '../city/traffic.js';
import { createMover, stepMover } from './mover.js';
import { planRoute, maybeReroute } from './routing.js';
import { buildNodeIndex } from '../core/spatial-index.js';

/**
 * Owns all simulation state: the graph, movers and traffic. The UI reads
 * state through getters and receives events; it never mutates state
 * directly — it issues commands like `sim.spawnMover(...)` and
 * `sim.closeRoad(edgeId)`.
 */
/** How long a road closure lasts before it reopens by itself, in sim seconds. */
export const DEFAULT_CLOSURE_SEC = 300;

export class Simulation {
  /**
   * @param {{ graph: import('../core/graph.js').Graph, seed?: number, config?: object }} opts
   */
  constructor({ graph, seed = 42, config = {} }) {
    this.graph = graph;
    this.bus = new EventBus();
    this.clock = new SimClock(config.sim);
    this.rng = new Rng(seed);
    this.traffic = new Traffic(graph, this.rng.fork('traffic'), config.traffic);
    this.nodeIndex = buildNodeIndex(graph);
    /** @type {Map<number, *>} */
    this.movers = new Map();
    this.config = config;
  }

  /** Advance the simulation by a real animation-frame delta (milliseconds). */
  frame(realDeltaMs) {
    return this.clock.frame(realDeltaMs, (dt) => this.tick(dt));
  }

  /** One fixed simulated step, in a deterministic order (see PLAN.md section 9). */
  tick(dt) {
    const simTime = this.clock.time;

    const reopened = this.traffic.tick(simTime);
    for (const edgeId of reopened) this.bus.emit('road:opened', { edgeId });

    for (const mover of this.movers.values()) {
      if (mover.arrived) continue;
      const arrived = this._stepAndReroute(mover, dt, simTime);
      if (arrived) this.bus.emit('mover:arrived', { mover });
    }

    this.bus.emit('sim:tick', { time: simTime });
  }

  _stepAndReroute(mover, dt, simTime) {
    const traffic = this.traffic.asCostFn();
    const rerouteResult = maybeReroute(mover, this.graph, simTime, {
      trafficFactor: traffic,
      minGain: this.config.movers?.rerouteMinGain ?? 0.05,
      minGainSec: this.config.movers?.rerouteMinGainSec ?? 30,
      intervalSec: this.config.movers?.rerouteIntervalSec ?? 10,
    });
    if (rerouteResult.check) this.bus.emit('mover:rerouteCheck', rerouteResult.check);
    if (rerouteResult.blocked && !mover._blockedEmitted) {
      mover._blockedEmitted = true;
      this.bus.emit('mover:blocked', { mover });
    }
    if (rerouteResult.unblocked) {
      mover._blockedEmitted = false;
      this.bus.emit('mover:unblocked', { mover });
    }
    const { rerouted, oldCost, newCost, reason } = rerouteResult.rerouted
      ? rerouteResult
      : { rerouted: false };
    if (rerouted) {
      this.bus.emit('mover:rerouted', { mover, oldCost, newCost, reason });
    }
    if (mover.status === 'blocked') {
      mover.speedMps = 0;
      mover.stats.elapsedSec += dt;
      return false;
    }
    return stepMover(mover, this.graph, dt, traffic, simTime);
  }

  /**
   * Snap a world point to its nearest graph node.
   * @returns {number} node id
   */
  nearestNode(x, y) {
    const hit = this.nodeIndex.nearest(x, y);
    return hit ? hit.id : 0;
  }

  /**
   * Spawn a mover travelling from `startNode` to `targetNode` using the
   * named algorithm's route.
   * @returns {*} the mover, or null if no route exists
   */
  spawnMover(startNode, targetNode, { algorithm = 'dijkstra', speedFactor = 1, color = null } = {}) {
    const mover = createMover(startNode, this.graph, { algorithm, speedFactor, color });
    const ok = planRoute(mover, this.graph, targetNode, {
      simTime: this.clock.time,
      trafficFactor: this.traffic.asCostFn(),
    });
    if (!ok) return null;
    this.movers.set(mover.id, mover);
    this.bus.emit('mover:spawned', { mover, route: mover.route });
    return mover;
  }

  removeMover(moverId) {
    this.movers.delete(moverId);
  }

  clearMovers() {
    this.movers.clear();
  }

  /**
   * Close a road for `durationSec` simulated seconds (a traffic incident).
   */
  closeRoad(edgeId, durationSec = DEFAULT_CLOSURE_SEC) {
    this.traffic.closeEdge(edgeId, this.clock.time, durationSec);
    this.bus.emit('road:closed', { edgeId });
  }

  openRoad(edgeId) {
    this.traffic.openEdge(edgeId);
    this.bus.emit('road:opened', { edgeId });
  }
}
