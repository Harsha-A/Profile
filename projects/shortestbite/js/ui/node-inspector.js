/** Teaching card for why a search algorithm picked the current intersection. */

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function fallbackTime(seconds) {
  if (!Number.isFinite(seconds)) return '—';
  const total = Math.max(0, Math.round(seconds));
  const min = Math.floor(total / 60);
  const sec = total % 60;
  return min > 0 ? `${min}m ${String(sec).padStart(2, '0')}s` : `${sec}s`;
}

function formatTime(value, fmtTime) {
  return typeof fmtTime === 'function' ? fmtTime(value) : fallbackTime(value);
}

function formatHops(value) {
  if (!Number.isFinite(value)) return '—';
  const hops = Math.max(0, Math.round(value));
  return `${hops} ${hops === 1 ? 'hop' : 'hops'}`;
}

function safeNodeLabel(node, nodeLabel) {
  if (typeof nodeLabel === 'function') return nodeLabel(node);
  return Number.isFinite(node) ? `Intersection ${node}` : 'this intersection';
}

function algorithmCopy(step, ctx) {
  const key = String(ctx.algoKey ?? '').toLowerCase();
  const g = Number(step.g);
  const h = Number(step.h);
  const f = Number(step.f);
  const fmtTime = ctx.fmtTime;

  if (key === 'bfs') {
    const hops = Number.isFinite(f) ? f : g;
    return {
      formula: `priority = hops = ${formatHops(hops).replace(/ hops?$/, '')}`,
      body: 'Breadth-first search counts road pieces, not travel time. It picks the route with the fewest intersections to pass through, even if those roads are slow.',
      isHops: true,
    };
  }

  if (key.includes('overestimate') || key.includes('weighted') || key.includes('2')) {
    const displayF = Number.isFinite(f) ? f : g + 2 * h;
    return {
      formula: `f = g + 2×h = ${formatTime(g, fmtTime)} + 2×${formatTime(h, fmtTime)} = ${formatTime(displayF, fmtTime)}`,
      body: 'A* overestimate trusts the guess too much. That makes it more eager to run toward the drop-off, but it may skip the true best route because the guess can outweigh the time already driven.',
      isHops: false,
    };
  }

  if (key === 'astar' || key === 'a*') {
    const displayF = Number.isFinite(f) ? f : g + h;
    return {
      formula: `priority f = g + h = ${formatTime(g, fmtTime)} + ${formatTime(h, fmtTime)} = ${formatTime(displayF, fmtTime)}`,
      body: 'Here, g is time driven so far. h is straight-line distance ÷ the fastest road speed: an optimistic guess of time left. Because that guess never overestimates, A* still finds the optimal route.',
      isHops: false,
    };
  }

  return {
    formula: 'priority = g',
    body: `It's the unexplored intersection that's quickest to reach from the pickup: g = ${formatTime(g, fmtTime)}. Dijkstra ignores where the drop-off is, so it expands in time-order in every direction.`,
    isHops: false,
  };
}

function priorityText(value, isHops, fmtTime) {
  return isHops ? formatHops(value) : formatTime(value, fmtTime);
}

function frontierRows(step, ctx, isHops) {
  const chosenNode = step.node;
  const chosenPriority = Number.isFinite(step.f) ? step.f : step.g;
  const rows = [{ node: chosenNode, f: chosenPriority, chosen: true }];
  const seen = new Set([chosenNode]);

  for (const entry of Array.isArray(step.frontierTop) ? step.frontierTop : []) {
    if (!entry || seen.has(entry.node) || rows.length >= 6) continue;
    seen.add(entry.node);
    rows.push({ node: entry.node, f: entry.f, chosen: false });
  }

  return rows
    .map((row) => {
      const label = escapeHtml(safeNodeLabel(row.node, ctx.nodeLabel));
      const priority = escapeHtml(priorityText(Number(row.f), isHops, ctx.fmtTime));
      const note = row.chosen ? 'lowest priority — chosen now' : 'waiting in queue';
      return `<tr${row.chosen ? ' class="is-chosen"' : ''}><td>${label}</td><td>${priority}</td><td>${escapeHtml(note)}</td></tr>`;
    })
    .join('');
}

/**
 * @param {{ el: HTMLElement }} opts
 * @returns {{ show: (step: object, ctx: object) => void, hide: () => void, clear: () => void }}
 */
export function createNodeInspector({ el }) {
  function hide() {
    el.hidden = true;
  }

  function clear() {
    el.replaceChildren();
    hide();
  }

  function show(step, ctx = {}) {
    if (!step) return clear();
    const copy = algorithmCopy(step, ctx);
    const nodeName = safeNodeLabel(step.node, ctx.nodeLabel);
    const algo = ctx.algoLabel ? `<p class="ni-algo">${escapeHtml(ctx.algoLabel)}</p>` : '';

    el.classList.add('node-inspector');
    el.hidden = false;
    el.innerHTML = `
      <article class="node-inspector-card">
        <header>
          <h2>Why this intersection?</h2>
          <p class="ni-node">${escapeHtml(nodeName)}</p>
          ${algo}
        </header>
        <p>${escapeHtml(copy.body)}</p>
        <p class="ni-formula"><code>${escapeHtml(copy.formula)}</code></p>
        <table class="ni-table">
          <thead><tr><th>Intersection</th><th>Priority</th><th>Why it matters</th></tr></thead>
          <tbody>${frontierRows(step, ctx, copy.isHops)}</tbody>
        </table>
        <footer>
          <p>Every intersection in blue was chosen the same way: always the lowest priority left in the queue. Most of them are not on the final route — they are the proof that nothing faster exists.</p>
          <div class="ni-actions">
            <button class="kb-link" data-kb="priority-queue" type="button">Learn more →</button>
            <button class="kb-link" data-kb="why-extra-nodes" type="button">Why so many? →</button>
          </div>
        </footer>
      </article>`;
  }

  return { show, hide, clear };
}
