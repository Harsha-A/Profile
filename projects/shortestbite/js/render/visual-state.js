/**
 * Renderer-agnostic visual state.
 *
 * Both renderers need the same bookkeeping — which route is animating in,
 * when the rider arrived, whether the empty-state prompt is showing — so it
 * lives here instead of being duplicated (and drifting) in each renderer.
 */
import { burstConfetti, clearConfetti } from './draw/effects.js';
import { clearTrails } from './draw/entities.js';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** How long an abandoned route lingers, fading, after a reroute. */
const REROUTE_FADE_MS = 1400;

export class VisualState {
  constructor() {
    this.overlay = null;
    this.routeAnimStart = 0;
    this.arrivalAt = 0;
    this.arrivalWorld = null;
    this.emptyState = null;
    this.emptyStateSuppressed = false;
    this.showCongestion = true;
    this.reducedMotion = prefersReducedMotion();
    this._lastPathKey = null;
    this._rerouteTimers = new Map();
  }

  /** Replace the search overlay, restarting the route draw-in when the path changes. */
  setOverlay(overlay) {
    const key = pathKey(overlay);
    if (key && key !== this._lastPathKey) {
      this.routeAnimStart = now();
    }
    if (!key) this.routeAnimStart = 0;
    this._lastPathKey = key;
    this.overlay = {
      previousPath: this.overlay?.previousPath ?? null,
      previousPathB: this.overlay?.previousPathB ?? null,
      ...overlay,
    };
  }

  /**
   * Show the route the rider just abandoned fading out beneath the new one, so
   * a reroute reads as a visible course change rather than a silent swap.
   */
  flagReroute(newPath, slot = 'path') {
    const pathSlot = slot === 'comparePathB' || slot === 'pathB' ? 'comparePathB' : 'path';
    const previousSlot = pathSlot === 'comparePathB' ? 'previousPathB' : 'previousPath';
    const old = this.overlay?.[pathSlot];
    if (!old || !newPath) return;
    this.setOverlay({ ...this.overlay, [previousSlot]: old, [pathSlot]: newPath });
    if (this._rerouteTimers.get(previousSlot)) clearTimeout(this._rerouteTimers.get(previousSlot));
    this._rerouteTimers.set(previousSlot, setTimeout(() => {
      if (this.overlay?.[previousSlot]) {
        this.overlay = { ...this.overlay, [previousSlot]: null };
      }
      this._rerouteTimers.delete(previousSlot);
    }, REROUTE_FADE_MS));
  }

  setEmptyState(emptyState) {
    this.emptyState = emptyState;
  }

  /** Hide the centred empty-state prompt while another guide (e.g. a mission card) is on screen. */
  setEmptyStateSuppressed(on) {
    this.emptyStateSuppressed = Boolean(on);
  }

  setShowCongestion(on) {
    this.showCongestion = Boolean(on);
  }

  /** Fire the arrival flourish at a world position, given its screen position. */
  celebrate(worldX, worldY, screenX, screenY) {
    this.arrivalAt = now();
    this.arrivalWorld = [worldX, worldY];
    if (Number.isFinite(screenX) && Number.isFinite(screenY)) {
      burstConfetti(screenX, screenY, { reducedMotion: this.reducedMotion });
    }
  }

  resetForWorld() {
    this.overlay = null;
    this.routeAnimStart = 0;
    this.arrivalAt = 0;
    this.arrivalWorld = null;
    this._lastPathKey = null;
    for (const timer of this._rerouteTimers.values()) clearTimeout(timer);
    this._rerouteTimers.clear();
    clearConfetti();
    clearTrails();
  }

  /** Bundle everything the shared scene drawers need for one frame. */
  sceneState({ graph, project, state, viewport, congestion }) {
    return {
      graph,
      project,
      state,
      viewport,
      congestion,
      overlay: this.overlay,
      time: now(),
      reducedMotion: this.reducedMotion,
      showCongestion: this.showCongestion,
      emptyState: this.emptyStateSuppressed ? null : this.emptyState,
      routeAnimStart: this.routeAnimStart,
      arrivalAt: this.arrivalAt,
      arrivalWorld: this.arrivalWorld,
    };
  }
}

function now() {
  return typeof performance !== 'undefined' ? performance.now() : Date.now();
}

/** Cheap identity for the current route(s), so we can detect a genuinely new path. */
function pathKey(overlay) {
  if (!overlay) return null;
  if (overlay.drawKey) return overlay.drawKey;
  const a = overlay.path?.nodes ?? overlay.path;
  const b = overlay.comparePathB?.nodes ?? overlay.comparePathB;
  if (!a && !b) return null;
  return `${summarise(a)}~${summarise(b)}`;
}

function summarise(nodes) {
  if (!nodes || !nodes.length) return '';
  return `${nodes.length}:${nodes[0]}:${nodes[nodes.length - 1]}`;
}
