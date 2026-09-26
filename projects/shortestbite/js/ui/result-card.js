/** Celebratory "delivered" summary card shown when the rider arrives. */

const COPIED_MS = 1500;

function div(className, text) {
  const node = document.createElement('div');
  node.className = className;
  if (text != null) node.textContent = text;
  return node;
}

async function copyText(text) {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // Clipboard may be blocked (insecure context / permissions) — fail silently.
  }
  return false;
}

/**
 * Create the result card controller rendering into `rootEl` (#result-card-root).
 * @param {{ rootEl: HTMLElement, onClose?: () => void, onShare?: (url: string) => void }} opts
 * @returns {{
 *   show: (payload: { title: string, kicker?: string, sub?: string, stats?: Array<{label: string, value: string}>, shareUrl?: string }) => void,
 *   hide: () => void,
 * }}
 */
export function createResultCard({ rootEl, onClose, onShare }) {
  let card = null;
  let copyTimer = null;
  let detach = null;

  function teardown() {
    clearTimeout(copyTimer);
    copyTimer = null;
    if (detach) detach();
    detach = null;
    if (card) card.remove();
    card = null;
  }

  function hide() {
    if (!card) return;
    teardown();
    onClose?.();
  }

  function show(payload = {}) {
    teardown();
    const stats = Array.isArray(payload.stats) ? payload.stats : [];

    const head = div('result-head');
    head.append(
      div('result-kicker', payload.kicker ?? 'Order complete'),
      div('result-title', payload.title ?? 'Delivered'),
    );
    if (payload.sub) head.append(div('result-sub', payload.sub));

    const el = div('result-card');
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-label', payload.title ?? 'Delivery result');
    el.append(head);

    if (stats.length) {
      const grid = div('result-grid');
      if (stats.length !== 3) grid.style.gridTemplateColumns = `repeat(${stats.length}, 1fr)`;
      for (const s of stats) {
        const cell = div('result-cell');
        cell.append(div('hud-label', String(s.label ?? '')), div('hud-value', String(s.value ?? '')));
        grid.append(cell);
      }
      el.append(grid);
    }

    const actions = div('result-actions');
    const copyBtn = document.createElement('button');
    copyBtn.type = 'button';
    copyBtn.textContent = 'Copy link';
    copyBtn.disabled = !payload.shareUrl;
    copyBtn.addEventListener('click', async () => {
      const url = payload.shareUrl;
      if (!url) return;
      await copyText(url);
      onShare?.(url);
      if (!copyBtn.isConnected) return;
      copyBtn.textContent = 'Copied!';
      clearTimeout(copyTimer);
      copyTimer = setTimeout(() => {
        copyBtn.textContent = 'Copy link';
      }, COPIED_MS);
    });

    const doneBtn = document.createElement('button');
    doneBtn.type = 'button';
    doneBtn.className = 'primary';
    doneBtn.textContent = 'Done';
    doneBtn.addEventListener('click', hide);

    actions.append(copyBtn, doneBtn);
    el.append(actions);

    rootEl.append(el);
    card = el;

    const onKey = (e) => {
      if (e.key === 'Escape') hide();
    };
    const onPointer = (e) => {
      if (card && !card.contains(e.target)) hide();
    };
    document.addEventListener('keydown', onKey);
    // Defer so the click that triggered show() doesn't immediately close it.
    const armTimer = setTimeout(() => document.addEventListener('pointerdown', onPointer), 0);
    detach = () => {
      clearTimeout(armTimer);
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
    };

    doneBtn.focus({ preventScroll: true });
  }

  return { show, hide };
}
