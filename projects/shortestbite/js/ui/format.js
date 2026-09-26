/** Duration and distance formatting helpers for the UI. */

export function formatDuration(seconds) {
  if (!Number.isFinite(seconds)) return '—';
  const s = Math.round(seconds);
  const m = Math.floor(s / 60);
  const rem = s % 60;
  if (m === 0) return `${rem}s`;
  return `${m}m ${rem}s`;
}

export function formatDistance(metres) {
  if (!Number.isFinite(metres)) return '—';
  if (metres >= 1000) return `${(metres / 1000).toFixed(2)} km`;
  return `${Math.round(metres)} m`;
}

export function formatClock(simSeconds) {
  const daySeconds = 24 * 3600;
  const wrapped = ((simSeconds % daySeconds) + daySeconds) % daySeconds;
  const h = Math.floor(wrapped / 3600);
  const m = Math.floor((wrapped % 3600) / 60);
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

export function formatMs(ms) {
  return `${ms.toFixed(2)} ms`;
}
