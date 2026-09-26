import { FACTS, ALGO } from '../facts.js';
import { peakIntensity } from '../../city/traffic.js';

const peakSeconds = ([hh, mm]) => Number(hh) * 3600 + Number(mm) * 60;
const PEAK_INTENSITY = peakIntensity(peakSeconds(FACTS.rushPeaks[0].split(':')));
const pct = (value) => `${Math.round(value * 100)}%`;
const speed = (roadClass) => `${FACTS.speedsKmh[roadClass]} km/h`;
const algoName = (id) => ALGO[id]?.name ?? id;

const sensitivityRows = Object.entries(FACTS.sensitivity).map(([roadClass, sensitivity]) => {
  const peakFactor = Math.max(FACTS.minTrafficFactor, Math.min(1, (1 - sensitivity * PEAK_INTENSITY) * 1));
  return [roadClass, speed(roadClass), pct(sensitivity), pct(peakFactor)];
});

/** Knowledge articles about live traffic and road closures. */
export const ARTICLES = [
  {
    id: 'traffic-model',
    title: 'What traffic changes',
    category: 'Traffic & closures',
    summary: 'Traffic makes some roads slower by changing their travel-time cost, without changing the street graph itself.',
    questions: ['What if there is traffic?'],
    tryIt: 'rush-hour-checks',
    related: ['edge-cost', 'reroute-triggers', 'reroute-decision'],
    blocks: [
      {
        type: 'p',
        html: 'Traffic does not add or remove roads. It changes the <strong>cost</strong> of an edge: the rider and the weighted algorithms treat a congested road as slower, so the same length can take more seconds.',
      },
      {
        type: 'formula',
        html: 'edge seconds = length metres ÷ (free-flow speed × traffic factor)',
      },
      {
        type: 'p',
        html: `The traffic factor is always between <code>${FACTS.minTrafficFactor}</code> and <code>1</code>. A factor of <code>1</code> means free-flow speed; <code>0.5</code> means the same road takes about twice as long.`,
      },
      {
        type: 'formula',
        html: `factor = clamp((1 − sensitivity × rush intensity) × noise, ${FACTS.minTrafficFactor}, 1)`,
      },
      {
        type: 'h',
        text: 'Time of day: two rush-hour peaks',
      },
      {
        type: 'p',
        html: `Rush intensity comes from two smooth peaks centred at <strong>${FACTS.rushPeaks[0]}</strong> and <strong>${FACTS.rushPeaks[1]}</strong>. Each peak spreads over about <strong>${FACTS.rushSpreadHours} hours</strong>, so congestion builds gradually and fades gradually instead of snapping on and off.`,
      },
      {
        type: 'diagram',
        id: 'traffic-day',
      },
      {
        type: 'h',
        text: 'Road classes react differently',
      },
      {
        type: 'table',
        head: ['Road class', 'Free-flow speed', 'Sensitivity', 'Example factor at peak, noise = 1'],
        rows: sensitivityRows,
      },
      {
        type: 'p',
        html: `The example column is computed from the same peak curve the app uses. Bridges and arterials are most sensitive here; local roads lose less speed at rush hour, so a weighted algorithm may prefer a slower-looking side street when the main road is jammed.`,
      },
      {
        type: 'h',
        text: 'Noise keeps roads from all changing together',
      },
      {
        type: 'p',
        html: `Every edge gets a stable noise multiplier in the range <code>${FACTS.noiseMin}</code>–<code>${FACTS.noiseMax}</code>. That makes neighbouring roads differ a little even when they share the same class and clock time.`,
      },
      {
        type: 'h',
        text: 'During the ride',
      },
      {
        type: 'p',
        html: `The rider’s live speed uses <code>edge speed × traffic factor × rider speed factor</code>, with a tiny floor so movement never divides by zero. The rider is marked congested when the current factor falls below about <strong>${FACTS.congestedPct}%</strong> of free-flow speed.`,
      },
      {
        type: 'h',
        text: 'The top-bar traffic chip',
      },
      {
        type: 'table',
        head: ['Traffic factor', 'Chip label'],
        rows: [
          ['> 80%', 'Free flowing'],
          ['> 60% and ≤ 80%', 'Building'],
          ['> 42% and ≤ 60%', 'Heavy'],
          ['≤ 42%', 'Rush hour'],
        ],
      },
      {
        type: 'p',
        html: 'The chip samples an arterial at the current clock time, so it is a readable headline, not a promise that every road has exactly that factor.',
      },
      {
        type: 'h',
        text: 'What the Simulate traffic toggle does',
      },
      {
        type: 'list',
        items: [
          'When <strong>Simulate traffic</strong> is on, weighted searches use the factor above, and the rider keeps using live traffic while moving.',
          'When it is off, the factor is <code>1</code> everywhere: roads use their free-flow speeds.',
          `<strong>${algoName('bfs')}</strong> ignores traffic because it is breadth-first search: it counts road segments, not travel seconds.`,
        ],
      },
      {
        type: 'p',
        html: 'Traffic is evaluated at the time the search runs. During the ride it is evaluated again for speed, ETA and reroute checks, so a trip planned before the evening peak can later discover a better route.',
      },
      {
        type: 'calc',
        id: 'edge-cost',
      },
      {
        type: 'tryit',
        scenario: 'rush-hour-checks',
        label: 'Try rush-hour checks',
      },
    ],
  },
  {
    id: 'closures',
    title: 'Road closures and blocked riders',
    category: 'Traffic & closures',
    summary: 'The Road-closure tool closes both directions, forces detours when possible, and makes riders wait when there is no way around.',
    questions: ['I saw a car passing even when the road is closed — why?', 'Why does the rider stop with ⛔?'],
    tryIt: 'closure-blocked',
    related: ['reroute-triggers', 'reroute-decision', 'reroute-monitor'],
    blocks: [
      {
        type: 'p',
        html: 'A closure is stronger than traffic: its edge is not merely slow, it is unusable. Searches avoid it and riders never start driving into a closed edge.',
      },
      {
        type: 'h',
        text: 'Using the Road-closure tool',
      },
      {
        type: 'steps',
        items: [
          'Turn on the <strong>Road-closure tool</strong>. The mode banner reminds you that your next road click will close a road.',
          `Click near a road, within about <code>${FACTS.pickEdgePx}</code> screen pixels. If the click is not close enough, the app asks you to click directly on a road.`,
          `The selected road closes for <strong>${FACTS.closureMin} sim-minutes</strong>, then the tool switches off automatically.`,
          'Clicking an already closed road reopens it immediately.',
        ],
      },
      {
        type: 'h',
        text: 'Both directions close',
      },
      {
        type: 'p',
        html: 'The graph stores a normal two-way street as two directed twin edges. Closing one closes its twin too, so riders cannot sneak through from the opposite direction.',
      },
      {
        type: 'diagram',
        id: 'twin-edges',
      },
      {
        type: 'callout',
        tone: 'warn',
        html: 'If you once saw a rider pass through a closed road, that was the old bug this version fixes: closures are symmetric and <code>stepMover</code> refuses to enter a closed edge from an intersection.',
      },
      {
        type: 'h',
        text: 'What happens to a rider',
      },
      {
        type: 'table',
        head: ['Situation', 'Result'],
        rows: [
          ['A closure is ahead on the remaining route and another path exists', 'The rider replans immediately; there is no gain threshold for closures.'],
          ['A closure is ahead and no path exists', 'The rider shows <strong>⛔ blocked</strong>, stops exactly where it is (even partway along its current road), and keeps rechecking every tick.'],
          ['The road reopens or another path opens', 'The rider becomes <strong>unblocked</strong> and continues.'],
          ['The rider is already partway along the edge that later closes', 'It finishes that edge, then replans from the far end.'],
        ],
      },
      {
        type: 'p',
        html: 'Blocked time is still real trip time. The rider is stationary, but elapsed seconds continue to increase until a usable route appears or the closed road reopens automatically.',
      },
      {
        type: 'h',
        text: 'The mid-edge rule',
      },
      {
        type: 'p',
        html: 'The closure scan excludes the edge the rider has already entered. If progress on the current edge is greater than zero, replanning starts from that edge’s far end; if the rider has not started it yet, replanning starts from the current intersection.',
      },
      {
        type: 'callout',
        tone: 'why',
        html: 'This avoids teleporting the rider backwards and avoids pretending it already crossed a road that closed just before it moved.',
      },
      {
        type: 'p',
        html: 'On screen you will see the closed-road badge, the route change if a detour exists, or the ⛔ blocked state plus narration if the rider must wait.',
      },
      {
        type: 'tryit',
        scenario: 'closure-blocked',
        label: 'Try a blocked closure',
      },
    ],
  },
];
