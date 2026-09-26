/**
 * Wires the top bar and the "Live map" panel section: seed/regenerate,
 * play/pause, speed, traffic, congestion animation, the road-closure tool,
 * follow-rider, one-way arrows, and the clock/rush-hour readout.
 *
 * Seed changes are persisted to the URL hash so a city can be shared or
 * reloaded (per PLAN.md's ES-module note, this page must be served over
 * http(s), not opened as a bare file).
 */
export function createControls({ sim, renderer, els, onRegenerate, onFollowChange }) {
  let paused = false;

  function readSeedFromHash() {
    const m = location.hash.match(/seed=(\d+)/);
    return m ? Number(m[1]) : null;
  }

  function writeSeedToHash(seed) {
    location.hash = `seed=${seed}`;
  }

  els.seedInput.addEventListener('change', () => {
    writeSeedToHash(Number(els.seedInput.value) || 0);
  });

  els.regenerateBtn.addEventListener('click', () => {
    const seed = Number(els.seedInput.value) || 0;
    writeSeedToHash(seed);
    onRegenerate(seed);
  });

  els.playPauseBtn.addEventListener('click', () => {
    paused = !paused;
    if (paused) {
      sim.clock.pause();
      els.playPauseBtn.textContent = '▶ Play';
    } else {
      sim.clock.resume();
      els.playPauseBtn.textContent = '⏸ Pause';
    }
  });

  for (const btn of els.speedButtons) {
    btn.addEventListener('click', () => {
      sim.clock.setSpeed(Number(btn.dataset.speed));
      for (const b of els.speedButtons) b.classList.toggle('active', b === btn);
    });
  }

  els.trafficToggle.addEventListener('change', () => {
    sim.traffic.enabled = els.trafficToggle.checked;
    renderer.markRoadsDirty();
  });

  els.congestionToggle?.addEventListener('change', () => {
    renderer.visuals.setShowCongestion(els.congestionToggle.checked);
  });

  els.followToggle?.addEventListener('change', () => {
    onFollowChange?.(els.followToggle.checked);
  });

  els.oneWayToggle.addEventListener('change', () => {
    renderer.showOneWayArrows = els.oneWayToggle.checked;
    renderer.markRoadsDirty();
  });

  return {
    initialSeed: readSeedFromHash(),
    setSeedInput(seed) {
      els.seedInput.value = String(seed);
    },
    isCloseRoadToolActive() {
      return els.closeRoadToggle.checked;
    },
    isFollowActive() {
      return Boolean(els.followToggle?.checked);
    },
    isTrafficEnabled() {
      return els.trafficToggle.checked;
    },
    updateClock(text) {
      if (els.clockDisplay.textContent !== text) els.clockDisplay.textContent = text;
    },
  };
}
