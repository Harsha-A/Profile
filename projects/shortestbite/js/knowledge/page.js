import { ARTICLES, articlesByCategory, getArticle } from './articles/index.js';
import { renderDiagram } from './diagrams.js';
import { buildTrace } from './examples.js';
import { mountCalculator } from './calculators.js';
import { getScenario } from './scenarios.js';
import { defaultTryItHref, renderArticle } from './render.js';

const navEl = document.getElementById('kb-category-nav');
const mainEl = document.getElementById('kb-main');
const searchEl = document.getElementById('kb-search');
const selectEl = document.getElementById('kb-topic-select');
const tocEl = document.getElementById('kb-on-this-page');
const baseTitle = 'ShortestBite Knowledge';
const categories = articlesByCategory();
let query = '';
let currentId = null;
let currentDestroy = null;
let headingObserver = null;
let suppressHash = false;

function scenarioLabel(id) {
  return getScenario(id)?.label || 'Try it on the map';
}

function articleUrl(id) {
  return `#${encodeURIComponent(id)}`;
}

function matchesArticle(article, q) {
  const needle = q.trim().toLowerCase();
  if (!needle) return true;
  return [article.title, article.summary, ...(article.questions || [])].join(' ').toLowerCase().includes(needle);
}

function filteredGroups() {
  return categories.map((group) => ({
    category: group.category,
    articles: (group.articles || []).filter((article) => matchesArticle(article, query)),
  })).filter((group) => group.articles.length);
}

function renderNav() {
  navEl.replaceChildren();
  selectEl.replaceChildren(new Option('Knowledge landing', ''));
  const groups = filteredGroups();
  let count = 0;
  for (const group of groups) {
    const section = document.createElement('section');
    section.className = 'kb-nav-group';
    const heading = document.createElement('h2');
    heading.className = 'kb-nav-heading';
    heading.textContent = group.category;
    const list = document.createElement('ul');
    list.className = 'kb-nav-list';
    for (const article of group.articles) {
      count += 1;
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.className = 'kb-nav-link';
      a.href = articleUrl(article.id);
      a.textContent = article.title;
      if (article.id === currentId) {
        a.classList.add('is-active');
        a.setAttribute('aria-current', 'page');
      }
      li.append(a);
      list.append(li);
      selectEl.append(new Option(`${group.category} · ${article.title}`, article.id));
    }
    section.append(heading, list);
    navEl.append(section);
  }
  if (!count) {
    const empty = document.createElement('div');
    empty.className = 'kb-nav-empty';
    empty.textContent = 'No Knowledge articles match that search.';
    navEl.append(empty);
  }
  selectEl.value = currentId || '';
}

function clearArticle() {
  currentDestroy?.();
  currentDestroy = null;
  if (headingObserver) headingObserver.disconnect();
  headingObserver = null;
  tocEl.replaceChildren();
}

function landingCard(group) {
  const first = group.articles[0];
  const a = document.createElement('a');
  a.className = 'kb-category-card';
  a.href = articleUrl(first.id);
  a.innerHTML = `<span class="kb-card-title"></span><span class="kb-card-meta"></span>`;
  a.querySelector('.kb-card-title').textContent = group.category;
  a.querySelector('.kb-card-meta').textContent = `${group.articles.length} ${group.articles.length === 1 ? 'article' : 'articles'} · Start with ${first.title}`;
  return a;
}

function renderLanding() {
  clearArticle();
  currentId = null;
  document.title = baseTitle;
  const landing = document.createElement('div');
  landing.className = 'kb-landing';
  const hero = document.createElement('section');
  hero.className = 'kb-hero';
  hero.innerHTML = `
    <p class="kb-eyebrow">ShortestBite field guide</p>
    <h1>Understand every route, reroute, and race.</h1>
    <p class="kb-hero-copy">Polished, practical notes for the visualizer: how the city becomes a graph, why algorithms choose different roads, and what the simulator's stats mean.</p>
    <div class="kb-hero-actions">
      <a class="kb-button primary" href="#how-to-use">Start reading</a>
      <a class="kb-button" href="index.html">Start with the guided missions in the simulator</a>
    </div>
  `;
  const cards = document.createElement('section');
  cards.className = 'kb-category-cards';
  cards.setAttribute('aria-label', 'Knowledge categories');
  for (const group of categories.filter((group) => group.articles.length)) cards.append(landingCard(group));
  landing.append(hero, cards);
  mainEl.replaceChildren(landing);
  renderNav();
}

function slugify(text) {
  return String(text || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'section';
}

function articleWithHeadingIds(article) {
  const seen = new Map();
  return {
    ...article,
    blocks: (article.blocks || []).map((block) => {
      if (block.type !== 'h') return block;
      const base = `${article.id}-${slugify(block.text)}`;
      const next = (seen.get(base) || 0) + 1;
      seen.set(base, next);
      return { ...block, id: next === 1 ? base : `${base}-${next}` };
    }),
  };
}

function setupToc(article) {
  tocEl.replaceChildren();
  const headings = [...mainEl.querySelectorAll('.kb-h[id]')];
  if (!headings.length) {
    const empty = document.createElement('span');
    empty.className = 'kb-toc-empty';
    empty.textContent = 'No sections';
    tocEl.append(empty);
    return;
  }
  const byId = new Map();
  for (const heading of headings) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'kb-toc-link';
    btn.textContent = heading.textContent;
    btn.addEventListener('click', () => heading.scrollIntoView({ behavior: 'smooth', block: 'start' }));
    tocEl.append(btn);
    byId.set(heading.id, btn);
  }
  headingObserver = new IntersectionObserver((entries) => {
    const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    for (const btn of byId.values()) btn.classList.remove('is-active');
    byId.get(visible.target.id)?.classList.add('is-active');
  }, { rootMargin: '-20% 0px -68% 0px', threshold: [0, 0.25, 0.5, 1] });
  for (const heading of headings) headingObserver.observe(heading);
  byId.values().next().value?.classList.add('is-active');
}

function relatedFooter(article) {
  const footer = document.createElement('footer');
  footer.className = 'kb-article-footer';
  if (article.related?.length) {
    const label = document.createElement('div');
    label.className = 'kb-footer-label';
    label.textContent = 'Related';
    const chips = document.createElement('div');
    chips.className = 'kb-related-chips';
    for (const id of article.related) {
      const related = getArticle(id);
      if (!related) continue;
      const chip = document.createElement('a');
      chip.className = 'kb-related-chip';
      chip.href = articleUrl(id);
      chip.textContent = related.title;
      chips.append(chip);
    }
    footer.append(label, chips);
  }
  const index = ARTICLES.findIndex((item) => item.id === article.id);
  const nav = document.createElement('nav');
  nav.className = 'kb-article-nav';
  nav.setAttribute('aria-label', 'Previous and next articles');
  const prev = ARTICLES[index - 1];
  const next = ARTICLES[index + 1];
  if (prev) {
    const a = document.createElement('a');
    a.className = 'kb-prev';
    a.href = articleUrl(prev.id);
    a.textContent = `← ${prev.title}`;
    nav.append(a);
  }
  if (next) {
    const a = document.createElement('a');
    a.className = 'kb-next';
    a.href = articleUrl(next.id);
    a.textContent = `${next.title} →`;
    nav.append(a);
  }
  footer.append(nav);
  return footer;
}

function renderArticlePage(article, { scrollTop = true } = {}) {
  clearArticle();
  currentId = article.id;
  const decorated = articleWithHeadingIds(article);
  const rendered = renderArticle(decorated, {
    renderDiagram,
    buildTrace,
    mountCalculator,
    scenarioLabel,
    tryItHref: defaultTryItHref,
  });
  currentDestroy = rendered.destroy;
  mainEl.replaceChildren(rendered.el, relatedFooter(article));
  document.title = `${article.title} — ${baseTitle}`;
  renderNav();
  setupToc(decorated);
  if (scrollTop) window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  requestAnimationFrame(() => mainEl.focus({ preventScroll: true }));
}

function render404(id) {
  clearArticle();
  currentId = null;
  document.title = `Article not found — ${baseTitle}`;
  const el = document.createElement('section');
  el.className = 'kb-error';
  el.innerHTML = `
    <p class="kb-eyebrow">404</p>
    <h1>We couldn't find that Knowledge article.</h1>
    <p class="kb-hero-copy">The article id <code></code> does not exist. Search the guide or return to the landing page.</p>
    <div class="kb-hero-actions"><a class="kb-button primary" href="knowledge.html">Knowledge landing</a><a class="kb-button" href="index.html">Open simulator</a></div>
  `;
  el.querySelector('code').textContent = id || '(blank)';
  mainEl.replaceChildren(el);
  renderNav();
  window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
}

function currentHashId() {
  const raw = location.hash.replace(/^#/, '');
  return raw ? decodeURIComponent(raw) : '';
}

function route({ scrollTop = true } = {}) {
  const id = currentHashId();
  if (!id) {
    renderLanding();
    if (scrollTop) window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    return;
  }
  const article = getArticle(id);
  if (article) renderArticlePage(article, { scrollTop });
  else render404(id);
}

searchEl.addEventListener('input', () => {
  query = searchEl.value;
  renderNav();
});

selectEl.addEventListener('change', () => {
  const id = selectEl.value;
  location.hash = id ? articleUrl(id) : '';
});

document.addEventListener('click', (event) => {
  const kb = event.target.closest?.('a[data-kb]');
  if (kb) {
    event.preventDefault();
    const id = kb.dataset.kb;
    if (id && currentId !== id) location.hash = articleUrl(id);
    return;
  }
  const anchor = event.target.closest?.('a[href^="#"]');
  if (!anchor) return;
  const id = decodeURIComponent(anchor.getAttribute('href').slice(1));
  if (!id) return;
  if (getArticle(id)) {
    event.preventDefault();
    if (currentId === id) window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    else location.hash = articleUrl(id);
  }
});

window.addEventListener('hashchange', () => {
  if (suppressHash) return;
  route({ scrollTop: true });
});

route({ scrollTop: false });
