import { CONFIG } from '../config.js';
import { clamp } from '../core/geometry.js';
import { Renderer, mergeInsets } from './renderer.js';
import { Camera } from './camera.js';
import { lightingBucket, lightingFor } from './lighting.js';
import { drawRoadNetwork, drawVignette, ROAD_WIDTH } from './draw/roads.js';
import { drawOverlayLayer, drawEntitiesLayer } from './draw/scene.js';
import { buildCongestionSet } from './draw/traffic.js';
import { VisualState } from './visual-state.js';

/**
 * Canvas 2D renderer (procedural city): three stacked canvases (roads,
 * overlay, entities) sharing one camera. Roads are redrawn only when the
 * view, traffic tint bucket or lighting bucket changes; the overlay and
 * entity layers redraw every frame.
 *
 * All actual drawing lives in `./draw/*` so this renderer and the Leaflet one
 * stay visually identical.
 */
export class CanvasRenderer extends Renderer {
  constructor() {
    super();
    this.camera = new Camera();
    this._listeners = { click: [], hover: [], viewchange: [] };
    this._dragging = false;
    this._lastPointer = null;
    this._activePointerId = null;
    this._roadsDirty = true;
    this._followMoverId = null;
    this._zoomAnimationId = null;
    this.graph = null;
    this.trafficFactorFn = null;
    this.showOneWayArrows = false;
    this.simTime = 0;
    this.visuals = new VisualState();
  }

  mount(containerEl) {
    this.container = containerEl;
    this.canvases = {};
    for (const name of ['roads', 'overlay', 'entities']) {
      const c = document.createElement('canvas');
      c.style.position = 'absolute';
      c.style.inset = '0';
      c.style.width = '100%';
      c.style.height = '100%';
      containerEl.appendChild(c);
      this.canvases[name] = c;
    }
    this._resize();
    this._resizeObserver = new ResizeObserver(() => this._resize());
    this._resizeObserver.observe(containerEl);
    this._bindInput();
  }

  _resize() {
    const rect = this.container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    for (const c of Object.values(this.canvases)) {
      c.width = Math.max(1, Math.round(rect.width * dpr));
      c.height = Math.max(1, Math.round(rect.height * dpr));
      const ctx = c.getContext('2d');
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    this.camera.viewportW = rect.width;
    this.camera.viewportH = rect.height;
    this._roadsDirty = true;
  }

  setWorld({ graph, bounds }) {
    this.graph = graph;
    this._directedPairs = buildDirectedPairSet(graph);
    this.visuals.resetForWorld();
    const b = bounds ?? computeBounds(graph);
    this._worldBounds = b;
    this.camera.fit(b, this.camera.viewportW || 800, this.camera.viewportH || 600, mergeInsets(this._overlayInsets));
    this._roadsDirty = true;
  }

  /**
   * Provide a live traffic-factor function. Roads are only marked dirty when
   * the *bucketed* traffic/lighting signature actually changes — this is
   * called every frame, so re-tinting unconditionally would redraw thousands
   * of segments 60 times a second.
   */
  setTrafficSource(trafficFactorFn, simTime) {
    this.trafficFactorFn = trafficFactorFn;
    this.simTime = simTime;
    const signature = `${Math.floor(simTime / 30)}|${lightingBucket(simTime)}`;
    if (signature !== this._trafficSignature) {
      this._trafficSignature = signature;
      this._congestion = null;
      this._roadsDirty = true;
    }
  }

  markRoadsDirty() {
    this._roadsDirty = true;
    this._congestion = null;
  }

  setOverlay(overlay) {
    this.visuals.setOverlay(overlay);
  }

  focus(x, y, zoom) {
    this.camera.x = x;
    this.camera.y = y;
    if (zoom) this.camera.zoom = clamp(zoom, this.camera.minZoom, this.camera.maxZoom);
    this._roadsDirty = true;
  }

  followMover(moverId) {
    this._followMoverId = moverId;
  }

  pick(screenX, screenY) {
    if (!this.graph) return { kind: 'miss' };
    const hit = this._nearestNodeByScreenDistance(screenX, screenY);
    return hit && hit.distance <= CONFIG.ui.pickNodePx ? { kind: 'node', id: hit.id } : { kind: 'miss' };
  }

  setNodeIndex(index) {
    this._nodeIndex = index;
  }

  on(event, fn) {
    (this._listeners[event] ??= []).push(fn);
    return () => {
      this._listeners[event] = this._listeners[event].filter((f) => f !== fn);
    };
  }

  _emit(event, payload) {
    for (const fn of this._listeners[event] ?? []) fn(payload);
  }

  onUserViewChange(cb) {
    return this.on('viewchange', cb);
  }

  zoomIn() {
    this._emitUserViewChange({ source: 'zoomIn' });
    this._zoomAroundCenter(1.5);
  }

  zoomOut() {
    this._emitUserViewChange({ source: 'zoomOut' });
    this._zoomAroundCenter(1 / 1.5);
  }

  /** Reserve extra fit padding for a transient overlay and refit without counting as a user view change. */
  setOverlayInsets(insets) {
    this._overlayInsets = insets || null;
    if (!this._worldBounds) return;
    this._cancelZoomAnimation();
    this.camera.fit(this._worldBounds, this.camera.viewportW || 800, this.camera.viewportH || 600, mergeInsets(this._overlayInsets));
    this._roadsDirty = true;
  }

  fitWorld() {
    if (!this._worldBounds) return;
    this._cancelZoomAnimation();
    this.camera.fit(this._worldBounds, this.camera.viewportW || 800, this.camera.viewportH || 600, mergeInsets(this._overlayInsets));
    this._roadsDirty = true;
    this._emitUserViewChange({ source: 'fitWorld' });
  }

  _emitUserViewChange(payload = {}) {
    this._emit('viewchange', payload);
  }

  _zoomAroundCenter(factor) {
    this._zoomAt(this.camera.viewportW / 2, this.camera.viewportH / 2, factor, 180);
  }

  _zoomAt(sx, sy, factor, duration = 0) {
    this._cancelZoomAnimation();
    const startZoom = this.camera.zoom;
    const targetZoom = clamp(startZoom * factor, this.camera.minZoom, this.camera.maxZoom);
    if (targetZoom === startZoom) return;
    const reduceMotion =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (duration <= 0 || reduceMotion || typeof requestAnimationFrame !== 'function') {
      this.camera.setZoomAt(sx, sy, targetZoom);
      this._roadsDirty = true;
      return;
    }
    const startTime = performance.now();
    const easeOutCubic = (t) => 1 - (1 - t) ** 3;
    const step = (now) => {
      const t = Math.min(1, (now - startTime) / duration);
      const eased = easeOutCubic(t);
      const zoom = startZoom * (targetZoom / startZoom) ** eased;
      this.camera.setZoomAt(sx, sy, zoom);
      this._roadsDirty = true;
      if (t < 1) this._zoomAnimationId = requestAnimationFrame(step);
      else this._zoomAnimationId = null;
    };
    this._zoomAnimationId = requestAnimationFrame(step);
  }

  _cancelZoomAnimation() {
    if (this._zoomAnimationId != null && typeof cancelAnimationFrame === 'function') {
      cancelAnimationFrame(this._zoomAnimationId);
    }
    this._zoomAnimationId = null;
  }

  _bindInput() {
    const el = this.canvases.entities;
    el.style.pointerEvents = 'auto';
    el.style.touchAction = 'none';
    this._onPointerDown = (e) => {
      if (e.isPrimary === false) return;
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      this._cancelZoomAnimation();
      this._dragging = true;
      this._activePointerId = e.pointerId;
      this._pointerStart = [e.clientX, e.clientY];
      this._lastPointer = [e.clientX, e.clientY];
      this._dragMoved = false;
      el.setPointerCapture?.(e.pointerId);
    };
    this._onPointerMove = (e) => {
      if (this._dragging && e.pointerId === this._activePointerId && this._lastPointer) {
        const dx = e.clientX - this._lastPointer[0];
        const dy = e.clientY - this._lastPointer[1];
        if (!this._dragMoved) {
          const totalDx = e.clientX - this._pointerStart[0];
          const totalDy = e.clientY - this._pointerStart[1];
          if (Math.hypot(totalDx, totalDy) <= 2) return;
          this._dragMoved = true;
          this._emitUserViewChange({ source: 'drag' });
        }
        this.camera.pan(-dx, -dy);
        this._lastPointer = [e.clientX, e.clientY];
        this._roadsDirty = true;
      } else if (e.pointerType === 'mouse') {
        const rect = el.getBoundingClientRect();
        this._emit('hover', { x: e.clientX - rect.left, y: e.clientY - rect.top });
      }
    };
    this._onPointerUp = (e) => {
      if (e.pointerId !== this._activePointerId) return;
      if (this._dragging && !this._dragMoved && e.type !== 'pointercancel') {
        const rect = el.getBoundingClientRect();
        this._emit('click', { x: e.clientX - rect.left, y: e.clientY - rect.top });
      }
      el.releasePointerCapture?.(e.pointerId);
      this._dragging = false;
      this._activePointerId = null;
      this._lastPointer = null;
      this._pointerStart = null;
    };
    this._onWheel = (e) => {
      e.preventDefault();
      const rect = el.getBoundingClientRect();
      const delta = normaliseWheelDelta(e, rect.height || this.camera.viewportH || 600);
      const factor = Math.exp(-delta * (e.ctrlKey ? 0.01 : 0.0015));
      this._zoomAt(e.clientX - rect.left, e.clientY - rect.top, factor);
      this._roadsDirty = true;
      this._emitUserViewChange({ source: e.ctrlKey ? 'pinch' : 'wheel' });
    };
    this._onDblClick = (e) => {
      const rect = el.getBoundingClientRect();
      this._emit('hover', { x: e.clientX - rect.left, y: e.clientY - rect.top, doubleClick: true });
    };
    el.addEventListener('pointerdown', this._onPointerDown);
    el.addEventListener('pointermove', this._onPointerMove);
    el.addEventListener('pointerup', this._onPointerUp);
    el.addEventListener('pointercancel', this._onPointerUp);
    el.addEventListener('wheel', this._onWheel, { passive: false });
    el.addEventListener('dblclick', this._onDblClick);
  }

  _project = (wx, wy) => this.camera.worldToScreen(wx, wy);

  _viewport() {
    return { w: this.camera.viewportW, h: this.camera.viewportH };
  }

  /** Redraw the static roads layer, only when needed. */
  _drawRoadsIfDirty() {
    if (!this._roadsDirty || !this.graph) return;
    const ctx = this.canvases.roads.getContext('2d');
    const { viewportW: w, viewportH: h } = this.camera;
    const lightingKey = lightingBucket(this.simTime);
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = lightingFor(lightingKey).background;
    ctx.fillRect(0, 0, w, h);

    drawRoadNetwork(ctx, {
      graph: this.graph,
      project: this._project,
      directedPairs: this._directedPairs,
      trafficFactorFn: this.trafficFactorFn,
      simTime: this.simTime,
      showOneWayArrows: this.showOneWayArrows,
      widthFor: (roadClass) => Math.max(1, ROAD_WIDTH[roadClass] * this.camera.zoom * 0.5 + 1),
      lightingKey,
      viewport: { w, h },
    });

    drawVignette(ctx, w, h);
    this._roadsDirty = false;
  }

  drawFrame(state, _alpha) {
    if (this._followMoverId != null && !this._dragging) {
      const mover = state.movers?.find((m) => m.id === this._followMoverId);
      if (mover) {
        this.camera.x = mover.x;
        this.camera.y = mover.y;
        this._roadsDirty = true;
      }
    }

    this._drawRoadsIfDirty();
    if (!this.graph) return;

    if (!this._congestion && this.trafficFactorFn) {
      this._congestion = buildCongestionSet(this.graph, this.trafficFactorFn, this.simTime);
    }

    const scene = this.visuals.sceneState({
      graph: this.graph,
      project: this._project,
      state,
      viewport: this._viewport(),
      congestion: this._congestion,
    });

    const { viewportW: w, viewportH: h } = this.camera;

    const overlayCtx = this.canvases.overlay.getContext('2d');
    overlayCtx.clearRect(0, 0, w, h);
    drawOverlayLayer(overlayCtx, scene);

    const entitiesCtx = this.canvases.entities.getContext('2d');
    entitiesCtx.clearRect(0, 0, w, h);
    drawEntitiesLayer(entitiesCtx, scene);
  }

  destroy() {
    this._resizeObserver?.disconnect();
    this._cancelZoomAnimation();
    const el = this.canvases?.entities;
    if (el) {
      if (this._onPointerDown) el.removeEventListener('pointerdown', this._onPointerDown);
      if (this._onPointerMove) el.removeEventListener('pointermove', this._onPointerMove);
      if (this._onPointerUp) {
        el.removeEventListener('pointerup', this._onPointerUp);
        el.removeEventListener('pointercancel', this._onPointerUp);
      }
      if (this._onWheel) el.removeEventListener('wheel', this._onWheel);
      if (this._onDblClick) el.removeEventListener('dblclick', this._onDblClick);
    }
    for (const c of Object.values(this.canvases ?? {})) c.remove();
  }

  _nearestNodeByScreenDistance(screenX, screenY) {
    if (this._nodeIndex) {
      const [wx, wy] = this.camera.screenToWorld(screenX, screenY);
      const hit = this._nodeIndex.nearest(wx, wy);
      if (!hit) return null;
      const [sx, sy] = this.camera.worldToScreen(this.graph.nodeX[hit.id], this.graph.nodeY[hit.id]);
      return { id: hit.id, distance: Math.hypot(sx - screenX, sy - screenY) };
    }
    let best = null;
    for (let i = 0; i < this.graph.nodeCount; i++) {
      const [sx, sy] = this.camera.worldToScreen(this.graph.nodeX[i], this.graph.nodeY[i]);
      const distance = Math.hypot(sx - screenX, sy - screenY);
      if (!best || distance < best.distance) best = { id: i, distance };
    }
    return best;
  }
}

function normaliseWheelDelta(e, viewportHeight) {
  const multiplier = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? viewportHeight : 1;
  return clamp(e.deltaY * multiplier, -240, 240);
}

function computeBounds(graph) {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (let i = 0; i < graph.nodeCount; i++) {
    minX = Math.min(minX, graph.nodeX[i]);
    minY = Math.min(minY, graph.nodeY[i]);
    maxX = Math.max(maxX, graph.nodeX[i]);
    maxY = Math.max(maxY, graph.nodeY[i]);
  }
  return { minX, minY, maxX, maxY };
}

/** Set of `"from:to"` keys for every directed edge, used to detect one-way roads
 * (a pair with only one direction present). */
function buildDirectedPairSet(graph) {
  const set = new Set();
  for (let e = 0; e < graph.edgeCount; e++) {
    set.add(`${graph.edgeFrom[e]}:${graph.edgeTo[e]}`);
  }
  return set;
}
