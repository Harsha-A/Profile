/**
 * Shared route drawing: the chosen path, with an animated draw-in from A to B
 * and a slow dash "flow" afterwards that implies direction of travel.
 */

/**
 * @param {CanvasRenderingContext2D} ctx
 * @param {object} opts
 * @param {Array<[number,number]>} opts.points  already-projected screen points
 * @param {string} opts.color
 * @param {number} [opts.width=5]
 * @param {number} [opts.progress=1]  0..1 draw-in fraction
 * @param {number} [opts.startProgress=0]  0..1 start fraction for partial route segments
 * @param {number} [opts.time=0]      ms, drives the flow animation
 * @param {boolean} [opts.flow=true]
 * @param {boolean} [opts.reducedMotion=false]
 * @param {boolean} [opts.glow=true]
 * @param {boolean} [opts.dim=false]  render as a faded "previous route"
 */
export function drawRoute(ctx, opts) {
  const {
    points,
    color,
    width = 5,
    progress = 1,
    startProgress = 0,
    time = 0,
    flow = true,
    reducedMotion = false,
    glow = true,
    dim = false,
  } = opts;
  if (!points || points.length < 2) return;

  const pts = startProgress > 0
    ? slicePolyline(points, startProgress, progress)
    : (progress >= 1 ? points : truncatePolyline(points, progress));
  if (pts.length < 2) return;

  ctx.save();
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';

  const trace = () => {
    ctx.beginPath();
    ctx.moveTo(pts[0][0], pts[0][1]);
    for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
  };

  if (dim) ctx.globalAlpha = 0.28;

  // Dark casing so the route stays legible over bright/congested roads.
  ctx.strokeStyle = 'rgba(8, 11, 18, 0.75)';
  ctx.lineWidth = width + 4;
  trace();
  ctx.stroke();

  if (glow && !dim) {
    ctx.save();
    ctx.shadowColor = color;
    ctx.shadowBlur = 16;
    ctx.strokeStyle = color;
    ctx.globalAlpha = 0.55;
    ctx.lineWidth = width;
    trace();
    ctx.stroke();
    ctx.restore();
  }

  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  trace();
  ctx.stroke();

  if (flow && !reducedMotion && !dim) {
    const dash = width * 2.6;
    const gap = width * 3.4;
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    ctx.globalAlpha = 0.45;
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = width * 0.5;
    ctx.setLineDash([dash, gap]);
    ctx.lineDashOffset = -((time * 0.04) % (dash + gap));
    trace();
    ctx.stroke();
    ctx.restore();
  }

  // Leading "comet" head while the route is still drawing in.
  if (progress < 1 && !reducedMotion && !dim) {
    const [hx, hy] = pts[pts.length - 1];
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    ctx.fillStyle = color;
    ctx.shadowColor = color;
    ctx.shadowBlur = 18;
    ctx.beginPath();
    ctx.arc(hx, hy, width * 0.9, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  ctx.restore();
}

/** Cut a polyline at `fraction` of its total length, interpolating the final point. */
export function truncatePolyline(points, fraction) {
  return slicePolyline(points, 0, fraction);
}

/** Slice a polyline between two fractions of its total length. */
export function slicePolyline(points, startFraction, endFraction) {
  const start = Math.max(0, Math.min(1, startFraction));
  const end = Math.max(start, Math.min(1, endFraction));
  if (start === 0 && end >= 1) return points;
  if (!points || points.length < 2) return points ?? [];

  const pointAt = (target, segLens, total) => {
    if (target <= 0) return points[0];
    if (target >= total) return points[points.length - 1];
    let acc = 0;
    for (let i = 0; i < segLens.length; i++) {
      const next = acc + segLens[i];
      if (next >= target) {
        const t = segLens[i] === 0 ? 0 : (target - acc) / segLens[i];
        const [x1, y1] = points[i];
        const [x2, y2] = points[i + 1];
        return [x1 + (x2 - x1) * t, y1 + (y2 - y1) * t];
      }
      acc = next;
    }
    return points[points.length - 1];
  };

  let total = 0;
  const segLens = [];
  for (let i = 1; i < points.length; i++) {
    const d = Math.hypot(points[i][0] - points[i - 1][0], points[i][1] - points[i - 1][1]);
    segLens.push(d);
    total += d;
  }
  if (total === 0) return [points[0]];

  const startDistance = total * start;
  const endDistance = total * end;
  const out = [pointAt(startDistance, segLens, total)];
  let acc = 0;
  for (let i = 0; i < segLens.length; i++) {
    const next = acc + segLens[i];
    if (next > startDistance && next < endDistance) out.push(points[i + 1]);
    acc = next;
  }
  out.push(pointAt(endDistance, segLens, total));
  return out;
}
