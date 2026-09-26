/**
 * Time-of-day lighting model.
 *
 * The simulation already tracks a 24h clock; this turns that clock into a set
 * of colour tokens the renderers use to tint the map. Crucially the result is
 * *bucketed* (see `lightingBucket`) so the expensive roads layer is only
 * re-tinted when the bucket changes, not on every tick.
 */

const PHASES = [
  {
    key: 'night',
    background: '#0a0d14',
    casing: 'rgba(3, 6, 12, 0.9)',
    roadMix: [0.55, '#1b2a44'],
    glow: 0.55,
    overlayAlpha: 0.95,
    label: 'Night',
  },
  {
    key: 'dawn',
    background: '#141a26',
    casing: 'rgba(8, 11, 20, 0.85)',
    roadMix: [0.3, '#3b4a6b'],
    glow: 0.35,
    overlayAlpha: 0.9,
    label: 'Dawn',
  },
  {
    key: 'day',
    background: '#12161c',
    casing: 'rgba(6, 9, 14, 0.8)',
    roadMix: [0, '#000000'],
    glow: 0.15,
    overlayAlpha: 0.85,
    label: 'Daytime',
  },
  {
    key: 'dusk',
    background: '#171320',
    casing: 'rgba(10, 6, 14, 0.85)',
    roadMix: [0.28, '#6b3f2a'],
    glow: 0.45,
    overlayAlpha: 0.9,
    label: 'Dusk',
  },
];

const BY_KEY = Object.fromEntries(PHASES.map((p) => [p.key, p]));

/**
 * Coarse bucket for a sim time (seconds since midnight). Returns one of
 * 'night' | 'dawn' | 'day' | 'dusk'. Callers compare this against the previous
 * bucket and only mark roads dirty on a change.
 */
export function lightingBucket(simTimeSeconds) {
  const hour = ((simTimeSeconds / 3600) % 24 + 24) % 24;
  if (hour < 5 || hour >= 20) return 'night';
  if (hour < 8) return 'dawn';
  if (hour < 17) return 'day';
  return 'dusk';
}

/** Full lighting token set for a bucket key. */
export function lightingFor(bucketKey) {
  return BY_KEY[bucketKey] ?? BY_KEY.day;
}

/** Convenience: bucket + tokens straight from a sim time. */
export function lightingAt(simTimeSeconds) {
  return lightingFor(lightingBucket(simTimeSeconds));
}

/**
 * Blend a road colour toward the phase's ambient hue. Pure function over the
 * hex colours already in the palette, so no new colour tokens are required.
 */
export function applyLighting(hexColor, lighting) {
  const [amount, tintHex] = lighting.roadMix;
  if (!amount) return hexColor;
  return mixHex(hexColor, tintHex, amount);
}

export function mixHex(aHex, bHex, t) {
  const a = parseHex(aHex);
  const b = parseHex(bHex);
  if (!a || !b) return aHex;
  const r = Math.round(a[0] + (b[0] - a[0]) * t);
  const g = Math.round(a[1] + (b[1] - a[1]) * t);
  const bl = Math.round(a[2] + (b[2] - a[2]) * t);
  return `rgb(${r}, ${g}, ${bl})`;
}

function parseHex(hex) {
  if (typeof hex !== 'string') return null;
  let h = hex.trim();
  if (h.startsWith('#')) h = h.slice(1);
  if (h.length === 3) h = h.split('').map((c) => c + c).join('');
  if (h.length !== 6) return null;
  const n = Number.parseInt(h, 16);
  if (Number.isNaN(n)) return null;
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
