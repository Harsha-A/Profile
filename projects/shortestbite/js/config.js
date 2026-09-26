/** All tunable defaults live here; controls can override some of them at runtime. */
export const CONFIG = {
  seed: 42,
  city: {
    cols: 45,
    rows: 30,
    spacingM: 120,
    jitterM: 25,
    dropRate: 0.15,
    oneWayRate: 0.1,
    river: true,
    bridges: 3,
    diagonals: 6,
    speedsKmh: { highway: 60, arterial: 40, local: 20, bridge: 30 },
  },
  sim: { dt: 1, speed: 1, startTime: 11 * 3600, maxTicksPerFrame: 600 },
  movers: { speedFactor: 1, rerouteIntervalSec: 10, rerouteMinGain: 0.05, rerouteMinGainSec: 30 },
  traffic: { peakMultiplier: 3 },
  ui: {
    pickNodePx: 36, // a click selects the nearest intersection within this many screen pixels
    pickEdgePx: 14, // the closure tool selects the nearest road within this many screen pixels
    raceSpeed: 20, // races auto-switch the clock to at least this speed
    speeds: [1, 5, 20, 60],
  },
};
