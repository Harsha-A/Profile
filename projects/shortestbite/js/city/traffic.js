import { clamp } from '../core/geometry.js';

/** How much each road class's speed suffers at the peak of rush hour. */
export const CLASS_SENSITIVITY = { highway: 0.3, arterial: 0.6, local: 0.2, bridge: 0.65 };

/** Per-edge noise multiplies the daily factor by a stable value in [NOISE_MIN, NOISE_MIN + NOISE_SPAN). */
export const NOISE_MIN = 0.85;
export const NOISE_SPAN = 0.3;

/** Rush-hour centres, in seconds since midnight, and their spread. */
export const RUSH_HOURS = [
  { center: 9 * 3600, sd: 1.25 * 3600 },
  { center: 18 * 3600, sd: 1.25 * 3600 },
];

function gaussian(t, center, sd) {
  const z = (t - center) / sd;
  return Math.exp(-0.5 * z * z);
}

/** Combined rush-hour intensity in [0, 1] at simulated time `t`. */
export function peakIntensity(t) {
  const daySeconds = 24 * 3600;
  const wrapped = ((t % daySeconds) + daySeconds) % daySeconds;
  let intensity = 0;
  for (const { center, sd } of RUSH_HOURS) intensity = Math.max(intensity, gaussian(wrapped, center, sd));
  return intensity;
}

/**
 * Owns per-edge traffic noise and road closures ("incidents"). Exposes a
 * `factor(roadClass, simTime, edgeId)` function with the exact signature
 * the algorithms' edge-cost function expects, always returning a value in
 * (0, 1] so the A* heuristic stays admissible.
 */
export class Traffic {
  /**
   * @param {import('../core/graph.js').Graph} graph
   * @param {import('../core/rng.js').Rng} rng a forked RNG dedicated to traffic.
   * @param {{ peakMultiplier?: number }} [config]
   */
  constructor(graph, rng, config = {}) {
    this.graph = graph;
    this.peakMultiplier = config.peakMultiplier ?? 3;
    /** UI-toggleable "traffic on/off" switch; when false, factor() is always 1. */
    this.enabled = true;
    this._noise = new Float64Array(graph.edgeCount);
    for (let e = 0; e < graph.edgeCount; e++) {
      // Stable per-edge multiplicative noise in [0.85, 1.15).
      this._noise[e] = NOISE_MIN + rng.float() * NOISE_SPAN;
    }
    /** @type {Map<number, number>} edgeId -> simTime the incident ends */
    this._incidents = new Map();
  }

  /**
   * @param {string} roadClass
   * @param {number} simTime
   * @param {number} edgeId
   * @returns {number} factor in (0, 1]
   */
  factor(roadClass, simTime, edgeId) {
    if (!this.enabled) return 1;
    const sensitivity = CLASS_SENSITIVITY[roadClass] ?? CLASS_SENSITIVITY.local;
    const intensity = peakIntensity(simTime) * Math.min(1, this.peakMultiplier / 3);
    const daily = 1 - sensitivity * intensity;
    const noisy = daily * this._noise[edgeId];
    return clamp(noisy, 0.1, 1);
  }

  /** Bind `factor` for direct use as the algorithms' `trafficFactor` callback. */
  asCostFn() {
    return (roadClass, simTime, edgeId) => this.factor(roadClass, simTime, edgeId);
  }

  /**
   * Close a road for `durationSec` simulated seconds (an "incident"). If
   * already closed, extends the closure.
   * @param {number} edgeId
   * @param {number} simTime current simulated time
   * @param {number} durationSec
   */
  closeEdge(edgeId, simTime, durationSec) {
    const edges = this._edgeAndTwin(edgeId);
    const until = simTime + durationSec;
    let reopensAt = until;
    for (const id of edges) {
      const existing = this._incidents.get(id);
      if (existing) reopensAt = Math.max(reopensAt, existing);
    }
    for (const id of edges) {
      this.graph.setClosed(id, true);
      this._incidents.set(id, reopensAt);
    }
  }

  /** Reopen a road immediately, cancelling any pending incident. */
  openEdge(edgeId) {
    for (const id of this._edgeAndTwin(edgeId)) {
      this.graph.setClosed(id, false);
      this._incidents.delete(id);
    }
  }

  /**
   * Closed physical roads, de-duplicating opposite directed edge pairs.
   * @returns {{ edgeId: number, twinId: number, reopensAt: number }[]}
   */
  closedRoads() {
    const roads = [];
    const seen = new Set();
    for (const [edgeId, reopensAt] of this._incidents) {
      if (seen.has(edgeId)) continue;
      const twinId = this.graph.reverseEdge(edgeId);
      if (twinId !== -1 && this._incidents.has(twinId)) {
        seen.add(edgeId);
        seen.add(twinId);
        const representative = Math.min(edgeId, twinId);
        roads.push({ edgeId: representative, twinId: edgeId === representative ? twinId : edgeId, reopensAt });
      } else {
        seen.add(edgeId);
        roads.push({ edgeId, twinId: -1, reopensAt });
      }
    }
    return roads;
  }

  /**
   * Reopen any incidents whose duration has elapsed.
   * @param {number} simTime
   * @returns {number[]} edge ids reopened this tick
   */
  tick(simTime) {
    const reopened = [];
    const due = [];
    for (const [edgeId, until] of this._incidents) {
      if (simTime >= until) due.push(edgeId);
    }
    for (const edgeId of due) {
      const until = this._incidents.get(edgeId);
      if (until == null || simTime < until) continue;
      for (const id of this._edgeAndTwin(edgeId)) {
        if (!this._incidents.has(id)) continue;
        this.graph.setClosed(id, false);
        this._incidents.delete(id);
        reopened.push(id);
      }
    }
    return reopened;
  }

  _edgeAndTwin(edgeId) {
    const twin = this.graph.reverseEdge(edgeId);
    return twin === -1 ? [edgeId] : [edgeId, twin];
  }
}
