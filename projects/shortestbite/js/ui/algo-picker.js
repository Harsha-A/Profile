/**
 * @typedef {{ label: string, kind: 'good' | 'warn' | 'bad' | 'quiet' }} AlgoTag
 * @typedef {{
 *   id: string, name: string, tech: string, why: string, see: string,
 *   tags: AlgoTag[], recommended: boolean,
 * }} AlgoDescriptor
 */

/** @type {AlgoDescriptor[]} */
export const ALGORITHMS = [
  {
    id: 'bfs',
    name: 'Fewest turns',
    tech: 'Breadth-first search',
    why: 'Counts intersections, not minutes. It finds the route with the fewest junctions, even if that means sitting on a jammed main road — a neat way to see that shortest isn’t always fastest.',
    see: 'Watch the search spread in even rings of junctions, blind to traffic — then compare its route’s time with Dijkstra’s.',
    tags: [
      { label: 'Ignores traffic', kind: 'bad' },
      { label: 'Fewest hops', kind: 'quiet' },
    ],
    recommended: false,
  },
  {
    id: 'dijkstra',
    name: 'Guaranteed fastest',
    tech: 'Dijkstra',
    why: 'Checks roads outward from the pickup in order of travel time, so the route it returns is genuinely the quickest. Thorough, but it checks a lot of roads.',
    see: 'Watch the search swell outward like a ripple in every direction — including away from the drop-off — until it finally reaches it.',
    tags: [
      { label: 'Always optimal', kind: 'good' },
      { label: 'Slower search', kind: 'warn' },
    ],
    recommended: false,
  },
  {
    id: 'astar',
    name: 'Smart and fast',
    tech: 'A*',
    why: 'Gets the same quickest route as Dijkstra, but uses the straight-line distance to the drop-off as a compass, so it wastes far less time on roads heading the wrong way.',
    see: 'Watch the search stretch toward the drop-off instead of spreading evenly in all directions.',
    tags: [
      { label: 'Always optimal', kind: 'good' },
      { label: 'Much less searching', kind: 'good' },
    ],
    recommended: true,
  },
  {
    id: 'astar-overestimate',
    name: 'Fast but sloppy',
    tech: 'A* (overestimating ×2)',
    why: 'Trusts its compass too much and charges straight at the drop-off. It searches the fewest roads of all, but can settle for a route that’s noticeably slower.',
    see: 'Watch a thin, eager streak shoot toward the drop-off — then check whether its predicted time beats the others.',
    tags: [
      { label: 'Fastest search', kind: 'good' },
      { label: 'Can miss the best route', kind: 'bad' },
    ],
    recommended: false,
  },
  {
    id: 'bidirectional',
    name: 'Search from both ends',
    tech: 'Bidirectional Dijkstra',
    why: 'Starts two searches at once — one from the pickup, one from the drop-off — and stops when they meet in the middle. Still finds the quickest route, with less ground covered.',
    see: 'This one runs in a single go, so you’ll see the finished result rather than the search spreading step by step.',
    tags: [
      { label: 'Always optimal', kind: 'good' },
      { label: 'No step-by-step view', kind: 'quiet' },
    ],
    recommended: false,
  },
];

const BY_ID = new Map(ALGORITHMS.map((a) => [a.id, a]));

/**
 * Renders plain-language algorithm cards and keeps them in sync with the
 * (visually hidden) `<select>`, which stays the source of truth.
 *
 * @param {{ containerEl: HTMLElement, selectEl: HTMLSelectElement, explanationEl?: HTMLElement | null }} opts
 * @returns {{ setValue(name: string): void, getValue(): string, refresh(): void }}
 */
export function createAlgoPicker({ containerEl, selectEl, explanationEl }) {
  const available = new Set(Array.from(selectEl.options, (o) => o.value));
  const descriptors = ALGORITHMS.filter((a) => available.has(a.id));
  /** @type {HTMLButtonElement[]} */
  let cards = [];

  function buildCard(algo) {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'algo-card';
    card.setAttribute('role', 'radio');
    card.setAttribute('aria-checked', 'false');
    card.dataset.algo = algo.id;

    const head = document.createElement('div');
    head.className = 'algo-card-head';
    const name = document.createElement('span');
    name.className = 'algo-card-name';
    name.textContent = algo.name;
    const tech = document.createElement('span');
    tech.className = 'algo-card-tech';
    tech.textContent = algo.tech;
    head.append(name, tech);

    const why = document.createElement('div');
    why.className = 'algo-card-why';
    why.textContent = algo.why;

    const tags = document.createElement('div');
    tags.className = 'algo-card-tags';
    if (algo.recommended) {
      const rec = document.createElement('span');
      rec.className = 'chip chip-rec';
      rec.textContent = 'Recommended';
      tags.append(rec);
    }
    for (const tag of algo.tags) {
      const chip = document.createElement('span');
      chip.className = `chip chip-${tag.kind}`;
      chip.textContent = tag.label;
      tags.append(chip);
    }

    card.append(head, why, tags);
    return card;
  }

  function render() {
    containerEl.replaceChildren();
    cards = descriptors.map(buildCard);
    containerEl.append(...cards);
    sync();
  }

  function sync() {
    const value = selectEl.value;
    for (const card of cards) {
      const checked = card.dataset.algo === value;
      card.setAttribute('aria-checked', String(checked));
      card.tabIndex = checked ? 0 : -1;
    }
    // Keep the group reachable by keyboard even if the select holds an unknown value.
    if (cards.length && !cards.some((c) => c.tabIndex === 0)) cards[0].tabIndex = 0;
    if (explanationEl) explanationEl.textContent = BY_ID.get(value)?.see ?? '';
  }

  function choose(id, { focus = false } = {}) {
    if (!available.has(id)) return;
    const changed = selectEl.value !== id;
    selectEl.value = id;
    sync();
    if (focus) cards.find((c) => c.dataset.algo === id)?.focus();
    if (changed) selectEl.dispatchEvent(new Event('change', { bubbles: true }));
  }

  containerEl.addEventListener('click', (e) => {
    const card = /** @type {HTMLElement} */ (e.target).closest?.('.algo-card');
    if (card && containerEl.contains(card)) choose(card.dataset.algo);
  });

  containerEl.addEventListener('keydown', (e) => {
    const keys = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1, Home: 'first', End: 'last' };
    const move = keys[e.key];
    if (move === undefined || !cards.length) return;
    e.preventDefault();
    const current = cards.findIndex((c) => c === document.activeElement);
    const from = current >= 0 ? current : cards.findIndex((c) => c.tabIndex === 0);
    let next;
    if (move === 'first') next = 0;
    else if (move === 'last') next = cards.length - 1;
    else next = (from + move + cards.length) % cards.length;
    choose(cards[next].dataset.algo, { focus: true });
  });

  // External changes to the select (e.g. restored state) should update the cards.
  selectEl.addEventListener('change', sync);

  render();

  return {
    setValue(name) {
      choose(name);
    },
    getValue() {
      return selectEl.value;
    },
    refresh() {
      sync();
    },
  };
}
