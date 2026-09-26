/** Animated bar chart comparing how many intersections each algorithm checked. */

function reducedMotion() {
  return typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Create the effort chart controller rendering into `el` (#effort-chart).
 * @param {{ el: HTMLElement }} opts
 * @returns {{
 *   show: (rows: Array<{ label: string, value: number, color: string, note?: string }>) => void,
 *   hide: () => void,
 *   clear: () => void,
 * }}
 */
export function createEffortChart({ el: rootEl }) {
  let rafId = 0;

  function cancelPending() {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = 0;
  }

  function clear() {
    cancelPending();
    rootEl.replaceChildren();
  }

  function show(rows) {
    clear();
    const list = Array.isArray(rows) ? rows : [];
    let max = 0;
    for (const r of list) if (Number.isFinite(r.value) && r.value > max) max = r.value;

    const heading = document.createElement('span');
    heading.className = 'hud-label';
    heading.textContent = 'Intersections checked';
    rootEl.append(heading);

    const fills = [];
    for (const r of list) {
      const row = document.createElement('div');
      row.className = 'effort-row';

      const head = document.createElement('div');
      head.className = 'effort-row-head';
      const label = document.createElement('span');
      label.textContent = r.label ?? '';
      const right = document.createElement('span');
      const b = document.createElement('b');
      b.textContent = Number.isFinite(r.value) ? r.value.toLocaleString() : '—';
      right.append(b);
      if (r.note) right.append(` ${r.note}`);
      head.append(label, right);

      const bar = document.createElement('div');
      bar.className = 'effort-bar';
      const fill = document.createElement('span');
      if (r.color) fill.style.background = r.color;
      bar.append(fill);

      row.append(head, bar);
      rootEl.append(row);

      const pct = max > 0 && Number.isFinite(r.value) ? Math.max(0, (r.value / max) * 100) : 0;
      fills.push([fill, `${pct}%`]);
    }

    rootEl.hidden = false;

    if (reducedMotion()) {
      // Disable the CSS transition too so the bars appear at full width instantly.
      for (const [fill, width] of fills) {
        fill.style.transition = 'none';
        fill.style.width = width;
      }
      return;
    }

    for (const [fill] of fills) fill.style.width = '0';
    // Two frames: the first rAF runs before the new nodes' initial style is
    // computed, so a single frame would skip the transition.
    rafId = requestAnimationFrame(() => {
      rafId = requestAnimationFrame(() => {
        rafId = 0;
        for (const [fill, width] of fills) fill.style.width = width;
      });
    });
  }

  function hide() {
    rootEl.hidden = true;
  }

  return { show, hide, clear };
}
