/**
 * Fixed-timestep simulation clock. Real animation-frame deltas accumulate
 * and are drained in whole `dt`-second simulated steps, so the simulation
 * itself is always deterministic regardless of frame rate.
 */
export class SimClock {
  /**
   * @param {object} [opts]
   * @param {number} [opts.dt] seconds per simulated tick.
   * @param {number} [opts.speed] simulated seconds per real second.
   * @param {number} [opts.startTime] simulated seconds since midnight.
   * @param {number} [opts.maxTicksPerFrame] safety cap so a backgrounded tab
   *   doesn't freeze the page catching up.
   */
  constructor({ dt = 1, speed = 1, startTime = 11 * 3600, maxTicksPerFrame = 600 } = {}) {
    this.dt = dt;
    this.speed = speed;
    this.time = startTime;
    this.maxTicksPerFrame = maxTicksPerFrame;
    this.paused = false;
    this._accumulator = 0;
  }

  pause() {
    this.paused = true;
  }

  resume() {
    this.paused = false;
  }

  /** @param {number} n simulated seconds per real second */
  setSpeed(n) {
    this.speed = n;
  }

  /**
   * Advance the clock by a real elapsed time and invoke `tick(dt)` once per
   * whole simulated step that has elapsed.
   * @param {number} realDeltaMs
   * @param {(dt: number) => void} tick
   * @returns {number} the fraction of the current step already elapsed (0..1),
   *   for interpolated rendering.
   */
  frame(realDeltaMs, tick) {
    if (this.paused) return this._accumulator / this.dt;
    this._accumulator += (realDeltaMs / 1000) * this.speed;
    let steps = 0;
    while (this._accumulator >= this.dt && steps < this.maxTicksPerFrame) {
      this.time += this.dt;
      tick(this.dt);
      this._accumulator -= this.dt;
      steps++;
    }
    return this._accumulator / this.dt;
  }
}
