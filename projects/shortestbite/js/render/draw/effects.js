/**
 * Shared screen effects drawn on the entities layer: the arrival confetti
 * burst and the on-map empty-state prompt.
 *
 * Confetti is a tiny hand-rolled particle system (no library) that lives in
 * *screen* space — it is a UI flourish, not a world object, so it should not
 * pan with the map.
 */
import { PALETTE } from '../palette.js';

const CONFETTI_COLORS = ['#facc15', '#4ade80', '#38bdf8', '#fb923c', '#f472b6', '#a78bfa'];

let particles = [];
let lastTick = 0;

/** Fire a burst of confetti at a screen position. */
export function burstConfetti(x, y, { count = 90, reducedMotion = false } = {}) {
  if (reducedMotion) return;
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 90 + Math.random() * 260;
    particles.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 120,
      rot: Math.random() * Math.PI,
      vrot: (Math.random() - 0.5) * 12,
      w: 3 + Math.random() * 5,
      h: 5 + Math.random() * 7,
      color: CONFETTI_COLORS[(Math.random() * CONFETTI_COLORS.length) | 0],
      life: 1,
      decay: 0.35 + Math.random() * 0.35,
    });
  }
}

export function clearConfetti() {
  particles = [];
}

export function hasConfetti() {
  return particles.length > 0;
}

/** Advance and draw the confetti. Call once per frame from the entities layer. */
export function drawConfetti(ctx, time) {
  if (!particles.length) return;
  const dt = lastTick ? Math.min(0.05, (time - lastTick) / 1000) : 0.016;
  lastTick = time;

  ctx.save();
  const alive = [];
  for (const p of particles) {
    p.vy += 620 * dt;
    p.vx *= 0.99;
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    p.rot += p.vrot * dt;
    p.life -= p.decay * dt;
    if (p.life <= 0) continue;
    alive.push(p);

    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);
    ctx.globalAlpha = Math.min(1, p.life);
    ctx.fillStyle = p.color;
    ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h * (0.4 + 0.6 * Math.abs(Math.cos(p.rot))));
    ctx.restore();
  }
  particles = alive;
  ctx.restore();
}

/** Expanding success ring at the drop-off point. */
export function drawArrivalPulse(ctx, x, y, progress, { reducedMotion = false } = {}) {
  if (reducedMotion || progress >= 1) return;
  const p = Math.max(0, Math.min(1, progress));
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  for (let i = 0; i < 2; i++) {
    const t = Math.max(0, p - i * 0.18);
    if (t <= 0) continue;
    ctx.globalAlpha = 0.5 * (1 - t);
    ctx.strokeStyle = PALETTE.pinStart;
    ctx.lineWidth = 3 * (1 - t) + 1;
    ctx.beginPath();
    ctx.arc(x, y, 10 + t * 90, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.restore();
}

/**
 * On-map prompt shown before the user has placed their pins, so the very
 * first thing a new visitor sees tells them what to do.
 */
export function drawEmptyState(ctx, { w, h, text, sub, time = 0, reducedMotion = false }) {
  if (!text || !w || !h) return;
  const bob = reducedMotion ? 0 : Math.sin(time * 0.002) * 3;
  const cx = w / 2;
  const cy = h / 2 + bob;

  ctx.save();
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  const boxW = Math.min(420, w - 48);
  const boxH = sub ? 92 : 64;
  ctx.fillStyle = 'rgba(12, 16, 22, 0.78)';
  ctx.strokeStyle = 'rgba(148, 163, 184, 0.28)';
  ctx.lineWidth = 1;
  roundRect(ctx, cx - boxW / 2, cy - boxH / 2, boxW, boxH, 14);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#e2e8f0';
  ctx.font = '600 15px system-ui, -apple-system, sans-serif';
  ctx.fillText(text, cx, sub ? cy - 12 : cy);

  if (sub) {
    ctx.fillStyle = 'rgba(148, 163, 184, 0.9)';
    ctx.font = '13px system-ui, -apple-system, sans-serif';
    ctx.fillText(sub, cx, cy + 14);
  }
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
