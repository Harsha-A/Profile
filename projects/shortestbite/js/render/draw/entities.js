/**
 * Shared entity drawing: the rider sprite, its motion trail, and the pickup /
 * drop-off markers. Runs on the per-frame entities layer.
 *
 * Trails are stored in *world* coordinates keyed by mover id, so they survive
 * panning, zooming and even a renderer swap.
 */
import { PALETTE } from '../palette.js';

const TRAIL_MAX = 28;
const trails = new Map(); // moverId -> [[x, y], ...] newest last

export function recordTrail(moverId, x, y) {
  let t = trails.get(moverId);
  if (!t) {
    t = [];
    trails.set(moverId, t);
  }
  const last = t[t.length - 1];
  if (last && Math.hypot(last[0] - x, last[1] - y) < 1.5) return;
  t.push([x, y]);
  if (t.length > TRAIL_MAX) t.shift();
}

export function clearTrails(moverId) {
  if (moverId == null) trails.clear();
  else trails.delete(moverId);
}

/** Fading motion trail behind a rider. */
export function drawTrail(ctx, { moverId, project, color, reducedMotion }) {
  if (reducedMotion) return;
  const t = trails.get(moverId);
  if (!t || t.length < 2) return;

  ctx.save();
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.strokeStyle = color ?? PALETTE.moverTrail;
  for (let i = 1; i < t.length; i++) {
    const a = project(t[i - 1][0], t[i - 1][1]);
    const b = project(t[i][0], t[i][1]);
    const f = i / t.length;
    ctx.globalAlpha = 0.45 * f * f;
    ctx.lineWidth = 1 + 3.5 * f;
    ctx.beginPath();
    ctx.moveTo(a[0], a[1]);
    ctx.lineTo(b[0], b[1]);
    ctx.stroke();
  }
  ctx.restore();
}

/**
 * The rider: a top-down scooter drawn with plain canvas paths (keeps the app
 * dependency-free). Rotates to heading, bobs gently while moving, and dims to
 * an amber body when stuck in traffic.
 */
export function drawRider(ctx, x, y, headingRad, opts = {}) {
  const {
    color = PALETTE.moverDefault,
    time = 0,
    moving = true,
    blocked = false,
    congested = false,
    reducedMotion = false,
    scale = 1,
  } = opts;

  const bob = moving && !reducedMotion ? Math.sin(time * 0.012) * 0.6 : 0;
  const body = color;

  ctx.save();
  ctx.translate(x, y + bob);

  // Colour halo keeps same-lane race riders visible even when sprites overlap.
  ctx.save();
  ctx.globalAlpha = congested ? 0.45 : 0.32;
  ctx.strokeStyle = color;
  ctx.lineWidth = congested ? 3.2 * scale : 2.4 * scale;
  ctx.beginPath();
  ctx.arc(0, 0, 11.5 * scale, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();

  // Ground shadow stays unrotated so it reads as a real shadow.
  ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
  ctx.beginPath();
  ctx.ellipse(0, 4 * scale, 8 * scale, 3.5 * scale, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.rotate(Number.isFinite(headingRad) ? headingRad : 0);
  ctx.scale(scale, scale);

  // Headlight cone, so the rider is findable at night.
  if (moving && !blocked) {
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    const cone = ctx.createLinearGradient(6, 0, 34, 0);
    cone.addColorStop(0, 'rgba(255, 244, 214, 0.35)');
    cone.addColorStop(1, 'rgba(255, 244, 214, 0)');
    ctx.fillStyle = cone;
    ctx.beginPath();
    ctx.moveTo(6, 0);
    ctx.lineTo(34, -9);
    ctx.lineTo(34, 9);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    if (blocked) {
      drawBlockedBadge(ctx, x, y + bob, { time, reducedMotion, scale });
    }
  }

  // Wheels.
  ctx.fillStyle = '#10141b';
  roundRect(ctx, -8, -2.6, 5, 5.2, 2);
  ctx.fill();
  roundRect(ctx, 4, -2.6, 5, 5.2, 2);
  ctx.fill();

  // Chassis.
  ctx.fillStyle = body;
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.55)';
  ctx.lineWidth = 1;
  roundRect(ctx, -9, -4.2, 18, 8.4, 3.4);
  ctx.fill();
  ctx.stroke();

  // Delivery box on the back.
  ctx.fillStyle = PALETTE.riderBox;
  roundRect(ctx, -9.5, -3.4, 6, 6.8, 1.6);
  ctx.fill();
  ctx.stroke();

  // Rider head.
  ctx.fillStyle = PALETTE.riderHelmet;
  ctx.beginPath();
  ctx.arc(0.5, 0, 3.1, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Visor, hints at facing direction.
  ctx.fillStyle = 'rgba(190, 227, 248, 0.9)';
  ctx.beginPath();
  ctx.arc(1.8, 0, 1.5, -Math.PI / 2, Math.PI / 2);
  ctx.fill();

  ctx.restore();
}

/**
 * Pickup / drop-off marker. `drop` (0..1) animates the marker falling into
 * place; `pulse` adds a slow expanding ring so it stays findable.
 */
export function drawMarker(ctx, x, y, opts = {}) {
  const {
    color = PALETTE.pinStart,
    glyph = 'A',
    drop = 1,
    time = 0,
    reducedMotion = false,
    pulse = true,
  } = opts;

  const d = Math.max(0, Math.min(1, drop));
  const eased = easeOutBack(d);
  const lift = (1 - eased) * 46;

  ctx.save();

  if (pulse && !reducedMotion && d >= 1) {
    const p = (time * 0.0009) % 1;
    ctx.save();
    ctx.globalAlpha = 0.35 * (1 - p);
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(x, y, 6 + p * 22, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }

  // Shadow on the ground, tightening as the marker lands.
  ctx.fillStyle = `rgba(0, 0, 0, ${0.18 + 0.22 * eased})`;
  ctx.beginPath();
  ctx.ellipse(x, y + 1, 7 - 2 * eased, 2.6 - eased, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.translate(x, y - lift);

  ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
  ctx.shadowBlur = 8;
  ctx.shadowOffsetY = 2;

  ctx.beginPath();
  ctx.arc(0, -17, 10.5, Math.PI, 0);
  ctx.quadraticCurveTo(10.5, -6, 0, 2);
  ctx.quadraticCurveTo(-10.5, -6, -10.5, -17);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
  ctx.shadowBlur = 0;
  ctx.shadowOffsetY = 0;
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.45)';
  ctx.lineWidth = 1.4;
  ctx.stroke();

  ctx.fillStyle = 'rgba(12, 16, 22, 0.92)';
  ctx.beginPath();
  ctx.arc(0, -17, 6.4, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#f8fafc';
  ctx.font = '10px system-ui, -apple-system, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(glyph, 0, -16.5);

  ctx.restore();
}

/** Barricade marker drawn where a road has been closed. */
export function drawClosureMarker(ctx, x, y, { time = 0, reducedMotion = false } = {}) {
  const pulse = reducedMotion ? 1 : 0.75 + 0.25 * Math.sin(time * 0.005);
  ctx.save();
  ctx.translate(x, y);
  ctx.globalAlpha = pulse;

  ctx.fillStyle = 'rgba(127, 29, 29, 0.85)';
  ctx.strokeStyle = '#fca5a5';
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  ctx.arc(0, 0, 8, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.strokeStyle = '#fee2e2';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(-3.6, -3.6);
  ctx.lineTo(3.6, 3.6);
  ctx.moveTo(3.6, -3.6);
  ctx.lineTo(-3.6, 3.6);
  ctx.stroke();

  ctx.restore();
}

function roundRect(ctx, x, y, w, h, r) {
  const rr = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.arcTo(x + w, y, x + w, y + h, rr);
  ctx.arcTo(x + w, y + h, x, y + h, rr);
  ctx.arcTo(x, y + h, x, y, rr);
  ctx.arcTo(x, y, x + w, y, rr);
  ctx.closePath();
}

function drawBlockedBadge(ctx, x, y, { time = 0, reducedMotion = false, scale = 1 } = {}) {
  const pulse = reducedMotion ? 1 : 0.88 + 0.12 * Math.sin(time * 0.009);
  ctx.save();
  ctx.translate(x, y - 19 * scale);
  ctx.scale(pulse * scale, pulse * scale);
  ctx.fillStyle = 'rgba(127, 29, 29, 0.92)';
  ctx.strokeStyle = '#fecaca';
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.arc(0, 0, 8.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.font = '10px system-ui, -apple-system, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#fee2e2';
  ctx.fillText('⛔', 0, 0.5);
  ctx.restore();
}

function easeOutBack(t) {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2;
}
