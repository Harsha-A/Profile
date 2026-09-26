/** Accessible help popovers for statistic labels. */

export const STAT_HELP = {
  status: {
    label: 'Status',
    help: 'What the delivery or search is doing right now, such as planning, riding, blocked, or delivered.',
    kb: 'stats-glossary',
  },
  explored: {
    label: 'Intersections checked',
    help: 'How many intersections the algorithm finalised before it was sure. More checks mean more proof, but also more work.',
    kb: 'why-extra-nodes',
  },
  heap: {
    label: 'Largest frontier',
    help: 'Peak number of intersections waiting in the priority queue at once — a measure of memory.',
    kb: 'priority-queue',
  },
  time: {
    label: 'Predicted time',
    help: 'The route’s estimated travel time using road length, speed, and simulated traffic.',
    kb: 'edge-cost',
  },
  distance: {
    label: 'Distance',
    help: 'The total length of the chosen route from pickup to drop-off.',
    kb: 'stats-glossary',
  },
  segments: {
    label: 'Road segments',
    help: 'Number of road pieces in the chosen route.',
    kb: 'stats-glossary',
  },
  compute: {
    label: 'Search time',
    help: 'Pure algorithm CPU time, excluding animation.',
    kb: 'stats-glossary',
  },
};

const rootStates = new WeakMap();
let nextId = 1;

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function closeOpen(state) {
  if (!state.open) return;
  const { button, popover } = state.open;
  button.setAttribute('aria-expanded', 'false');
  button.removeAttribute('aria-describedby');
  popover.remove();
  state.open = null;
}

function openPopover(state, button, item, text) {
  closeOpen(state);
  const popover = document.createElement('span');
  popover.className = 'stat-help-pop';
  popover.id = button.dataset.popoverId;
  popover.role = 'tooltip';
  popover.innerHTML = `${escapeHtml(text)} <button class="kb-link" data-kb="${escapeHtml(button.dataset.kbTopic ?? '')}" type="button">Learn more →</button>`;
  item.append(popover);
  keepInsidePanel(popover, item);
  button.setAttribute('aria-expanded', 'true');
  button.setAttribute('aria-describedby', popover.id);
  state.open = { button, popover, item };
}

// The popover hangs off a narrow label; nudge it left so the side panel never clips it.
function keepInsidePanel(popover, item) {
  const bounds = (item.closest('#algo-panel, .panel-section') || document.documentElement).getBoundingClientRect();
  const rect = popover.getBoundingClientRect();
  const overflow = rect.right - (bounds.right - 10);
  if (overflow > 0) popover.style.transform = `translateX(${-Math.min(overflow, Math.max(0, rect.left - bounds.left - 10))}px)`;
}

function ensureRootState(rootEl) {
  let state = rootStates.get(rootEl);
  if (state) return state;
  state = { open: null };
  rootStates.set(rootEl, state);

  document.addEventListener('click', (event) => {
    if (!state.open || state.open.item.contains(event.target)) return;
    closeOpen(state);
  });
  rootEl.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    closeOpen(state);
  });
  rootEl.addEventListener('focusout', (event) => {
    if (!state.open) return;
    const next = event.relatedTarget;
    if (next && state.open.item.contains(next)) return;
    closeOpen(state);
  });

  return state;
}

/**
 * Adds an ⓘ help button to every `[data-stat="key"]` inside `rootEl`.
 * Expected DOM: the stat label/value wrapper carries `data-stat`; optionally put
 * a child with `[data-stat-label]` inside it and this helper will replace only
 * that child text with STAT_HELP[key].label before appending the button.
 *
 * @param {HTMLElement} rootEl
 */
export function attachStatHelp(rootEl) {
  if (!rootEl) return;
  const state = ensureRootState(rootEl);
  for (const item of rootEl.querySelectorAll('[data-stat]')) {
    const stat = STAT_HELP[item.dataset.stat];
    if (!stat) continue;

    const labelTarget = item.querySelector('[data-stat-label]');
    if (labelTarget) labelTarget.textContent = stat.label;

    let button = item.querySelector(':scope > .stat-help');
    if (!button) {
      button = document.createElement('button');
      button.type = 'button';
      button.className = 'stat-help';
      button.textContent = 'ⓘ';
      button.dataset.popoverId = `stat-help-pop-${nextId++}`;
      item.append(button);
    }

    button.setAttribute('aria-label', `What is ${stat.label}?`);
    button.setAttribute('aria-expanded', 'false');
    button.dataset.kbTopic = stat.kb;

    if (button.dataset.statHelpBound === 'true') continue;
    button.dataset.statHelpBound = 'true';
    button.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      if (state.open?.button === button) {
        closeOpen(state);
        return;
      }
      openPopover(state, button, item, stat.help);
    });
  }
}
