/** Floating rider HUD: live ETA, distance left, current street and progress. */

import { remainingRoute, currentStreet } from '../movers/mover.js';
import { formatDuration, formatDistance } from './format.js';

const REROUTE_FLAG_MS = 2500;
const UNNAMED_STREET = 'On an unnamed road';

function div(className, text) {
  const node = document.createElement('div');
  node.className = className;
  if (text != null) node.textContent = text;
  return node;
}

/**
 * Create the rider HUD inside `el` (#rider-hud). DOM is built once; `update`
 * only writes values that changed since the previous frame.
 * @param {{ el: HTMLElement }} opts
 * @returns {{
 *   show: () => void,
 *   hide: () => void,
 *   update: (args: { mover: object, graph: object, trafficFactor?: Function, simTime: number, label?: string, totalDistanceM?: number, plannedEtaSec?: number }) => void,
 *   markArrived: (args: { mover?: object, elapsedText: string }) => void,
 *   flagReroute: () => void,
 *   clear: () => void,
 * }}
 */
export function createRiderHud({ el }) {
  const avatar = div('hud-avatar', '🛵');
  const title = div('hud-title');
  const status = div('hud-status');
  const headText = document.createElement('div');
  headText.append(title, status);
  const head = div('hud-head');
  head.append(avatar, headText);

  const etaValue = div('hud-value', '—');
  const distValue = div('hud-value', '—');
  const etaCell = div('hud-cell');
  etaCell.append(div('hud-label', 'Arrives in'), etaValue);
  const distCell = div('hud-cell');
  distCell.append(div('hud-label', 'Distance left'), distValue);
  const body = div('hud-body');
  body.append(etaCell, distCell);

  const street = div('hud-street');
  const progress = div('hud-progress');
  const bar = document.createElement('span');
  bar.style.width = '0%';
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) bar.style.transition = 'none';
  progress.append(bar);

  el.replaceChildren(head, body, street, progress);

  let cache;
  let frozen = false;
  let rerouteUntil = 0;
  let rerouteTimer = null;
  let observedTotal = 0;
  let visible = !el.hidden;

  function resetCache() {
    cache = { title: null, status: null, statusClass: null, color: null, eta: null, dist: null, street: null, width: null };
  }
  resetCache();

  // Each setter compares against the cached value so steady frames cost no DOM writes.
  function setText(key, node, value) {
    if (cache[key] === value) return;
    cache[key] = value;
    node.textContent = value;
  }

  function setStatus(text, cls) {
    setText('status', status, text);
    if (cache.statusClass !== cls) {
      cache.statusClass = cls;
      status.className = cls ? `hud-status ${cls}` : 'hud-status';
    }
  }

  function setColor(color) {
    const value = color || '';
    if (cache.color === value) return;
    cache.color = value;
    avatar.style.borderColor = value;
  }

  function setProgress(fraction) {
    const pct = Math.round(Math.max(0, Math.min(1, fraction)) * 1000) / 10;
    const value = `${pct}%`;
    if (cache.width === value) return;
    cache.width = value;
    bar.style.width = value;
  }

  function show() {
    if (visible) return;
    visible = true;
    el.hidden = false;
  }

  function hide() {
    if (!visible) return;
    visible = false;
    el.hidden = true;
  }

  function update({ mover, graph, trafficFactor, simTime, label, totalDistanceM }) {
    if (frozen || !mover || !graph) return;

    setText('title', title, `Rider · ${label || mover.algorithm || 'route'}`);
    setColor(mover.color);

    if (mover.arrived) setStatus('Delivered', 'good');
    else if (mover.congested) setStatus('Slow traffic', 'warn');
    else if (rerouteUntil && performance.now() < rerouteUntil) setStatus('Rerouting…', 'warn');
    else setStatus('En route', '');

    const { distanceM, etaSec } = remainingRoute(mover, graph, trafficFactor, simTime);
    setText('eta', etaValue, formatDuration(etaSec));
    setText('dist', distValue, formatDistance(distanceM));

    const name = currentStreet(mover, graph);
    setText('street', street, `📍 ${name ? name : UNNAMED_STREET}`);

    if (!totalDistanceM && !observedTotal && distanceM > 0) observedTotal = distanceM;
    const total = totalDistanceM || observedTotal;
    setProgress(mover.arrived ? 1 : total > 0 ? 1 - distanceM / total : 0);
  }

  function markArrived({ mover, elapsedText } = {}) {
    if (mover) setColor(mover.color);
    setStatus(`Delivered in ${elapsedText ?? '—'}`, 'good');
    setText('eta', etaValue, formatDuration(0));
    setText('dist', distValue, formatDistance(0));
    setProgress(1);
    frozen = true;
  }

  function flagReroute() {
    if (frozen) return;
    rerouteUntil = performance.now() + REROUTE_FLAG_MS;
    setStatus('Rerouting…', 'warn');
    clearTimeout(rerouteTimer);
    // Revert even if update() stops being called (e.g. sim paused).
    rerouteTimer = setTimeout(() => {
      rerouteTimer = null;
      rerouteUntil = 0;
      if (!frozen && cache.status === 'Rerouting…') setStatus('En route', '');
    }, REROUTE_FLAG_MS);
  }

  function clear() {
    clearTimeout(rerouteTimer);
    rerouteTimer = null;
    rerouteUntil = 0;
    frozen = false;
    observedTotal = 0;
    resetCache();
    title.textContent = '';
    status.textContent = '';
    status.className = 'hud-status';
    avatar.style.borderColor = '';
    etaValue.textContent = '—';
    distValue.textContent = '—';
    street.textContent = '';
    bar.style.width = '0%';
    cache.width = '0%';
    hide();
  }

  return { show, hide, update, markArrived, flagReroute, clear };
}
