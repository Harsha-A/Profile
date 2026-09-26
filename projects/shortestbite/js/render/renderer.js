/** Clear space fitWorld keeps free for map overlays: narration (top), zoom stack (left), legend (bottom-right). */
export const MAP_SAFE_INSETS = Object.freeze({ top: 72, right: 48, bottom: 72, left: 72 });

/** MAP_SAFE_INSETS widened by any transient overlay reservation (e.g. the mission card). */
export function mergeInsets(extra) {
  if (!extra) return MAP_SAFE_INSETS;
  return {
    top: Math.max(MAP_SAFE_INSETS.top, extra.top || 0),
    right: Math.max(MAP_SAFE_INSETS.right, extra.right || 0),
    bottom: Math.max(MAP_SAFE_INSETS.bottom, extra.bottom || 0),
    left: Math.max(MAP_SAFE_INSETS.left, extra.left || 0),
  };
}

/**
 * Renderer interface documentation. Concrete renderers (Canvas, Leaflet, or
 * future backends) implement this shape; app code talks to this contract and
 * not to renderer-specific DOM/map APIs.
 *
 * Coordinate convention: public pointer/camera methods use container-local
 * screen pixels and graph/world coordinates are flat metres. Leaflet renderers
 * may expose a fake `camera.zoom`; use measured pixels-per-metre for hit-test
 * thresholds rather than trusting that value.
 *
 * @interface
 */
export class Renderer {
  /** Attach to the exclusive map surface container. */
  mount(_containerEl) {
    throw new Error('not implemented');
  }

  /** Provide the static world once: draw roads, cache bounds. */
  setWorld(_world /* { graph, bounds? } */) {
    throw new Error('not implemented');
  }

  /** Draw one frame: movers, pins, closures, overlays. */
  drawFrame(_state, _alpha) {
    throw new Error('not implemented');
  }

  /** Replace the search overlay (settled/frontier/path/progress/compare/highlight). */
  setOverlay(_overlay) {
    throw new Error('not implemented');
  }

  /** Hit-test a screen point. @returns {{ kind: 'node', id: number } | { kind: 'miss' }} */
  pick(_screenX, _screenY) {
    throw new Error('not implemented');
  }

  /** Move the camera to focus on a world point; programmatic and must not fire onUserViewChange. */
  focus(_x, _y, _zoom) {
    throw new Error('not implemented');
  }

  /** Keep the camera panned to a mover; must never change zoom and must pause during user drag. */
  followMover(_moverId) {
    throw new Error('not implemented');
  }

  /** Zoom controls behind the custom #map-zoom buttons; user-initiated, so they notify onUserViewChange. */
  zoomIn() {
    throw new Error('not implemented');
  }

  zoomOut() {
    throw new Error('not implemented');
  }

  fitWorld() {
    throw new Error('not implemented');
  }

  /** Subscribe to renderer-level UI events: 'click' | 'hover' | 'viewchange'. */
  on(_event, _fn) {
    throw new Error('not implemented');
  }

  /** Subscribe only to user-initiated drag/wheel/pinch/zoom-button/fit events; returns unsubscribe. */
  onUserViewChange(_cb) {
    throw new Error('not implemented');
  }

  /** Optional performance hooks shared by app panels/controls. */
  setTrafficSource(_trafficFactorFn, _simTime) {
    throw new Error('not implemented');
  }

  setNodeIndex(_spatialIndex) {
    throw new Error('not implemented');
  }

  markRoadsDirty() {
    throw new Error('not implemented');
  }

  /** Tear down all DOM/observers/map instances; safe before mounting a replacement. */
  destroy() {
    throw new Error('not implemented');
  }
}
