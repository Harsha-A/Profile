const ROWS = [
  { swatch: 'swatch gradient', term: 'Explored', text: 'intersections the algorithm has already committed to. Blue = early, violet = late.' },
  { swatch: 'swatch ring', term: 'Frontier', text: 'the roads it’s considering right now.' },
  { swatch: 'swatch', style: { background: '#facc15' }, term: 'Chosen route', text: 'the winner.' },
  { swatch: 'swatch traffic', term: 'Traffic', text: 'main roads warm to amber, then red, as congestion builds.' },
  {
    swatch: 'swatch',
    style: { background: '#7f1d1d', border: '1.5px dashed #f87171' },
    term: 'Closed road',
    text: 'blocked; riders route around it.',
  },
];

// Expanded, the legend covers ~220x260px of map; only default it open when the map is roomy.
function defaultOpen() {
  return typeof window === 'undefined' || window.innerWidth >= 1600;
}

function readOpen(key) {
  try {
    const v = localStorage.getItem(key);
    return v === null ? defaultOpen() : v === '1';
  } catch {
    return defaultOpen();
  }
}

function writeOpen(key, open) {
  try {
    localStorage.setItem(key, open ? '1' : '0');
  } catch {
    /* storage unavailable — keep state in memory only */
  }
}

/**
 * Collapsible legend explaining the map's colours. Open/closed state
 * persists in localStorage (default: open on wide screens, collapsed below 1600px).
 *
 * The passed `el` is replaced in the DOM by a `<details>` carrying the same
 * id, classes and `hidden` state; use the returned controls (or re-query the
 * id) rather than holding on to `el`.
 *
 * @param {{ el: HTMLElement, storageKey?: string }} opts
 * @returns {{ show(): void, hide(): void, setOpen(open: boolean): void, collapseForOverlay(on: boolean): void }}
 */
export function createLegend({ el, storageKey = 'sb.legend.open' }) {
  // Swap the placeholder <div> for a <details> in place, rather than nesting one
  // inside it: `.map-legend` is absolutely positioned, and an empty wrapper div
  // left behind would become a stray flex item (adding a gap) inside #map-ui.
  const details = document.createElement('details');
  details.id = el.id;
  details.className = el.className || 'map-legend';
  details.classList.add('map-legend');
  details.hidden = el.hidden;

  const summary = document.createElement('summary');
  summary.textContent = 'Map legend';

  const body = document.createElement('div');
  body.className = 'legend-body';
  for (const row of ROWS) {
    const line = document.createElement('div');
    line.className = 'legend-row';
    const swatch = document.createElement('span');
    swatch.className = row.swatch;
    swatch.setAttribute('aria-hidden', 'true');
    if (row.style) Object.assign(swatch.style, row.style);
    const text = document.createElement('span');
    const b = document.createElement('b');
    b.textContent = row.term;
    text.append(b, ` — ${row.text}`);
    line.append(swatch, text);
    body.append(line);
  }

  details.append(summary, body);
  details.open = readOpen(storageKey);
  // collapseForOverlay() folds the legend while a big overlay (mission card) needs the map,
  // without overwriting the user's saved preference.
  let autoCollapsed = false;
  let ignoreToggle = false;
  details.addEventListener('toggle', () => {
    if (ignoreToggle) {
      ignoreToggle = false;
      return;
    }
    autoCollapsed = false;
    writeOpen(storageKey, details.open);
  });

  if (el.parentNode) el.replaceWith(details);

  return {
    show() {
      details.hidden = false;
    },
    hide() {
      details.hidden = true;
    },
    setOpen(open) {
      autoCollapsed = false;
      details.open = Boolean(open);
      writeOpen(storageKey, details.open);
    },
    collapseForOverlay(on) {
      if (on && details.open && !autoCollapsed) {
        autoCollapsed = true;
        ignoreToggle = true;
        details.open = false;
      } else if (!on && autoCollapsed) {
        autoCollapsed = false;
        ignoreToggle = true;
        details.open = true;
      }
    },
  };
}
