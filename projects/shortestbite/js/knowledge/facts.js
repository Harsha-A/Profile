/**
 * Every number the Knowledge articles quote, derived from the code that
 * actually uses it — so an article can never contradict the simulation.
 * DOM-free; safe to import from Node tests.
 */
import { CONFIG } from '../config.js';
import { CLASS_SENSITIVITY, RUSH_HOURS, NOISE_MIN, NOISE_SPAN } from '../city/traffic.js';
import { DEFAULT_CLOSURE_SEC } from '../movers/simulation.js';
import { CONGESTED_FACTOR } from '../movers/mover.js';
import { OVERESTIMATE_FACTOR, ALGORITHM_NAMES } from '../movers/routing.js';
import { OSM_HEURISTIC_SCALE } from '../city/osm-city.js';
import { ALGORITHMS } from '../ui/algo-picker.js';
import { STAT_HELP } from '../ui/stat-help.js';

const hhmm = (sec) => {
  const h = Math.floor(sec / 3600) % 24;
  const m = Math.floor((sec % 3600) / 60);
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
};

export const FACTS = Object.freeze({
  rerouteIntervalSec: CONFIG.movers.rerouteIntervalSec,
  rerouteMinGainSec: CONFIG.movers.rerouteMinGainSec,
  rerouteMinGainPct: Math.round(CONFIG.movers.rerouteMinGain * 100),
  rerouteMinGain: CONFIG.movers.rerouteMinGain,
  /** Remaining time above which the % rule, not the fixed seconds, sets the bar. */
  rerouteCrossoverSec: CONFIG.movers.rerouteMinGainSec / CONFIG.movers.rerouteMinGain,
  closureSec: DEFAULT_CLOSURE_SEC,
  closureMin: DEFAULT_CLOSURE_SEC / 60,
  rushPeaks: RUSH_HOURS.map((r) => hhmm(r.center)),
  rushSpreadHours: RUSH_HOURS[0].sd / 3600,
  sensitivity: { ...CLASS_SENSITIVITY },
  noiseMin: NOISE_MIN,
  noiseMax: NOISE_MIN + NOISE_SPAN,
  minTrafficFactor: 0.1,
  congestedPct: Math.round(CONGESTED_FACTOR * 100),
  speedsKmh: { ...CONFIG.city.speedsKmh },
  simDtSec: CONFIG.sim.dt,
  startClock: hhmm(CONFIG.sim.startTime),
  clockSpeeds: [...CONFIG.ui.speeds],
  raceSpeed: CONFIG.ui.raceSpeed,
  pickNodePx: CONFIG.ui.pickNodePx,
  pickEdgePx: CONFIG.ui.pickEdgePx,
  overestimateFactor: OVERESTIMATE_FACTOR,
  osmHeuristicScale: OSM_HEURISTIC_SCALE,
  city: { cols: CONFIG.city.cols, rows: CONFIG.city.rows, spacingM: CONFIG.city.spacingM, bridges: CONFIG.city.bridges, seed: CONFIG.seed },
  algorithmIds: [...ALGORITHM_NAMES],
});

/** Plain-language names/tags per algorithm id, straight from the picker cards. */
export const ALGO = Object.freeze(Object.fromEntries(ALGORITHMS.map((a) => [a.id, a])));

/** Stat labels and help texts, straight from the ⓘ popovers. */
export const STATS = STAT_HELP;
