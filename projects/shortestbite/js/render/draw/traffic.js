/**
 * Animated congestion overlay.
 *
 * Congested road segments get a slow crawling dash drawn on the *animated*
 * layer. This deliberately does not touch the static roads canvas — dirtying
 * 12k+ edges every frame would destroy the frame budget.
 *
 * The set of congested segments is recomputed only when traffic actually
 * changes (see `buildCongestionSet`), and cached between frames.
 */
import { PALETTE } from '../palette.js';

/**
 * Collect the congested major-road segments worth animating.
 * @returns {{edges: number[], factors: number[]}}
 */
export function buildCongestionSet(graph, trafficFactorFn, simTime, threshold = 0.62) {
  const edges = [];
  const factors = [];
  if (!graph || !trafficFactorFn) return { edges, factors };

  const seen = new Set();
  for (let e = 0; e < graph.edgeCount; e++) {
    if (graph.edgeClosed[e] === 1) continue;
    const from = graph.edgeFrom[e];
    const to = graph.edgeTo[e];
    const key = from < to ? `${from}:${to}` : `${to}:${from}`;
    if (seen.has(key)) continue;
    seen.add(key);

    const roadClass = graph.edge(e).roadClass;
    if (roadClass === 'local') continue;
    const factor = trafficFactorFn(roadClass, simTime, e);
    if (factor >= threshold) continue;
    edges.push(e);
    factors.push(factor);
  }
  return { edges, factors };
}

/**
 * Draw the crawling congestion pulse. Slower crawl = worse congestion, which
 * is the whole point: you can read traffic severity from motion alone.
 */
export function drawCongestion(ctx, { congestion, graph: g, project, time = 0, reducedMotion, viewport }) {
  if (!congestion || !congestion.edges.length || !g) return;

  const pad = 32;
  const w = viewport?.w ?? 0;
  const h = viewport?.h ?? 0;
  const cull = Boolean(w && h);

  ctx.save();
  ctx.lineCap = 'round';
  ctx.globalCompositeOperation = 'lighter';

  for (let i = 0; i < congestion.edges.length; i++) {
    const e = congestion.edges[i];
    const factor = congestion.factors[i];
    const [x1, y1] = project(g.nodeX[g.edgeFrom[e]], g.nodeY[g.edgeFrom[e]]);
    const [x2, y2] = project(g.nodeX[g.edgeTo[e]], g.nodeY[g.edgeTo[e]]);

    if (cull) {
      if ((x1 < -pad && x2 < -pad) || (x1 > w + pad && x2 > w + pad)) continue;
      if ((y1 < -pad && y2 < -pad) || (y1 > h + pad && y2 > h + pad)) continue;
    }

    // severity 0 (mild) .. 1 (gridlock)
    const severity = Math.max(0, Math.min(1, (0.62 - factor) / 0.62));
    const speed = reducedMotion ? 0 : 0.012 + factor * 0.05;
    const dash = 5;
    const gap = 9;

    ctx.strokeStyle = severity > 0.55 ? PALETTE.congestionHeavy : PALETTE.congestionLight;
    ctx.globalAlpha = 0.18 + severity * 0.42;
    ctx.lineWidth = 2.5 + severity * 2.5;
    ctx.setLineDash([dash, gap]);
    ctx.lineDashOffset = -((time * speed) % (dash + gap));
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }

  ctx.setLineDash([]);
  ctx.restore();
}
