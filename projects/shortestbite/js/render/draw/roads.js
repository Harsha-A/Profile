/**
 * Shared road-network drawing, used by both `CanvasRenderer` and
 * `LeafletRenderer` so the two renderers stay visually identical.
 *
 * Two-pass rendering gives roads real depth: every segment's dark *casing* is
 * stroked first, then every segment's lighter *fill* on top, so intersections
 * read as continuous roads instead of overlapping sticks.
 *
 * Segments are bucketed by draw style and stroked as batched paths, which is
 * meaningfully faster than the one-stroke-per-edge approach it replaces.
 *
 * This runs on the *static* roads layer only — it must never be called from
 * the per-frame animation loop.
 */
import { PALETTE, trafficTint } from '../palette.js';
import { applyLighting, lightingFor, mixHex } from '../lighting.js';

/** Relative stroke widths per road class, before any zoom scaling. */
export const ROAD_WIDTH = { highway: 5, arterial: 3.5, local: 1.6, bridge: 3 };

/** Painter's order: minor roads first so major roads sit visually on top. */
const CLASS_ORDER = { local: 0, bridge: 1, arterial: 2, highway: 3 };

/**
 * @param {CanvasRenderingContext2D} ctx
 * @param {object} opts
 * @param {object} opts.graph                CSR graph
 * @param {(x:number,y:number)=>[number,number]} opts.project  world -> screen
 * @param {Set<string>} opts.directedPairs   "from:to" keys, for one-way detection
 * @param {Function|null} opts.trafficFactorFn
 * @param {number} opts.simTime
 * @param {boolean} opts.showOneWayArrows
 * @param {(roadClass:string)=>number} opts.widthFor  final px width per class
 * @param {string} opts.lightingKey          time-of-day bucket key
 * @param {{w:number,h:number}} opts.viewport used to cull offscreen segments
 */
export function drawRoadNetwork(ctx, opts) {
  const {
    graph: g,
    project,
    directedPairs,
    trafficFactorFn,
    simTime,
    showOneWayArrows,
    widthFor,
    lightingKey = 'day',
    viewport,
  } = opts;
  if (!g) return;

  const lighting = lightingFor(lightingKey);
  const buckets = new Map();
  const arrows = [];

  const pad = 64;
  const minX = -pad;
  const minY = -pad;
  const maxX = (viewport?.w ?? 0) + pad;
  const maxY = (viewport?.h ?? 0) + pad;
  const cull = Boolean(viewport?.w && viewport?.h);

  const seen = new Set();
  for (let e = 0; e < g.edgeCount; e++) {
    const from = g.edgeFrom[e];
    const to = g.edgeTo[e];
    const key = from < to ? `${from}:${to}` : `${to}:${from}`;
    if (seen.has(key)) continue; // each undirected road drawn once
    seen.add(key);

    const [x1, y1] = project(g.nodeX[from], g.nodeY[from]);
    const [x2, y2] = project(g.nodeX[to], g.nodeY[to]);

    if (cull) {
      if ((x1 < minX && x2 < minX) || (x1 > maxX && x2 > maxX)) continue;
      if ((y1 < minY && y2 < minY) || (y1 > maxY && y2 > maxY)) continue;
    }

    const roadClass = g.edge(e).roadClass;
    const closed = g.edgeClosed[e] === 1;
    const style = roadStyle(roadClass, closed, trafficFactorFn, simTime, e, lighting);

    const bucketKey = `${roadClass}|${style.color}|${style.closed ? 'x' : '-'}`;
    let bucket = buckets.get(bucketKey);
    if (!bucket) {
      bucket = {
        roadClass,
        color: style.color,
        closed: style.closed,
        glow: style.glow,
        segments: [],
      };
      buckets.set(bucketKey, bucket);
    }
    bucket.segments.push(x1, y1, x2, y2);

    if (showOneWayArrows) {
      const forward = directedPairs.has(`${from}:${to}`);
      const backward = directedPairs.has(`${to}:${from}`);
      if (forward !== backward) {
        arrows.push(forward ? [x1, y1, x2, y2] : [x2, y2, x1, y1]);
      }
    }
  }

  const ordered = [...buckets.values()].sort(
    (a, b) => (CLASS_ORDER[a.roadClass] ?? 0) - (CLASS_ORDER[b.roadClass] ?? 0)
  );

  ctx.save();
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  // Pass 1 — casings. Dark outline slightly wider than the fill.
  ctx.strokeStyle = lighting.casing;
  for (const bucket of ordered) {
    const w = widthFor(bucket.roadClass);
    if (w < 1.6) continue; // hairline roads get no casing; it would just muddy them
    ctx.lineWidth = w + Math.max(1.2, w * 0.55);
    strokeSegments(ctx, bucket.segments);
  }

  // Pass 2 — fills, with an optional glow on major roads at low light.
  for (const bucket of ordered) {
    const w = widthFor(bucket.roadClass);
    ctx.strokeStyle = bucket.color;

    if (bucket.glow > 0) {
      ctx.save();
      ctx.shadowColor = bucket.color;
      ctx.shadowBlur = bucket.glow;
      ctx.globalAlpha = 0.9;
      ctx.lineWidth = w;
      strokeSegments(ctx, bucket.segments);
      ctx.restore();
    }

    ctx.globalAlpha = bucket.closed ? 0.95 : 1;
    ctx.lineWidth = w;
    if (bucket.closed) ctx.setLineDash([w * 2.2, w * 1.8]);
    strokeSegments(ctx, bucket.segments);
    if (bucket.closed) ctx.setLineDash([]);
    ctx.globalAlpha = 1;
  }

  if (arrows.length) {
    ctx.fillStyle = PALETTE.oneWayArrow;
    for (const [sx, sy, ex, ey] of arrows) drawOneWayArrow(ctx, sx, sy, ex, ey);
  }

  ctx.restore();
}

function strokeSegments(ctx, flat) {
  ctx.beginPath();
  for (let i = 0; i < flat.length; i += 4) {
    ctx.moveTo(flat[i], flat[i + 1]);
    ctx.lineTo(flat[i + 2], flat[i + 3]);
  }
  ctx.stroke();
}

function roadStyle(roadClass, closed, trafficFactorFn, simTime, edgeId, lighting) {
  if (closed) {
    return { color: PALETTE.roadClassClosed, closed: true, glow: 0 };
  }
  let color = PALETTE.roadClass[roadClass] ?? PALETTE.roadClass.local;
  if (trafficFactorFn && roadClass !== 'local') {
    // Blend the traffic tint in by severity rather than replacing the colour.
    // Free-flowing roads keep their class colour, so the road hierarchy stays
    // readable and a colour shift always *means* traffic is building.
    const factor = trafficFactorFn(roadClass, simTime, edgeId);
    const severity = Math.max(0, Math.min(1, (0.8 - factor) / 0.4));
    if (severity > 0.01) color = mixHex(color, trafficTint(factor), severity * 0.85);
  }
  color = applyLighting(color, lighting);
  const major = roadClass === 'highway' || roadClass === 'arterial' || roadClass === 'bridge';
  return { color, closed: false, glow: major ? lighting.glow * 14 : 0 };
}

/** Small arrowhead at a segment's midpoint, pointing from (sx,sy) to (ex,ey). */
export function drawOneWayArrow(ctx, sx, sy, ex, ey) {
  const mx = (sx + ex) / 2;
  const my = (sy + ey) / 2;
  const angle = Math.atan2(ey - sy, ex - sx);
  ctx.save();
  ctx.translate(mx, my);
  ctx.rotate(angle);
  ctx.beginPath();
  ctx.moveTo(6, 0);
  ctx.lineTo(-4, -4);
  ctx.lineTo(-4, 4);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

/** Soft radial vignette, drawn last on the roads layer to focus the centre. */
export function drawVignette(ctx, w, h) {
  if (!w || !h) return;
  const grad = ctx.createRadialGradient(w / 2, h / 2, Math.min(w, h) * 0.35, w / 2, h / 2, Math.max(w, h) * 0.78);
  grad.addColorStop(0, 'rgba(0,0,0,0)');
  grad.addColorStop(1, 'rgba(0,0,0,0.45)');
  ctx.save();
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);
  ctx.restore();
}
