import { resolvePins } from './scenarios.js';
import { FACTS, ALGO } from './facts.js';

const START_CLOCK_SEC = parseClock(FACTS.startClock);
const RUSH_CLOCK_SEC = parseClock(FACTS.rushPeaks[0]);
const SPEED_READ = FACTS.clockSpeeds[0];
const SPEED_WATCH = FACTS.clockSpeeds.includes(20) ? 20 : FACTS.raceSpeed;
const SPEED_RACE = FACTS.raceSpeed;
const CLOSE_AHEAD_SEGMENTS = 2;

const PINS = Object.freeze({
  first: { from: [0.15, 0.2], to: [0.85, 0.8] },
  step: { from: [0.18, 0.25], to: [0.78, 0.72] },
  da: { from: [0.1, 0.75], to: [0.86, 0.22] },
  bd: { from: [0.12, 0.3], to: [0.88, 0.68] },
  sloppy: { from: [0.18, 0.82], to: [0.82, 0.18] },
  closure: { from: [0.15, 0.2], to: [0.85, 0.8] },
  rush: { from: [0.08, 0.18], to: [0.9, 0.82] },
  wall: { from: [0.16, 0.22], to: [0.82, 0.76] },
});

/** @type {Array<object>} */
export const MISSIONS = [
  {
    id: 'first-delivery',
    title: 'Your first delivery',
    xp: 100,
    badge: { id: 'first-route', emoji: '🍔', label: 'First route' },
    goal: 'See that ShortestBite searches the city graph first, then sends the rider along the planned route.',
    prediction: {
      question: `Before the rider moves, what will ${ALGO.astar.name} do?`,
      choices: [
        { id: 'search-first', label: 'Check intersections, choose a route, then ride' },
        { id: 'straight-line', label: 'Draw a straight line to the drop-off' },
        { id: 'no-plan', label: 'Start riding without planning' },
      ],
    },
    async setup(api) {
      await setupBase(api, { algorithm: 'astar', speed: SPEED_WATCH, traffic: true, clock: START_CLOCK_SEC });
    },
    steps: [
      pinStep('pickup', 'Click any street for the 🍔 pickup. The mission uses a safe generated city route if you choose “Do it for me”.', PINS.first),
      dropoffStep('dropoff', 'Click another street for the 🏁 drop-off. Try a far-away point so the search has something to solve.', PINS.first),
      algorithmStep('astar', `Choose <strong>${ALGO.astar.name}</strong>: it uses the drop-off like a compass but still keeps the fastest-route guarantee.`, 'astar'),
      runStep('run', 'Press <strong>Find route</strong>. We already set the clock to a fast watch speed so the full delivery finishes quickly.', { wait: 'arrived', speed: SPEED_WATCH }),
    ],
    judge(snap) {
      return snap.explored > 0 || snap.plannedSec != null || hasRider(snap) ? 'search-first' : 'no-plan';
    },
    outcome(snap) {
      return {
        headline: 'The rider followed a route the search planned first.',
        facts: basicFacts(snap),
        why: `${ALGO.astar.name} checks promising intersections before dispatch, so the blue search is the thinking and the rider is the delivery.`,
        kb: 'search-vs-ride',
      };
    },
  },
  {
    id: 'step-search',
    title: 'Step through the search',
    xp: 100,
    badge: { id: 'step-sleuth', emoji: '🔎', label: 'Step sleuth' },
    goal: 'Use Step mode to watch one small piece of the search happen at a time.',
    prediction: {
      question: 'What should change when you press Step?',
      choices: [
        { id: 'explored-grows', label: 'The checked-intersections count starts growing' },
        { id: 'rider-arrives', label: 'The rider instantly arrives' },
        { id: 'traffic-off', label: 'Traffic turns itself off' },
      ],
    },
    async setup(api) {
      await setupBase(api, { algorithm: 'astar', speed: SPEED_READ, traffic: true, clock: START_CLOCK_SEC });
    },
    steps: [
      pinStep('pickup', 'Click any street for the 🍔 pickup.', PINS.step),
      dropoffStep('dropoff', 'Click a drop-off so the search has a target to explain.', PINS.step),
      algorithmStep('astar', `Keep <strong>${ALGO.astar.name}</strong> selected so the search points toward the goal.`, 'astar'),
      stepButtonStep('step-once', 'Press <strong>Step</strong> and watch the checked-intersections number move instead of launching a full ride.'),
    ],
    judge(snap) {
      return snap.explored > 0 || snap.searching ? 'explored-grows' : 'rider-arrives';
    },
    outcome(snap) {
      return {
        headline: 'Step mode separates “thinking” from “riding”.',
        facts: basicFacts(snap),
        why: 'Each Step advances the route search, making the frontier and checked intersections easier to inspect before the rider is dispatched.',
        kb: 'node-inspector',
      };
    },
  },
  {
    id: 'race-dijkstra-astar',
    title: 'Guaranteed vs guided',
    xp: 125,
    badge: { id: 'compass-racer', emoji: '🧭', label: 'Compass racer' },
    goal: `Race ${ALGO.dijkstra.name} against ${ALGO.astar.name} and compare search effort with arrival time.`,
    prediction: {
      question: `What usually happens when ${ALGO.dijkstra.name} races ${ALGO.astar.name}?`,
      choices: [
        { id: 'astar-less-same', label: 'A* checks less while keeping the same fastest trip' },
        { id: 'dijkstra-faster', label: 'Dijkstra arrives sooner' },
        { id: 'astar-slower', label: 'A* takes a slower route' },
      ],
    },
    async setup(api) {
      await setupBase(api, { algorithm: 'dijkstra', race: 'astar', speed: SPEED_RACE, traffic: true, clock: START_CLOCK_SEC });
    },
    steps: raceSteps(PINS.da, 'dijkstra', 'astar'),
    judge(snap) {
      const pair = riderPair(snap);
      if (isFaster(pair.primary, pair.challenger)) return 'dijkstra-faster';
      if (isFaster(pair.challenger, pair.primary) && !sameTrip(pair.primary, pair.challenger)) return 'astar-slower';
      return challengerExplored(pair, snap) < primaryExplored(pair, snap) || sameTrip(pair.primary, pair.challenger) ? 'astar-less-same' : 'astar-slower';
    },
    outcome(snap) {
      const pair = riderPair(snap);
      return {
        headline: 'The compass helped the search stay focused.',
        facts: raceFacts(snap),
        why: `${ALGO.dijkstra.name} and ${ALGO.astar.name} both preserve the fastest-route guarantee, but A* uses straight-line distance to avoid checking as many roads in the wrong direction.`,
        kb: 'astar',
      };
    },
  },
  {
    id: 'race-bfs-dijkstra',
    title: 'Fewest turns is not fastest',
    xp: 125,
    badge: { id: 'fastest-finder', emoji: '⏱️', label: 'Fastest finder' },
    goal: `Race ${ALGO.bfs.name} against ${ALGO.dijkstra.name} to see why counting junctions is different from counting minutes.`,
    prediction: {
      question: 'Which rider should win when road speeds and traffic matter?',
      choices: [
        { id: 'dijkstra-faster', label: 'Dijkstra, because it optimises travel time' },
        { id: 'bfs-faster', label: 'BFS, because fewer turns always wins' },
        { id: 'tie', label: 'They arrive at the same time' },
      ],
    },
    async setup(api) {
      await setupBase(api, { algorithm: 'bfs', race: 'dijkstra', speed: SPEED_RACE, traffic: true, clock: RUSH_CLOCK_SEC });
    },
    steps: raceSteps(PINS.bd, 'bfs', 'dijkstra'),
    judge(snap) {
      const pair = riderPair(snap);
      if (sameTrip(pair.primary, pair.challenger)) return 'tie';
      return isFaster(pair.challenger, pair.primary) ? 'dijkstra-faster' : 'bfs-faster';
    },
    outcome(snap) {
      return {
        headline: 'Fastest means lowest travel time, not fewest intersections.',
        facts: raceFacts(snap),
        why: `${ALGO.bfs.name} ignores speeds and traffic, while ${ALGO.dijkstra.name} adds the cost of each road before choosing a route.`,
        kb: 'bfs',
      };
    },
  },
  {
    id: 'sloppy-astar',
    title: 'Fast but sloppy',
    xp: 125,
    badge: { id: 'sloppy-spotter', emoji: '⚡', label: 'Sloppy spotter' },
    goal: `Compare ${ALGO['astar-overestimate'].name} with normal ${ALGO.astar.name}.`,
    prediction: {
      question: `What is the trade-off when A* multiplies its compass by ${FACTS.overestimateFactor}?`,
      choices: [
        { id: 'sloppy-tradeoff', label: 'It may check less but accept a slower route' },
        { id: 'sloppy-best', label: 'It is always fastest and always optimal' },
        { id: 'normal-loses', label: 'Normal A* can no longer find a route' },
      ],
    },
    async setup(api) {
      await setupBase(api, { algorithm: 'astar-overestimate', race: 'astar', speed: SPEED_RACE, traffic: true, clock: START_CLOCK_SEC });
    },
    steps: raceSteps(PINS.sloppy, 'astar-overestimate', 'astar'),
    judge(snap) {
      const pair = riderPair(snap);
      if (pair.challenger?.blocked) return 'normal-loses';
      if (isFaster(pair.primary, pair.challenger) && primaryExplored(pair, snap) <= challengerExplored(pair, snap)) return 'sloppy-best';
      return 'sloppy-tradeoff';
    },
    outcome(snap) {
      return {
        headline: 'A stronger compass can save thinking but risk route quality.',
        facts: raceFacts(snap),
        why: `${ALGO['astar-overestimate'].name} uses ${FACTS.overestimateFactor}× the usual estimate, so it rushes toward the drop-off more aggressively than optimal A*.`,
        kb: 'astar-overestimate',
      };
    },
  },
  {
    id: 'closure-ahead',
    title: 'Closure ahead',
    xp: 150,
    badge: { id: 'reroute-rescuer', emoji: '🚧', label: 'Reroute rescuer' },
    goal: 'Close a road in front of the rider and watch the route change instead of pretending the road is open.',
    prediction: {
      question: `When a future road closes for ${FACTS.closureMin} sim-minutes, what should the rider do?`,
      choices: [
        { id: 'reroute', label: 'Reroute around the closure' },
        { id: 'blocked', label: 'Stop because every possible route is gone' },
        { id: 'ignore', label: 'Ignore the closure and drive through it' },
      ],
    },
    async setup(api) {
      await setupBase(api, { algorithm: 'dijkstra', speed: SPEED_WATCH, traffic: true, clock: START_CLOCK_SEC });
    },
    steps: [
      pinStep('pickup', 'Click any street for the 🍔 pickup.', PINS.closure),
      dropoffStep('dropoff', 'Click the 🏁 drop-off so the rider has a route to protect.', PINS.closure),
      runStep('run', 'Press <strong>Find route</strong> and let the rider start moving.', { wait: 'moving', speed: SPEED_WATCH }),
      closeAheadStep('close-ahead', 'Turn on the road-closure idea: close a road ahead of the rider and watch for a reroute decision.'),
    ],
    judge(snap) {
      const rider = primaryRider(snap);
      if (rider?.blocked || /blocked/i.test(snap.status ?? '')) return 'blocked';
      if ((rider?.reroutes ?? 0) > 0 || (snap.closures ?? 0) > 0) return 'reroute';
      return 'ignore';
    },
    outcome(snap) {
      return {
        headline: 'Closures force the live route to be checked again.',
        facts: rerouteFacts(snap),
        why: `Rerouting is not checked every tick: traffic checks wait about ${FACTS.rerouteIntervalSec} sim-seconds, while a closed future edge can force an immediate new plan.`,
        kb: 'reroute-triggers',
      };
    },
  },
  {
    id: 'rush-hour',
    title: 'Rush-hour costs',
    xp: 125,
    badge: { id: 'traffic-timer', emoji: '🚦', label: 'Traffic timer' },
    goal: 'Turn on rush-hour traffic and see that the fastest route is based on minutes, not map distance.',
    prediction: {
      question: `At ${FACTS.rushPeaks.join(' / ')}, what should traffic change?`,
      choices: [
        { id: 'costs-change', label: 'Some road costs change, so the best route or ETA can change' },
        { id: 'nothing', label: 'Traffic is only decorative' },
        { id: 'bfs-starts', label: 'The app switches to BFS automatically' },
      ],
    },
    async setup(api) {
      await setupBase(api, { algorithm: 'dijkstra', speed: SPEED_WATCH, traffic: false, clock: RUSH_CLOCK_SEC });
    },
    steps: [
      pinStep('pickup', 'Click any street for the 🍔 pickup.', PINS.rush),
      dropoffStep('dropoff', 'Click a far drop-off so rush-hour costs have room to matter.', PINS.rush),
      trafficStep('traffic-on', 'Switch on <strong>Simulate traffic</strong>. The clock is already at a rush-hour peak for this mission.'),
      runStep('run', `Run ${ALGO.dijkstra.name}; it plans with road speeds and the live traffic factor, then watch the rider finish the delivery.`, { wait: 'arrived', speed: SPEED_WATCH }),
    ],
    judge(snap) {
      if (snap.algorithm === 'bfs') return 'bfs-starts';
      return snap.traffic && (snap.plannedSec != null || hasRider(snap)) ? 'costs-change' : 'nothing';
    },
    outcome(snap) {
      return {
        headline: 'Rush-hour traffic changes the cost of roads.',
        facts: basicFacts(snap),
        why: `The traffic model has peaks around ${FACTS.rushPeaks.join(' / ')} and can slow sensitive roads down to ${Math.round(FACTS.minTrafficFactor * 100)}% of free-flow speed.`,
        kb: 'traffic-model',
      };
    },
  },
  {
    id: 'walled-off',
    title: 'When no route exists',
    xp: 150,
    badge: { id: 'blocked-detective', emoji: '⛔', label: 'Blocked detective' },
    goal: 'Wall off the drop-off and learn how the app reports a genuinely unreachable destination.',
    prediction: {
      question: 'If every road into the drop-off is closed, what should happen?',
      choices: [
        { id: 'blocked', label: 'The rider becomes blocked because no path exists' },
        { id: 'reroute', label: 'The rider always finds a detour' },
        { id: 'arrives', label: 'The rider arrives by ignoring closures' },
      ],
    },
    async setup(api) {
      await setupBase(api, { algorithm: 'dijkstra', speed: SPEED_WATCH, traffic: true, clock: START_CLOCK_SEC });
    },
    steps: [
      pinStep('pickup', 'Click any street for the 🍔 pickup.', PINS.wall),
      dropoffStep('dropoff', 'Click the drop-off that will be isolated.', PINS.wall),
      runStep('run', 'Press <strong>Find route</strong> so there is a route before the wall appears.', { wait: 'moving', speed: SPEED_WATCH }),
      isolateStep('isolate', 'Close every incoming road to the drop-off. If no legal path remains, the status should say blocked.'),
    ],
    judge(snap) {
      const rider = primaryRider(snap);
      if (rider?.arrived) return 'arrives';
      if (rider?.blocked || /blocked|no route/i.test(snap.status ?? '')) return 'blocked';
      return 'reroute';
    },
    outcome(snap) {
      return {
        headline: 'A blocked destination is different from a slow detour.',
        facts: rerouteFacts(snap),
        why: 'When the graph has no open path into the drop-off, the honest answer is blocked; the rider should not drive through closed roads.',
        kb: 'closures',
      };
    },
  },
];

async function setupBase(api, { algorithm, race = null, speed, traffic, clock }) {
  if (api.getCity?.() !== 'procedural') await api.setCity('procedural');
  if (api.getSeed?.() !== FACTS.city.seed) await api.setSeed(FACTS.city.seed);
  api.reset();
  api.setTraffic(traffic);
  api.setClock(clock);
  api.setAlgorithm(algorithm);
  api.setRace(race);
  api.setSpeed(speed);
}

function raceSteps(pins, primaryAlgo, challengerAlgo) {
  return [
    pinStep('pickup', 'Click any street for the 🍔 pickup.', pins),
    dropoffStep('dropoff', 'Click a drop-off so both algorithms solve the exact same trip.', pins),
    algorithmStep(primaryAlgo, `Choose <strong>${ALGO[primaryAlgo].name}</strong> as the main rider.`, primaryAlgo),
    raceToggleStep(challengerAlgo, `Turn on <strong>Race two algorithms</strong> and pick <strong>${ALGO[challengerAlgo].name}</strong> as the challenger.`, challengerAlgo),
    runStep('race', 'Press <strong>Find route</strong>; the mission uses race speed so both riders finish quickly.', { wait: 'both-arrived', speed: SPEED_RACE }),
  ];
}

function pinStep(id, text, pins) {
  return {
    id,
    text,
    target: '#map-container',
    done: (snap) => snap.pins?.start != null,
    auto(api) { placeMissionPins(api, pins); },
  };
}

function dropoffStep(id, text, pins) {
  return {
    id,
    text,
    target: '#map-container',
    done: (snap) => snap.pins?.end != null,
    auto(api) { placeMissionPins(api, pins); },
  };
}

function algorithmStep(id, text, algorithm) {
  return {
    id: `choose-${id}`,
    text,
    target: `.algo-card[data-algo="${algorithm}"]`,
    done: (snap) => snap.algorithm === algorithm,
    auto(api) { api.setAlgorithm(algorithm); },
  };
}

function raceToggleStep(id, text, challenger) {
  return {
    id: `race-${id}`,
    text,
    target: '#compare-toggle',
    done: (snap) => snap.race?.on === true && snap.race?.challenger === challenger,
    auto(api) { api.setRace(challenger); },
  };
}

function runStep(id, text, { wait, speed }) {
  return {
    id,
    text,
    target: '#run-btn',
    done(snap) {
      if (wait === 'planned') return snap.plannedSec != null && !snap.searching;
      if (wait === 'moving') return snap.searching || riders(snap).some((r) => r.onRoute || (!r.arrived && !r.blocked));
      if (wait === 'both-arrived') return riders(snap).length >= 2 && riders(snap).every((r) => r.arrived || r.blocked);
      return riders(snap).some((r) => r.arrived || r.blocked) || /arrived|blocked/i.test(snap.status ?? '');
    },
    auto(api) {
      api.setSpeed(speed);
      api.run();
    },
  };
}

function stepButtonStep(id, text) {
  return {
    id,
    text,
    target: '#step-btn',
    done: (snap, ctx) => {
      ctx.startExplored ??= snap.explored ?? 0;
      return (snap.explored ?? 0) > ctx.startExplored || snap.searching === true || snap.plannedSec != null;
    },
    auto(api) { api.step(); },
  };
}

function closeAheadStep(id, text) {
  return {
    id,
    text,
    target: '#close-road-toggle',
    done: (snap, ctx) => {
      ctx.beforeClosures ??= snap.closures ?? 0;
      const rider = primaryRider(snap);
      return (snap.closures ?? 0) > ctx.beforeClosures || (rider?.reroutes ?? 0) > 0 || rider?.blocked === true;
    },
    async auto(api) {
      api.setSpeed(SPEED_WATCH);
      // Restarting would throw away the moving rider; only run if nothing is driving yet.
      if (!api.primaryRoute?.()) api.run();
      const deadline = Date.now() + 20000;
      while (!api.primaryRoute?.() && Date.now() < deadline) {
        await new Promise((resolve) => setTimeout(resolve, 150));
      }
      api.closeRoadAhead(CLOSE_AHEAD_SEGMENTS);
    },
  };
}

function trafficStep(id, text) {
  return {
    id,
    text,
    target: '#traffic-toggle',
    done: (snap) => snap.traffic === true,
    auto(api) { api.setTraffic(true); },
  };
}

function isolateStep(id, text) {
  return {
    id,
    text,
    target: '#close-road-toggle',
    // Closing roads is not enough: wait until the app has settled on an answer
    // (blocked / no route / arrived), otherwise the outcome is judged mid-search.
    done: (snap) => {
      const rider = primaryRider(snap);
      return rider?.blocked === true || rider?.arrived === true || /blocked|no route/i.test(snap.status ?? '');
    },
    async auto(api) {
      api.setSpeed(SPEED_WATCH);
      if (!api.primaryRoute?.()) api.run();
      const deadline = Date.now() + 20000;
      while (!api.primaryRoute?.() && Date.now() < deadline) {
        await new Promise((resolve) => setTimeout(resolve, 150));
      }
      api.isolateDropoff();
    },
  };
}

function placeMissionPins(api, pins) {
  const resolved = resolvePins(api.getGraph(), { id: 'mission', ...pins });
  api.placePins(resolved.from, resolved.to);
}

function basicFacts(snap) {
  const rider = primaryRider(snap);
  return compactFacts([
    { label: 'Algorithm', value: ALGO[snap.algorithm]?.name ?? snap.algorithm ?? '—' },
    { label: 'Intersections checked', value: valueOrDash(snap.explored) },
    { label: 'Planned time', value: secOrDash(snap.plannedSec) },
    { label: 'Trip time', value: secOrDash(rider?.tripSec) },
  ]);
}

function raceFacts(snap) {
  const { primary, challenger } = riderPair(snap);
  return compactFacts([
    { label: 'Main rider', value: riderSummary(primary, snap.explored) },
    { label: 'Challenger', value: riderSummary(challenger) },
    { label: 'Main checked', value: valueOrDash(primaryExplored({ primary, challenger }, snap)) },
    { label: 'Challenger checked', value: valueOrDash(challengerExplored({ primary, challenger }, snap)) },
  ]);
}

function rerouteFacts(snap) {
  const rider = primaryRider(snap);
  return compactFacts([
    { label: 'Open closures', value: valueOrDash(snap.closures) },
    { label: 'Reroutes', value: valueOrDash(rider?.reroutes) },
    { label: 'Status', value: rider?.blocked ? 'Blocked' : rider?.arrived ? 'Arrived' : snap.status ?? 'Watching' },
    { label: 'Trip time', value: secOrDash(rider?.tripSec) },
  ]);
}

function compactFacts(facts) {
  return facts.filter((fact) => fact.value != null && fact.value !== '');
}

function riderSummary(rider, exploredFallback) {
  if (!rider) return '—';
  const bits = [ALGO[rider.algorithm]?.name ?? rider.algorithm ?? rider.slot ?? 'rider'];
  if (rider.tripSec != null) bits.push(secOrDash(rider.tripSec));
  const explored = rider.explored ?? exploredFallback;
  if (explored != null) bits.push(`${explored} checked`);
  if (rider.blocked) bits.push('blocked');
  return bits.join(' · ');
}

function riders(snap) {
  return Array.isArray(snap.riders) ? snap.riders : [];
}

function hasRider(snap) {
  return riders(snap).length > 0;
}

function primaryRider(snap) {
  return riders(snap).find((r) => r.slot === 'primary') ?? riders(snap)[0] ?? null;
}

function riderPair(snap) {
  const list = riders(snap);
  return {
    primary: list.find((r) => r.slot === 'primary') ?? list[0] ?? null,
    challenger: list.find((r) => r.slot === 'challenger') ?? list[1] ?? null,
  };
}

function primaryExplored(pair, snap) {
  return pair.primary?.explored ?? snap.explored ?? Infinity;
}

function challengerExplored(pair) {
  return pair.challenger?.explored ?? Infinity;
}

function isFaster(a, b) {
  if (a?.tripSec == null || b?.tripSec == null) return false;
  return a.tripSec < b.tripSec;
}

function sameTrip(a, b) {
  if (a?.tripSec == null || b?.tripSec == null) return true;
  return Math.abs(a.tripSec - b.tripSec) <= FACTS.simDtSec;
}

function valueOrDash(value) {
  return value == null || !Number.isFinite(Number(value)) ? '—' : String(value);
}

function secOrDash(sec) {
  if (sec == null || !Number.isFinite(Number(sec))) return '—';
  const rounded = Math.round(sec);
  return rounded < 60 ? `${rounded} s` : `${Math.floor(rounded / 60)} min ${rounded % 60} s`;
}

function parseClock(hhmm) {
  const [hours, minutes] = hhmm.split(':').map(Number);
  return ((hours * 60) + minutes) * 60;
}
