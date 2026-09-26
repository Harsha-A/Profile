/**
 * Shared search-visualisation drawing: the settled "explored" field and the
 * pulsing frontier ring. Runs on the per-frame overlay layer.
 */
import { PALETTE, settleGradient } from '../palette.js';

/**
 * Settled nodes, drawn as a bloom: nodes explored most recently are larger and
 * brighter, then settle down into the cool->warm gradient field behind the
 * advancing frontier. This is what makes the search look like a wave rather
 * than a static scatter of dots.
 */
export function drawSettled(ctx, { settled, graph: g, project, reducedMotion, viewport }) {
  if (!settled || !settled.size || !g) return;

  let maxOrder = 1;
  for (const order of settled.values()) if (order > maxOrder) maxOrder = order;

  // Nodes within this many settle-steps of the frontier get the "fresh" bloom.
  const freshWindow = Math.max(24, maxOrder * 0.06);
  const pad = 24;
  const w = viewport?.w ?? 0;
  const h = viewport?.h ?? 0;
  const cull = Boolean(w && h);

  ctx.save();
  for (const [node, order] of settled) {
    const [x, y] = project(g.nodeX[node], g.nodeY[node]);
    if (cull && (x < -pad || y < -pad || x > w + pad || y > h + pad)) continue;

    const t = order / maxOrder;
    const freshness = reducedMotion ? 0 : Math.max(0, 1 - (maxOrder - order) / freshWindow);
    const color = settleGradient(t);

    if (freshness > 0.02) {
      ctx.globalAlpha = 0.28 * freshness;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, y, 3 + freshness * 7, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.globalAlpha = 0.5 + 0.45 * t;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, 2.2 + freshness * 1.6, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

/**
 * The frontier — the set of nodes the algorithm is currently considering.
 * Rendered as a bright additive ring with a slow pulse so it reads as the
 * "leading edge" of the search.
 */
export function drawFrontier(ctx, { frontier, graph: g, project, time = 0, reducedMotion, viewport }) {
  if (!frontier || !frontier.size || !g) return;

  const pulse = reducedMotion ? 0.5 : 0.5 + 0.5 * Math.sin(time * 0.006);
  const radius = 4.5 + pulse * 2.2;
  const pad = 24;
  const w = viewport?.w ?? 0;
  const h = viewport?.h ?? 0;
  const cull = Boolean(w && h);

  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  ctx.strokeStyle = PALETTE.frontier;
  ctx.lineWidth = 1.6;
  ctx.shadowColor = PALETTE.frontierGlow;
  ctx.shadowBlur = 8 + pulse * 6;

  ctx.beginPath();
  for (const node of frontier) {
    const [x, y] = project(g.nodeX[node], g.nodeY[node]);
    if (cull && (x < -pad || y < -pad || x > w + pad || y > h + pad)) continue;
    ctx.moveTo(x + radius, y);
    ctx.arc(x, y, radius, 0, Math.PI * 2);
  }
  ctx.stroke();
  ctx.restore();
}
