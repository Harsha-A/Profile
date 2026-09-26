import { FACTS, ALGO, STATS } from '../facts.js';

/** Article explaining the two-algorithm race mode and verdicts. */
export const ARTICLES = [
  {
    id: 'race',
    title: 'What an algorithm race means',
    category: 'Race',
    summary: 'A race runs two different algorithms on the same delivery and compares route, search work, and arrival.',
    questions: ['What\'s the race with algorithms? Why is only 1 car running when I selected racing?'],
    blocks: [
      { type: 'p', html: 'A race plans the same delivery twice: same pickup pin, same drop-off pin, same simulated traffic, and the same start time. The app then spawns two riders so you can compare the algorithms on equal ground.' },
      { type: 'p', html: 'The primary algorithm is the one selected in the algorithm cards. Turn on <strong>Race two algorithms</strong> and choose a different challenger. The challenger list disables the currently selected algorithm so an algorithm cannot race itself.' },
      { type: 'callout', tone: 'why', html: 'That disabled option fixes the old one-car bug. When both racers used the same algorithm key, the board and rider tracking could collapse them into one visible rider. Now the race always uses two distinct algorithm keys.' },
      { type: 'h', text: 'What gets compared' },
      { type: 'table', head: ['Comparison', 'What it means'], rows: [
        [STATS.explored.label, 'How many intersections each algorithm settled while planning. Less search means less computation.'],
        [STATS.time.label, 'The predicted travel time for the route each algorithm chose.'],
        ['Arrival', 'The live rider result after simulated traffic and rerouting effects play out.'],
      ] },
      { type: 'p', html: `Race mode automatically switches to at least ${FACTS.raceSpeed}× speed so a several-minute delivery finishes quickly enough to watch.` },
      { type: 'h', text: 'Riders and colours' },
      { type: 'p', html: 'The first racer uses the app\'s blue comparison colour; the challenger uses orange. When riders overlap on the same road, the renderer nudges them sideways from the lane centre so both scooters and trails remain visible.' },
      { type: 'h', text: 'Scoreboard columns' },
      { type: 'p', html: 'The race board is titled <strong>Algorithm race</strong>. Each racer row shows <code>Checked</code>, <code>Planned</code>, and <code>Arrived</code>, plus a progress bar and medal when that rider finishes.' },
      { type: 'h', text: 'How the verdict is chosen' },
      { type: 'table', head: ['Situation', 'Verdict idea'], rows: [
        ['Fewer than two racers', 'Not a race: pick two algorithms.'],
        ['One or both riders still moving', 'Race in progress.'],
        ['Both found the same road', 'They arrive together; if one checked fewer intersections, the verdict says it searched less.'],
        ['Different roads, arrivals less than one second apart', 'Different roads, near-identical arrival.'],
        ['One rider arrives first', 'The headline names the first arrival and margin.'],
        ['The winner planned a slower route but arrived first', 'Traffic changed during the ride.'],
        ['An optimal algorithm beats a non-optimal one', 'The detail calls out the tradeoff: cheaper search can mean a slower route.'],
        ['Otherwise', 'The winner found the quicker route, with a search-effort comparison.'],
      ] },
      { type: 'callout', tone: 'tip', html: 'Do not treat “arrived first” and “searched least” as the same thing. A* can find the same route as Dijkstra with less search, while a sloppy search can do less work and still choose a slower road.' },
      { type: 'h', text: 'Good races to try' },
      { type: 'list', items: [
        `${ALGO.dijkstra.name} vs ${ALGO.astar.name}: usually the same fastest route, but A* checks fewer intersections.`,
        `${ALGO.bfs.name} vs ${ALGO.dijkstra.name}: fewer turns can still be slower because BFS ignores road speeds and traffic costs while searching.`,
        `${ALGO['astar-overestimate'].name} vs ${ALGO.astar.name}: the sloppy version may check fewer intersections, but it can arrive later if its over-eager estimate picks the wrong route.`,
      ] },
      { type: 'p', html: 'If the two yellow and comparison paths overlap exactly, the race is mostly about search effort. If the paths split, watch both the planned time and the live arrival because traffic can change while the riders are moving.' },
      { type: 'tryit', scenario: 'race-dijkstra-astar', label: 'Try Dijkstra vs A*' },
    ],
    tryIt: 'race-dijkstra-astar',
    related: ['choose-algorithm', 'priority-queue', 'why-extra-nodes', 'astar-overestimate'],
  },
];
