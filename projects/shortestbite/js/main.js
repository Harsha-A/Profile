import { CONFIG } from './config.js';
import { generateCity } from './city/procedural-city.js';
import { loadCity } from './city/osm-city.js';
import { Simulation, DEFAULT_CLOSURE_SEC } from './movers/simulation.js';
import { CanvasRenderer } from './render/canvas-renderer.js';
import { LeafletRenderer } from './render/leaflet-renderer.js';
import { PALETTE } from './render/palette.js';
import { createControls } from './ui/controls.js';
import { createAlgoPanel } from './ui/algo-panel.js';
import { createAlgoPicker } from './ui/algo-picker.js';
import { createNarration } from './ui/narration.js';
import { createLegend } from './ui/legend.js';
import { createMissions } from './ui/missions.js';
import { MISSIONS } from './knowledge/missions.js';
import { createRiderHud } from './ui/rider-hud.js';
import { createResultCard } from './ui/result-card.js';
import { createTrafficReadout } from './ui/traffic-readout.js';
import { createRaceBoard } from './ui/race.js';
import { createEffortChart } from './ui/effort-chart.js';
import { createDirections } from './ui/directions.js';
import { createNodeInspector } from './ui/node-inspector.js';
import { createRerouteMonitor } from './ui/reroute-monitor.js';
import { attachStatHelp } from './ui/stat-help.js';
import { formatClock, formatDuration } from './ui/format.js';
import { getScenario, runScenario } from './knowledge/scenarios.js';

function showToast(message) {
  const container = document.getElementById('toast-container');
  const el = document.createElement('div');
  el.className = 'toast';
  el.textContent = message;
  container.appendChild(el);
  setTimeout(() => el.remove(), 4500);
}

function els() {
  return {
    citySelect: document.getElementById('city-select'),
    seedField: document.getElementById('seed-field'),
    seedInput: document.getElementById('seed-input'),
    regenerateBtn: document.getElementById('regenerate-btn'),
    playPauseBtn: document.getElementById('play-pause-btn'),
    speedButtons: [...document.querySelectorAll('.speed-btn')],
    clockDisplay: document.getElementById('clock-display'),
    trafficRegime: document.getElementById('traffic-regime'),
    helpBtn: document.getElementById('help-btn'),
    trafficToggle: document.getElementById('traffic-toggle'),
    congestionToggle: document.getElementById('congestion-toggle'),
    closeRoadToggle: document.getElementById('close-road-toggle'),
    followToggle: document.getElementById('follow-toggle'),
    oneWayToggle: document.getElementById('one-way-toggle'),
    algorithmSelect: document.getElementById('algorithm-select'),
    algorithmOptions: document.getElementById('algorithm-options'),
    algorithmExplanation: document.getElementById('algorithm-explanation'),
    pinStatus: document.getElementById('pin-status'),
    narrationStrip: document.getElementById('narration-strip'),
    riderHud: document.getElementById('rider-hud'),
    raceScoreboard: document.getElementById('race-scoreboard'),
    mapLegend: document.getElementById('map-legend'),
    effortChart: document.getElementById('effort-chart'),
    directionsPanel: document.getElementById('directions-panel'),
    directionsList: document.getElementById('directions-list'),
    resultCardRoot: document.getElementById('result-card-root'),
    compareToggle: document.getElementById('compare-toggle'),
    compareAlgorithmSelect: document.getElementById('compare-algorithm-select'),
    runBtn: document.getElementById('run-btn'),
    stepBtn: document.getElementById('step-btn'),
    resetBtn: document.getElementById('reset-btn'),
    stepsPerFrame: document.getElementById('steps-per-frame'),
    statStatus: document.getElementById('stat-status'),
    statExplored: document.getElementById('stat-explored'),
    statHeap: document.getElementById('stat-heap'),
    statCost: document.getElementById('stat-cost'),
    statLength: document.getElementById('stat-length'),
    statHops: document.getElementById('stat-hops'),
    statTime: document.getElementById('stat-time'),
    statsList: document.getElementById('stats-list'),
    nodeInspector: document.getElementById('node-inspector'),
    zoomInBtn: document.getElementById('zoom-in-btn'),
    zoomOutBtn: document.getElementById('zoom-out-btn'),
    zoomFitBtn: document.getElementById('zoom-fit-btn'),
    modeBanner: document.getElementById('mode-banner'),
    modeBannerDone: document.getElementById('mode-banner-done'),
  };
}

async function main() {
  const el = els();
  const mapSurface = document.getElementById('map-surface');

  let renderer = null; // current concrete renderer (CanvasRenderer | LeafletRenderer)
  let sim = null;
  let panel = null;
  let cityMode = 'procedural'; // 'procedural' | 'koramangala'
  const pins = []; // world-space pin markers shown by the renderer
  const closures = new Map(); // edgeId -> { edgeId, x, y }, one per physical road (twins share a badge)

  // Controls/algo-panel are created once and kept across city switches, but the
  // concrete renderer instance is torn down and replaced on switch. This proxy
  // gives them one stable object that always forwards to whichever renderer is
  // currently mounted.
  const rendererProxy = {
    get camera() {
      return renderer.camera;
    },
    setWorld: (...a) => renderer.setWorld(...a),
    setNodeIndex: (...a) => renderer.setNodeIndex(...a),
    setTrafficSource: (...a) => renderer.setTrafficSource(...a),
    setOverlay: (...a) => renderer.setOverlay(...a),
    pick: (...a) => renderer.pick(...a),
    focus: (...a) => renderer.focus(...a),
    followMover: (...a) => renderer.followMover(...a),
    markRoadsDirty: () => renderer.markRoadsDirty(),
    zoomIn: () => renderer.zoomIn(),
    zoomOut: () => renderer.zoomOut(),
    fitWorld: () => renderer.fitWorld(),
    drawFrame: (...a) => renderer.drawFrame(...a),
    get visuals() {
      return renderer.visuals;
    },
    get showOneWayArrows() {
      return renderer.showOneWayArrows;
    },
    set showOneWayArrows(v) {
      renderer.showOneWayArrows = v;
    },
  };

  /** Place a pin on `node`, keeping the renderer's pin list and the panel in sync. */
  function placePin(kind, node) {
    const worldX = sim.graph.nodeX[node];
    const worldY = sim.graph.nodeY[node];
    const entry = { kind, node, x: worldX, y: worldY, droppedAt: performance.now() };
    pins[kind === 'start' ? 0 : 1] = entry;
    panel.setPin(kind, { node, x: worldX, y: worldY });
  }

  /** A link that reproduces this exact city, seed, pins and algorithm. */
  function buildShareUrl() {
    const parts = [];
    if (cityMode === 'procedural') parts.push(`seed=${Number(el.seedInput.value) || CONFIG.seed}`);
    else parts.push(`city=${cityMode}`);
    if (panel?.pins.start) parts.push(`from=${panel.pins.start.node}`);
    if (panel?.pins.end) parts.push(`to=${panel.pins.end.node}`);
    parts.push(`algo=${el.algorithmSelect.value}`);
    return `${location.origin}${location.pathname}#${parts.join('&')}`;
  }

  /** Restore pins and algorithm from a shared link, if the hash carries them. */
  function restoreFromHash() {
    const graph = sim?.graph;
    if (!graph) return;
    const algo = location.hash.match(/algo=([a-z-]+)/)?.[1];
    if (algo && [...el.algorithmSelect.options].some((o) => o.value === algo)) {
      el.algorithmSelect.value = algo;
      el.algorithmSelect.dispatchEvent(new Event('change', { bubbles: true }));
    }
    const inRange = (n) => Number.isInteger(n) && n >= 0 && n < graph.nodeCount;
    const from = Number(location.hash.match(/from=(\d+)/)?.[1]);
    const to = Number(location.hash.match(/to=(\d+)/)?.[1]);
    if (inRange(from)) placePin('start', from);
    if (inRange(from) && inRange(to)) placePin('end', to);
  }

  function setCloseRoadMode(on) {
    if (el.closeRoadToggle.checked !== on) {
      el.closeRoadToggle.checked = on;
      el.closeRoadToggle.dispatchEvent(new Event('change', { bubbles: true }));
    }
    el.modeBanner.hidden = !on;
  }

  function handleClick({ x, y }) {
    if (controls.isCloseRoadToolActive()) {
      const edgeId = pickNearestEdge(sim.graph, renderer.camera.screenToWorld(x, y), pixelsPerMetre(renderer.camera, x, y));
      if (edgeId == null) {
        showToast('Click directly on a road to close it.');
        return;
      }
      if (sim.graph.edgeClosed[edgeId] === 1) {
        sim.openRoad(edgeId);
        showToast('Road reopened.');
      } else {
        sim.closeRoad(edgeId, DEFAULT_CLOSURE_SEC);
        showToast(`Road closed in both directions for ${DEFAULT_CLOSURE_SEC / 60} sim-minutes. Closure tool switched off.`);
        // One closure per activation, so later clicks go back to placing pins.
        setCloseRoadMode(false);
      }
      renderer.markRoadsDirty();
      return;
    }

    const hit = renderer.pick(x, y);
    if (!hit || hit.kind !== 'node') {
      showToast('Click closer to a street to drop a pin.');
      return;
    }
    const node = hit.id;

    if (!panel.pins.start) {
      placePin('start', node);
    } else if (!panel.pins.end) {
      placePin('end', node);
    } else {
      pins.length = 0;
      panel.reset();
      placePin('start', node);
    }
  }

  /** Tear down whichever renderer is mounted (if any) and mount the right kind for `kind`. */
  function mountRenderer(kind) {
    if (renderer) renderer.destroy();
    renderer = kind === 'koramangala' ? new LeafletRenderer() : new CanvasRenderer();
    renderer.mount(mapSurface);
    renderer.on('click', handleClick);
    // Any manual pan/zoom means the user wants to look around: stop fighting them.
    renderer.onUserViewChange?.(() => {
      if (!el.followToggle.checked) return;
      el.followToggle.checked = false;
      renderer.followMover(null);
      showToast('Follow paused — you moved the map.');
    });
  }

  async function buildWorld(kind, seed) {
    let graph;
    try {
      if (kind === 'koramangala') {
        ({ graph } = await loadCity('koramangala'));
      } else {
        ({ graph } = generateCity(seed, CONFIG.city));
      }
    } catch (err) {
      console.error(err);
      showToast(`Could not load "${kind}": ${err.message}`);
      return;
    }
    sim = new Simulation({ graph, seed, config: CONFIG });
    closures.clear();
    const twinOf = (e) => graph.reverseEdge?.(e) ?? -1;
    sim.bus.on('road:closed', ({ edgeId }) => {
      if (closures.has(twinOf(edgeId))) return;
      const from = graph.edgeFrom[edgeId];
      const to = graph.edgeTo[edgeId];
      closures.set(edgeId, {
        edgeId,
        x: (graph.nodeX[from] + graph.nodeX[to]) / 2,
        y: (graph.nodeY[from] + graph.nodeY[to]) / 2,
      });
    });
    sim.bus.on('road:opened', ({ edgeId }) => {
      closures.delete(edgeId);
      closures.delete(twinOf(edgeId));
      renderer.markRoadsDirty();
    });
    const isPrimary = (mover) => mover && panel?.primaryMoverId?.() === mover.id;
    sim.bus.on('mover:rerouted', ({ mover, reason }) => {
      if (!panel?.ownsMover?.(mover?.id)) return;
      panel.onMoverRerouted(reason === 'traffic' ? 'traffic got heavier on the planned route' : 'a road ahead just closed', mover);
    });
    sim.bus.on('mover:rerouteCheck', (check) => {
      if (!isPrimary(check.mover) || el.compareToggle.checked) return;
      rerouteMonitor.update(check, { fmtTime: formatDuration });
    });
    sim.bus.on('mover:blocked', ({ mover }) => {
      if (!panel?.ownsMover?.(mover?.id)) return;
      if (isPrimary(mover)) rerouteMonitor.blocked();
      narration.custom('⛔ The road ahead is closed and there is <b>no way around</b>. The rider is waiting for it to reopen. <button type="button" class="kb-link" data-kb="closures">Why? →</button>');
    });
    sim.bus.on('mover:unblocked', ({ mover }) => {
      if (!panel?.ownsMover?.(mover?.id)) return;
      if (isPrimary(mover)) rerouteMonitor.unblocked();
      narration.custom('✅ A way through opened up — the rider is moving again.');
    });
    sim.bus.on('mover:arrived', ({ mover }) => {
      const [sx, sy] = renderer.camera.worldToScreen(mover.x, mover.y);
      renderer.visuals.celebrate(mover.x, mover.y, sx, sy);
      panel?.onMoverArrived?.(mover);
    });
    renderer.setWorld({ graph });
    renderer.setNodeIndex(sim.nodeIndex);
    renderer.setTrafficSource(sim.traffic.asCostFn(), sim.clock.time);
    renderer.visuals.setEmptyState({
      text: 'Click a street to drop your pickup point',
      sub: 'Then click again for the drop-off, and hit Find route.',
      textB: 'Now click where the order is going',
      subB: 'That sets the drop-off point.',
    });
    pins.length = 0;
    renderer.followMover(null);
    if (panel) panel.reset();
    panel = createAlgoPanel({
      sim,
      renderer: rendererProxy,
      els: el,
      ui,
      onSpawnMover(startNode, targetNode, algorithm, color) {
        const mover = sim.spawnMover(startNode, targetNode, { algorithm, color });
        if (!mover) showToast('No route found between these points.');
        else if (controls.isFollowActive()) renderer.followMover(mover.id);
        return mover;
      },
      onReset() {
        pins.length = 0;
      },
    });
  }

  function updateCityUI() {
    const isProcedural = cityMode === 'procedural';
    el.seedField.style.display = isProcedural ? '' : 'none';
    el.regenerateBtn.style.display = isProcedural ? '' : 'none';
  }

  async function switchCity(kind, seed) {
    cityMode = kind;
    mountRenderer(kind);
    await buildWorld(kind, seed ?? (Number(el.seedInput.value) || CONFIG.seed));
    updateCityUI();
  }

  // ---- presentation modules (DOM-level, built once and reused across worlds) ----
  const narration = createNarration({ el: el.narrationStrip });
  const legend = createLegend({ el: el.mapLegend });
  const riderHud = createRiderHud({ el: el.riderHud });
  const raceBoard = createRaceBoard({ el: el.raceScoreboard });
  const effortChart = createEffortChart({ el: el.effortChart });
  const resultCard = createResultCard({ rootEl: el.resultCardRoot });
  const trafficReadout = createTrafficReadout({ el: el.trafficRegime, clockEl: el.clockDisplay });
  const nodeInspector = createNodeInspector({ el: el.nodeInspector });
  // The monitor lives inside the rider HUD card so reroute decisions sit next to the ETA.
  const rerouteEl = document.createElement('div');
  rerouteEl.hidden = true;
  el.riderHud.append(rerouteEl);
  const rerouteMonitor = createRerouteMonitor({ el: rerouteEl });
  attachStatHelp(el.statsList);
  const directions = createDirections({
    panelEl: el.directionsPanel,
    listEl: el.directionsList,
    onHoverStep: (step) => panel?.setHighlight({ nodes: step.nodes, edges: step.edges }),
    onLeave: () => panel?.setHighlight(null),
  });

  // The picker owns #algorithm-explanation; algo-panel no longer writes to it.
  createAlgoPicker({
    containerEl: el.algorithmOptions,
    selectEl: el.algorithmSelect,
    explanationEl: el.algorithmExplanation,
  });

  const ui = {
    narration,
    riderHud,
    raceBoard,
    effortChart,
    directions,
    resultCard,
    nodeInspector,
    rerouteMonitor,
    buildShareUrl: () => buildShareUrl(),
  };

  el.zoomInBtn.addEventListener('click', () => rendererProxy.zoomIn());
  el.zoomOutBtn.addEventListener('click', () => rendererProxy.zoomOut());
  el.zoomFitBtn.addEventListener('click', () => rendererProxy.fitWorld());
  el.modeBannerDone.addEventListener('click', () => setCloseRoadMode(false));
  el.closeRoadToggle.addEventListener('change', () => {
    el.modeBanner.hidden = !el.closeRoadToggle.checked;
  });
  // Never start in a hidden mode: browsers can restore checkbox state on reload.
  setCloseRoadMode(false);
  el.followToggle.checked = false;

  legend.show();
  narration.idle();


  const controls = createControls({
    sim: {
      get clock() {
        return sim.clock;
      },
      get traffic() {
        return sim.traffic;
      },
    },
    renderer: rendererProxy,
    els: el,
    onRegenerate(seed) {
      buildWorld('procedural', seed);
    },
    onFollowChange(active) {
      if (!active) return renderer.followMover(null);
      const first = sim.movers.values().next().value;
      renderer.followMover(first ? first.id : null);
    },
  });

  el.citySelect.addEventListener('change', () => {
    const kind = el.citySelect.value;
    location.hash = kind === 'procedural' ? `seed=${el.seedInput.value}` : `city=${kind}`;
    switchCity(kind);
  });

  const initialCity = readCityFromHash();
  el.citySelect.value = initialCity;
  const initialSeed = controls.initialSeed ?? CONFIG.seed;
  controls.setSeedInput(initialSeed);
  await switchCity(initialCity, initialSeed);
  restoreFromHash();

  // ---- app facade: the only surface Knowledge "Try it" scenarios drive ----
  const tickListeners = new Set();
  function clickSpeed(n) {
    const btn = el.speedButtons.find((b) => b.dataset.speed === String(n));
    if (btn) btn.click();
    else sim.clock.setSpeed(n);
  }
  function closeEdge(edgeId) {
    if (edgeId == null || sim.graph.edgeClosed[edgeId] === 1) return false;
    sim.closeRoad(edgeId, DEFAULT_CLOSURE_SEC);
    renderer.markRoadsDirty();
    return true;
  }
  const api = {
    getCity: () => cityMode,
    async setCity(kind) {
      if (kind === cityMode) return;
      el.citySelect.value = kind;
      location.hash = kind === 'procedural' ? `seed=${el.seedInput.value}` : `city=${kind}`;
      await switchCity(kind);
    },
    getSeed: () => Number(el.seedInput.value) || CONFIG.seed,
    async setSeed(seed) {
      if (cityMode !== 'procedural' || seed === api.getSeed()) return;
      controls.setSeedInput(seed);
      location.hash = `seed=${seed}`;
      await buildWorld('procedural', seed);
    },
    getGraph: () => sim.graph,
    reset() {
      setCloseRoadMode(false);
      for (const { edgeId } of [...closures.values()]) sim.openRoad(edgeId);
      pins.length = 0;
      panel.reset();
      renderer.markRoadsDirty();
    },
    placePins(fromId, toId) {
      pins.length = 0;
      panel.reset();
      placePin('start', fromId);
      placePin('end', toId);
    },
    setAlgorithm: (id) => panel.setAlgorithm(id),
    setRace: (challenger) => panel.setRace(challenger),
    setSpeed: clickSpeed,
    setClock(sec) {
      sim.clock.time = sec;
      renderer.markRoadsDirty();
    },
    setTraffic(on) {
      if (el.trafficToggle.checked === on) return;
      el.trafficToggle.checked = on;
      el.trafficToggle.dispatchEvent(new Event('change', { bubbles: true }));
    },
    run() {
      if (sim.clock.paused) el.playPauseBtn.click();
      panel.run();
    },
    step: () => panel.step(),
    simTime: () => sim.clock.time,
    onSimTick(cb) {
      tickListeners.add(cb);
      return () => tickListeners.delete(cb);
    },
    primaryRoute() {
      const id = panel.primaryMoverId();
      const mover = id == null ? null : sim.movers.get(id);
      return mover && !mover.arrived ? mover.route : null;
    },
    closeRoadAhead(segmentsAhead = 1) {
      const route = api.primaryRoute();
      if (!route) return null;
      const first = route.edgeIndex + (route.edgeProgress > 0 ? 1 : 0);
      // Never close the very last road into the drop-off: there'd be nothing left to reroute along.
      const idx = Math.min(first + Math.max(0, segmentsAhead - 1), route.edges.length - 2);
      if (idx < first) return null;
      const edgeId = route.edges[idx];
      return closeEdge(edgeId) ? edgeId : null;
    },
    isolateDropoff() {
      const target = panel.pins.end?.node;
      if (target == null) return 0;
      let count = 0;
      for (const e of [...sim.graph.inEdges(target)]) if (closeEdge(e)) count++;
      return count;
    },
    snapshot() {
      return {
        ...(panel.snapshot?.() ?? {}),
        city: cityMode,
        seed: api.getSeed(),
        simTime: sim.clock.time,
        closures: closures.size,
        speed: sim.clock.speed,
        traffic: el.trafficToggle.checked,
      };
    },
    narrate: (html) => narration.custom(html),
    toast: showToast,
    fitWorld: () => rendererProxy.fitWorld(),
  };

  // ---- Knowledge lives on its own page; context links open it in a new tab ----
  document.addEventListener('click', (event) => {
    const link = event.target.closest?.('[data-kb]');
    if (!link) return;
    event.preventDefault();
    window.open(`knowledge.html#${link.dataset.kb}`, '_blank', 'noopener');
  });
  window.__sb = api;
  const missions = createMissions({ api, missions: MISSIONS });
  // During a mission the mission card reports the outcome; a second "Delivered" modal would cover it and the map.
  const showResultCard = resultCard.show;
  resultCard.show = (payload) => (missions.isActive() ? undefined : showResultCard(payload));
  el.helpBtn?.addEventListener('click', () => missions.openHub());
  if (!missions.hasSeen() && !/(kb|scenario)=/.test(location.hash)) missions.start();
  const scenarioFromHash = location.hash.match(/scenario=([a-z0-9-]+)/)?.[1];
  if (scenarioFromHash && getScenario(scenarioFromHash)) {
    history.replaceState(null, '', location.pathname + location.search + location.hash.replace(/&?scenario=[a-z0-9-]+/, '').replace(/^#&/, '#'));
    runScenario(getScenario(scenarioFromHash), api).catch((err) => {
      console.error(err);
      showToast(`Could not start the demo: ${err.message}`);
    });
  } else if (scenarioFromHash) {
    history.replaceState(null, '', location.pathname + location.search);
    showToast(`Unknown demo "${scenarioFromHash}" — pick one from the Knowledge page.`);
  }

  // While the mission card is up, the map fit keeps pins and routes out from under it.
  function syncCardInsets() {
    if (!renderer?.setOverlayInsets) return;
    const card = missions.isCardVisible() ? document.querySelector('.missions-card') : null;
    const rect = card?.getBoundingClientRect();
    const h = rect ? Math.ceil(rect.height) + 24 : 0;
    const reserved = renderer._cardReserve || 0;
    // Refit on show/hide or growth; ignore small shrinks so the map doesn't twitch between steps.
    if (h === reserved || (h && reserved && h < reserved && reserved - h < 60)) return;
    renderer._cardReserve = h;
    if (!h) return renderer.setOverlayInsets(null);
    // A tall card (e.g. a mission outcome) would squash the map vertically; reserve its
    // column instead whenever that leaves a larger share of the map visible.
    const map = document.getElementById('map-container').getBoundingClientRect();
    const w = Math.ceil(rect.right - map.left) + 16;
    const keepH = (map.height - h) / map.height;
    const keepW = (map.width - w) / map.width;
    renderer.setOverlayInsets(keepW > keepH ? { left: w } : { bottom: h });
  }

  let legendFoldedForCard = false;
  let last = performance.now();
  function loop(now) {
    const dt = now - last;
    last = now;
    const alpha = sim.frame(dt);
    renderer.visuals.setEmptyStateSuppressed?.(missions.isCardVisible());
    if (missions.isCardVisible() !== legendFoldedForCard) {
      legendFoldedForCard = missions.isCardVisible();
      legend.collapseForOverlay(legendFoldedForCard);
    }
    syncCardInsets();
    if (tickListeners.size) for (const fn of [...tickListeners]) fn(sim.clock.time);
    renderer.setTrafficSource(sim.traffic.asCostFn(), sim.clock.time);
    renderer.drawFrame(
      {
        movers: [...sim.movers.values()].map((m) => ({
          id: m.id,
          x: m.x,
          y: m.y,
          heading: m.heading,
          arrived: m.arrived,
          status: m.status,
          congested: m.congested,
          color: m.color ?? PALETTE.moverDefault,
        })),
        pins,
        closures: [...closures.values()],
        graph: sim.graph,
      },
      alpha
    );
    controls.updateClock(formatClock(sim.clock.time));
    trafficReadout.update({
      trafficFactor: sim.traffic.asCostFn()('arterial', sim.clock.time),
      simTime: sim.clock.time,
      enabled: controls.isTrafficEnabled(),
    });
    panel?.frame({ movers: [...sim.movers.values()] });
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
}

function readCityFromHash() {
  const m = location.hash.match(/city=([a-z]+)/);
  return m ? m[1] : 'procedural';
}


/** Screen pixels per world metre around (sx, sy), measured so it works for any camera. */
function pixelsPerMetre(camera, sx, sy) {
  const [wx, wy] = camera.screenToWorld(sx, sy);
  const [ax, ay] = camera.worldToScreen(wx, wy);
  const [bx, by] = camera.worldToScreen(wx + 100, wy);
  return Math.hypot(bx - ax, by - ay) / 100 || 1;
}

/** Brute-force nearest-edge lookup for the close-road tool (click-driven, not hot path). */
function pickNearestEdge(graph, [wx, wy], zoom = 1) {
  let bestEdge = null;
  let bestDist = Infinity;
  for (let e = 0; e < graph.edgeCount; e++) {
    const from = graph.edgeFrom[e];
    const to = graph.edgeTo[e];
    const x1 = graph.nodeX[from];
    const y1 = graph.nodeY[from];
    const x2 = graph.nodeX[to];
    const y2 = graph.nodeY[to];
    const d = pointToSegmentDistance(wx, wy, x1, y1, x2, y2);
    if (d < bestDist) {
      bestDist = d;
      bestEdge = e;
    }
  }
  // ~CONFIG.ui.pickEdgePx screen pixels, whatever the zoom level.
  return bestDist < CONFIG.ui.pickEdgePx / (zoom || 1) ? bestEdge : null;
}

function pointToSegmentDistance(px, py, x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const lengthSq = dx * dx + dy * dy;
  let t = lengthSq === 0 ? 0 : ((px - x1) * dx + (py - y1) * dy) / lengthSq;
  t = Math.max(0, Math.min(1, t));
  const cx = x1 + t * dx;
  const cy = y1 + t * dy;
  return Math.hypot(px - cx, py - cy);
}

main().catch((err) => console.error(err));
