/**
 * Seeded pseudo-random number generator (mulberry32) plus a few sampling
 * helpers. Every subsystem in the simulation must pull randomness from a
 * forked child RNG so that adding a random call in one subsystem never
 * perturbs the sequence seen by another.
 */

/**
 * @param {number} seed 32-bit integer seed.
 * @returns {() => number} a function that returns floats in [0, 1).
 */
function mulberry32(seed) {
  let a = seed >>> 0;
  return function next() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Hash a string into a 32-bit integer, used to derive child seeds. */
function hashString(str) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export class Rng {
  /** @param {number} seed */
  constructor(seed) {
    this.seed = seed >>> 0;
    this._next = mulberry32(this.seed);
  }

  /** Float in [0, 1). */
  float() {
    return this._next();
  }

  /** Integer in [min, max) (max exclusive). */
  int(min, max) {
    return min + Math.floor(this.float() * (max - min));
  }

  /** True with the given probability (default 0.5). */
  chance(p = 0.5) {
    return this.float() < p;
  }

  /** Pick a uniformly random element from an array. */
  pick(arr) {
    return arr[this.int(0, arr.length)];
  }

  /**
   * Pick an index according to a weights array (need not sum to 1).
   * @param {number[]} weights
   */
  weighted(weights) {
    const total = weights.reduce((a, b) => a + b, 0);
    let r = this.float() * total;
    for (let i = 0; i < weights.length; i++) {
      r -= weights[i];
      if (r <= 0) return i;
    }
    return weights.length - 1;
  }

  /** Standard normal sample via Box-Muller. */
  normal(mean = 0, sd = 1) {
    const u1 = Math.max(this.float(), Number.EPSILON);
    const u2 = this.float();
    const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
    return mean + sd * z;
  }

  /** Exponential sample with the given rate. */
  exponential(rate = 1) {
    return -Math.log(1 - this.float()) / rate;
  }

  /**
   * Derive an independent child RNG from a label. Deterministic: the same
   * (seed, label) pair always yields the same child sequence.
   * @param {string} label
   */
  fork(label) {
    const childSeed = (this.seed ^ hashString(label)) >>> 0;
    return new Rng(childSeed);
  }
}

/** Convenience factory mirroring the class constructor. */
export function createRng(seed) {
  return new Rng(seed);
}
