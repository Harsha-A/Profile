/** Top-bar rush-hour chip next to the clock. */

import { congestionLabel } from '../render/palette.js';

const CHIP_FOR_LABEL = {
  'Free flowing': 'chip-good',
  Building: 'chip-quiet',
  Heavy: 'chip-warn',
  'Rush hour': 'chip-bad',
};

function timeOfDayEmoji(simTime) {
  if (!Number.isFinite(simTime)) return '';
  const hour = ((simTime % 86400) + 86400) % 86400 / 3600;
  if (hour < 5 || hour >= 20) return '🌙';
  if (hour < 8) return '🌅';
  if (hour < 17) return '☀️';
  return '🌆';
}

/**
 * Create the traffic regime readout bound to `el` (#traffic-regime).
 * @param {{ el: HTMLElement, clockEl?: HTMLElement }} opts
 * @returns {{
 *   update: (args: { trafficFactor: number, simTime: number, enabled: boolean }) => void,
 *   hide: () => void,
 *   show: () => void,
 * }}
 */
export function createTrafficReadout({ el, clockEl }) {
  if (clockEl) clockEl.title = 'Simulated time of day — it drives both traffic and the map’s lighting';

  let lastText = null;
  let lastChip = null;

  function update({ trafficFactor, simTime, enabled }) {
    let label;
    let chip;
    if (!enabled) {
      label = 'Traffic off';
      chip = 'chip-quiet';
    } else {
      label = congestionLabel(Number.isFinite(trafficFactor) ? trafficFactor : 1);
      chip = CHIP_FOR_LABEL[label] ?? 'chip-quiet';
    }
    const emoji = timeOfDayEmoji(simTime);
    const text = emoji ? `${emoji} ${label}` : label;

    if (text !== lastText) {
      lastText = text;
      el.textContent = text;
    }
    if (chip !== lastChip) {
      lastChip = chip;
      el.className = `chip ${chip}`;
    }
  }

  function hide() {
    el.hidden = true;
  }

  function show() {
    el.hidden = false;
  }

  return { update, hide, show };
}
