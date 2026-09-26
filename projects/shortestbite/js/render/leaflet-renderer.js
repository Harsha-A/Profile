import { CONFIG } from '../config.js';
import { Renderer, mergeInsets } from './renderer.js';
import { lightingBucket } from './lighting.js';
import { drawRoadNetwork, ROAD_WIDTH } from './draw/roads.js';
import { drawOverlayLayer, drawEntitiesLayer } from './draw/scene.js';
import { buildCongestionSet } from './draw/traffic.js';
import { VisualState } from './visual-state.js';

const R_EARTH = 6_371_000; // metres, matches scripts/build-osm-graph.js's projection

/**
 * Leaflet-backed renderer (real OSM map): tiles underneath, two canvas
 * overlays on top — one for the road network (static, redrawn only when the
 * view or traffic bucket changes) and one for the overlay + entity layers
 * (redrawn every frame).
 *
 * Implements the same `Renderer` interface as `CanvasRenderer`, and draws via
 * the same `./draw/*` modules, so the two views look identical apart from the
 * basemap. World coordinates are the flat x/y metres used everywhere else;
 * this renderer is the only place that converts them to/from lat/lng.
 */
export class LeafletRenderer extends Renderer {
  constructor() {
    super();
    this._listeners = { click: [], hover: [], viewchange: [] };
    this.graph = null;
    this.trafficFactorFn = null;
    this.showOneWayArrows = false;
    this.simTime = 0;
    this._followMoverId = null;
    this._roadsDirty = true;
    this._lat0 = 0;
    this._lng0 = 0;
    this._cosLat0 = 1;
    this._worldFitBounds = null;
    this._userViewListeners = new Set();
    this._programmaticViewDepth = 0;
    this._userDragging = false;
    this.visuals = new VisualState();
  }

  mount(containerEl) {
    if (typeof L === 'undefined') {
      throw new Error('Leaflet (global `L`) is not loaded — include the Leaflet <script> before main.js');
    }
    this.container = containerEl;
    containerEl.innerHTML = '';
    const mapDiv = document.createElement('div');
    mapDiv.style.position = 'absolute';
    mapDiv.style.inset = '0';
    containerEl.appendChild(mapDiv);

    this.map = L.map(mapDiv, {
      zoomControl: false,
      attributionControl: true,
      preferCanvas: true,
      scrollWheelZoom: true,
      wheelPxPerZoomLevel: 120,
      zoomSnap: 0.25,
      zoomDelta: 1,
    });
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);

    // Turn the light OSM basemap into a true dark one so the road network,
    // search wave and route read clearly on top of it — the tiles are context,
    // not the subject. Inverting and rotating the hue back keeps water blue and
    // parks green while dropping the background to near-black, which plain
    // dimming cannot do.
    this.tilePane = this.map.getPane('tilePane');
    if (this.tilePane) {
      this.tilePane.style.filter =
        'invert(1) hue-rotate(185deg) brightness(0.92) saturate(0.55) contrast(0.95)';
    }

    this.canvas = document.createElement('canvas');
    this.canvas.style.position = 'absolute';
    this.canvas.style.inset = '0';
    this.canvas.style.pointerEvents = 'none';
    this.canvas.style.zIndex = 450; // above tiles, below Leaflet's own controls
    mapDiv.appendChild(this.canvas);

    this.entitiesCanvas = document.createElement('canvas');
    this.entitiesCanvas.style.position = 'absolute';
    this.entitiesCanvas.style.inset = '0';
    this.entitiesCanvas.style.pointerEvents = 'none';
    this.entitiesCanvas.style.zIndex = 451;
    mapDiv.appendChild(this.entitiesCanvas);

    this.camera = {
      screenToWorld: (sx, sy) => this._screenToWorld(sx, sy),
      worldToScreen: (wx, wy) => this._worldToScreen(wx, wy),
      get zoom() {
        return 2 ** (this.map?.getZoom?.() ?? 16) / 5e6; // rough px-per-metre fallback
      },
    };
    this.camera.map = this.map;

    this._resize();
    this._resizeObserver = new ResizeObserver(() => this._resize());
    this._resizeObserver.observe(containerEl);

    this.map.on('move zoom viewreset resize', () => {
      this._roadsDirty = true;
      this._redraw();
      this._emit('viewchange', {});
    });
    this.map.on('zoomstart', () => {
      if (this._programmaticViewDepth === 0) this._emitUserViewChange();
    });
    this._bindInput(mapDiv);
  }

  _resize() {
    const rect = this.container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    for (const c of [this.canvas, this.entitiesCanvas]) {
      c.width = Math.max(1, Math.round(rect.width * dpr));
      c.height = Math.max(1, Math.round(rect.height * dpr));
      c.style.width = `${rect.width}px`;
      c.style.height = `${rect.height}px`;
      const ctx = c.getContext('2d');
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    this.map?.invalidateSize();
    this._roadsDirty = true;
  }

  setWorld({ graph, bounds }) {
    this.graph = graph;
    this._directedPairs = buildDirectedPairSet(graph);
    this.visuals.resetForWorld();
    // Projection origin: prefer the graph's own lat/lng centre when available
    // (set by osm-city.js), otherwise fall back to the world bounds centroid.
    if (graph.nodeLat && graph.nodeLat.length) {
      let sumLat = 0;
      let sumLng = 0;
      for (let i = 0; i < graph.nodeLat.length; i++) {
        sumLat += graph.nodeLat[i];
        sumLng += graph.nodeLng[i];
      }
      this._lat0 = sumLat / graph.nodeLat.length;
      this._lng0 = sumLng / graph.nodeLat.length;
    }
    this._cosLat0 = Math.cos((this._lat0 * Math.PI) / 180);

    const b = bounds ?? computeBounds(graph);
    this._worldFitBounds = [this._unproject(b.minX, b.maxY), this._unproject(b.maxX, b.minY)];
    this._fitWorldProgrammatic();
    this._roadsDirty = true;
    this._redraw();
  }

  /** See the note on `CanvasRenderer.setTrafficSource` — bucketed to avoid
   * redrawing every road on every frame. */
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
    const [lat, lng] = this._unproject(x, y);
    this._withProgrammaticView(() => {
      this.map.setView([lat, lng], zoom ? metresPerPixelToLeafletZoom(zoom) : this.map.getZoom(), {
        animate: false,
      });
    });
  }

  followMover(moverId) {
    this._followMoverId = moverId;
  }

  setNodeIndex(index) {
    this._nodeIndex = index;
  }

  /** Hit-test using actual screen-pixel distance (more accurate than a world-space
   * threshold here, since Leaflet's projection isn't linear in screen space). */
  pick(screenX, screenY) {
    if (!this.graph || !this._nodeIndex) return { kind: 'miss' };
    const [wx, wy] = this._screenToWorld(screenX, screenY);
    const hit = this._nodeIndex.nearest(wx, wy);
    if (!hit) return { kind: 'miss' };
    const [sx, sy] = this._worldToScreen(this.graph.nodeX[hit.id], this.graph.nodeY[hit.id]);
    const pxDist = Math.hypot(sx - screenX, sy - screenY);
    return pxDist <= CONFIG.ui.pickNodePx ? { kind: 'node', id: hit.id } : { kind: 'miss' };
  }

  zoomIn() {
    this.map?.zoomIn(1);
  }

  zoomOut() {
    this.map?.zoomOut(1);
  }

  fitWorld() {
    this._emitUserViewChange();
    this._fitWorldProgrammatic();
  }

  onUserViewChange(cb) {
    this._userViewListeners.add(cb);
    return () => this._userViewListeners.delete(cb);
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

  _bindInput(mapDiv) {
    let suppressDragClick = false;
    this.map.on('dragstart', () => {
      this._userDragging = true;
      suppressDragClick = false;
      this._emitUserViewChange();
    });
    this.map.on('drag', () => {
      suppressDragClick = true;
    });
    this.map.on('dragend', () => {
      this._userDragging = false;
      if (suppressDragClick) setTimeout(() => (suppressDragClick = false), 0);
    });
    this.map.on('click', (e) => {
      if (suppressDragClick) return;
      const pt = this.map.latLngToContainerPoint(e.latlng);
      this._emit('click', { x: pt.x, y: pt.y });
    });
    mapDiv.addEventListener('mousemove', (e) => {
      const rect = mapDiv.getBoundingClientRect();
      this._emit('hover', { x: e.clientX - rect.left, y: e.clientY - rect.top });
    });
  }

  /** World (flat metres) -> lat/lng, the inverse of the equirectangular
   * projection in scripts/build-osm-graph.js. */
  _unproject(wx, wy) {
    const toDeg = (r) => (r * 180) / Math.PI;
    const lat = this._lat0 - toDeg(wy / R_EARTH);
    const lng = this._lng0 + toDeg(wx / (R_EARTH * this._cosLat0));
    return [lat, lng];
  }

  _worldToScreen(wx, wy) {
    const [lat, lng] = this._unproject(wx, wy);
    const pt = this.map.latLngToContainerPoint([lat, lng]);
    return [pt.x, pt.y];
  }

  _screenToWorld(sx, sy) {
    const latlng = this.map.containerPointToLatLng([sx, sy]);
    const toRad = (d) => (d * Math.PI) / 180;
    const x = R_EARTH * toRad(latlng.lng - this._lng0) * this._cosLat0;
    const y = -R_EARTH * toRad(latlng.lat - this._lat0);
    return [x, y];
  }

  _project = (wx, wy) => this._worldToScreen(wx, wy);

  _withProgrammaticView(fn) {
    this._programmaticViewDepth++;
    try {
      return fn();
    } finally {
      this._programmaticViewDepth--;
    }
  }

  /** Reserve extra fit padding for a transient overlay and refit programmatically. */
  setOverlayInsets(insets) {
    this._overlayInsets = insets || null;
    this._fitWorldProgrammatic();
  }

  _fitWorldProgrammatic() {
    if (!this.map || !this._worldFitBounds) return;
    const pad = mergeInsets(this._overlayInsets);
    this._withProgrammaticView(() => {
      this.map.fitBounds(this._worldFitBounds, { paddingTopLeft: [pad.left, pad.top], paddingBottomRight: [pad.right, pad.bottom], animate: false });
    });
  }

  _panToWorld(x, y) {
    const [lat, lng] = this._unproject(x, y);
    this._withProgrammaticView(() => {
      this.map.panTo([lat, lng], { animate: false });
    });
  }

  _emitUserViewChange() {
    for (const fn of this._userViewListeners) fn();
  }

  _viewport() {
    const rect = this.container.getBoundingClientRect();
    return { w: rect.width, h: rect.height };
  }

  /** Redraw the static roads layer only when needed — it's the expensive part
   * (thousands of segments). */
  _redrawRoadsIfDirty() {
    if (!this.map || !this.canvas || !this.graph || !this._roadsDirty) return;
    const ctx = this.canvas.getContext('2d');
    const { w, h } = this._viewport();
    ctx.clearRect(0, 0, w, h);

    // Zoom-aware widths so roads stay proportionate as you zoom in and out.
    const z = this.map.getZoom();
    const scale = Math.max(0.55, Math.min(2.6, 2 ** ((z - 15) / 2.2)));

    drawRoadNetwork(ctx, {
      graph: this.graph,
      project: this._project,
      directedPairs: this._directedPairs,
      trafficFactorFn: this.trafficFactorFn,
      simTime: this.simTime,
      showOneWayArrows: this.showOneWayArrows,
      widthFor: (roadClass) => Math.max(1.2, ROAD_WIDTH[roadClass] * scale),
      lightingKey: lightingBucket(this.simTime),
      viewport: { w, h },
    });

    this._roadsDirty = false;
  }

  /** Called on Leaflet view changes: roads must be redrawn immediately (their
   * screen positions just moved), independent of the animation-frame loop. */
  _redraw() {
    this._redrawRoadsIfDirty();
  }

  drawFrame(state, _alpha) {
    if (this._followMoverId != null) {
      const mover = state.movers?.find((m) => m.id === this._followMoverId);
      if (mover && !this._userDragging) this._panToWorld(mover.x, mover.y);
    }

    this._redrawRoadsIfDirty();
    if (!this.graph) return;

    if (!this._congestion && this.trafficFactorFn) {
      this._congestion = buildCongestionSet(this.graph, this.trafficFactorFn, this.simTime);
    }

    const viewport = this._viewport();
    const scene = this.visuals.sceneState({
      graph: this.graph,
      project: this._project,
      state,
      viewport,
      congestion: this._congestion,
    });

    const ctx = this.entitiesCanvas.getContext('2d');
    ctx.clearRect(0, 0, viewport.w, viewport.h);
    drawOverlayLayer(ctx, scene);
    drawEntitiesLayer(ctx, scene);
  }

  destroy() {
    this._resizeObserver?.disconnect();
    this.map?.remove();
    this.canvas?.remove();
    this.entitiesCanvas?.remove();
  }
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

function buildDirectedPairSet(graph) {
  const set = new Set();
  for (let e = 0; e < graph.edgeCount; e++) set.add(`${graph.edgeFrom[e]}:${graph.edgeTo[e]}`);
  return set;
}

function metresPerPixelToLeafletZoom(pxPerMetre) {
  return Math.log2(pxPerMetre * 5e6);
}
