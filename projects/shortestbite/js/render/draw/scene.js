/**
 * Shared scene composition.
 *
 * Both renderers draw the exact same overlay and entity layers; the only
 * difference between them is how world coordinates become screen coordinates.
 * So each renderer supplies a `project` function and its own canvas contexts,
 * and everything visual lives here. This is what keeps the Canvas (procedural)
 * and Leaflet (real map) views in permanent visual parity.
 */
import { PALETTE } from '../palette.js';
import { pathToPolyline } from '../../algorithms/path-utils.js';
import { drawSettled, drawFrontier } from './search.js';
import { drawRoute } from './route.js';
import { drawCongestion } from './traffic.js';
import { drawRider, drawMarker, drawTrail, drawClosureMarker, recordTrail } from './entities.js';
import { drawConfetti, drawArrivalPulse, drawEmptyState } from './effects.js';

/** How long the route's A->B draw-in animation runs, in ms. */
export const ROUTE_DRAW_MS = 900;
/** How long the arrival pulse rings expand for, in ms. */
export const ARRIVAL_PULSE_MS = 1100;

/**
 * Search visualisation + the chosen route(s) + animated congestion.
 * @param {CanvasRenderingContext2D} ctx
 * @param {object} s scene state (see `buildSceneState` in the renderers)
 */
export function drawOverlayLayer(ctx, s) {
  const { graph: g, project, overlay: o, time, reducedMotion, viewport } = s;
  if (!g) return;

  if (s.showCongestion && s.congestion) {
    drawCongestion(ctx, { congestion: s.congestion, graph: g, project, time, reducedMotion, viewport });
  }

  if (!o) return;

  drawSettled(ctx, { settled: o.settled, graph: g, project, reducedMotion, viewport });
  drawFrontier(ctx, { frontier: o.frontier, graph: g, project, time, reducedMotion, viewport });

  // A route that was just replaced by a reroute fades out behind the new one.
  if (o.previousPath) {
    drawRoute(ctx, {
      points: projectPath(g, o.previousPath, project),
      color: PALETTE.finalPath,
      width: 4,
      dim: true,
      flow: false,
      glow: false,
    });
  }
  if (o.previousPathB) {
    drawRoute(ctx, {
      points: projectPath(g, o.previousPathB, project),
      color: PALETTE.compareB,
      width: 4,
      dim: true,
      flow: false,
      glow: false,
    });
  }

  const progress = routeProgress(s.routeAnimStart, time, reducedMotion);

  if (o.comparePathB) {
    drawTrackedRoute(ctx, {
      graph: g,
      path: o.comparePathB,
      pathProgress: o.comparePathBProgress,
      project,
      color: PALETTE.compareB,
      width: 4.5,
      progress,
      time,
      reducedMotion,
    });
  }
  if (o.path) {
    drawTrackedRoute(ctx, {
      graph: g,
      path: o.path,
      pathProgress: o.pathProgress,
      project,
      color: o.comparePathB ? PALETTE.compareA : PALETTE.finalPath,
      width: 5,
      progress,
      time,
      reducedMotion,
    });
  }

  // Hovering a turn in the directions list lights that leg up on the map.
  if (o.highlight) {
    drawRoute(ctx, {
      points: projectPath(g, o.highlight, project),
      color: PALETTE.highlight,
      width: 8,
      flow: false,
      glow: true,
      time,
      reducedMotion,
    });
  }
}

/** Riders, markers, closure badges, and the celebratory flourishes. */
export function drawEntitiesLayer(ctx, s) {
  const { graph: g, project, state, time, reducedMotion, viewport } = s;

  for (const closure of drawableClosures(state.closures, g)) {
    const [x, y] = project(closure.x, closure.y);
    drawClosureMarker(ctx, x, y, { time, reducedMotion });
  }

  const riders = layoutRiders(state.movers ?? [], project);

  for (const rider of riders) {
    const { mover, offsetX, offsetY } = rider;
    recordTrail(mover.id, mover.x, mover.y);
    drawTrail(ctx, {
      moverId: mover.id,
      project: offsetProject(project, offsetX, offsetY),
      color: mover.color ?? PALETTE.moverTrail,
      reducedMotion,
    });
  }

  for (const pin of state.pins ?? []) {
    const [x, y] = project(pin.x, pin.y);
    const isStart = pin.kind === 'start';
    drawMarker(ctx, x, y, {
      color: isStart ? PALETTE.pinStart : PALETTE.pinEnd,
      glyph: isStart ? '🍔' : '🏠',
      drop: pin.droppedAt ? Math.min(1, (time - pin.droppedAt) / 420) : 1,
      time,
      reducedMotion,
    });
  }

  for (const rider of riders) {
    const { mover, x, y, offsetX, offsetY } = rider;
    const blocked = mover.status === 'blocked';
    drawRider(ctx, x + offsetX, y + offsetY, mover.heading ?? 0, {
      color: mover.color ?? PALETTE.moverDefault,
      time,
      moving: !mover.arrived && !blocked,
      blocked,
      congested: Boolean(mover.congested),
      reducedMotion,
    });
  }

  if (s.arrivalAt && s.arrivalWorld) {
    const p = (time - s.arrivalAt) / ARRIVAL_PULSE_MS;
    if (p < 1) {
      const [x, y] = project(s.arrivalWorld[0], s.arrivalWorld[1]);
      drawArrivalPulse(ctx, x, y, p, { reducedMotion });
    }
  }

  drawConfetti(ctx, time);

  if (s.emptyState && !(state.pins ?? []).length) {
    drawEmptyState(ctx, {
      w: viewport?.w,
      h: viewport?.h,
      text: s.emptyState.text,
      sub: s.emptyState.sub,
      time,
      reducedMotion,
    });
  } else if (s.emptyState && (state.pins ?? []).length === 1) {
    drawEmptyState(ctx, {
      w: viewport?.w,
      h: viewport?.h,
      text: s.emptyState.textB ?? s.emptyState.text,
      sub: s.emptyState.subB ?? s.emptyState.sub,
      time,
      reducedMotion,
    });
  }

  void g;
}

function drawableClosures(closures = [], graph) {
  const edgeIds = new Set();
  for (const closure of closures) {
    const edgeId = closureEdgeId(closure);
    if (edgeId != null) edgeIds.add(edgeId);
  }

  const out = [];
  for (const closure of closures) {
    const edgeId = closureEdgeId(closure);
    if (edgeId != null) {
      const reverse = closureReverseEdgeId(closure, graph, edgeId);
      if (reverse != null && reverse >= 0 && reverse < edgeId && edgeIds.has(reverse)) continue;
      const point = closurePoint(closure, graph, edgeId);
      if (point) out.push(point);
      continue;
    }
    if (Number.isFinite(closure?.x) && Number.isFinite(closure?.y)) {
      out.push({ x: closure.x, y: closure.y });
    }
  }
  return out;
}

function closureEdgeId(closure) {
  const edgeId = typeof closure === 'number' ? closure : closure?.edgeId;
  return Number.isInteger(edgeId) ? edgeId : null;
}

function closureReverseEdgeId(closure, graph, edgeId) {
  const reverse = graph?.reverseEdge?.(edgeId);
  if (Number.isInteger(reverse)) return reverse;
  return Number.isInteger(closure?.twinId) ? closure.twinId : null;
}

function closurePoint(closure, graph, edgeId) {
  if (Number.isFinite(closure?.x) && Number.isFinite(closure?.y)) return { x: closure.x, y: closure.y };
  if (!graph || edgeId < 0 || edgeId >= graph.edgeCount) return null;
  const from = graph.edgeFrom[edgeId];
  const to = graph.edgeTo[edgeId];
  return {
    x: (graph.nodeX[from] + graph.nodeX[to]) / 2,
    y: (graph.nodeY[from] + graph.nodeY[to]) / 2,
  };
}

function layoutRiders(movers, project) {
  const riders = movers.map((mover) => {
    const [x, y] = project(mover.x, mover.y);
    return { mover, x, y, offsetX: 0, offsetY: 0 };
  });
  const groups = [];
  for (const rider of riders) {
    let group = groups.find((g) => g.some((other) => Math.hypot(other.x - rider.x, other.y - rider.y) <= 14));
    if (!group) {
      group = [];
      groups.push(group);
    }
    group.push(rider);
  }
  for (const group of groups) {
    if (group.length < 2) continue;
    const spread = riderSpread(group.length);
    for (let i = 0; i < group.length; i++) {
      const rider = group[i];
      const heading = Number.isFinite(rider.mover.heading) ? rider.mover.heading : 0;
      const perpX = -Math.sin(heading);
      const perpY = Math.cos(heading);
      rider.offsetX = perpX * spread[i];
      rider.offsetY = perpY * spread[i];
    }
  }
  return riders;
}

// Riders sharing a road ride side by side, one sprite-halo apart (halo radius ≈ 11.5px), so both stay visible.
function riderSpread(count) {
  if (count === 2) return [-12, 12];
  const out = [];
  const min = -12;
  const step = 24 / Math.max(1, count - 1);
  for (let i = 0; i < count; i++) out.push(min + step * i);
  return out;
}

function offsetProject(project, dx, dy) {
  if (!dx && !dy) return project;
  return (wx, wy) => {
    const [x, y] = project(wx, wy);
    return [x + dx, y + dy];
  };
}

function projectPath(graph, path, project) {
  return pathToPolyline(graph, path).map(([x, y]) => project(x, y));
}

function drawTrackedRoute(ctx, { graph, path, pathProgress, project, color, width, progress, time, reducedMotion }) {
  const points = projectPath(graph, path, project);
  if (!pathProgress || !path?.edges?.length) {
    drawRoute(ctx, { points, color, width, progress, time, reducedMotion });
    return;
  }
  const travelled = routeTravelFraction(graph, path, pathProgress);
  if (travelled > 0) {
    drawRoute(ctx, {
      points,
      color,
      width,
      progress: travelled,
      time,
      reducedMotion,
      dim: true,
      flow: false,
      glow: false,
    });
  }
  if (travelled < 1) {
    drawRoute(ctx, {
      points,
      color,
      width,
      startProgress: travelled,
      progress: 1,
      time,
      reducedMotion,
    });
  }
}

function routeTravelFraction(graph, path, pathProgress) {
  let total = 0;
  let travelled = 0;
  const edgeIndex = Math.max(0, Math.min(pathProgress.edgeIndex ?? 0, path.edges.length));
  for (let i = 0; i < path.edges.length; i++) {
    const length = graph.edgeLength[path.edges[i]] || 0;
    total += length;
    if (i < edgeIndex) travelled += length;
  }
  if (edgeIndex < path.edges.length) {
    travelled += Math.max(0, Math.min(pathProgress.edgeProgress ?? 0, graph.edgeLength[path.edges[edgeIndex]] || 0));
  }
  return total <= 0 ? 0 : Math.max(0, Math.min(1, travelled / total));
}

function routeProgress(routeAnimStart, time, reducedMotion) {
  if (reducedMotion || !routeAnimStart) return 1;
  return Math.min(1, (time - routeAnimStart) / ROUTE_DRAW_MS);
}
