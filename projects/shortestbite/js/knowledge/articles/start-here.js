import { FACTS, ALGO } from '../facts.js';

const speeds = FACTS.clockSpeeds.join('x/');

/** Start-here Knowledge articles: app manual, visual key, and search-vs-ride timing. */
export const ARTICLES = [
  {
    id: 'how-to-use',
    title: 'How to use ShortestBite',
    category: 'Start here',
    summary: 'A complete user manual for planning, searching, racing, riding, traffic, closures, zooming, and sharing a delivery.',
    questions: [
      'Pickup/drop-off pins don\'t work — how do I place them?',
      'Zoom in / zoom out and scroll act weird — how do I zoom and pan?',
      'How do I use the controls on the side and top nav?',
    ],
    blocks: [
      {
        type: 'p',
        html: `ShortestBite is a food-delivery pathfinding visualiser. You choose a city, drop a 🍔 pickup and a 🏠 drop-off, choose an algorithm, then watch the route search and the rider as two separate phases. The default clock starts at <strong>${FACTS.startClock}</strong>, and traffic, lighting, ETAs, and rider movement all read from that simulated clock.`,
      },
      {
        type: 'h',
        text: 'Top bar',
      },
      {
        type: 'list',
        items: [
          '<strong>City</strong> switches between <em>Procedural (seed)</em> and <em>Koramangala (real streets)</em>. Procedural uses a generated graph; Koramangala uses contracted OpenStreetMap streets. See <a data-kb="maps">Maps</a>.',
          '<strong>Seed</strong> and <strong>Regenerate</strong> rebuild only the procedural city. The same seed produces the same generated city; the seed controls disappear on the real map.',
          '<strong>⏸ Pause / ▶ Play</strong> pauses or resumes the simulated clock. Search animation can still show computation, but live traffic and riders depend on clock time.',
          `<strong>${speeds}x</strong> choose how fast simulated time advances. Races automatically switch up to at least <strong>${FACTS.raceSpeed}x</strong> so both riders finish in a reasonable wait.`,
          '<strong>HH:MM clock</strong> shows simulated time of day. The chip beside it reports the traffic regime: Free flowing, Building, Heavy, Rush hour, or Traffic off.',
          '<strong>📖 Knowledge</strong> opens these explanations in a new tab. The <strong>?</strong> button opens the <strong>mission hub</strong>: short guided missions where you predict what will happen, do it step by step, then compare your prediction with the result.',
        ],
      },
      {
        type: 'h',
        text: '1 · Plan the route',
      },
      {
        type: 'p',
        html: `Click near an intersection to place the 🍔 pickup, then click another intersection for the 🏠 drop-off. The hit area is <strong>${FACTS.pickNodePx} screen pixels</strong> from the nearest node; if the click is too far away, the app shows <code>Click closer to a street to drop a pin.</code>`,
      },
      {
        type: 'list',
        items: [
          'The pin checklist changes from <em>click the map</em> to <em>placed</em>, and the next needed pin is highlighted.',
          'If both pins are already set, the next map click clears the old pair and starts a new pickup at the clicked intersection. Changing algorithm or race settings keeps the existing pins.',
          'The map prompt mirrors the panel: first it asks for the pickup, then the drop-off.',
        ],
      },
      {
        type: 'h',
        text: '2 · Choose how to search',
      },
      {
        type: 'p',
        html: `Pick an algorithm card. The cards use plain names: <strong>${ALGO.bfs.name}</strong>, <strong>${ALGO.dijkstra.name}</strong>, <strong>${ALGO.astar.name}</strong>, <strong>${ALGO['astar-overestimate'].name}</strong>, and <strong>${ALGO.bidirectional.name}</strong>. The hidden select stays in sync for keyboard and restored states.`,
      },
      {
        type: 'list',
        items: [
          `<strong>Race two algorithms</strong> runs your selected algorithm against a challenger on the same trip. The challenger select disables the current algorithm, so an algorithm cannot race itself. See <a data-kb="race">Race</a>.`,
          `The main route is gold in a normal run. In a race, the primary rider uses the blue route colour and the challenger uses the orange route colour.`,
          `Use <strong>${ALGO.astar.name}</strong> for the recommended everyday choice, <strong>${ALGO.dijkstra.name}</strong> when you want the most straightforward guarantee, and <strong>${ALGO.bfs.name}</strong> to see why fewest road segments is not the same as fastest.`,
        ],
      },
      {
        type: 'h',
        text: '3 · Send the rider',
      },
      {
        type: 'list',
        items: [
          '<strong>Find route</strong> runs the search, draws the winning path, fills Results, opens directions, then dispatches the rider.',
          '<strong>Step</strong> advances the search by one committed intersection. For step-capable algorithms it also opens the inspector showing cost so far, estimate, priority, and queue context. Bidirectional search has no step-by-step view, so it runs to completion.',
          '<strong>Reset</strong> clears pins, riders, search overlays, directions, results, charts, and cards.',
          '<strong>Follow the rider</strong> keeps the camera centred on the active rider. Dragging or zooming the map turns following off and shows a toast.',
        ],
      },
      {
        type: 'h',
        text: 'Results and route details',
      },
      {
        type: 'p',
        html: 'The Results panel reports Status, Intersections checked, Largest frontier, Predicted time, Distance, Road segments, and Search time. The effort chart compares intersections checked, and the turn-by-turn directions list the manoeuvres; hover a direction to highlight that leg on the map. On arrival, a result card compares actual trip time with the original prediction and offers a share link.',
      },
      {
        type: 'h',
        text: 'Live map controls',
      },
      {
        type: 'list',
        items: [
          '<strong>Simulate traffic</strong> toggles the traffic model. With it off, road factors are treated as free-flowing for routing and display.',
          '<strong>Animate congestion</strong> toggles only the crawling dash overlay on congested roads; it does not change the calculated route.',
          `<strong>Road-closure tool</strong> turns on a banner. Click within about <strong>${FACTS.pickEdgePx} px</strong> of a road to close or reopen it. A new closure lasts <strong>${FACTS.closureMin} sim-minutes</strong>, blocks both directions when a twin edge exists, and the tool switches itself off after that one click. See <a data-kb="closures">Closures</a>.`,
          '<strong>Advanced · Search steps per frame</strong> changes how many search-generator steps are consumed per animation frame: higher is faster, lower is easier to read.',
          '<strong>Advanced · Show one-way arrows</strong> draws arrows only on roads that exist in one directed direction, making one-way streets visible without changing the graph.',
        ],
      },
      {
        type: 'h',
        text: 'Map movement and share links',
      },
      {
        type: 'p',
        html: `Use <strong>+</strong> and <strong>−</strong> to zoom, and <strong>⤢</strong> to fit the whole city. On the procedural map, the mouse wheel zooms around the cursor and dragging pans; the app container uses internal scrolling, so the page itself does not scroll away. On the Leaflet real map, Leaflet handles the same pan and wheel gestures over the map. The URL hash stores the city, procedural seed, both pin node ids, and selected algorithm, so planned routes can be copied or bookmarked.`,
      },
      {
        type: 'steps',
        items: [
          '<strong>Your first delivery in 5 clicks:</strong> click near a street intersection for the 🍔 pickup.',
          'Click another intersection for the 🏠 drop-off.',
          `Click the <strong>${ALGO.astar.name}</strong> card, or keep the default if you want the guaranteed route calculation already selected.`,
          '<strong>Click Find route</strong> to run the search and dispatch the rider.',
          '<strong>Click Copy link</strong> on the delivery card when it arrives, or try Step/Reset to inspect the search more slowly.',
        ],
      },
      {
        type: 'callout',
        tone: 'tip',
        html: 'If pin placement feels unreliable, zoom in first, then click closer to the junction dot than to the middle of a long road segment. Pins snap to graph intersections because the algorithms search graph nodes, not arbitrary screen pixels.',
      },
    ],
    tryIt: 'first-delivery',
    related: ['what-you-see', 'search-vs-ride', 'city-as-graph', 'maps', 'closures'],
  },
  {
    id: 'what-you-see',
    title: 'What you see on the map',
    category: 'Start here',
    summary: 'A visual key for search colours, routes, traffic, closures, riders, pins, arrival effects, and live status UI.',
    blocks: [
      {
        type: 'p',
        html: 'Every colour and motion on the map has a job: either it explains the search, the selected route, current traffic, road availability, or rider progress. The same shared drawing layer is used by the procedural canvas view and the Leaflet real-map view, so the meanings stay consistent.',
      },
      {
        type: 'table',
        head: ['Visual', 'Meaning'],
        rows: [
          ['Explored gradient, blue → violet', 'Intersections the algorithm has committed to. Blue marks earlier settle order; violet marks later settle order, with fresh nodes briefly larger and brighter.'],
          ['Frontier rings', 'Pulsing rings around nodes currently being considered but not yet committed. This is the leading edge of the search.'],
          ['Gold chosen route', 'The route selected for a single delivery. It draws from pickup to drop-off, then shows a subtle flow dash in the travel direction.'],
          ['Compare route colour', 'In a race, the primary route uses the blue racer colour and the challenger uses the orange racer colour instead of gold.'],
          ['Faded old route on reroute', 'When a rider reroutes, the replaced route remains briefly as a dim previous path behind the new one.'],
          ['Traffic colours amber → red', `Major roads warm toward amber and red as their traffic factor drops. Congested stretches under about <strong>${FACTS.congestedPct}%</strong> of normal speed can also show the crawling dash overlay.`],
          ['Crawling dash', 'Animated congestion pulse on non-local roads. Worse congestion crawls more visibly; turning off Animate congestion hides the dash only.'],
          ['⊗ closure marker', 'A road is closed. The marker is de-duplicated across twin directed edges, so a two-way road gets one badge for the physical closure.'],
          ['⛔ blocked rider badge', 'The rider has no open path to continue. It waits until a road reopens or a new route becomes possible.'],
          ['Rider colours and offset', 'Normal rides use the default scooter colour. Race riders use separate colours and are offset sideways when they overlap so both remain visible.'],
          ['🍔 / 🏠 pins', 'Pickup and drop-off markers. They pulse after landing and are stored as graph node ids.'],
          ['Arrival pulse and confetti', 'When the rider arrives, a success pulse expands at the drop-off and confetti fires in screen space.'],
          ['Rider HUD', 'Floating card with algorithm label, ETA, distance left, current street, progress bar, congestion status, and reroute status.'],
          ['Narration strip', 'One-sentence live commentary: placing pins, searching, route found, racing, rerouting, blocked, or delivered.'],
          ['Reroute monitor', 'A HUD section for the primary rider showing live reroute checks, savings found, thresholds, blocked state, and recovery.'],
        ],
      },
      {
        type: 'p',
        html: 'Road colours also encode road class before traffic is applied: highways, arterials, locals, and bridges start with different base colours. If the one-way toggle is enabled, arrows appear only where the graph has a directed edge without the reverse twin.',
      },
      {
        type: 'callout',
        tone: 'tip',
        html: 'When the map looks busy, read it in layers: first the pins, then the gold or racer routes, then moving riders, then search dots and traffic tint underneath.',
      },
    ],
    tryIt: 'first-delivery',
    related: ['how-to-use', 'city-as-graph', 'traffic-model', 'reroute-monitor'],
  },
  {
    id: 'search-vs-ride',
    title: 'Search vs ride: what A → B means',
    category: 'Start here',
    summary: 'The route search is instant graph computation; the scooter ride is a simulated-time agent following the chosen route.',
    questions: [
      'What exactly does moving A → B denote when a particular algo is selected?',
      'What\'s the difference between predicted time and actual trip time?',
    ],
    blocks: [
      {
        type: 'p',
        html: 'A delivery has two phases. First, the selected algorithm computes a route through the graph from the pickup node to the drop-off node at the current simulated time. Second, the rider drives the selected route as a visual agent.',
      },
      {
        type: 'h',
        text: 'Phase 1: search is computation',
      },
      {
        type: 'p',
        html: `When you choose <strong>${ALGO.dijkstra.name}</strong>, <strong>${ALGO.astar.name}</strong>, or another algorithm, the app is changing how the graph search decides which intersection to examine next. The search itself is pure computation over nodes and directed edges using the current clock time and traffic factors; the animation is a replay of those decisions so humans can see them.`,
      },
      {
        type: 'p',
        html: 'The search does not mean a scooter physically tried every blue or violet street. Those marks are the algorithm checking possibilities in memory. Search time in Results is CPU time, not rider travel time and not animation time.',
      },
      {
        type: 'h',
        text: 'Phase 2: ride is simulated movement',
      },
      {
        type: 'p',
        html: `After a route is found, the rider moves along the chosen edges in simulated time. The mover advances on <strong>${FACTS.simDtSec} sim-second</strong> ticks, scaled by the active clock speed buttons. At ${FACTS.clockSpeeds.join('x, ')}x, the same planned route is driven with the same simulated physics, just shown faster or slower in real time.`,
      },
      {
        type: 'h',
        text: 'Predicted time vs actual trip',
      },
      {
        type: 'p',
        html: 'Predicted time is the route cost calculated at dispatch time: the sum of each planned edge’s travel time with the then-current traffic factors. Actual trip time is measured from dispatch until arrival on the simulated clock.',
      },
      {
        type: 'list',
        items: [
          'Actual time can differ because traffic factors continue changing while the rider is on the road.',
          'A closure ahead can force an immediate reroute; the new route may be shorter, longer, or impossible until a road reopens.',
          'A traffic reroute can switch paths only when the alternative beats the reroute threshold. See <a data-kb="reroute-decision">Reroute decision</a>.',
          'In a race, two riders can start with different planned routes, then experience the same simulated clock and live traffic as they drive.',
        ],
      },
      {
        type: 'callout',
        tone: 'why',
        html: 'The split keeps the lesson honest. Algorithms choose routes on a graph snapshot; delivery vehicles then live in a changing world. That is why the app can show both “what the algorithm believed” and “what happened on the street.”',
      },
      {
        type: 'tryit',
        scenario: 'first-delivery',
        label: 'Run a first delivery',
      },
    ],
    tryIt: 'first-delivery',
    related: ['how-to-use', 'edge-cost', 'reroute-triggers', 'race'],
  },
];
