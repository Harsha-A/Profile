/**
 * A minimal synchronous event bus: on / off / emit / once.
 * The simulation core emits domain events; the UI subscribes. The core
 * never imports or calls into the UI directly.
 */
export class EventBus {
  constructor() {
    /** @type {Map<string, Set<Function>>} */
    this._listeners = new Map();
  }

  /**
   * @param {string} event
   * @param {Function} fn
   * @returns {() => void} an unsubscribe function
   */
  on(event, fn) {
    if (!this._listeners.has(event)) this._listeners.set(event, new Set());
    this._listeners.get(event).add(fn);
    return () => this.off(event, fn);
  }

  /** Subscribe for a single emission, then auto-unsubscribe. */
  once(event, fn) {
    const off = this.on(event, (...args) => {
      off();
      fn(...args);
    });
    return off;
  }

  /** @param {string} event @param {Function} fn */
  off(event, fn) {
    const set = this._listeners.get(event);
    if (set) set.delete(fn);
  }

  /** @param {string} event @param {*} [payload] */
  emit(event, payload) {
    const set = this._listeners.get(event);
    if (!set || set.size === 0) return;
    // Snapshot so a listener can unsubscribe during iteration safely.
    for (const fn of [...set]) fn(payload);
  }

  /** Remove every listener, optionally scoped to one event. */
  clear(event) {
    if (event) this._listeners.delete(event);
    else this._listeners.clear();
  }
}
