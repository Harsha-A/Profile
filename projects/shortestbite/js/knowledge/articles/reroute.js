import { FACTS, ALGO } from '../facts.js';
import { rerouteDecision, rerouteThresholdSec } from '../../movers/routing.js';

const sec = (value) => `${Math.round(value)} s`;
const min = (value) => `${Math.round(value / 60)} min`;
const oneDecimalMin = (value) => `${Math.round((value / 60) * 10) / 10} min`;
const algoName = (id) => ALGO[id]?.name ?? id;
const fastestSpeed = Math.max(...FACTS.clockSpeeds);

function example(remainingSec, bestAltSec, blocked = false) {
  const gainSec = Number.isFinite(bestAltSec) ? remainingSec - bestAltSec : 0;
  const thresholdSec = rerouteThresholdSec(remainingSec, {
    minGain: FACTS.rerouteMinGain,
    minGainSec: FACTS.rerouteMinGainSec,
  });
  const decision = rerouteDecision({
    remainingSec,
    bestAltSec,
    blocked,
    minGain: FACTS.rerouteMinGain,
    minGainSec: FACTS.rerouteMinGainSec,
  });
  return { remainingSec, bestAltSec, gainSec, thresholdSec, decision };
}

const EXAMPLES = [
  example(8 * 60, 7.3 * 60),
  example(20 * 60, 19.2 * 60),
  example(12 * 60, Infinity, true),
];

const decisionRows = EXAMPLES.map((ex) => [
  oneDecimalMin(ex.remainingSec),
  Number.isFinite(ex.bestAltSec) ? oneDecimalMin(ex.bestAltSec) : 'no path',
  Number.isFinite(ex.bestAltSec) ? sec(ex.gainSec) : '—',
  sec(ex.thresholdSec),
  ex.decision,
]);

/** Knowledge articles about rerouting decisions and the reroute monitor. */
export const ARTICLES = [
  {
    id: 'reroute-triggers',
    title: 'When rerouting is triggered',
    category: 'Rerouting',
    summary: 'Rerouting is checked for closures immediately and for traffic periodically, with a special rule for riders already mid-edge.',
    questions: ['Does rerouting really happen? How does it work?', 'When is a rerouting triggered? What\'s the criteria?'],
    tryIt: 'closure-reroute',
    related: ['closures', 'reroute-decision', 'reroute-monitor'],
    blocks: [
      {
        type: 'p',
        html: 'Yes, rerouting really happens, but it is not random and it is not checked for every possible reason. The app has exactly two reroute triggers.',
      },
      {
        type: 'h',
        text: 'Trigger 1: a closure on the remaining route',
      },
      {
        type: 'p',
        html: 'Every simulation tick, each rider scans the untravelled part of its route. If any remaining edge is closed, it immediately tries to replan. A closure has no minimum-savings threshold because the current route is broken.',
      },
      {
        type: 'h',
        text: 'Trigger 2: a periodic traffic check',
      },
      {
        type: 'p',
        html: `For weighted algorithms, each rider checks whether traffic has made a better route worthwhile: once on its first tick after setting off, then every <strong>${FACTS.rerouteIntervalSec} simulated seconds</strong>. <strong>${algoName('bfs')}</strong> does not do this because it ignores traffic costs.`,
      },
      {
        type: 'h',
        text: 'What is not a trigger',
      },
      {
        type: 'list',
        items: [
          'The map repainting is not a reroute trigger.',
          'Every animation frame is not a traffic reroute trigger.',
          'A tiny improvement is not enough for a traffic reroute; it must pass the threshold in <a data-kb="reroute-decision">the decision rule</a>.',
          'Changing traffic does not affect <strong>Fewest turns</strong>; it counts segments, not seconds.',
        ],
      },
      {
        type: 'h',
        text: 'The mid-edge rule',
      },
      {
        type: 'p',
        html: 'If the rider has already started an edge, the closure scan ignores that current edge and replans from its far end. If it has not started the edge yet, replanning starts from the current intersection, so a just-closed next road is not treated as already crossed.',
      },
      {
        type: 'table',
        head: ['Sim time', 'Event', 'Decision'],
        rows: [
          ['00:00', 'Route is planned with current traffic.', 'Rider starts on the chosen route.'],
          [`00:${String(FACTS.rerouteIntervalSec).padStart(2, '0')}`, 'Traffic check is due.', 'Keep if the best alternative does not save enough.'],
          ['00:13', 'A remaining road is closed.', 'Closure check runs immediately and replans if any path exists.'],
          ['00:14', 'No path exists around the closure.', 'Rider becomes ⛔ blocked and waits.'],
          [`${FACTS.closureMin}:13`, 'The road auto-reopens.', 'Rider is unblocked and continues.'],
        ],
      },
      {
        type: 'callout',
        tone: 'why',
        html: 'The rider checks closures often because a closed edge invalidates the planned route. Traffic is checked periodically because small traffic changes usually do not justify changing course.',
      },
      {
        type: 'diagram',
        id: 'reroute-flow',
      },
      {
        type: 'tryit',
        scenario: 'closure-reroute',
        label: 'Try a closure reroute',
      },
    ],
  },
  {
    id: 'reroute-decision',
    title: 'How the reroute decision is made',
    category: 'Rerouting',
    summary: 'A reroute check compares the remaining current route against a fresh best route, then applies the closure and savings rules.',
    questions: ['How is the rerouting decision made?'],
    tryIt: 'closure-reroute',
    related: ['reroute-triggers', 'reroute-why-not-every-tick', 'reroute-monitor'],
    blocks: [
      {
        type: 'p',
        html: 'A reroute check is a like-for-like comparison. It prices the rest of the current route with the same traffic function and the same simulated time used to price a new alternative.',
      },
      {
        type: 'steps',
        items: [
          'Choose the replan node: the current intersection, or the far end of the current edge if the rider is already partway across it.',
          'Compute <code>remainingSec</code>: the cost of the rest of the current route at current traffic. If a remaining edge is closed, this becomes unusable for closure handling.',
          'Run the same algorithm the rider originally uses from the replan node to the drop-off.',
          'Read the candidate route cost as <code>bestAltSec</code>. If there is no path: for a closure the rider becomes blocked; for a traffic check nothing changes and the current route is kept.',
          'Compute <code>gainSec = remainingSec − bestAltSec</code>.',
          'Compute the threshold and decide whether switching is worth it.',
        ],
      },
      {
        type: 'formula',
        html: `thresholdSec = max(${FACTS.rerouteMinGainSec} s, ${FACTS.rerouteMinGainPct}% × remainingSec)`,
      },
      {
        type: 'p',
        html: `Below <strong>${min(FACTS.rerouteCrossoverSec)}</strong> remaining, the fixed <code>${FACTS.rerouteMinGainSec} s</code> rule dominates. Above that, the <code>${FACTS.rerouteMinGainPct}%</code> rule is larger, so long trips need larger absolute savings before the rider changes course.`,
      },
      {
        type: 'diagram',
        id: 'reroute-threshold',
      },
      {
        type: 'h',
        text: 'Decision table',
      },
      {
        type: 'table',
        head: ['Check result', 'Decision'],
        rows: [
          ['Closure ahead and the algorithm finds a path', 'Reroute immediately.'],
          ['Closure ahead and the algorithm finds no path', 'Blocked: wait at the intersection and recheck.'],
          ['Traffic check and <code>gainSec ≥ thresholdSec</code>', 'Reroute.'],
          ['Traffic check and <code>gainSec < thresholdSec</code>', 'Keep the current route.'],
        ],
      },
      {
        type: 'h',
        text: 'Worked examples from the real functions',
      },
      {
        type: 'table',
        head: ['Remaining current route', 'Best alternative', 'Gain', 'Threshold', 'Decision'],
        rows: decisionRows,
      },
      {
        type: 'p',
        html: `The first example switches because the alternative saves ${sec(EXAMPLES[0].gainSec)}, which is at least the ${sec(EXAMPLES[0].thresholdSec)} threshold. The second keeps the current route because ${sec(EXAMPLES[1].gainSec)} is less than ${sec(EXAMPLES[1].thresholdSec)}. The blocked example has no path, so a closure check waits instead of inventing a route.`,
      },
      {
        type: 'calc',
        id: 'reroute',
      },
      {
        type: 'h',
        text: 'How the route is spliced',
      },
      {
        type: 'p',
        html: 'When a reroute wins, the app keeps the already travelled part of the route and replaces only the future edges with the new plan. If the rider is mid-edge, it preserves that edge progress and starts the new plan after the edge ends.',
      },
      {
        type: 'callout',
        tone: 'why',
        html: 'Splicing keeps the visual story honest: the faded old route shows what changed, but the rider does not jump backwards or erase roads it already drove.',
      },
      {
        type: 'h',
        text: 'What you see when the decision is reroute',
      },
      {
        type: 'list',
        items: [
          'The simulation emits a <code>mover:rerouteCheck</code> payload with remaining seconds, best alternative seconds, gain, threshold and decision.',
          'If the decision is <code>reroute</code>, it also emits <code>mover:rerouted</code>.',
          'The renderer flags the new route, the previous route fades, narration explains whether traffic or a closure caused it, and the monitor flashes.',
        ],
      },
      {
        type: 'diagram',
        id: 'reroute-flow',
      },
      {
        type: 'tryit',
        scenario: 'closure-reroute',
        label: 'Try the decision flow',
      },
    ],
  },
  {
    id: 'reroute-why-not-every-tick',
    title: 'Why rerouting is not every tick',
    category: 'Rerouting',
    summary: 'The app avoids constant replanning because it is costly, noisy, and often produces no real improvement.',
    questions: ['Why don\'t I see rerouting happening at every tick?'],
    tryIt: 'rush-hour-checks',
    related: ['traffic-model', 'reroute-triggers', 'reroute-decision'],
    blocks: [
      {
        type: 'p',
        html: `Traffic reroute checks are periodic: every <strong>${FACTS.rerouteIntervalSec} simulated seconds</strong> per rider, not every animation frame and not every search step. Closures are the urgent exception because a closed future edge can make the route impossible.`,
      },
      {
        type: 'h',
        text: 'Why not check constantly?',
      },
      {
        type: 'list',
        items: [
          'Running a full shortest-path search every tick for every rider costs work, especially on larger maps.',
          'Traffic changes smoothly, so adjacent ticks usually produce the same best route.',
          'A threshold adds hysteresis: the rider will not flap between two near-equal routes as their costs trade places by a second or two.',
          'Small savings may not be worth a new turn, a visual jump, or a confusing explanation.',
        ],
      },
      {
        type: 'formula',
        html: `switch only if saved seconds ≥ max(${FACTS.rerouteMinGainSec} s, ${FACTS.rerouteMinGainPct}% × remaining seconds)`,
      },
      {
        type: 'callout',
        tone: 'why',
        html: 'This is why the monitor can say the best alternative saves 0s. Most of the time, the current route is still the best route at the current clock time.',
      },
      {
        type: 'h',
        text: 'How to provoke a traffic reroute',
      },
      {
        type: 'steps',
        items: [
          'Turn <strong>Simulate traffic</strong> on.',
          'Use a long pickup-to-drop-off route that includes arterials or bridges.',
          `Move near ${FACTS.rushPeaks[0]} or ${FACTS.rushPeaks[1]}, when sensitive roads slow down most.`,
          `Run at <strong>${fastestSpeed}×</strong> so the periodic checks happen quickly in real time.`,
          `Use a weighted algorithm such as <strong>${algoName('dijkstra')}</strong> or <strong>${algoName('astar')}</strong>; <strong>${algoName('bfs')}</strong> will not traffic-reroute.`,
        ],
      },
      {
        type: 'p',
        html: 'Even then, the app may keep the route if the alternative is only a little better. That is expected, not a failure of rerouting.',
      },
      {
        type: 'diagram',
        id: 'reroute-threshold',
      },
      {
        type: 'tryit',
        scenario: 'rush-hour-checks',
        label: 'Try rush-hour checks',
      },
    ],
  },
  {
    id: 'reroute-monitor',
    title: 'Reading the reroute monitor',
    category: 'Rerouting',
    summary: 'The HUD explains the last reroute check: what was compared, how much time it saved, and whether the rider is blocked.',
    tryIt: 'closure-reroute',
    related: ['reroute-decision', 'reroute-triggers', 'closures'],
    blocks: [
      {
        type: 'p',
        html: 'The reroute monitor sits inside the rider HUD, next to the live ETA. It appears when the primary rider has a reroute check to explain.',
      },
      {
        type: 'h',
        text: 'Status sentence',
      },
      {
        type: 'table',
        head: ['Words you see', 'Meaning'],
        rows: [
          ['<code>Checked a new route · best alternative saves … · needs ≥… to switch</code>', 'A traffic check ran, but the gain did not reach the threshold.'],
          ['<code>Switched route · saves …</code>', 'A traffic check decided the saving beat the threshold, so the rider rerouted and the monitor flashes.'],
          ['<code>Road ahead closed · switched to the best way around</code>', 'A closure on the remaining route forced an immediate switch; no threshold applies.'],
          ['<code>Road ahead closed and no way around · waiting for it to reopen</code>', 'The rider is blocked because a closure leaves no path.'],
        ],
      },
      {
        type: 'h',
        text: 'The bar',
      },
      {
        type: 'p',
        html: 'The filled bar represents the saving found by the check. The marker represents the threshold; when the saving reaches the required level, the decision can become <code>reroute</code>.',
      },
      {
        type: 'p',
        html: 'The bar is explanatory, not a speedometer. It is scaled to make the threshold visible, so use the status sentence for the exact seconds.',
      },
      {
        type: 'h',
        text: 'Caption copy',
      },
      {
        type: 'p',
        html: `The caption says <code>checks every ${FACTS.rerouteIntervalSec}s of sim time, instantly if a road closes</code>. The closure part is immediate because a closure can break the route.`,
      },
      {
        type: 'h',
        text: 'Blocked state',
      },
      {
        type: 'p',
        html: 'When the rider is blocked, the monitor uses its blocked styling and the same waiting sentence as the blocked event. It stays until a route opens and the rider becomes unblocked.',
      },
      {
        type: 'callout',
        tone: 'tip',
        html: 'If you see repeated keep decisions, open <a data-kb="reroute-decision">How the reroute decision is made</a>: it usually means the current route is still best or the saving is below threshold.',
      },
      {
        type: 'tryit',
        scenario: 'closure-reroute',
        label: 'Try the monitor',
      },
    ],
  },
];
