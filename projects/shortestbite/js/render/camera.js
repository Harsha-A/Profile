import { clamp } from '../core/geometry.js';

/**
 * World<->screen camera transform with pan and cursor-anchored zoom.
 * `zoom` is screen pixels per world metre.
 */
export class Camera {
  constructor() {
    this.x = 0; // world-space centre of the viewport
    this.y = 0;
    this.zoom = 1;
    this.minZoom = 0.1;
    this.maxZoom = 8;
    this.viewportW = 800;
    this.viewportH = 600;
  }

  /** Fit the camera to show a world-space bounding box, centred. */
  /** `padding` is a number or `{top,right,bottom,left}` so map overlays keep a clear inset. */
  fit(bounds, viewportW, viewportH, padding = 40) {
    this.viewportW = viewportW;
    this.viewportH = viewportH;
    const p = typeof padding === 'number'
      ? { top: padding, right: padding, bottom: padding, left: padding }
      : { top: 40, right: 40, bottom: 40, left: 40, ...padding };
    const w = bounds.maxX - bounds.minX || 1;
    const h = bounds.maxY - bounds.minY || 1;
    const zx = Math.max(1, viewportW - p.left - p.right) / w;
    const zy = Math.max(1, viewportH - p.top - p.bottom) / h;
    const fitZoom = Math.min(zx, zy);
    // A fit into a narrow viewport (e.g. beside a mission card) must really fit, so it may lower the floor.
    if (fitZoom < this.minZoom) this.minZoom = fitZoom;
    this.zoom = clamp(fitZoom, this.minZoom, this.maxZoom);
    this.x = (bounds.minX + bounds.maxX) / 2 - (p.left - p.right) / (2 * this.zoom);
    this.y = (bounds.minY + bounds.maxY) / 2 - (p.top - p.bottom) / (2 * this.zoom);
  }

  worldToScreen(wx, wy) {
    return [
      (wx - this.x) * this.zoom + this.viewportW / 2,
      (wy - this.y) * this.zoom + this.viewportH / 2,
    ];
  }

  screenToWorld(sx, sy) {
    return [
      (sx - this.viewportW / 2) / this.zoom + this.x,
      (sy - this.viewportH / 2) / this.zoom + this.y,
    ];
  }

  pan(dxScreen, dyScreen) {
    this.x -= dxScreen / this.zoom;
    this.y -= dyScreen / this.zoom;
  }

  /** Zoom by `factor`, keeping the world point under (sx, sy) fixed on screen. */
  zoomAt(sx, sy, factor) {
    return this.setZoomAt(sx, sy, this.zoom * factor);
  }

  /** Set zoom, keeping the world point under (sx, sy) fixed on screen. */
  setZoomAt(sx, sy, zoom) {
    const [wx, wy] = this.screenToWorld(sx, sy);
    const oldZoom = this.zoom;
    this.zoom = clamp(zoom, this.minZoom, this.maxZoom);
    const [sx2, sy2] = this.worldToScreen(wx, wy);
    this.pan(sx2 - sx, sy2 - sy);
    return this.zoom !== oldZoom || sx2 !== sx || sy2 !== sy;
  }
}
