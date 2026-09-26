import { FACTS, ALGO } from '../facts.js';

const KMH_TO_MPS = 1000 / 3600;
const EXAMPLE_LENGTH_M = 240;
const LOCAL_SPEED_MPS = FACTS.speedsKmh.local * KMH_TO_MPS;
const LOCAL_PEAK_FACTOR = Math.max(FACTS.minTrafficFactor, 1 - FACTS.sensitivity.local);
const LOCAL_FREE_SEC = EXAMPLE_LENGTH_M / LOCAL_SPEED_MPS;
const LOCAL_RUSH_SEC = EXAMPLE_LENGTH_M / (LOCAL_SPEED_MPS * LOCAL_PEAK_FACTOR);
const ROAD_SPEEDS = Object.entries(FACTS.speedsKmh)
  .map(([roadClass, kmh]) => `${roadClass}: ${kmh} km/h`)
  .join(', ');

/** Graph-basics Knowledge articles: road graph structure and edge-cost math. */
export const ARTICLES = [
  {
    id: 'city-as-graph',
    title: 'The city is a graph',
    category: 'Graph basics',
    summary: 'ShortestBite turns streets into nodes and directed edges so algorithms can search them precisely.',
    blocks: [
      {
        type: 'p',
        html: 'ShortestBite does not search the pixels on the screen. It searches a graph: intersections are <strong>nodes</strong>, and road pieces between intersections are <strong>edges</strong>. Pins snap to nodes, routes are ordered lists of nodes and edges, and every algorithm works on that structure.',
      },
      {
        type: 'diagram',
        id: 'twin-edges',
      },
      {
        type: 'h',
        text: 'Edges are directed',
      },
      {
        type: 'p',
        html: 'Each edge has a from-node, a to-node, a length, a speed, a road class, and a closed/open flag. Directed edges matter because one-way streets can be driven in one direction but not the other.',
      },
      {
        type: 'p',
        html: 'A normal two-way road is represented as two directed twin edges: one A → B and one B → A. The graph can find the reverse twin with <code>reverseEdge</code>, which is why closing a two-way road closes both directions together. See <a data-kb="closures">Closures</a>.',
      },
      {
        type: 'h',
        text: 'One-way streets',
      },
      {
        type: 'p',
        html: 'If an edge has no reverse twin, it is one-way. Algorithms can only traverse it in its stored direction. Turning on <strong>Show one-way arrows</strong> draws arrows for exactly those directed-only road pieces; it does not create or remove any roads.',
      },
      {
        type: 'h',
        text: 'Road classes and speeds',
      },
      {
        type: 'p',
        html: `Road class controls default speed and traffic sensitivity. The current speed table is <strong>${ROAD_SPEEDS}</strong>. Those values feed the travel-time formula in <a data-kb="edge-cost">Edge cost</a>.`,
      },
      {
        type: 'list',
        items: [
          'Highways are the fastest base roads and draw most prominently.',
          'Arterials are major city roads and are strongly affected by rush-hour traffic.',
          'Local roads are slower but often less sensitive to traffic.',
          'Bridges have their own class because they are important connectors and can become bottlenecks.',
        ],
      },
      {
        type: 'h',
        text: 'Procedural vs real map',
      },
      {
        type: 'p',
        html: `The procedural city uses a deterministic generated graph: <strong>${FACTS.city.cols}</strong> columns by <strong>${FACTS.city.rows}</strong> rows, spaced about <strong>${FACTS.city.spacingM} m</strong> apart, with <strong>${FACTS.city.bridges}</strong> bridge crossings when the river appears. The real Koramangala map loads a contracted OpenStreetMap graph but uses the same algorithms, cost function, traffic model, closure rules, and render layer. See <a data-kb="maps">Maps</a>.`,
      },
      {
        type: 'callout',
        tone: 'why',
        html: 'Graph search is fast and explainable because every decision is local: from this node, which outgoing edges are open, and what do they cost right now?',
      },
    ],
    tryIt: 'race-bfs-dijkstra',
    related: ['edge-cost', 'closures', 'maps', 'choose-algorithm'],
  },
  {
    id: 'edge-cost',
    title: 'What a road edge costs',
    category: 'Graph basics',
    summary: 'Route time comes from road length, road speed, and the live traffic factor; BFS is the exception because it counts segments.',
    questions: [
      'What if there is traffic?',
    ],
    blocks: [
      {
        type: 'p',
        html: 'For time-aware algorithms, each road edge costs the number of seconds needed to drive it right now. Closed edges cost infinity, so the route search will not enter them.',
      },
      {
        type: 'formula',
        html: 'cost = length ÷ (speed × traffic factor)',
      },
      {
        type: 'diagram',
        id: 'edge-cost',
      },
      {
        type: 'p',
        html: `Length is stored in metres. Speed comes from the graph in metres per second, derived from the road-class table in FACTS. The traffic factor is a multiplier from <strong>${FACTS.minTrafficFactor}</strong> to <strong>1</strong>: <strong>1</strong> means free-flowing, smaller means slower.`,
      },
      {
        type: 'h',
        text: 'Worked example',
      },
      {
        type: 'p',
        html: `Take a <strong>${EXAMPLE_LENGTH_M} m</strong> local road. Local speed is <strong>${FACTS.speedsKmh.local} km/h</strong>, or <strong>${LOCAL_SPEED_MPS.toFixed(2)} m/s</strong>. In free flow, cost is <code>${EXAMPLE_LENGTH_M} ÷ ${LOCAL_SPEED_MPS.toFixed(2)}</code> = <strong>${LOCAL_FREE_SEC.toFixed(1)} s</strong>. At peak rush hour with edge noise treated as <strong>1</strong>, local sensitivity makes the factor <strong>${LOCAL_PEAK_FACTOR.toFixed(2)}</strong>, so cost is <code>${EXAMPLE_LENGTH_M} ÷ (${LOCAL_SPEED_MPS.toFixed(2)} × ${LOCAL_PEAK_FACTOR.toFixed(2)})</code> = <strong>${LOCAL_RUSH_SEC.toFixed(1)} s</strong>.`,
      },
      {
        type: 'h',
        text: 'Traffic factors',
      },
      {
        type: 'p',
        html: `The traffic model has rush peaks at <strong>${FACTS.rushPeaks.join('</strong> and <strong>')}</strong>, each with a spread of <strong>${FACTS.rushSpreadHours} h</strong>. Road classes react differently: highways use sensitivity <strong>${FACTS.sensitivity.highway}</strong>, arterials <strong>${FACTS.sensitivity.arterial}</strong>, locals <strong>${FACTS.sensitivity.local}</strong>, and bridges <strong>${FACTS.sensitivity.bridge}</strong>. Stable per-edge noise ranges from <strong>${FACTS.noiseMin}</strong> to <strong>${FACTS.noiseMax}</strong>, then the result is clamped no lower than <strong>${FACTS.minTrafficFactor}</strong>.`,
      },
      {
        type: 'h',
        text: 'Fastest route vs fewest segments',
      },
      {
        type: 'p',
        html: `<strong>${ALGO.dijkstra.name}</strong>, <strong>${ALGO.astar.name}</strong>, <strong>${ALGO['astar-overestimate'].name}</strong>, and <strong>${ALGO.bidirectional.name}</strong> use edge travel time. <strong>${ALGO.bfs.name}</strong> is different: it searches by road-segment count, so it can prefer fewer turns even when those roads are slower or congested.`,
      },
      {
        type: 'calc',
        id: 'edge-cost',
      },
      {
        type: 'callout',
        tone: 'tip',
        html: 'If traffic is off, the factor is treated as free-flowing and the formula reduces to length divided by speed. If a road is closed, it is not just slow — it is unavailable to routing.',
      },
    ],
    tryIt: 'race-bfs-dijkstra',
    related: ['city-as-graph', 'traffic-model', 'bfs', 'dijkstra', 'astar'],
  },
];
