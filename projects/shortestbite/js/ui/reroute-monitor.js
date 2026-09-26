/** Live explanation of reroute checks and their gain threshold. */

const REROUTE_FLASH_MS = 1200;

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function fallbackTime(seconds) {
  if (!Number.isFinite(seconds)) return '—';
  const total = Math.max(0, Math.round(seconds));
  const min = Math.floor(total / 60);
  const sec = total % 60;
  return min > 0 ? `${min}m ${String(sec).padStart(2, '0')}s` : `${sec}s`;
}

function formatTime(value, fmtTime) {
  return typeof fmtTime === 'function' ? fmtTime(value) : fallbackTime(value);
}

function clamp01(value) {
  return Math.max(0, Math.min(1, value));
}

function gainFrom(check) {
  const explicit = Number(check?.gainSec);
  if (Number.isFinite(explicit)) return Math.max(0, explicit);
  const remaining = Number(check?.remainingSec);
  const best = Number(check?.bestAltSec);
  if (!Number.isFinite(remaining) || !Number.isFinite(best)) return 0;
  return Math.max(0, remaining - best);
}

function keepMessage(check, fmtTime) {
  const gain = gainFrom(check);
  const threshold = Number(check?.thresholdSec);
  const thresholdText = Number.isFinite(threshold) ? formatTime(threshold, fmtTime) : 'the reroute threshold';
  const bestAlt = Number(check?.bestAltSec);
  if (!Number.isFinite(bestAlt)) return `Checked a new route · no usable alternative · needs ≥${thresholdText} to switch`;
  return `Checked a new route · best alternative saves ${formatTime(gain, fmtTime)} · needs ≥${thresholdText} to switch`;
}

function messageFor(check, fmtTime) {
  const decision = check?.decision;
  if (decision === 'blocked') return 'Road ahead closed and no way around · waiting for it to reopen';
  if (decision === 'reroute' && check?.blocked) return 'Road ahead closed · switched to the best way around (a closure always forces a switch)';
  if (decision === 'reroute') return `Switched route · saves ${formatTime(gainFrom(check), fmtTime)}`;
  return keepMessage(check, fmtTime);
}

function kbLink(id, text) {
  return `<button class="kb-link" data-kb="${escapeHtml(id)}" type="button">${escapeHtml(text)}</button>`;
}

/**
 * @param {{ el: HTMLElement }} opts
 * @returns {{ update: (check: object, helpers?: { fmtTime?: Function }) => void, blocked: () => void, unblocked: () => void, clear: () => void, hide: () => void }}
 */
export function createRerouteMonitor({ el }) {
  let flashTimer = 0;

  function clearFlash() {
    clearTimeout(flashTimer);
    flashTimer = 0;
    el.classList.remove('is-reroute');
  }

  function hide() {
    el.hidden = true;
  }

  function render(text, gain, threshold, { blocked = false } = {}) {
    const ratio = Number.isFinite(threshold) && threshold > 0 ? gain / threshold / 1.5 : 0;
    const width = `${Math.round(clamp01(ratio) * 1000) / 10}%`;
    const blockedLink = blocked ? ` ${kbLink('closures', 'Learn more →')}` : '';
    el.classList.add('reroute-monitor');
    el.hidden = false;
    el.innerHTML = `
      <div class="rm-status">${escapeHtml(text)}${blockedLink}</div>
      <div class="rm-bar" aria-hidden="true"><span class="rm-fill" style="width:${width}"></span><span class="rm-threshold"></span></div>
      <div class="rm-caption">checks every 10s of sim time, instantly if a road closes ${kbLink('reroute-decision', 'How is this decided? →')}</div>`;
  }

  function update(check, { fmtTime } = {}) {
    const decision = check?.decision;
    const gain = gainFrom(check);
    const threshold = Number(check?.thresholdSec);

    const blocked = decision === 'blocked';
    render(messageFor(check, fmtTime), gain, threshold, { blocked });
    el.classList.toggle('is-blocked', blocked);

    if (decision === 'reroute') {
      clearTimeout(flashTimer);
      el.classList.add('is-reroute');
      flashTimer = setTimeout(() => {
        flashTimer = 0;
        el.classList.remove('is-reroute');
      }, REROUTE_FLASH_MS);
    } else {
      clearFlash();
    }
  }

  function blocked() {
    clearFlash();
    render('Road ahead closed and no way around · waiting for it to reopen', 0, 1, { blocked: true });
    el.classList.add('is-blocked');
  }

  function unblocked() {
    el.classList.remove('is-blocked');
  }

  function clear() {
    clearFlash();
    el.classList.remove('reroute-monitor', 'is-blocked');
    el.replaceChildren();
    hide();
  }

  return { update, blocked, unblocked, clear, hide };
}
