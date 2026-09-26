/** Small geometry helpers shared by the city generator, algorithms and renderers. */

/** Euclidean distance between two points. */
export function dist(x1, y1, x2, y2) {
  return Math.hypot(x2 - x1, y2 - y1);
}

/** Linear interpolation between a and b. */
export function lerp(a, b, t) {
  return a + (b - a) * t;
}

/** Clamp x to [min, max]. */
export function clamp(x, min, max) {
  return Math.max(min, Math.min(max, x));
}

/**
 * Shortest distance from point (px, py) to the segment (x1,y1)-(x2,y2).
 */
export function pointToSegmentDistance(px, py, x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const lenSq = dx * dx + dy * dy;
  let t = lenSq === 0 ? 0 : ((px - x1) * dx + (py - y1) * dy) / lenSq;
  t = clamp(t, 0, 1);
  const cx = x1 + t * dx;
  const cy = y1 + t * dy;
  return dist(px, py, cx, cy);
}
