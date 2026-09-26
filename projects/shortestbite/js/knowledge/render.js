const UNKNOWN_TRY_LABEL = 'Try it on the map';
const INLINE_ATTRS = new Set(['class', 'data-kb', 'href', 'title', 'aria-label']);

export function makeKnowledgeEl(tag, className, text) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (text != null) el.textContent = text;
  return el;
}

export function safeText(value) {
  return value == null ? '' : String(value);
}

export function kbHref(id) {
  return `#${encodeURIComponent(String(id || ''))}`;
}

export function defaultTryItHref(id) {
  return `index.html#scenario=${encodeURIComponent(String(id || ''))}`;
}

export function rewriteKnowledgeLinks(html) {
  if (typeof document === 'undefined') {
    return safeText(html).replace(/<a\b([^>]*?)data-kb="([^"]+)"([^>]*)>/g, (match, before, id, after) => {
      if (/\bhref=/.test(`${before} ${after}`)) return match;
      return `<a${before}data-kb="${id}" href="${kbHref(id)}"${after}>`;
    });
  }
  const template = document.createElement('template');
  template.innerHTML = safeText(html);
  for (const el of template.content.querySelectorAll('*')) {
    const tag = el.tagName.toLowerCase();
    if (!['strong', 'em', 'code', 'kbd', 'br', 'a'].includes(tag)) {
      el.replaceWith(document.createTextNode(el.textContent || ''));
      continue;
    }
    for (const attr of [...el.attributes]) {
      if (!INLINE_ATTRS.has(attr.name)) el.removeAttribute(attr.name);
    }
    if (tag === 'a' && el.dataset.kb) el.setAttribute('href', kbHref(el.dataset.kb));
  }
  return template.innerHTML;
}

function setInline(el, html) {
  el.innerHTML = rewriteKnowledgeLinks(html);
  return el;
}

function renderTable(block) {
  const wrap = makeKnowledgeEl('div', 'kb-table-wrap');
  const table = makeKnowledgeEl('table', 'kb-table');
  const thead = document.createElement('thead');
  const tr = document.createElement('tr');
  for (const text of block.head || []) tr.append(makeKnowledgeEl('th', '', text));
  thead.append(tr);
  const tbody = document.createElement('tbody');
  for (const row of block.rows || []) {
    const rowEl = document.createElement('tr');
    for (const cell of row) rowEl.append(setInline(document.createElement('td'), cell));
    tbody.append(rowEl);
  }
  table.append(thead, tbody);
  wrap.append(table);
  return wrap;
}

function renderTrace(id, buildTrace, cleanups) {
  const trace = buildTrace?.(id) || { head: [], rows: [] };
  const wrap = makeKnowledgeEl('figure', 'kb-table-wrap kb-trace-wrap');
  const controls = makeKnowledgeEl('div', 'kb-trace-controls');
  const prev = makeKnowledgeEl('button', '', '← Previous');
  const next = makeKnowledgeEl('button', 'primary', 'Next step →');
  const all = makeKnowledgeEl('button', '', 'Show all');
  const status = makeKnowledgeEl('span', 'kb-trace-status');
  prev.type = next.type = all.type = 'button';
  controls.append(prev, next, all, status);

  const table = makeKnowledgeEl('table', 'kb-trace');
  if (trace.caption) table.append(makeKnowledgeEl('caption', '', trace.caption));
  const thead = document.createElement('thead');
  const headRow = document.createElement('tr');
  for (const text of trace.head || []) headRow.append(makeKnowledgeEl('th', '', text));
  thead.append(headRow);
  const tbody = document.createElement('tbody');
  const rows = [];
  for (const row of trace.rows || []) {
    const tr = document.createElement('tr');
    for (const cell of row) tr.append(makeKnowledgeEl('td', '', cell));
    rows.push(tr);
    tbody.append(tr);
  }
  table.append(thead, tbody);
  let visible = Math.min(4, rows.length || 0);
  const update = () => {
    rows.forEach((row, index) => row.hidden = index >= visible);
    prev.disabled = visible <= Math.min(4, rows.length || 0);
    next.disabled = visible >= rows.length;
    all.disabled = visible >= rows.length;
    status.textContent = rows.length ? `${Math.min(visible, rows.length)} / ${rows.length} settled` : 'No steps';
  };
  const onPrev = () => { visible = Math.max(Math.min(4, rows.length), visible - 1); update(); };
  const onNext = () => { visible = Math.min(rows.length, visible + 1); update(); };
  const onAll = () => { visible = rows.length; update(); };
  prev.addEventListener('click', onPrev);
  next.addEventListener('click', onNext);
  all.addEventListener('click', onAll);
  cleanups.push(() => {
    prev.removeEventListener('click', onPrev);
    next.removeEventListener('click', onNext);
    all.removeEventListener('click', onAll);
  });
  wrap.append(controls, table);
  const result = trace.result || {};
  if (result.path?.length || result.cost != null) {
    const line = makeKnowledgeEl('figcaption', 'kb-trace-result');
    const route = result.path?.length ? `Route: ${result.path.join(' → ')}` : 'Route: —';
    const cost = result.cost != null ? ` · cost ${result.cost}` : '';
    line.textContent = `${route}${cost}`;
    wrap.append(line);
  }
  update();
  return wrap;
}

function makeTryItLink(scenarioId, { scenarioLabel, tryItHref }) {
  const label = scenarioLabel?.(scenarioId) || UNKNOWN_TRY_LABEL;
  const a = makeKnowledgeEl('a', 'kb-tryit', `▶ Try it: ${label}`);
  a.dataset.scenario = scenarioId;
  a.href = tryItHref?.(scenarioId) || defaultTryItHref(scenarioId);
  return a;
}

export function renderBlock(block, opts = {}, cleanups = []) {
  switch (block?.type) {
    case 'p':
      return setInline(makeKnowledgeEl('p', 'kb-p'), block.html);
    case 'h': {
      const h = makeKnowledgeEl('h2', 'kb-h', block.text);
      if (block.id) h.id = block.id;
      return h;
    }
    case 'list':
    case 'steps': {
      const list = document.createElement(block.type === 'steps' ? 'ol' : 'ul');
      list.className = block.type === 'steps' ? 'kb-steps' : 'kb-list';
      for (const item of block.items || []) list.append(setInline(document.createElement('li'), item));
      return list;
    }
    case 'table':
      return renderTable(block);
    case 'callout':
      return setInline(makeKnowledgeEl('aside', `kb-callout kb-callout--${block.tone || 'tip'}`), block.html);
    case 'formula':
      return setInline(makeKnowledgeEl('div', 'kb-formula'), block.html);
    case 'diagram': {
      const figure = makeKnowledgeEl('figure', 'kb-diagram');
      figure.innerHTML = opts.renderDiagram?.(block.id) || '';
      return figure;
    }
    case 'trace':
      return renderTrace(block.id, opts.buildTrace, cleanups);
    case 'calc': {
      const host = makeKnowledgeEl('div', 'kb-calc-host');
      const mounted = opts.mountCalculator?.(block.id, host);
      if (mounted?.destroy) cleanups.push(() => mounted.destroy());
      return host;
    }
    case 'tryit':
    case 'tryIt':
      return makeTryItLink(block.scenario, opts);
    default:
      return null;
  }
}

export function renderArticle(article, opts = {}) {
  const cleanups = [];
  const el = makeKnowledgeEl('article', 'kb-article');
  const title = makeKnowledgeEl('h1', 'kb-article-title', article.title);
  const summary = makeKnowledgeEl('p', 'kb-summary', article.summary || '');
  el.append(title, summary);
  for (const block of article.blocks || []) {
    const node = renderBlock(block, opts, cleanups);
    if (node) el.append(node);
  }
  const inlineTryIts = new Set((article.blocks || [])
    .filter((block) => block.type === 'tryIt' || block.type === 'tryit')
    .map((block) => block.scenario));
  if (article.tryIt && !inlineTryIts.has(article.tryIt)) el.append(makeTryItLink(article.tryIt, opts));
  return {
    el,
    destroy() {
      for (const cleanup of cleanups.splice(0)) cleanup();
    },
  };
}
