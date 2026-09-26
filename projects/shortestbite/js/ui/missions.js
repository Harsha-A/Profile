const DEFAULT_STORAGE = Object.freeze({ seen: false, done: {}, xp: 0, badges: [] });
const POLL_MS = 200;
const FIRST_OPEN_COUNT = 2;
const SPOTLIGHT_PAD = 8;
const MAP_TARGET_SELECTOR = '#map-container';

const HTML_ALLOWED = new Set(['STRONG', 'EM', 'KBD', 'CODE', 'BR']);

/**
 * @typedef {{id:string,label:string}} PredictionChoice
 * @typedef {{id:string,text:string,target:string,done:(snap:object,ctx:object)=>boolean,auto:(api:object,ctx:object)=>unknown}} MissionStep
 * @typedef {{id:string,title:string,xp:number,badge:{id:string,emoji:string,label:string},goal:string,prediction:{question:string,choices:PredictionChoice[]},setup?:(api:object)=>unknown,steps:MissionStep[],judge:(snap:object,ctx:object)=>string,outcome:(snap:object,ctx:object)=>{headline:string,facts:{label:string,value:string|number}[],why:string,kb?:string}} Mission
 */

export function defaultProgress() {
  return { seen: DEFAULT_STORAGE.seen, done: {}, xp: DEFAULT_STORAGE.xp, badges: [] };
}

export function mergeProgress(raw) {
  const base = defaultProgress();
  if (!raw || typeof raw !== 'object') return base;
  return {
    seen: Boolean(raw.seen),
    done: raw.done && typeof raw.done === 'object' && !Array.isArray(raw.done) ? { ...raw.done } : {},
    xp: Number.isFinite(Number(raw.xp)) ? Math.max(0, Math.floor(Number(raw.xp))) : 0,
    badges: Array.isArray(raw.badges) ? [...new Set(raw.badges.filter((b) => typeof b === 'string'))] : [],
  };
}

export function levelFromXp(xp) {
  const safeXp = Math.max(0, Math.floor(Number(xp) || 0));
  let level = 1;
  let floor = 0;
  let next = 100;
  while (safeXp >= next) {
    level += 1;
    floor = next;
    next += 100 + (level - 1) * 50;
  }
  return { level, floor, next, progress: next === floor ? 1 : (safeXp - floor) / (next - floor) };
}

/**
 * @param {{api:object,missions:Mission[],storageKey?:string,docsHref?:(id:string)=>string}} opts
 */
export function createMissions({ api, missions = [], storageKey = 'sb.missions', docsHref = (id) => `knowledge.html#${id}` }) {
  let state = readProgress(storageKey);
  let active = false;
  let minimized = false;
  let mode = 'idle';
  let current = null;
  let currentIndex = -1;
  let stepIndex = 0;
  let ctx = null;
  let choiceId = null;
  let lastOutcome = null;
  let awardedXp = 0;
  let pollId = 0;
  let rafId = 0;
  let previousFocus = null;

  const root = document.createElement('div');
  root.className = 'missions-root';
  root.setAttribute('aria-live', 'polite');

  const card = document.createElement('section');
  card.className = 'missions-card';
  card.hidden = true;
  card.setAttribute('role', 'dialog');
  card.setAttribute('aria-label', 'Mission');

  const spotlight = document.createElement('div');
  spotlight.className = 'missions-spotlight';
  spotlight.hidden = true;
  spotlight.setAttribute('aria-hidden', 'true');

  const pill = document.createElement('button');
  pill.type = 'button';
  pill.className = 'missions-pill';
  pill.hidden = true;
  pill.addEventListener('click', restore);

  const hub = document.createElement('div');
  hub.className = 'missions-hub';
  hub.hidden = true;
  hub.setAttribute('role', 'dialog');
  hub.setAttribute('aria-modal', 'true');
  hub.setAttribute('aria-label', 'Missions hub');

  root.append(spotlight, card, pill, hub);
  mountRoot();

  function mountRoot() {
    const parent = document.getElementById('map-ui') || document.getElementById('map-container') || document.body;
    if (!root.isConnected) parent.append(root);
  }

  function readRaw() {
    try {
      return JSON.parse(localStorage.getItem(storageKey) || 'null');
    } catch {
      return null;
    }
  }

  function write() {
    try {
      localStorage.setItem(storageKey, JSON.stringify(state));
    } catch {
      gentle('Progress could not be saved on this browser.');
    }
  }

  function markSeen() {
    if (!state.seen) {
      state = { ...state, seen: true };
      write();
    }
  }

  function gentle(message, err) {
    if (err) console.warn(message, err);
    try {
      api?.toast?.(message);
    } catch {
      /* toast facade is best effort */
    }
  }

  function snapshot() {
    try {
      return api?.snapshot?.() ?? {};
    } catch (err) {
      gentle('Could not read the simulator state yet.', err);
      return {};
    }
  }

  function indexFor(id) {
    if (!missions.length) return -1;
    if (id == null) return 0;
    return missions.findIndex((m) => m.id === id);
  }

  function isUnlocked(index) {
    if (index < 0) return false;
    if (index < FIRST_OPEN_COUNT) return true;
    return Boolean(state.done[missions[index - 1]?.id]);
  }

  function nextMissionIndex(from = currentIndex) {
    for (let i = Math.max(0, from + 1); i < missions.length; i++) if (isUnlocked(i)) return i;
    return -1;
  }

  function resetRuntime() {
    stopPolling();
    stopPositioning();
    card.replaceChildren();
    spotlight.hidden = true;
    spotlight.removeAttribute('data-map-target');
    choiceId = null;
    lastOutcome = null;
    awardedXp = 0;
  }

  function close() {
    stopPolling();
    stopPositioning();
    active = false;
    minimized = false;
    mode = 'idle';
    current = null;
    currentIndex = -1;
    ctx = null;
    card.hidden = true;
    hub.hidden = true;
    pill.hidden = true;
    spotlight.hidden = true;
    card.replaceChildren();
    hub.replaceChildren();
    document.removeEventListener('keydown', onKeyDown, true);
    if (previousFocus?.isConnected) previousFocus.focus?.({ preventScroll: true });
    previousFocus = null;
  }

  function minimize() {
    if (!active || mode === 'hub') {
      close();
      return;
    }
    minimized = true;
    card.hidden = true;
    spotlight.hidden = true;
    pill.hidden = false;
    const n = currentIndex >= 0 ? currentIndex + 1 : 1;
    pill.textContent = `🎯 Mission ${n}/${missions.length || 0}`;
  }

  function restore() {
    if (!active || !minimized) return;
    minimized = false;
    pill.hidden = true;
    card.hidden = false;
    if (mode === 'step') updateSpotlight();
  }

  function onKeyDown(e) {
    if (e.key !== 'Escape' || !active) return;
    e.preventDefault();
    minimize();
  }

  function start(id) {
    mountRoot();
    if (!missions.length) {
      gentle('Missions are still loading.');
      markSeen();
      return;
    }
    let index = indexFor(id);
    if (index < 0) index = 0;
    if (!isUnlocked(index) && !state.done[missions[index]?.id]) {
      gentle('Finish the previous mission to unlock this one.');
      openHub();
      return;
    }
    resetRuntime();
    active = true;
    minimized = false;
    mode = 'intro';
    currentIndex = index;
    current = missions[index];
    stepIndex = 0;
    ctx = {};
    previousFocus ??= document.activeElement;
    hub.hidden = true;
    pill.hidden = true;
    card.hidden = false;
    document.addEventListener('keydown', onKeyDown, true);
    markSeen();
    renderIntro();
  }

  function titleRow(kicker, titleText, opts = {}) {
    const header = document.createElement('header');
    header.className = 'missions-card-head';
    const text = document.createElement('div');
    const small = document.createElement('div');
    small.className = 'missions-kicker';
    small.textContent = kicker;
    const title = document.createElement('h2');
    title.textContent = titleText;
    text.append(small, title);
    const closeBtn = document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.className = 'missions-icon-btn';
    closeBtn.setAttribute('aria-label', opts.closeLabel || 'Minimize mission');
    closeBtn.textContent = '×';
    closeBtn.addEventListener('click', opts.onClose || minimize);
    header.append(text, closeBtn);
    return header;
  }

  function xpChip(xp = current?.xp ?? 0) {
    const chip = document.createElement('span');
    chip.className = 'missions-xp-chip';
    chip.textContent = `${xp} XP`;
    return chip;
  }

  function renderIntro() {
    mode = 'intro';
    stopPolling();
    spotlight.hidden = true;
    const body = document.createElement('div');
    body.className = 'missions-body';

    const goal = document.createElement('p');
    goal.className = 'missions-goal';
    goal.textContent = current.goal;

    const question = document.createElement('fieldset');
    question.className = 'missions-prediction';
    const legend = document.createElement('legend');
    legend.textContent = current.prediction?.question || 'What do you expect?';
    question.append(legend);

    const choices = current.prediction?.choices || [];
    for (const choice of choices) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'missions-choice';
      btn.dataset.choice = choice.id;
      btn.textContent = choice.label;
      btn.addEventListener('click', () => {
        choiceId = choice.id;
        for (const other of question.querySelectorAll('.missions-choice')) other.setAttribute('aria-pressed', 'false');
        btn.setAttribute('aria-pressed', 'true');
        next.disabled = false;
      });
      question.append(btn);
    }

    const next = document.createElement('button');
    next.type = 'button';
    next.className = 'primary missions-wide';
    next.textContent = 'Start guided mission';
    next.disabled = true;
    next.addEventListener('click', () => beginSteps());

    body.append(goal, question, next);
    card.replaceChildren(titleRow(`Mission ${currentIndex + 1} of ${missions.length}`, current.title), xpChip(), body);
    requestAnimationFrame(() => card.querySelector('.missions-choice')?.focus?.({ preventScroll: true }));
  }

  async function beginSteps() {
    ctx.prediction = choiceId;
    card.setAttribute('aria-busy', 'true');
    try {
      await current.setup?.(api);
    } catch (err) {
      gentle('Mission setup hit a snag. You can still try the steps or use “Do it for me”.', err);
    } finally {
      card.removeAttribute('aria-busy');
    }
    stepIndex = 0;
    renderStep();
  }

  function safeFragment(html) {
    const template = document.createElement('template');
    template.innerHTML = String(html || '');
    const walk = (node) => {
      for (const child of [...node.childNodes]) {
        if (child.nodeType === Node.ELEMENT_NODE) {
          if (!HTML_ALLOWED.has(child.tagName)) {
            child.replaceWith(document.createTextNode(child.textContent || ''));
          } else {
            for (const attr of [...child.attributes]) child.removeAttribute(attr.name);
            walk(child);
          }
        } else if (child.nodeType !== Node.TEXT_NODE) {
          child.remove();
        }
      }
    };
    walk(template.content);
    return template.content;
  }

  function renderDots() {
    const dots = document.createElement('div');
    dots.className = 'missions-dots';
    dots.setAttribute('aria-hidden', 'true');
    current.steps.forEach((_, i) => {
      const dot = document.createElement('span');
      dot.className = i === stepIndex ? 'active' : i < stepIndex ? 'done' : '';
      dots.append(dot);
    });
    return dots;
  }

  function renderStep() {
    if (stepIndex >= current.steps.length) return finishMission();
    mode = 'step';
    stopPolling();
    const step = current.steps[stepIndex];
    const body = document.createElement('div');
    body.className = 'missions-body';

    const progress = document.createElement('div');
    progress.className = 'missions-step-progress';
    progress.append(renderDots(), textNode(`Step ${stepIndex + 1}/${current.steps.length}`));

    const instruction = document.createElement('div');
    instruction.className = 'missions-instruction';
    instruction.append(safeFragment(step.text));

    const status = document.createElement('div');
    status.className = 'missions-status';
    status.textContent = 'Waiting for you to complete this on the real control…';

    const actions = document.createElement('div');
    actions.className = 'missions-actions';
    const auto = document.createElement('button');
    auto.type = 'button';
    auto.textContent = 'Do it for me';
    auto.addEventListener('click', async () => {
      auto.disabled = true;
      status.textContent = 'Trying that for you…';
      try {
        await step.auto?.(api, ctx);
        checkStepNow();
      } catch (err) {
        gentle('Could not do that step automatically. Try the highlighted control instead.', err);
      } finally {
        auto.disabled = false;
      }
    });
    actions.append(auto);

    body.append(progress, instruction, status, actions);
    card.replaceChildren(titleRow(current.badge?.emoji ? `${current.badge.emoji} ${current.badge.label}` : 'Mission step', current.title), xpChip(), body);
    card.hidden = minimized;
    updateSpotlight();
    startPolling();
  }

  function textNode(text) {
    return document.createTextNode(text);
  }

  function startPolling() {
    stopPolling();
    checkStepNow();
    pollId = window.setInterval(checkStepNow, POLL_MS);
  }

  function stopPolling() {
    if (pollId) window.clearInterval(pollId);
    pollId = 0;
  }

  function checkStepNow() {
    if (!active || mode !== 'step' || minimized) return;
    const step = current.steps[stepIndex];
    let done = false;
    try {
      done = Boolean(step.done?.(snapshot(), ctx));
    } catch (err) {
      gentle('The mission could not verify this step yet.', err);
      stopPolling();
      return;
    }
    if (!done) return;
    stopPolling();
    const status = card.querySelector('.missions-status');
    if (status) status.textContent = 'Nice — step complete.';
    stepIndex += 1;
    window.setTimeout(() => {
      if (active && mode === 'step') renderStep();
    }, 260);
  }

  function targetElement(selector) {
    if (!selector) return null;
    try {
      const el = document.querySelector(selector);
      if (!el) return null;
      const rect = el.getBoundingClientRect();
      if (!rect.width && !rect.height) return null;
      return el;
    } catch {
      return null;
    }
  }

  function updateSpotlight() {
    stopPositioning();
    if (!active || minimized || mode !== 'step') return;
    const step = current.steps[stepIndex];
    const target = targetElement(step?.target) || targetElement(MAP_TARGET_SELECTOR);
    if (!target) {
      spotlight.hidden = true;
      return;
    }
    revealInPanel(target);
    spotlight.dataset.mapTarget = step?.target === MAP_TARGET_SELECTOR ? 'true' : 'false';
    const position = () => {
      if (!active || minimized || mode !== 'step' || !target.isConnected) {
        spotlight.hidden = true;
        rafId = 0;
        return;
      }
      const rect = target.getBoundingClientRect();
      const pad = step?.target === MAP_TARGET_SELECTOR ? 3 : SPOTLIGHT_PAD;
      Object.assign(spotlight.style, {
        left: `${Math.max(2, rect.left - pad)}px`,
        top: `${Math.max(2, rect.top - pad)}px`,
        width: `${Math.max(24, rect.width + pad * 2)}px`,
        height: `${Math.max(24, rect.height + pad * 2)}px`,
      });
      spotlight.hidden = false;
      rafId = requestAnimationFrame(position);
    };
    window.addEventListener('resize', updateSpotlight, { once: true });
    window.addEventListener('scroll', updateSpotlight, { once: true, capture: true });
    rafId = requestAnimationFrame(position);
  }

  function stopPositioning() {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = 0;
    window.removeEventListener('resize', updateSpotlight);
    window.removeEventListener('scroll', updateSpotlight, true);
  }

  function reducedMotion() {
    return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  }

  function finishMission() {
    mode = 'outcome';
    stopPolling();
    spotlight.hidden = true;
    const snap = snapshot();
    let correct = null;
    try {
      correct = current.judge?.(snap, ctx);
    } catch (err) {
      gentle('Could not judge the prediction, so this one counts as practice.', err);
    }
    try {
      lastOutcome = current.outcome?.(snap, ctx) || { headline: 'Mission complete', facts: [], why: '', kb: undefined };
    } catch (err) {
      gentle('Could not build the mission recap.', err);
      lastOutcome = { headline: 'Mission complete', facts: [], why: 'You completed the guided steps.', kb: undefined };
    }
    const alreadyDone = Boolean(state.done[current.id]);
    const correctPrediction = correct != null && choiceId === correct;
    awardedXp = alreadyDone ? 0 : Math.ceil((current.xp || 0) * (correctPrediction ? 1 : 0.5));
    if (!alreadyDone) {
      state = {
        ...state,
        done: { ...state.done, [current.id]: true },
        xp: state.xp + awardedXp,
        badges: current.badge?.id && !state.badges.includes(current.badge.id) ? [...state.badges, current.badge.id] : state.badges,
      };
      write();
    }
    renderOutcome({ correctPrediction, correctChoiceId: correct, alreadyDone });
  }

  function renderOutcome({ correctPrediction, correctChoiceId, alreadyDone }) {
    const body = document.createElement('div');
    body.className = 'missions-body missions-outcome';

    const headline = document.createElement('h3');
    headline.textContent = lastOutcome.headline;

    const facts = document.createElement('dl');
    facts.className = 'missions-facts';
    for (const fact of lastOutcome.facts || []) {
      const dt = document.createElement('dt');
      dt.textContent = fact.label;
      const dd = document.createElement('dd');
      dd.textContent = String(fact.value);
      facts.append(dt, dd);
    }

    const chosen = current.prediction?.choices?.find((c) => c.id === choiceId)?.label || 'your prediction';
    const correctLabel = current.prediction?.choices?.find((c) => c.id === correctChoiceId)?.label;
    const prediction = document.createElement('p');
    prediction.className = correctPrediction ? 'missions-prediction-result correct' : 'missions-prediction-result missed';
    prediction.textContent = `You predicted “${chosen}” — ${correctPrediction ? 'correct!' : 'not quite.'}`;

    const why = document.createElement('p');
    why.className = 'missions-why';
    why.textContent = correctPrediction || !correctLabel ? lastOutcome.why : `${lastOutcome.why} Correct answer: “${correctLabel}”.`;

    const badge = document.createElement('div');
    badge.className = 'missions-badge-unlock';
    badge.innerHTML = `<span aria-hidden="true">${escapeText(current.badge?.emoji || '🏅')}</span><b>${escapeText(alreadyDone ? 'Badge already unlocked' : 'Badge unlocked')}</b><em>${escapeText(current.badge?.label || current.title)}</em>`;

    const xp = document.createElement('div');
    xp.className = 'missions-xp-earned';
    xp.textContent = alreadyDone ? 'Replay complete · +0 XP' : `+${awardedXp} XP earned`;

    const actions = document.createElement('div');
    actions.className = 'missions-actions missions-outcome-actions';
    const next = document.createElement('button');
    next.type = 'button';
    next.className = 'primary';
    next.textContent = 'Next mission';
    next.disabled = nextMissionIndex() < 0;
    next.addEventListener('click', () => start(missions[nextMissionIndex()]?.id));
    const read = document.createElement('button');
    read.type = 'button';
    read.textContent = 'Read more';
    read.disabled = !lastOutcome.kb;
    read.addEventListener('click', () => {
      if (lastOutcome.kb) window.open(docsHref(lastOutcome.kb), '_blank', 'noopener');
    });
    const back = document.createElement('button');
    back.type = 'button';
    back.textContent = 'Back to hub';
    back.addEventListener('click', openHub);
    actions.append(next, read, back);

    body.append(headline, facts, prediction, why, xp, badge, actions);
    card.replaceChildren(titleRow('Mission complete', current.title), body);
  }

  function escapeText(value) {
    const span = document.createElement('span');
    span.textContent = String(value);
    return span.innerHTML;
  }

  function openHub() {
    mountRoot();
    resetRuntime();
    active = true;
    minimized = false;
    mode = 'hub';
    current = null;
    currentIndex = -1;
    previousFocus ??= document.activeElement;
    markSeen();
    card.hidden = true;
    pill.hidden = true;
    hub.hidden = false;
    document.addEventListener('keydown', onKeyDown, true);
    renderHub();
  }

  function renderHub() {
    const wrap = document.createElement('div');
    wrap.className = 'missions-hub-panel';
    const closeBtn = document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.className = 'missions-icon-btn missions-hub-close';
    closeBtn.setAttribute('aria-label', 'Close missions');
    closeBtn.textContent = '×';
    closeBtn.addEventListener('click', close);

    const head = document.createElement('header');
    head.className = 'missions-hub-head';
    const title = document.createElement('div');
    title.innerHTML = '<div class="missions-kicker">Guided simulator</div><h2>Missions</h2><p>Predict, try the real controls, then unlock badges as you learn shortest paths.</p>';
    const level = levelFromXp(state.xp);
    const levelEl = document.createElement('div');
    levelEl.className = 'missions-level';
    levelEl.innerHTML = `<b>${state.xp} XP</b><span>Level ${level.level}</span><div><i style="width:${Math.round(level.progress * 100)}%"></i></div>`;
    head.append(title, levelEl);

    const grid = document.createElement('div');
    grid.className = 'missions-grid';
    missions.forEach((mission, index) => {
      const done = Boolean(state.done[mission.id]);
      const locked = !done && !isUnlocked(index);
      const item = document.createElement('article');
      item.className = `missions-hub-item ${done ? 'done' : locked ? 'locked' : 'available'}`;
      const status = locked ? 'locked 🔒' : done ? 'done ✓' : 'available';
      item.innerHTML = `<div class="missions-hub-badge" aria-hidden="true">${escapeText(mission.badge?.emoji || '🎯')}</div><div class="missions-hub-text"><h3>${escapeText(mission.title)}</h3><p>${escapeText(mission.goal || '')}</p><span>${status} · ${Number(mission.xp) || 0} XP</span></div>`;
      const action = document.createElement('button');
      action.type = 'button';
      action.textContent = done ? 'Replay' : 'Start';
      action.disabled = locked;
      action.addEventListener('click', () => start(mission.id));
      item.append(action);
      grid.append(item);
    });

    const foot = document.createElement('footer');
    foot.className = 'missions-hub-actions';
    const reset = document.createElement('button');
    reset.type = 'button';
    reset.textContent = 'Reset progress';
    reset.addEventListener('click', () => {
      state = defaultProgress();
      state.seen = true;
      write();
      renderHub();
    });
    const skip = document.createElement('button');
    skip.type = 'button';
    skip.textContent = 'Skip for now';
    skip.addEventListener('click', () => {
      markSeen();
      close();
    });
    foot.append(reset, skip);

    wrap.append(closeBtn, head, grid, foot);
    hub.replaceChildren(wrap);
  }

  function progress() {
    state = readProgress(storageKey);
    return mergeProgress(state);
  }

  return {
    start,
    openHub,
    close,
    hasSeen: () => progress().seen,
    isActive: () => active,
    isCardVisible: () => active && !minimized && !card.hidden,
    progress,
  };

  // Centre side-panel targets inside the panel's own scroller; never scroll the page (overflow-hidden ancestors included).
  function revealInPanel(target) {
    const panel = target.closest?.('#algo-panel');
    if (!panel) return;
    const pr = panel.getBoundingClientRect();
    const tr = target.getBoundingClientRect();
    const margin = 48;
    if (tr.top >= pr.top + margin && tr.bottom <= pr.bottom - margin) return;
    const top = panel.scrollTop + (tr.top - pr.top) - (pr.height - tr.height) / 2;
    panel.scrollTo({ top: Math.max(0, top), behavior: reducedMotion() ? 'auto' : 'smooth' });
  }

  function readProgress(key) {
    try {
      return mergeProgress(JSON.parse(localStorage.getItem(key) || 'null'));
    } catch {
      return defaultProgress();
    }
  }
}
