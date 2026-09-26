/** Colour tokens shared by the renderers. Kept in one place so the canvas
 * and Leaflet renderers stay visually consistent. */
export const PALETTE = {
  background: '#12161c',
  roadClass: {
    highway: '#f2a154',
    arterial: '#e0c341',
    local: '#3a4553',
    bridge: '#7dd3fc',
  },
  roadClassClosed: '#7f1d1d',
  oneWayArrow: '#8b96a5',
  pinStart: '#4ade80',
  pinEnd: '#f87171',
  moverDefault: '#38bdf8',
  moverTrail: 'rgba(56, 189, 248, 0.55)',
  compareA: '#60a5fa',
  compareB: '#fb923c',
  settleGradientStart: [56, 189, 248], // cool
  settleGradientEnd: [167, 139, 250], // violet
  frontier: 'rgba(226, 232, 240, 0.75)',
  frontierGlow: 'rgba(125, 211, 252, 0.9)',
  finalPath: '#facc15',
  highlight: '#ffffff',

  // Rider sprite
  riderHelmet: '#e2e8f0',
  riderBox: '#f97316',
  riderCongested: '#fbbf24',

  // Animated congestion overlay
  congestionLight: '#facc15',
  congestionHeavy: '#f87171',
};

/** Traffic-factor tint: green (free-flowing) -> amber -> red (congested). */
export function trafficTint(factor) {
  const f = Math.max(0, Math.min(1, factor));
  if (f > 0.66) return '#4ade80';
  if (f > 0.4) return '#facc15';
  return '#f87171';
}

/** Linear-interpolated colour along the settle-order gradient, t in [0,1]. */
export function settleGradient(t) {
  const [r1, g1, b1] = PALETTE.settleGradientStart;
  const [r2, g2, b2] = PALETTE.settleGradientEnd;
  const r = Math.round(r1 + (r2 - r1) * t);
  const g = Math.round(g1 + (g2 - g1) * t);
  const b = Math.round(b1 + (b2 - b1) * t);
  return `rgb(${r}, ${g}, ${b})`;
}

/** Human-readable congestion regime for the current traffic factor. */
export function congestionLabel(factor) {
  if (factor > 0.8) return 'Free flowing';
  if (factor > 0.6) return 'Building';
  if (factor > 0.42) return 'Heavy';
  return 'Rush hour';
}
