import { FACTS, ALGO, STATS } from '../facts.js';

const FAQ_QUESTIONS = [
  'What algorithms are available? Which algo should I select?',
  'How does it behave when an algorithm is chosen?',
  'What exactly does moving A → B denote when a particular algo is selected?',
  "What's the race with algorithms? Why is only 1 car running when I selected racing?",
  'What if there is traffic?',
  'Does rerouting really happen? How does it work?',
  "When is a rerouting triggered? What's the criteria?",
  'How is the rerouting decision made?',
  "Why don't I see rerouting happening at every tick?",
  'I saw a car passing even when the road is closed — why?',
  'What are "Peak candidates" and "Segments"?',
  "When the graph is being calculated, what's the criteria to choose a node? Why are so many unnecessary nodes selected even when that path is not chosen? Why was a node selected?",
  "Pickup/drop-off pins don't work — how do I place them?",
  'Zoom in / zoom out and scroll act weird — how do I zoom and pan?',
  'How do I use the controls on the side and top nav?',
  "What's the difference between the procedural map and the realistic map?",
  'What does Step do?',
  'Why does the rider stop with ⛔?',
  "What's the difference between predicted time and actual trip time?",
  'Why does "Fast but sloppy" sometimes give a slower route?',
];

const statExplanations = {
  status: 'This is the current state of the planner or delivery. It changes from idle/ready to running, done, racing, delivered, blocked, or no-route as the search and rider progress.',
  explored: 'This is incremented when the algorithm settles or finalises an intersection. For Dijkstra and A*, that means the best known cost for that intersection is now trusted; for BFS it means the intersection was removed from the queue in hop order.',
  heap: 'This replaces the old “Peak candidates” name. It is the largest number of waiting candidates held at once: the peak heap size for Dijkstra and A*, or the peak queue size for BFS, and it is a proxy for memory pressure.',
  time: 'This is the planned travel time of the selected path. The algorithm computes it from road length, road speed, closures, and the current simulated traffic factor before the rider starts moving.',
  distance: 'This is the physical length of the chosen route. The UI sums the metres of every edge in the returned path, so two routes can have similar distance but very different predicted time.',
  segments: 'This replaces the old “Segments” label with “Road segments”. It is the edge count in the final route: one directed road piece per hop between consecutive intersections.',
  compute: 'This is only algorithm CPU time. It measures the generator or instant search work with performance.now(), and deliberately excludes animation frames, rider travel, and the visual delay from stepping.',
};

const statRows = Object.keys(STATS).map((key) => [
  STATS[key].label,
  STATS[key].help,
  statExplanations[key],
]);

const faqBlocks = [
  {
    type: 'h',
    text: FAQ_QUESTIONS[0],
  },
  {
    type: 'p',
    html: `The available algorithms are ${ALGO.bfs.name}, ${ALGO.dijkstra.name}, ${ALGO.astar.name}, ${ALGO['astar-overestimate'].name}, and ${ALGO.bidirectional.name}. Start with ${ALGO.astar.name} for everyday use because it keeps Dijkstra's fastest-route guarantee while usually checking fewer intersections; use the others to compare trade-offs. <a data-kb="choose-algorithm">Read more</a>`,
  },
  {
    type: 'h',
    text: FAQ_QUESTIONS[1],
  },
  {
    type: 'p',
    html: 'Choosing an algorithm changes how Find route ranks candidate intersections and clears any previous search output while keeping your pins. Step and Find route then use that selected method to build the route, statistics, overlay, directions, and rider. <a data-kb="choose-algorithm">Read more</a>',
  },
  {
    type: 'h',
    text: FAQ_QUESTIONS[2],
  },
  {
    type: 'p',
    html: 'Moving A → B means the rider follows the route produced by the selected algorithm from the pickup pin to the drop-off pin. The car is not the search itself; it is the delivery using the chosen route after the graph calculation finishes. <a data-kb="search-vs-ride">Read more</a>',
  },
  {
    type: 'h',
    text: FAQ_QUESTIONS[3],
  },
  {
    type: 'p',
    html: `Race two algorithms plans the same pickup/drop-off with the selected algorithm and the comparison algorithm, then shows each rider's progress and result. If you only see one car, racing is usually off, both algorithms cannot be the same, or one side found no route to spawn. Races auto-switch the clock to at least ${FACTS.raceSpeed}x so both trips can finish sooner. <a data-kb="race">Read more</a>`,
  },
  {
    type: 'h',
    text: FAQ_QUESTIONS[4],
  },
  {
    type: 'p',
    html: `Traffic changes edge costs by time of day, with rush peaks around ${FACTS.rushPeaks[0]} and ${FACTS.rushPeaks[1]} and road-class sensitivity. Dijkstra, A*, overestimating A*, and bidirectional search plan with those costs; ${ALGO.bfs.name} still searches by hop count, although the reported trip time reflects the roads it chose. <a data-kb="traffic-model">Read more</a>`,
  },
  {
    type: 'h',
    text: FAQ_QUESTIONS[5],
  },
  {
    type: 'p',
    html: 'Yes. While a rider is travelling, the simulation checks whether the remaining route is blocked or whether traffic makes a better route worthwhile, then splices the new plan onto the part already travelled. <a data-kb="reroute-decision">Read more</a>',
  },
  {
    type: 'h',
    text: FAQ_QUESTIONS[6],
  },
  {
    type: 'p',
    html: `A reroute is triggered immediately when a not-yet-entered edge ahead is closed, or on periodic traffic checks every ${FACTS.rerouteIntervalSec} simulated seconds for weighted algorithms. BFS does not do traffic-improvement checks because it does not optimise travel time, but it still responds to closures. <a data-kb="reroute-triggers">Read more</a>`,
  },
  {
    type: 'h',
    text: FAQ_QUESTIONS[7],
  },
  {
    type: 'p',
    html: `The rider compares the current remaining route with a newly planned alternative from its current committed position. A traffic reroute must save at least max(${FACTS.rerouteMinGainSec} seconds, ${FACTS.rerouteMinGainPct}% of remaining time); a closure ahead reroutes whenever any path exists, and reports blocked if none exists. <a data-kb="reroute-decision">Read more</a>`,
  },
  {
    type: 'h',
    text: FAQ_QUESTIONS[8],
  },
  {
    type: 'p',
    html: `The app intentionally waits between traffic checks to avoid twitchy route changes and extra computation. That interval is ${FACTS.rerouteIntervalSec} simulated seconds, and even then the alternative must clear the saving threshold before the rider switches. <a data-kb="reroute-why-not-every-tick">Read more</a>`,
  },
  {
    type: 'h',
    text: FAQ_QUESTIONS[9],
  },
  {
    type: 'p',
    html: `That older behaviour has been fixed: the closure tool closes both directions of the physical road for ${FACTS.closureMin} simulated minutes. Riders do not enter a closed road; if the closed segment is ahead they detour, and if every route to the drop-off is cut off they wait with ⛔ until a way opens. <a data-kb="closures">Read more</a>`,
  },
  {
    type: 'h',
    text: FAQ_QUESTIONS[10],
  },
  {
    type: 'p',
    html: 'They have been renamed for clarity: “Peak candidates” is now “Largest frontier”, and “Segments” is now “Road segments”. Largest frontier is the peak waiting queue/heap size; Road segments is the number of edges in the final path. <a data-kb="stats-glossary">Read more</a>',
  },
  {
    type: 'h',
    text: FAQ_QUESTIONS[11],
  },
  {
    type: 'p',
    html: 'Each algorithm chooses the next intersection from its frontier using its own priority: hops for BFS, known travel time for Dijkstra, and known time plus a straight-line estimate for A*. Extra nodes are checked because the algorithm must prove there is not a better route hiding off the final path; the node inspector explains why each selected node won at that moment. <a data-kb="priority-queue">Read more</a>',
  },
  {
    type: 'h',
    text: FAQ_QUESTIONS[12],
  },
  {
    type: 'p',
    html: `Click near an intersection on the map: the picker accepts clicks within about ${FACTS.pickNodePx} screen pixels of a graph node. If you miss, the app says “Click closer to a street”; after placing both pins, another click resets the pair and starts a new pickup. <a data-kb="how-to-use">Read more</a>`,
  },
  {
    type: 'h',
    text: FAQ_QUESTIONS[13],
  },
  {
    type: 'p',
    html: 'Use + and − to zoom, ⤢ to fit the whole map, drag to pan, and the mouse wheel to zoom around the cursor. The map surface handles the wheel itself, so the page should not scroll while you are zooming the map. <a data-kb="what-you-see">Read more</a>',
  },
  {
    type: 'h',
    text: FAQ_QUESTIONS[14],
  },
  {
    type: 'p',
    html: 'The side panel chooses the algorithm, racing option, pins workflow, Find route, Step, Reset, and the search statistics. The top controls switch city, seed, clock speed, traffic, closures, follow mode, one-way arrows, zoom, the <strong>?</strong> mission hub (guided, gamified walkthroughs), and 📖 Knowledge (this page, in a new tab). <a data-kb="how-to-use">Read more</a>',
  },
  {
    type: 'h',
    text: FAQ_QUESTIONS[15],
  },
  {
    type: 'p',
    html: 'The procedural map is a seeded synthetic city, so the same seed recreates the same grid, river, bridges, arterials, one-way streets, and dropped roads. Koramangala uses preprocessed OpenStreetMap streets with a Leaflet basemap, so the seed control is hidden and pan/zoom uses Leaflet behaviour. <a data-kb="maps">Read more</a>',
  },
  {
    type: 'h',
    text: FAQ_QUESTIONS[16],
  },
  {
    type: 'p',
    html: 'Step advances the visual search by one settled intersection, skipping over internal relax events until a node is actually chosen. It is available for BFS, Dijkstra, and A* variants; bidirectional search runs instantly because it does not have a step-by-step visual generator here. <a data-kb="node-inspector">Read more</a>',
  },
  {
    type: 'h',
    text: FAQ_QUESTIONS[17],
  },
  {
    type: 'p',
    html: '⛔ means the rider is blocked: the remaining route crosses a closed road and no alternative path to the drop-off currently exists. The rider waits instead of driving through the closure, and resumes if roads reopen or a valid route appears. <a data-kb="closures">Read more</a>',
  },
  {
    type: 'h',
    text: FAQ_QUESTIONS[18],
  },
  {
    type: 'p',
    html: 'Predicted time is the route cost computed at planning time from lengths, speeds, traffic, and closures. Actual trip time is measured after the rider spawns, so it can differ when traffic changes, reroutes happen, the rider waits at ⛔, or the race clock advances faster. <a data-kb="search-vs-ride">Read more</a>',
  },
  {
    type: 'h',
    text: FAQ_QUESTIONS[19],
  },
  {
    type: 'p',
    html: `“${ALGO['astar-overestimate'].name}” multiplies A*'s straight-line estimate by ${FACTS.overestimateFactor}, so it can rush toward the drop-off and stop before proving the globally fastest route. That often checks fewer intersections, but sometimes chooses a slower road sequence than Dijkstra or regular A*. <a data-kb="astar-overestimate">Read more</a>`,
  },
];

/** Knowledge articles owned by lane K5. */
export const ARTICLES = [
  {
    id: 'stats-glossary',
    title: 'Results and stats glossary',
    category: 'Results',
    summary: 'What every status, timing, distance, frontier, race, chart, and result-card field means.',
    questions: [FAQ_QUESTIONS[10], FAQ_QUESTIONS[18]],
    tryIt: 'first-delivery',
    related: ['priority-queue', 'race', 'search-vs-ride'],
    blocks: [
      {
        type: 'p',
        html: 'The stats panel describes two different phases: graph search and the delivery ride. The search values come from the algorithm result; the rider and result card values come after a route has been chosen and a mover is spawned.',
      },
      {
        type: 'table',
        head: ['Stat', 'UI help', 'Deeper meaning'],
        rows: statRows,
      },
      {
        type: 'h',
        text: 'Race display',
      },
      {
        type: 'p',
        html: 'In race mode, paired stats are shown as “a / b” for the primary algorithm and the challenger: largest frontier, predicted time, distance, road segments, and search time. Intersections checked uses both algorithm names inline so you can tell which number belongs to which rider.',
      },
      {
        type: 'h',
        text: 'Effort chart',
      },
      {
        type: 'p',
        html: 'The effort chart visualises intersections checked. A single route shows one bar; a race shows one bar per algorithm so you can compare search work separately from arrival order.',
      },
      {
        type: 'h',
        text: 'Result card',
      },
      {
        type: 'p',
        html: 'When a solo delivery arrives, the result card shows Actual trip, Predicted, Distance, and Intersections checked. Actual trip is measured from rider spawn to arrival, while Predicted is the search-time route cost that existed before the rider started.',
      },
      {
        type: 'callout',
        tone: 'why',
        html: 'Renames to remember: “Peak candidates” is now <strong>Largest frontier</strong>, and “Segments” is now <strong>Road segments</strong>. <strong>Search time</strong> excludes animation and rider travel by design.',
      },
    ],
  },
  {
    id: 'maps',
    title: 'Procedural and Koramangala maps',
    category: 'Maps',
    summary: 'How the generated city differs from the real-street Koramangala view.',
    questions: [FAQ_QUESTIONS[15], FAQ_QUESTIONS[13]],
    tryIt: 'koramangala-tour',
    related: ['city-as-graph', 'traffic-model', 'how-to-use'],
    blocks: [
      {
        type: 'p',
        html: `The procedural city is generated from a seed, so seed ${FACTS.city.seed} always rebuilds the same style of city unless you change it. Its base layout is a ${FACTS.city.cols} × ${FACTS.city.rows} jittered grid with roughly ${FACTS.city.spacingM} m spacing, then the generator adds arterials, a ring road, diagonal shortcuts, optional one-way streets, dropped local roads, and a river crossed by ${FACTS.city.bridges} bridges.`,
      },
      {
        type: 'p',
        html: 'Because the generator uses named random forks, changing the seed changes the whole city but the same seed is deterministic. After generation, the app keeps the largest strongly connected component so every surviving intersection can reach every other one.',
      },
      {
        type: 'h',
        text: 'Koramangala real streets',
      },
      {
        type: 'p',
        html: 'Koramangala is built offline from OpenStreetMap using the bbox 12.920,77.610,12.945,77.640. The build script fetches OSM highway ways, filters to drivable road classes, respects one-way and roundabout tags, contracts degree-2 chains, keeps the largest strongly connected component, and projects latitude/longitude to metres for the algorithms.',
      },
      {
        type: 'p',
        html: `The real-street view uses a Leaflet OpenStreetMap basemap under the same graph overlay. Its A* heuristic is scaled by ${FACTS.osmHeuristicScale} because projected straight-line distance can be a hair optimistic or pessimistic away from the projection centre; shrinking it keeps regular A* safe for optimal search.`,
      },
      {
        type: 'h',
        text: 'Controls and data files',
      },
      {
        type: 'list',
        items: [
          'Procedural mode shows the seed box and Regenerate button; Koramangala hides them because the street data is fixed.',
          'Procedural mode uses the canvas camera; Koramangala uses Leaflet panning, wheel zoom, and map tiles.',
          'The generated city is created in memory by <code>js/city/procedural-city.js</code>. Koramangala loads <code>data/cities/koramangala.json</code>, produced by <code>scripts/build-osm-graph.js</code> from cached raw OSM data under <code>data/raw/</code>.',
        ],
      },
      {
        type: 'tryit',
        scenario: 'koramangala-tour',
        label: 'Tour Koramangala',
      },
    ],
  },
  {
    id: 'faq',
    title: 'FAQ',
    category: 'FAQ',
    summary: 'Short answers to the common questions about algorithms, traffic, rerouting, controls, maps, and results.',
    questions: FAQ_QUESTIONS,
    related: ['how-to-use', 'choose-algorithm', 'reroute-decision', 'stats-glossary', 'maps'],
    blocks: faqBlocks,
  },
];
