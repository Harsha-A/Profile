import { runAlgorithm } from '../movers/routing.js';
import { FACTS } from './facts.js';

const DEFAULT_SEED = FACTS.city.seed;
const SPEED_1 = FACTS.clockSpeeds[0];
const SPEED_5 = FACTS.clockSpeeds[1];
const SPEED_20 = FACTS.raceSpeed;

/** @typedef {'procedural'|'koramangala'} ScenarioCity */

/**
 * @typedef {object} Scenario
 * @property {string} id
 * @property {string} label
 * @property {string} description
 * @property {ScenarioCity} city
 * @property {number} [seed]
 * @property {[number, number]} from
 * @property {[number, number]} to
 * @property {string} algorithm
 * @property {string} [race]
 * @property {1|5|20|60} speed
 * @property {string} [clock]
 * @property {boolean} [traffic]
 * @property {'run'|'step'} mode
 * @property {number} [stepCount]
 * @property {Array<{ atSimSec: number, do: 'closeAhead', segmentsAhead: number } | { atSimSec: number, do: 'isolateDropoff' }>} [actions]
 * @property {string} narration
 */

/** @type {Scenario[]} */
export const SCENARIOS = [
  {
    id: 'first-delivery',
    label: 'Watch a first delivery',
    description: 'A long pickup-to-drop-off trip on the generated city.',
    city: 'procedural',
    seed: DEFAULT_SEED,
    from: [0.15, 0.2],
    to: [0.85, 0.8],
    algorithm: 'astar',
    speed: SPEED_5,
    mode: 'run',
    narration: '<strong>Watch the blue search</strong> pick a route, then follow the rider across town.',
  },
  {
    id: 'step-inspector',
    label: 'Step through A*',
    description: 'Step through the first few A* decisions one intersection at a time.',
    city: 'procedural',
    seed: DEFAULT_SEED,
    from: [0.18, 0.25],
    to: [0.78, 0.72],
    algorithm: 'astar',
    speed: SPEED_1,
    mode: 'step',
    stepCount: 12,
    narration: '<strong>Step mode pauses the search.</strong> Each press settles one more intersection so the inspector can explain it.',
  },
  {
    id: 'race-dijkstra-astar',
    label: 'Race Dijkstra vs A*',
    description: 'Compare the guaranteed route with the guided search.',
    city: 'procedural',
    seed: DEFAULT_SEED,
    from: [0.1, 0.75],
    to: [0.86, 0.22],
    algorithm: 'dijkstra',
    race: 'astar',
    speed: SPEED_20,
    mode: 'run',
    narration: '<strong>Both routes should be fastest.</strong> Watch how many fewer intersections A* checks before the race begins.',
  },
  {
    id: 'race-bfs-dijkstra',
    label: 'Race fewest turns vs fastest',
    description: 'See why fewer intersections does not always mean less travel time.',
    city: 'procedural',
    seed: DEFAULT_SEED,
    from: [0.12, 0.3],
    to: [0.88, 0.68],
    algorithm: 'bfs',
    race: 'dijkstra',
    speed: SPEED_20,
    mode: 'run',
    narration: '<strong>Fewest turns ignores traffic and speed.</strong> Compare its route time with Dijkstra’s fastest route.',
  },
  {
    id: 'race-sloppy',
    label: 'Race sloppy A* vs normal A*',
    description: 'Watch a greedy heuristic trade search effort for route quality.',
    city: 'procedural',
    seed: DEFAULT_SEED,
    from: [0.18, 0.82],
    to: [0.82, 0.18],
    algorithm: 'astar-overestimate',
    race: 'astar',
    speed: SPEED_20,
    mode: 'run',
    narration: '<strong>Fast but sloppy trusts its compass too much.</strong> It may search less and still arrive later.',
  },
  {
    id: 'bidirectional',
    label: 'Search from both ends',
    description: 'Run bidirectional Dijkstra on a cross-city trip.',
    city: 'procedural',
    seed: DEFAULT_SEED,
    from: [0.2, 0.15],
    to: [0.82, 0.86],
    algorithm: 'bidirectional',
    speed: SPEED_5,
    mode: 'run',
    narration: '<strong>Two searches meet in the middle.</strong> This algorithm runs to completion, then shows the final route.',
  },
  {
    id: 'rush-hour-checks',
    label: 'Try rush hour traffic',
    description: 'Start at 08:30 and watch traffic-aware routing on a long trip.',
    city: 'procedural',
    seed: DEFAULT_SEED,
    from: [0.08, 0.18],
    to: [0.9, 0.82],
    algorithm: 'dijkstra',
    speed: SPEED_20,
    clock: '08:30',
    traffic: true,
    mode: 'run',
    narration: '<strong>Rush hour changes road costs.</strong> Dijkstra plans against the live traffic model, not just distance.',
  },
  {
    id: 'closure-reroute',
    label: 'Watch a closure reroute',
    description: 'Close a road ahead mid-trip so the rider replans around it.',
    city: 'procedural',
    seed: DEFAULT_SEED,
    from: [0.15, 0.2],
    to: [0.85, 0.8],
    algorithm: 'dijkstra',
    speed: SPEED_5,
    mode: 'run',
    actions: [{ atSimSec: 15, do: 'closeAhead', segmentsAhead: 3 }],
    narration: '<strong>A road will close ahead.</strong> When the rider detects the blocked route, the monitor shows the reroute.',
  },
  {
    id: 'closure-blocked',
    label: 'Block the drop-off',
    description: 'Isolate the destination so the rider stops with a blocked route.',
    city: 'procedural',
    seed: DEFAULT_SEED,
    from: [0.16, 0.22],
    to: [0.82, 0.76],
    algorithm: 'dijkstra',
    speed: SPEED_5,
    mode: 'run',
    actions: [{ atSimSec: 10, do: 'isolateDropoff' }],
    narration: '<strong>The drop-off will be isolated.</strong> With no road into the destination, the rider stops with ⛔.',
  },
  {
    id: 'koramangala-tour',
    label: 'Tour Koramangala',
    description: 'Try the same route planning on the realistic Koramangala map.',
    city: 'koramangala',
    from: [0.18, 0.3],
    to: [0.82, 0.72],
    algorithm: 'astar',
    speed: SPEED_5,
    mode: 'run',
    narration: '<strong>This is the realistic map.</strong> A* still uses the graph underneath, now built from Koramangala streets.',
  },
];

const BY_ID = new Map(SCENARIOS.map((scenario) => [scenario.id, scenario]));

/** Look up a scenario by id. */
export function getScenario(id) {
  return BY_ID.get(id) ?? null;
}

/**
 * Convert a scenario's fractional start/end into reachable graph node ids.
 * @param {import('../core/graph.js').Graph} graph
 * @param {Scenario} scenario
 * @returns {{ from: number, to: number }}
 */
export function resolvePins(graph, scenario) {
  const fromCandidates = nearestNodes(graph, scenario.from);
  const toCandidates = nearestNodes(graph, scenario.to);
  const limits = [8, 16, 32, 64, Math.max(fromCandidates.length, toCandidates.length)];

  for (const limit of limits) {
    const fromLimit = Math.min(limit, fromCandidates.length);
    const toLimit = Math.min(limit, toCandidates.length);
    for (let i = 0; i < fromLimit; i++) {
      for (let j = 0; j < toLimit; j++) {
        const from = fromCandidates[i];
        const to = toCandidates[j];
        if (from === to) continue;
        if (runAlgorithm('dijkstra', graph, from, to).path) return { from, to };
      }
    }
  }

  throw new Error(`Could not resolve reachable pins for scenario "${scenario.id}".`);
}

/**
 * Run a knowledge demo through the app facade.
 * @param {Scenario|string} scenarioOrId
 * @param {object} api C7 app facade
 * @param {{ instant?: boolean }} [opts]
 * @returns {Promise<{ cancel(): void }>}
 */
export async function runScenario(scenarioOrId, api, opts = {}) {
  const scenario = typeof scenarioOrId === 'string' ? getScenario(scenarioOrId) : scenarioOrId;
  if (!scenario) throw new Error(`Unknown scenario "${scenarioOrId}".`);

  currentHandle?.cancel();
  const handle = makeHandle();
  currentHandle = handle;

  if (api.getCity() !== scenario.city) await api.setCity(scenario.city);
  if (scenario.city === 'procedural' && scenario.seed != null && api.getSeed?.() !== scenario.seed) {
    await api.setSeed(scenario.seed);
  }

  if (handle.cancelled) return handle;

  api.reset();
  api.setTraffic(scenario.traffic ?? true);
  if (scenario.clock) api.setClock(parseClock(scenario.clock));
  api.setAlgorithm(scenario.algorithm);
  api.setRace(scenario.race ?? null);
  api.setSpeed(scenario.speed);

  const pins = resolvePins(api.getGraph(), scenario);
  api.placePins(pins.from, pins.to);
  api.narrate(scenario.narration ?? scenario.description);
  handle.addCancel(scheduleActions(scenario, api, handle));

  if (scenario.mode === 'step') {
    const count = scenario.stepCount ?? 12;
    if (opts.instant) {
      for (let i = 0; i < count && !handle.cancelled; i++) api.step();
    } else {
      stepLater(api, count, handle);
    }
  } else {
    api.run();
  }

  return handle;
}

let currentHandle = null;

function makeHandle() {
  const cleanups = [];
  return {
    cancelled: false,
    addCancel(fn) {
      if (typeof fn === 'function') cleanups.push(fn);
    },
    cancel() {
      if (this.cancelled) return;
      this.cancelled = true;
      for (const cleanup of cleanups.splice(0)) cleanup();
      if (currentHandle === this) currentHandle = null;
    },
  };
}

function nearestNodes(graph, fraction) {
  const [minX, minY, maxX, maxY] = graphBounds(graph);
  const x = minX + (maxX - minX) * fraction[0];
  const y = minY + (maxY - minY) * fraction[1];
  return Array.from({ length: graph.nodeCount }, (_, id) => id)
    .sort((a, b) => squaredDistance(graph, a, x, y) - squaredDistance(graph, b, x, y));
}

function graphBounds(graph) {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (let i = 0; i < graph.nodeCount; i++) {
    minX = Math.min(minX, graph.nodeX[i]);
    minY = Math.min(minY, graph.nodeY[i]);
    maxX = Math.max(maxX, graph.nodeX[i]);
    maxY = Math.max(maxY, graph.nodeY[i]);
  }
  return [minX, minY, maxX, maxY];
}

function squaredDistance(graph, node, x, y) {
  return (graph.nodeX[node] - x) ** 2 + (graph.nodeY[node] - y) ** 2;
}

function parseClock(hhmm) {
  const [hours, minutes] = hhmm.split(':').map(Number);
  return ((hours * 60) + minutes) * 60;
}

function scheduleActions(scenario, api, handle) {
  if (!scenario.actions?.length || !api.onSimTick) return () => {};

  const start = api.simTime();
  const pending = scenario.actions.map((action) => ({
    ...action,
    done: false,
    firstAttempt: null,
  }));

  const unsubscribe = api.onSimTick((simTime) => {
    if (handle.cancelled) return;
    for (const action of pending) {
      if (action.done || simTime < start + action.atSimSec) continue;
      if (action.do === 'isolateDropoff') {
        api.isolateDropoff();
        action.done = true;
        continue;
      }

      action.firstAttempt ??= simTime;
      const edgeId = api.closeRoadAhead(action.segmentsAhead);
      if (edgeId != null) {
        action.done = true;
      } else if (simTime - action.firstAttempt >= 30) {
        api.toast('Could not find a road ahead to close');
        action.done = true;
      }
    }
  });

  return unsubscribe;
}

function stepLater(api, count, handle) {
  let remaining = count;

  const tick = () => {
    if (handle.cancelled || remaining <= 0) return;
    api.step();
    remaining--;
    if (remaining > 0) {
      const timeoutId = setTimeout(tick, 350);
      handle.addCancel(() => clearTimeout(timeoutId));
    }
  };

  tick();
}
