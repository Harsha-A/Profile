const SEARCH_WRITE_INTERVAL_MS = 125;

/**
 * Escapes text for safe interpolation into HTML.
 * @param {unknown} value
 * @returns {string}
 */
function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const num = (n) => (Number.isFinite(n) ? Number(n).toLocaleString() : '0');
const accent = (s) => `<span class="accent">${s}</span>`;
const good = (s) => `<span class="good">${s}</span>`;
const warn = (s) => `<span class="warn">${s}</span>`;

function kbLink(id, text = 'Learn more →') {
  return `<button class="kb-link" data-kb="${escapeHtml(id)}" type="button">${escapeHtml(text)}</button>`;
}

function withKnowledgeLink(html, link) {
  if (!link) return html;
  const id = typeof link === 'string' ? link : link.id ?? link.kb;
  if (!id) return html;
  return `${html} ${kbLink(id, link.text ?? 'Learn more →')}`;
}

function inferKnowledgeLink(html) {
  if (/\bdata-kb=/.test(html)) return null;
  if (/road ahead is closed|no way around|waiting for it to reopen/i.test(html)) {
    return { id: 'closures', text: 'Learn more →' };
  }
  if (/rerout/i.test(html)) return { id: 'reroute-decision', text: 'Learn more →' };
  return null;
}

/**
 * Live one-sentence commentary over the map.
 *
 * All text arguments are escaped; only `custom(html)` accepts raw HTML.
 *
 * @param {{ el: HTMLElement }} opts
 */
export function createNarration({ el }) {
  let lastHtml = null;
  let lastSearchWrite = 0;
  let pendingTimer = 0;
  let pendingHtml = null;

  function cancelPending() {
    if (pendingTimer) clearTimeout(pendingTimer);
    pendingTimer = 0;
    pendingHtml = null;
  }

  function write(html) {
    if (el.hidden) el.hidden = false;
    if (html === lastHtml) return;
    el.innerHTML = html;
    lastHtml = html;
  }

  function set(html) {
    cancelPending();
    write(html);
  }

  const near = (explored) => {
    if (explored < 50) return 'fanning out from the pickup…';
    if (explored < 500) return 'working its way across the neighbourhood…';
    return 'closing in on the drop-off…';
  };

  return {
    idle() {
      set('Drop a 🍔 <b>pickup</b> and a 🏠 <b>drop-off</b> on any street to plan a delivery.');
    },
    placingStart() {
      set(`Click any street to place the ${accent('🍔 pickup')}.`);
    },
    placingEnd() {
      set(`Nice. Now click another street for the ${accent('🏠 drop-off')}.`);
    },
    ready(algoLabel) {
      set(`Both pins are down. Hit ${accent('Find route')} to watch ${escapeHtml(algoLabel)} search for the way.`);
    },
    /** Called every frame; DOM writes are throttled and de-duplicated. */
    searching({ algoLabel, explored, frontier }) {
      const html =
        `${escapeHtml(algoLabel)} has checked ${accent(num(explored))} intersections` +
        (frontier ? ` with ${accent(num(frontier))} more in sight` : '') +
        `, ${near(explored)}`;
      if (html === lastHtml) {
        cancelPending();
        return;
      }
      const now = performance.now();
      const wait = SEARCH_WRITE_INTERVAL_MS - (now - lastSearchWrite);
      if (wait <= 0) {
        cancelPending();
        lastSearchWrite = now;
        write(html);
        return;
      }
      pendingHtml = html;
      if (!pendingTimer) {
        pendingTimer = setTimeout(() => {
          pendingTimer = 0;
          const h = pendingHtml;
          pendingHtml = null;
          if (h != null) {
            lastSearchWrite = performance.now();
            write(h);
          }
        }, wait);
      }
    },
    found({ algoLabel, explored, durationText, distanceText }) {
      const by = algoLabel ? `${escapeHtml(algoLabel)} found a route` : 'Route found';
      const effort = Number.isFinite(explored) ? ` after checking ${accent(num(explored))} intersections` : '';
      set(
        `${by}${effort} — ${good(escapeHtml(durationText))} over ${accent(escapeHtml(distanceText))}. Sending the rider.`,
      );
    },
    noRoute() {
      set(`${warn('No route')} — those two pins aren’t connected by open roads. Try moving one.`);
    },
    riding({ etaText, streetName }) {
      const on = streetName ? ` along ${accent(escapeHtml(streetName))}` : '';
      const eta = etaText ? `, arriving in ${good(escapeHtml(etaText))}` : '';
      set(`The rider is on the way${on}${eta}.`);
    },
    congested({ streetName }) {
      const where = streetName ? ` on ${warn(escapeHtml(streetName))}` : ' ahead';
      set(`Slow traffic${where} — the rider is crawling.`);
    },
    rerouting({ reason }) {
      const why = reason ? ` — ${escapeHtml(reason)}` : '';
      set(withKnowledgeLink(`${warn('Rerouting')}${why}. Finding a faster way from here…`, 'reroute-decision'));
    },
    arrived({ durationText }) {
      const took = durationText ? ` in ${good(escapeHtml(durationText))}` : '';
      set(`Delivered${took}! 🏠 Move a pin or pick another algorithm to compare.`);
    },
    racing({ aLabel, bLabel }) {
      set(`Race on: ${accent(escapeHtml(aLabel))} vs ${accent(escapeHtml(bLabel))}, same trip, same traffic.`);
    },
    raceResult({ winnerLabel, aExplored, bExplored }) {
      set(
        `${good(escapeHtml(winnerLabel))} wins! The searches checked ${accent(num(aExplored))} vs ${accent(num(bExplored))} intersections.`,
      );
    },
    /**
     * @param {string} html Trusted HTML — caller must escape any free text.
     * @param {{ id?: string, kb?: string, text?: string } | string} [link]
     */
    custom(html, link) {
      const value = String(html);
      set(withKnowledgeLink(value, link ?? inferKnowledgeLink(value)));
    },
    hide() {
      cancelPending();
      el.hidden = true;
    },
  };
}
