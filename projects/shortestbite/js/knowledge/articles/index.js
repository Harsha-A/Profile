import { ARTICLES as START_HERE } from './start-here.js';
import { ARTICLES as GRAPH_BASICS } from './graph-basics.js';
import { ARTICLES as ALGORITHMS } from './algorithms.js';
import { ARTICLES as SEARCH } from './search.js';
import { ARTICLES as RACE } from './race.js';
import { ARTICLES as TRAFFIC_CLOSURES } from './traffic-closures.js';
import { ARTICLES as REROUTE } from './reroute.js';
import { ARTICLES as RESULTS_MAPS_FAQ } from './results-maps-faq.js';

/** Ordered Knowledge category names. */
export const CATEGORIES = [
  'Start here',
  'Graph basics',
  'Algorithms',
  'How search decides',
  'Race',
  'Traffic & closures',
  'Rerouting',
  'Results',
  'Maps',
  'FAQ',
];

/** Scenario ids supported by the Knowledge Try it runner. */
export const SCENARIO_IDS = [
  'first-delivery',
  'step-inspector',
  'race-dijkstra-astar',
  'race-bfs-dijkstra',
  'race-sloppy',
  'bidirectional',
  'rush-hour-checks',
  'closure-reroute',
  'closure-blocked',
  'koramangala-tour',
];

/** All Knowledge articles in table-of-contents order. */
export const ARTICLES = [
  ...START_HERE,
  ...GRAPH_BASICS,
  ...ALGORITHMS,
  ...SEARCH,
  ...RACE,
  ...TRAFFIC_CLOSURES,
  ...REROUTE,
  ...RESULTS_MAPS_FAQ,
];

const BLOCK_TYPES = new Set(['p', 'h', 'list', 'steps', 'table', 'callout', 'formula', 'diagram', 'trace', 'calc', 'tryit']);
const CALLOUT_TONES = new Set(['tip', 'why', 'warn']);
const DIAGRAM_IDS = new Set(['demo-graph', 'edge-cost', 'search-shapes', 'traffic-day', 'reroute-flow', 'reroute-threshold', 'twin-edges']);
const TRACE_IDS = new Set(['dijkstra-demo', 'astar-demo', 'bfs-demo']);
const CALC_IDS = new Set(['reroute', 'edge-cost']);
const REQUIRED_ARTICLE_FIELDS = ['id', 'title', 'category', 'summary', 'blocks'];

/** Find one article by id. */
export function getArticle(id) {
  return ARTICLES.find((article) => article.id === id) ?? null;
}

/** Group articles by ordered category for the Knowledge table of contents. */
export function articlesByCategory() {
  return CATEGORIES.map((category) => ({
    category,
    articles: ARTICLES.filter((article) => article.category === category),
  }));
}

/**
 * Validate Knowledge article records.
 * @param {Array<object>} articles
 * @returns {string[]} human-readable errors
 */
export function validateArticles(articles) {
  const errors = [];
  const ids = new Set();
  const articleList = Array.isArray(articles) ? articles : [];

  if (!Array.isArray(articles)) return ['articles must be an array'];

  for (const article of articleList) {
    const label = article?.id ?? '(missing id)';
    for (const field of REQUIRED_ARTICLE_FIELDS) {
      if (article?.[field] == null || article[field] === '') errors.push(`${label}: missing ${field}`);
    }
    if (article?.id) {
      if (ids.has(article.id)) errors.push(`${article.id}: duplicate id`);
      ids.add(article.id);
    }
    if (article?.category && !CATEGORIES.includes(article.category)) {
      errors.push(`${label}: unknown category ${article.category}`);
    }
    if (!Array.isArray(article?.blocks)) errors.push(`${label}: blocks must be an array`);
    if (article?.questions != null && !isStringArray(article.questions)) errors.push(`${label}: questions must be strings`);
    if (article?.related != null && !isStringArray(article.related)) errors.push(`${label}: related must be strings`);
    if (article?.tryIt != null && !SCENARIO_IDS.includes(article.tryIt)) {
      errors.push(`${label}: unknown tryIt scenario ${article.tryIt}`);
    }
  }

  for (const article of articleList) {
    const label = article?.id ?? '(missing id)';
    if (Array.isArray(article?.related)) {
      for (const id of article.related) if (!ids.has(id)) errors.push(`${label}: related id not found ${id}`);
    }
    if (!Array.isArray(article?.blocks)) continue;
    article.blocks.forEach((block, index) => {
      const where = `${label} block ${index}`;
      validateBlock(block, where, errors);
      for (const id of dataKbIds(block)) if (!ids.has(id)) errors.push(`${where}: data-kb id not found ${id}`);
    });
  }

  return errors;
}

function validateBlock(block, where, errors) {
  if (!block || typeof block !== 'object') {
    errors.push(`${where}: block must be an object`);
    return;
  }
  if (!BLOCK_TYPES.has(block.type)) {
    errors.push(`${where}: unknown block type ${block.type}`);
    return;
  }
  if (block.type === 'p' && typeof block.html !== 'string') errors.push(`${where}: p.html is required`);
  if (block.type === 'h' && typeof block.text !== 'string') errors.push(`${where}: h.text is required`);
  if ((block.type === 'list' || block.type === 'steps') && !isStringArray(block.items)) {
    errors.push(`${where}: ${block.type}.items must be strings`);
  }
  if (block.type === 'table') {
    if (!isStringArray(block.head)) errors.push(`${where}: table.head must be strings`);
    if (!Array.isArray(block.rows) || !block.rows.every(isStringArray)) errors.push(`${where}: table.rows must be arrays of strings`);
  }
  if (block.type === 'callout') {
    if (!CALLOUT_TONES.has(block.tone)) errors.push(`${where}: invalid callout tone ${block.tone}`);
    if (typeof block.html !== 'string') errors.push(`${where}: callout.html is required`);
  }
  if (block.type === 'formula' && typeof block.html !== 'string') errors.push(`${where}: formula.html is required`);
  if (block.type === 'diagram' && !DIAGRAM_IDS.has(block.id)) errors.push(`${where}: unknown diagram id ${block.id}`);
  if (block.type === 'trace' && !TRACE_IDS.has(block.id)) errors.push(`${where}: unknown trace id ${block.id}`);
  if (block.type === 'calc' && !CALC_IDS.has(block.id)) errors.push(`${where}: unknown calc id ${block.id}`);
  if (block.type === 'tryit') {
    if (!SCENARIO_IDS.includes(block.scenario)) errors.push(`${where}: unknown tryit scenario ${block.scenario}`);
    if (typeof block.label !== 'string') errors.push(`${where}: tryit.label is required`);
  }
}

function dataKbIds(value) {
  const ids = [];
  for (const html of htmlStrings(value)) {
    const re = /data-kb="([^"]+)"/g;
    let match;
    while ((match = re.exec(html))) ids.push(match[1]);
  }
  return ids;
}

function htmlStrings(value) {
  if (typeof value === 'string') return [value];
  if (Array.isArray(value)) return value.flatMap(htmlStrings);
  if (!value || typeof value !== 'object') return [];
  return Object.entries(value)
    .filter(([key]) => key === 'html' || key === 'items' || key === 'rows')
    .flatMap(([, nested]) => htmlStrings(nested));
}

function isStringArray(value) {
  return Array.isArray(value) && value.every((item) => typeof item === 'string');
}
