import { CONFIG } from '../config.js';
import { runAlgorithm, ALGORITHM_NAMES, OVERESTIMATE_FACTOR } from '../movers/routing.js';
import { bfsSteps } from '../algorithms/bfs.js';
import { dijkstraSteps } from '../algorithms/dijkstra.js';
import { astarSteps } from '../algorithms/astar.js';
import { formatDuration, formatDistance, formatMs } from './format.js';
import { PALETTE } from '../render/palette.js';
import { ALGORITHMS } from './algo-picker.js';
import { buildDirections } from './directions.js';
import { raceVerdict } from './race.js';
import {
  moverRouteKey,
  routeContainsMoverEdge,
  routeKey,
  routeOverlayFor,
  routeProgressFor,
} from './route-overlay.js';

const STEP_GENERATORS = {
  bfs: (graph, s, t) => bfsSteps(graph, s, t),
  dijkstra: (graph, s, t, opts) => dijkstraSteps(graph, s, t, opts),
  astar: (graph, s, t, opts) => astarSteps(graph, s, t, opts),
  'astar-overestimate': (graph, s, t, opts) => astarSteps(graph, s, t, { ...opts, overestimateFactor: OVERESTIMATE_FACTOR }),
  // Bidirectional Dijkstra has no step generator (interleaving two frontiers
  // for visualisation is out of scope here) — it always runs to completion
  // instantly and reports its final stats.
};

const DESCRIPTOR = new Map(ALGORITHMS.map((a) => [a.id, a]));

function label(name) {
  return DESCRIPTOR.get(name)?.name ?? name;
}

function isOptimal(name) {
  return DESCRIPTOR.get(name)?.optimal ?? !/bfs|over/.test(name);
}

/**
 * Wires up the whole "plan a delivery" flow: pins, the algorithm run (animated
 * or instant), the race, and every readout that hangs off a finished route —
 * stats, narration, effort chart, turn-by-turn directions, rider HUD and the
 * arrival card.
 *
 * `ui` holds the presentation modules; all of them are optional so the panel
 * still works (and stays testable) with none of them attached.
 */
export function createAlgoPanel({ sim, renderer, els, ui = {}, onSpawnMover, onReset }) {
  const state = {
    pins: { start: null, end: null },
    generator: null,
    settled: new Map(),
    frontier: new Set(),
    settleOrder: 0,
    startedAt: 0,
    rafId: 0,
    lastResult: null,
    highlight: null,
    mode: 'idle', // 'idle' | 'single' | 'race'
    plan: null,   // { algorithm, cost, distanceM, explored }
    racers: [],   // race mode only
    raceStartSim: 0,
    spawnedAtSim: 0,
    moverIds: [], // riders spawned by the current run; everything else is cleared
    cpuMs: 0,     // pure search time, excluding animation frames
    lastSettle: null,
    overlayDrawKey: null,
    overlaySignature: null,
  };

  // Racing an algorithm against itself is meaningless (and both riders would share one scoreboard row).
  function syncCompareOptions() {
    const primary = els.algorithmSelect.value;
    for (const opt of els.compareAlgorithmSelect.options) opt.disabled = opt.value === primary;
    if (els.compareAlgorithmSelect.value === primary) {
      const fallback = primary === 'dijkstra' ? 'astar' : 'dijkstra';
      els.compareAlgorithmSelect.value = fallback;
    }
  }
  syncCompareOptions();

  // Changing how to search must keep the pickup/drop-off the user already placed.
  els.algorithmSelect.addEventListener('change', () => {
    syncCompareOptions();
    clearSearch();
    narrateIdleOrReady();
  });

  els.compareToggle.addEventListener('change', () => {
    els.compareAlgorithmSelect.disabled = !els.compareToggle.checked;
    clearSearch();
    narrateIdleOrReady();
  });
  els.compareAlgorithmSelect.addEventListener('change', () => {
    clearSearch();
    narrateIdleOrReady();
  });

  els.runBtn.addEventListener('click', run);
  els.stepBtn.addEventListener('click', stepOnce);
  els.resetBtn.addEventListener('click', () => {
    reset();
    narrateIdleOrReady();
  });

  // ---- pins -------------------------------------------------------------

  function setPin(kind, hit) {
    const pinKind = kind === 'from' ? 'start' : (kind === 'to' ? 'end' : kind);
    const node = hit?.node ?? hit?.id;
    const normalized = node == null ? hit : {
      node,
      x: hit.x ?? sim.graph.nodeX[node],
      y: hit.y ?? sim.graph.nodeY[node],
    };
    state.pins[pinKind] = normalized;
    updateButtons();
    updatePinStatus();
    renderOverlayPins();
    if (pinKind === 'start' && !state.pins.end) ui.narration?.placingEnd();
    else narrateIdleOrReady();
  }

  function updatePinStatus() {
    const rows = els.pinStatus?.querySelectorAll('[data-pin]');
    if (!rows) return;
    const nextKind = state.pins.start ? (state.pins.end ? null : 'end') : 'start';
    for (const row of rows) {
      const kind = row.dataset.pin;
      const set = Boolean(state.pins[kind]);
      row.classList.toggle('set', set);
      row.classList.toggle('next', kind === nextKind);
      row.classList.toggle('pending', !set && kind !== nextKind);
      const value = row.querySelector('[data-pin-value]');
      if (value) value.textContent = set ? 'placed' : 'click the map';
    }
  }

  function narrateIdleOrReady() {
    if (!ui.narration) return;
    if (state.pins.start && state.pins.end) ui.narration.ready(label(els.algorithmSelect.value));
    else if (state.pins.start) ui.narration.placingEnd();
    else ui.narration.idle();
  }

  function updateButtons() {
    const ready = state.pins.start && state.pins.end && !state.generator;
    els.runBtn.disabled = !ready;
    els.stepBtn.disabled = !ready;
  }

  function renderOverlayPins() {
    renderer.setOverlay(buildOverlay());
  }

  function buildOverlay() {
    const primary = liveMover('primary');
    const challenger = liveMover('challenger');
    const primaryRoute = primary && !primary.arrived ? routeOverlayFor(primary) : null;
    const challengerRoute = challenger && !challenger.arrived ? routeOverlayFor(challenger) : null;
    return {
      settled: state.settled.size ? state.settled : null,
      frontier: state.frontier.size ? state.frontier : null,
      path: primaryRoute ?? state.lastResult?.path ?? null,
      pathProgress: primaryRoute ? routeProgressFor(primary) : null,
      comparePathB: challengerRoute ?? state.lastResult?.pathB ?? null,
      comparePathBProgress: challengerRoute ? routeProgressFor(challenger) : null,
      highlight: state.highlight,
      drawKey: state.overlayDrawKey,
    };
  }

  function liveMover(slot) {
    const index = slot === 'challenger' ? 1 : 0;
    const id = state.moverIds[index];
    return id == null ? null : sim.movers.get(id) ?? null;
  }

  function moverSlot(mover) {
    if (!mover) return 'primary';
    return state.moverIds[1] === mover.id ? 'challenger' : 'primary';
  }

  function overlaySignature() {
    const primary = liveMover('primary');
    const challenger = liveMover('challenger');
    return [
      state.overlayDrawKey ?? '',
      primary && !primary.arrived ? moverRouteKey(primary) : routeKey(state.lastResult?.path),
      primary && !primary.arrived ? primary.route?.edgeIndex : '',
      primary && !primary.arrived ? Math.round(primary.route?.edgeProgress ?? 0) : '',
      challenger && !challenger.arrived ? moverRouteKey(challenger) : routeKey(state.lastResult?.pathB),
      challenger && !challenger.arrived ? challenger.route?.edgeIndex : '',
      challenger && !challenger.arrived ? Math.round(challenger.route?.edgeProgress ?? 0) : '',
      state.highlight ? routeKey(state.highlight) : '',
    ].join('|');
  }

  function renderOverlayIfChanged() {
    const signature = overlaySignature();
    if (signature === state.overlaySignature) return;
    state.overlaySignature = signature;
    renderOverlayPins();
  }

  function setHighlight(path) {
    state.highlight = path;
    renderOverlayPins();
  }

  // ---- running ----------------------------------------------------------

  function inspectorCtx(algorithm) {
    return {
      algoKey: algorithm,
      algoLabel: label(algorithm),
      fmtTime: formatDuration,
      nodeLabel: (n) => (n === state.pins.start?.node ? 'the pickup' : n === state.pins.end?.node ? 'the drop-off' : `intersection #${n}`),
      targetNode: state.pins.end?.node,
    };
  }

  function showInspector(algorithm) {
    if (state.lastSettle) ui.nodeInspector?.show(state.lastSettle, inspectorCtx(algorithm));
  }

  function searchOpts() {
    return { simTime: sim.clock.time, trafficFactor: sim.traffic.asCostFn() };
  }

  function run() {
    if (!state.pins.start || !state.pins.end) return;
    clearRunOutputs();
    els.statStatus.textContent = 'Running…';
    state.startedAt = performance.now();

    if (els.compareToggle.checked) return runRace();

    state.mode = 'single';
    const algorithm = els.algorithmSelect.value;
    if (!STEP_GENERATORS[algorithm]) return runInstant(algorithm);

    state.generator = STEP_GENERATORS[algorithm](
      sim.graph, state.pins.start.node, state.pins.end.node, searchOpts(),
    );
    updateButtons();

    const loop = () => {
      if (!state.generator) return;
      const n = Number(els.stepsPerFrame.value);
      for (let i = 0; i < n; i++) {
        const t0 = performance.now();
        const { value, done } = state.generator.next();
        state.cpuMs += performance.now() - t0;
        if (done) return;
        applyStep(value);
        if (value.type === 'done') return finish(value, algorithm);
      }
      renderOverlayPins();
      showInspector(algorithm);
      reportProgress('Running');
      ui.narration?.searching({
        algoLabel: label(algorithm),
        explored: state.settled.size,
        frontier: state.frontier.size,
      });
      state.rafId = requestAnimationFrame(loop);
    };
    loop();
  }

  function reportProgress(verb) {
    els.statStatus.textContent = `${verb}…`;
    els.statExplored.textContent = String(state.settled.size);
    els.statHeap.textContent = String(state.frontier.size);
  }

  function runInstant(algorithm) {
    const t0 = performance.now();
    const result = runAlgorithm(algorithm, sim.graph, state.pins.start.node, state.pins.end.node, searchOpts());
    finish({ type: 'done', ...result }, algorithm, performance.now() - t0);
  }

  function applyStep(step) {
    if (step.type === 'settle') {
      state.lastSettle = step;
      state.settled.set(step.node, state.settleOrder++);
      state.frontier.delete(step.node);
    } else if (step.type === 'relax') {
      state.frontier.add(step.node);
    }
  }

  function finish(result, algorithm, elapsedMsOverride) {
    const elapsedMs = elapsedMsOverride ?? state.cpuMs;
    state.lastResult = { path: result.path };
    state.overlayDrawKey = `single:${algorithm}:${Date.now()}:${routeKey(result.path)}`;
    state.overlaySignature = null;
    state.generator = null;
    renderOverlayPins();

    if (!result.path) {
      els.statStatus.textContent = 'No route found';
      els.statExplored.textContent = String(result.explored ?? '—');
      els.statHeap.textContent = String(result.maxHeapSize ?? '—');
      for (const el of [els.statCost, els.statLength, els.statHops]) el.textContent = '—';
      els.statTime.textContent = formatMs(elapsedMs);
      ui.narration?.noRoute();
      updateButtons();
      return;
    }

    const distanceM = pathLengthMetres(sim.graph, result.path);
    els.statStatus.textContent = 'Done';
    els.statExplored.textContent = String(result.explored);
    els.statHeap.textContent = String(result.maxHeapSize ?? '—');
    els.statCost.textContent = formatDuration(result.cost);
    els.statLength.textContent = formatDistance(distanceM);
    els.statHops.textContent = String(result.path.nodes.length - 1);
    els.statTime.textContent = formatMs(elapsedMs);

    state.plan = { algorithm, cost: result.cost, distanceM, explored: result.explored };

    ui.narration?.found({
      algoLabel: label(algorithm),
      explored: result.explored,
      durationText: formatDuration(result.cost),
      distanceText: formatDistance(distanceM),
    });
    ui.effortChart?.show([{
      label: label(algorithm),
      value: result.explored,
      color: PALETTE.finalPath,
      note: `${formatDuration(result.cost)} route`,
    }]);
    ui.directions?.show(buildDirections(sim.graph, result.path));

    state.spawnedAtSim = sim.clock.time;
    const mover = onSpawnMover(state.pins.start.node, state.pins.end.node, algorithm, null);
    if (mover) state.moverIds.push(mover.id);
    ui.riderHud?.show();
    updateButtons();
  }

  // ---- race -------------------------------------------------------------

  function runRace() {
    state.mode = 'race';
    const a = els.algorithmSelect.value;
    const b = els.compareAlgorithmSelect.value;
    const opts = searchOpts();

    const t0 = performance.now();
    const resultA = runAlgorithm(a, sim.graph, state.pins.start.node, state.pins.end.node, opts);
    const t1 = performance.now();
    const resultB = runAlgorithm(b, sim.graph, state.pins.start.node, state.pins.end.node, opts);
    const t2 = performance.now();

    state.lastResult = { path: resultA.path, pathB: resultB.path };
    state.overlayDrawKey = `race:${a}:${b}:${Date.now()}:${routeKey(resultA.path)}:${routeKey(resultB.path)}`;
    state.overlaySignature = null;
    renderOverlayPins();

    els.statStatus.textContent = 'Racing…';
    els.statExplored.textContent = `${label(a)} ${resultA.explored} · ${label(b)} ${resultB.explored}`;
    els.statHeap.textContent = `${resultA.maxHeapSize ?? '—'} / ${resultB.maxHeapSize ?? '—'}`;
    els.statCost.textContent = `${formatDuration(resultA.cost)} / ${formatDuration(resultB.cost)}`;
    els.statLength.textContent = `${resultA.path ? formatDistance(pathLengthMetres(sim.graph, resultA.path)) : '—'} / ${resultB.path ? formatDistance(pathLengthMetres(sim.graph, resultB.path)) : '—'}`;
    els.statHops.textContent = `${(resultA.path?.nodes.length ?? 1) - 1} / ${(resultB.path?.nodes.length ?? 1) - 1}`;
    els.statTime.textContent = `${formatMs(t1 - t0)} / ${formatMs(t2 - t1)}`;

    state.raceStartSim = sim.clock.time;
    state.spawnedAtSim = sim.clock.time;
    state.racers = [];

    const spawn = (name, result, color) => {
      if (!result.path) return;
      const mover = onSpawnMover(state.pins.start.node, state.pins.end.node, name, color);
      if (mover) state.moverIds.push(mover.id);
      state.racers.push({
        key: name,
        label: label(name),
        color,
        explored: result.explored,
        plannedEtaSec: result.cost,
        edges: result.path.edges,
        optimal: isOptimal(name),
        moverId: mover?.id,
      });
    };
    spawn(a, resultA, PALETTE.compareA);
    spawn(b, resultB, PALETTE.compareB);

    // A real-time race of a 10-minute trip takes 10 real minutes; speed it up so both finish.
    if (sim.clock.speed < CONFIG.ui.raceSpeed) els.speedButtons?.find((btn) => btn.dataset.speed === String(CONFIG.ui.raceSpeed))?.click();
    ui.narration?.racing({ aLabel: label(a), bLabel: label(b) });
    ui.raceBoard?.start({ racers: state.racers });
    ui.effortChart?.show([
      { label: label(a), value: resultA.explored, color: PALETTE.compareA, note: `${formatDuration(resultA.cost)} route` },
      { label: label(b), value: resultB.explored, color: PALETTE.compareB, note: `${formatDuration(resultB.cost)} route` },
    ]);
    ui.directions?.show(buildDirections(sim.graph, resultA.path));

    state.generator = null;
    updateButtons();
  }

  // ---- per-frame + arrival ----------------------------------------------

  function frame({ movers: all }) {
    const movers = (all ?? []).filter((m) => state.moverIds.includes(m.id));
    renderOverlayIfChanged();
    if (state.mode === 'race') {
      ui.raceBoard?.update({
        movers, graph: sim.graph, trafficFactor: sim.traffic.asCostFn(), simTime: sim.clock.time,
      });
      return;
    }
    if (state.mode !== 'single') return;
    const mover = movers?.[0];
    if (!mover) return;
    ui.riderHud?.update({
      mover,
      graph: sim.graph,
      trafficFactor: sim.traffic.asCostFn(),
      simTime: sim.clock.time,
      label: label(state.plan?.algorithm ?? els.algorithmSelect.value),
      totalDistanceM: state.plan?.distanceM,
      plannedEtaSec: state.plan?.cost,
    });
  }

  function onMoverArrived(mover) {
    if (!state.moverIds.includes(mover?.id)) return;
    const elapsedSec = Math.max(0, sim.clock.time - state.spawnedAtSim);
    const elapsedText = formatDuration(elapsedSec);

    if (state.mode === 'race') {
      const racer = state.racers.find((r) => r.moverId === mover.id);
      ui.raceBoard?.finish({ key: racer?.key ?? mover.algorithm, elapsedSec });
      const outcome = ui.raceBoard?.result?.();
      if (outcome && outcome.order.every((o) => Number.isFinite(o.elapsedSec))) {
        const verdict = raceVerdict({ racers: state.racers, arrivals: outcome.order });
        els.statStatus.textContent = 'Race over';
        ui.narration?.custom(`<b>${escapeHtml(verdict.headline)}</b> — ${escapeHtml(verdict.detail)}`);
      }
      return;
    }

    ui.riderHud?.markArrived({ mover, elapsedText });
    ui.narration?.arrived({ durationText: elapsedText });
    els.statStatus.textContent = 'Delivered';
    ui.resultCard?.show({
      title: 'Delivered 🎉',
      kicker: label(state.plan?.algorithm ?? els.algorithmSelect.value),
      sub: `Your rider made it in ${elapsedText}.`,
      stats: [
        { label: 'Actual trip', value: elapsedText },
        { label: 'Predicted', value: formatDuration(state.plan?.cost ?? NaN) },
        { label: 'Distance', value: formatDistance(state.plan?.distanceM ?? NaN) },
        { label: 'Intersections checked', value: state.plan ? state.plan.explored.toLocaleString() : '—' },
      ],
      shareUrl: ui.buildShareUrl?.(),
    });
  }

  function onMoverRerouted(reason, mover) {
    if (mover && !state.moverIds.includes(mover.id)) return;
    const slot = moverSlot(mover);
    const route = routeOverlayFor(mover ?? liveMover(slot));
    renderer.visuals?.flagReroute?.(route, slot === 'challenger' ? 'comparePathB' : 'path');
    state.overlaySignature = null;
    renderOverlayPins();
    if (slot === 'primary') ui.riderHud?.flagReroute();
    ui.narration?.rerouting({ reason: reason ?? 'a road just closed' });
  }

  // ---- reset ------------------------------------------------------------

  function clearRunOutputs() {
    state.settled = new Map();
    state.frontier = new Set();
    state.settleOrder = 0;
    state.lastResult = null;
    state.highlight = null;
    state.plan = null;
    state.racers = [];
    state.cpuMs = 0;
    state.lastSettle = null;
    state.overlayDrawKey = null;
    state.overlaySignature = null;
    // Old riders would otherwise keep driving and confuse the HUD, race and follow camera.
    for (const id of state.moverIds) sim.removeMover(id);
    state.moverIds = [];
    ui.nodeInspector?.clear();
    ui.nodeInspector?.hide();
    ui.rerouteMonitor?.clear();
    ui.rerouteMonitor?.hide();
    ui.resultCard?.hide();
    ui.raceBoard?.clear();
    ui.raceBoard?.hide();
    ui.riderHud?.clear();
    ui.riderHud?.hide();
    ui.effortChart?.hide();
    ui.directions?.hide();
  }

  /** Stop any search/riders and clear results, but keep the pins. */
  function clearSearch() {
    if (state.rafId) cancelAnimationFrame(state.rafId);
    state.rafId = 0;
    state.generator = null;
    state.mode = 'idle';
    clearRunOutputs();
    els.statStatus.textContent = 'Idle';
    for (const el of [els.statExplored, els.statHeap, els.statCost, els.statLength, els.statHops, els.statTime]) {
      el.textContent = '—';
    }
    renderOverlayPins();
    updateButtons();
  }

  function reset() {
    clearSearch();
    state.pins.start = null;
    state.pins.end = null;
    updatePinStatus();
    renderOverlayPins();
    updateButtons();
    onReset?.();
  }

  function stepOnce() {
    if (!state.generator) {
      const algorithm = els.algorithmSelect.value;
      if (!STEP_GENERATORS[algorithm]) return runInstant(algorithm);
      state.mode = 'single';
      clearRunOutputs();
      state.generator = STEP_GENERATORS[algorithm](
        sim.graph, state.pins.start.node, state.pins.end.node, searchOpts(),
      );
      state.startedAt = performance.now();
    }
    // One click = one intersection chosen (skip over the relax events in between).
    const algorithm = els.algorithmSelect.value;
    for (;;) {
      const t0 = performance.now();
      const { value, done } = state.generator.next();
      state.cpuMs += performance.now() - t0;
      if (done) return;
      applyStep(value);
      if (value.type === 'done') return finish(value, algorithm);
      if (value.type === 'settle') break;
    }
    renderOverlayPins();
    showInspector(algorithm);
    reportProgress('Stepping');
  }

  updatePinStatus();

  return {
    setPin, reset, frame, onMoverArrived, onMoverRerouted, setHighlight, pins: state.pins,
    snapshot() {
      const overlay = buildOverlay();
      const riders = state.moverIds
        .map((id, index) => ({ mover: sim.movers.get(id), index }))
        .filter((entry) => entry.mover)
        .map(({ mover, index }) => {
          const slot = index === 1 ? 'challenger' : 'primary';
          const path = slot === 'challenger' ? overlay.comparePathB : overlay.path;
          return {
            id: mover.id,
            slot,
            algorithm: mover.algorithm,
            arrived: Boolean(mover.arrived),
            blocked: mover.status === 'blocked',
            reroutes: mover.stats?.reroutes ?? 0,
            tripSec: mover.stats?.elapsedSec ?? 0,
            onRoute: routeContainsMoverEdge(mover, path),
            explored: state.racers.find((r) => r.moverId === mover.id)?.explored
              ?? (index === 0 ? state.plan?.explored ?? null : null),
            plannedSec: state.racers.find((r) => r.moverId === mover.id)?.plannedEtaSec
              ?? (index === 0 ? state.plan?.cost ?? null : null),
          };
        });
      const explored = state.mode === 'race'
        ? (state.racers.reduce((sum, r) => sum + (r.explored ?? 0), 0) || null)
        : (state.plan?.explored ?? (state.settled.size || null));
      const plannedSec = state.mode === 'race'
        ? (state.racers[0]?.plannedEtaSec ?? null)
        : (state.plan?.cost ?? null);
      return {
        pins: {
          start: state.pins.start?.node ?? null,
          end: state.pins.end?.node ?? null,
        },
        algorithm: els.algorithmSelect.value,
        race: {
          on: els.compareToggle.checked,
          running: state.mode === 'race',
          challenger: els.compareToggle.checked ? els.compareAlgorithmSelect.value : null,
        },
        status: els.statStatus?.textContent ?? '',
        explored,
        plannedSec,
        searching: Boolean(state.generator),
        riders,
      };
    },
    setAlgorithm(id) {
      if (![...els.algorithmSelect.options].some((opt) => opt.value === id)) return;
      els.algorithmSelect.value = id;
      els.algorithmSelect.dispatchEvent(new Event('change', { bubbles: true }));
    },
    setRace(challengerOrNull) {
      if (challengerOrNull == null) {
        if (els.compareToggle.checked) {
          els.compareToggle.checked = false;
          els.compareToggle.dispatchEvent(new Event('change', { bubbles: true }));
        }
        return;
      }

      const primary = els.algorithmSelect.value;
      const values = [...els.compareAlgorithmSelect.options].map((opt) => opt.value);
      const fallback = primary === 'dijkstra' ? 'astar' : 'dijkstra';
      const challenger = challengerOrNull !== primary && values.includes(challengerOrNull)
        ? challengerOrNull
        : (values.find((value) => value !== primary && value === fallback) ?? values.find((value) => value !== primary));

      if (!els.compareToggle.checked) {
        els.compareToggle.checked = true;
        els.compareToggle.dispatchEvent(new Event('change', { bubbles: true }));
      }
      if (challenger && els.compareAlgorithmSelect.value !== challenger) {
        els.compareAlgorithmSelect.value = challenger;
        els.compareAlgorithmSelect.dispatchEvent(new Event('change', { bubbles: true }));
      }
    },
    run() {
      if (els.runBtn.disabled) return;
      els.runBtn.click();
    },
    step() {
      if (!state.generator && (!state.pins.start || !state.pins.end)) return;
      stepOnce();
    },
    setPins(fromId, toId) {
      reset();
      setPin('from', { kind: 'node', id: fromId });
      setPin('to', { kind: 'node', id: toId });
    },
    ownsMover: (id) => state.moverIds.includes(id),
    primaryMoverId: () => state.moverIds[0] ?? null,
  };
}

function escapeHtml(text) {
  return String(text).replace(/[&<>"']/g, (c) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));
}

function pathLengthMetres(graph, path) {
  let total = 0;
  for (const e of path.edges) total += graph.edgeLength[e];
  return total;
}

export { ALGORITHM_NAMES };
