import { CLASS_SENSITIVITY, peakIntensity } from '../city/traffic.js';
import { rerouteDecision, rerouteThresholdSec } from '../movers/routing.js';
import { FACTS } from './facts.js';

/** Calculator ids supported by {@link mountCalculator}. */
export const CALC_IDS = Object.freeze(['reroute', 'edge-cost']);

const KMH_TO_MPS = 1000 / 3600;
let mountSeq = 0;

/**
 * Mount an interactive Knowledge calculator into an element.
 * @param {string} id one of {@link CALC_IDS}
 * @param {HTMLElement} el host element
 * @returns {{ destroy: () => void }}
 */
export function mountCalculator(id, el) {
  if (id === 'reroute') return mountRerouteCalculator(el);
  if (id === 'edge-cost') return mountEdgeCostCalculator(el);
  throw new Error(`Unknown calculator id: ${id}`);
}

function mountRerouteCalculator(el) {
  const uid = `kb-reroute-${++mountSeq}`;
  el.innerHTML = `
    <div class="kb-calc" data-kb-calc="reroute">
      <div class="kb-calc-row">
        <label for="${uid}-remaining">Remaining current route (minutes)</label>
        <input id="${uid}-remaining" name="remaining" type="number" min="0" step="0.5" value="12">
      </div>
      <div class="kb-calc-row">
        <label for="${uid}-alt">Best alternative route (minutes)</label>
        <input id="${uid}-alt" name="alternative" type="number" min="0" step="0.5" value="10.5">
      </div>
      <div class="kb-calc-row">
        <label for="${uid}-blocked">Closure ahead on current route</label>
        <input id="${uid}-blocked" name="blocked" type="checkbox">
      </div>
      <output class="kb-calc-out" aria-live="polite"></output>
    </div>
  `;
  const root = el.querySelector('.kb-calc');
  const out = root.querySelector('output');
  const inputs = [...root.querySelectorAll('input')];
  const update = () => {
    const remainingSec = readNumber(root, 'remaining') * 60;
    const bestAltSec = readNumber(root, 'alternative') * 60;
    const blocked = control(root, 'blocked').checked;
    const thresholdSec = rerouteThresholdSec(remainingSec, {
      minGain: FACTS.rerouteMinGain,
      minGainSec: FACTS.rerouteMinGainSec,
    });
    const gainSec = remainingSec - bestAltSec;
    const decision = rerouteDecision({
      remainingSec,
      bestAltSec,
      blocked,
      minGain: FACTS.rerouteMinGain,
      minGainSec: FACTS.rerouteMinGainSec,
    });
    out.className = `kb-calc-out kb-calc-decision--${decision}`;
    out.textContent = rerouteSentence(decision, gainSec, thresholdSec, blocked);
  };
  for (const input of inputs) input.addEventListener('input', update);
  update();
  return destroyer(el, inputs, update);
}

function mountEdgeCostCalculator(el) {
  const uid = `kb-edge-${++mountSeq}`;
  const options = Object.keys(FACTS.speedsKmh)
    .map((roadClass) => `<option value="${roadClass}">${roadClass} (${FACTS.speedsKmh[roadClass]} km/h)</option>`)
    .join('');
  el.innerHTML = `
    <div class="kb-calc" data-kb-calc="edge-cost">
      <div class="kb-calc-row">
        <label for="${uid}-length">Road length (metres)</label>
        <input id="${uid}-length" name="length" type="number" min="1" step="10" value="200">
      </div>
      <div class="kb-calc-row">
        <label for="${uid}-class">Road class</label>
        <select id="${uid}-class" name="roadClass">${options}</select>
      </div>
      <div class="kb-calc-row">
        <label for="${uid}-clock">Clock time</label>
        <input id="${uid}-clock" name="clock" type="time" step="900" value="${FACTS.startClock}">
      </div>
      <output class="kb-calc-out" aria-live="polite"></output>
    </div>
  `;
  const root = el.querySelector('.kb-calc');
  const out = root.querySelector('output');
  const controls = [...root.querySelectorAll('input, select')];
  const update = () => {
    const length = readNumber(root, 'length');
    const roadClass = control(root, 'roadClass').value;
    const clock = control(root, 'clock').value;
    const clockSec = parseClock(clock);
    const factor = trafficFactor(roadClass, clockSec);
    const seconds = length / ((FACTS.speedsKmh[roadClass] * KMH_TO_MPS) * factor);
    out.className = 'kb-calc-out';
    out.textContent = `${length.toFixed(0)} m on a ${roadClass} road at ${clock} has traffic factor ${factor.toFixed(2)} (noise = 1), so it costs ${seconds.toFixed(1)}s.`;
  };
  for (const control of controls) control.addEventListener('input', update);
  update();
  return destroyer(el, controls, update);
}

function rerouteSentence(decision, gainSec, thresholdSec, blocked) {
  if (decision === 'blocked') return '⛔ Blocked: the current route is closed and no alternative path exists.';
  if (decision === 'reroute' && blocked) return `Reroute: a closure is ahead, so the rider switches as soon as any path exists. Time saved: ${fmt(gainSec)}.`;
  if (decision === 'reroute') return `Reroute: the alternative saves ${fmt(gainSec)}, meeting the ${fmt(thresholdSec)} threshold.`;
  return `Keep going: the alternative saves ${fmt(gainSec)}, below the ${fmt(thresholdSec)} threshold.`;
}

function trafficFactor(roadClass, simTime) {
  const sensitivity = CLASS_SENSITIVITY[roadClass] ?? CLASS_SENSITIVITY.local;
  const daily = 1 - sensitivity * peakIntensity(simTime);
  return Math.max(FACTS.minTrafficFactor, Math.min(1, daily));
}

function readNumber(form, name) {
  const value = Number(control(form, name).value);
  return Number.isFinite(value) ? Math.max(0, value) : 0;
}

function control(root, name) {
  return root.querySelector(`[name="${name}"]`);
}

function parseClock(value) {
  const [hh = '0', mm = '0'] = String(value).split(':');
  return (Number(hh) * 3600) + (Number(mm) * 60);
}

function fmt(seconds) {
  return `${seconds.toFixed(1)}s`;
}

function destroyer(el, controls, update) {
  return {
    destroy() {
      for (const control of controls) control.removeEventListener('input', update);
      el.replaceChildren();
    },
  };
}
