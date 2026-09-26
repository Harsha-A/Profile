/**
 * Binary min-heap of (priority, value) pairs, backed by parallel typed
 * arrays so the hot loop in the search algorithms allocates nothing.
 *
 * Deletion is lazy: callers push a fresh entry whenever a distance
 * improves and simply skip stale entries when popping them (the caller
 * compares the popped priority against the authoritative `dist[]` value).
 */
export class MinHeap {
  /** @param {number} [capacity] initial backing-array capacity. */
  constructor(capacity = 1024) {
    this._priority = new Float64Array(capacity);
    this._value = new Int32Array(capacity);
    this._size = 0;
  }

  get size() {
    return this._size;
  }

  clear() {
    this._size = 0;
  }

  _grow() {
    const cap = this._priority.length * 2;
    const p = new Float64Array(cap);
    const v = new Int32Array(cap);
    p.set(this._priority);
    v.set(this._value);
    this._priority = p;
    this._value = v;
  }

  /**
   * @param {number} priority
   * @param {number} value
   */
  push(priority, value) {
    if (this._size === this._priority.length) this._grow();
    let i = this._size++;
    this._priority[i] = priority;
    this._value[i] = value;
    while (i > 0) {
      const parent = (i - 1) >> 1;
      if (this._priority[parent] <= this._priority[i]) break;
      this._swap(parent, i);
      i = parent;
    }
  }

  /** Peek at the smallest priority without removing it, or NaN if empty. */
  peek() {
    return this._size === 0 ? NaN : this._priority[0];
  }

  /** Pop and return `{ priority, value }` for the smallest entry, or null if empty. */
  pop() {
    if (this._size === 0) return null;
    const priority = this._priority[0];
    const value = this._value[0];
    this._size--;
    if (this._size > 0) {
      this._priority[0] = this._priority[this._size];
      this._value[0] = this._value[this._size];
      this._sinkDown(0);
    }
    return { priority, value };
  }

  _sinkDown(i) {
    const n = this._size;
    for (;;) {
      const left = 2 * i + 1;
      const right = 2 * i + 2;
      let smallest = i;
      if (left < n && this._priority[left] < this._priority[smallest]) smallest = left;
      if (right < n && this._priority[right] < this._priority[smallest]) smallest = right;
      if (smallest === i) break;
      this._swap(i, smallest);
      i = smallest;
    }
  }

  _swap(i, j) {
    const p = this._priority[i];
    this._priority[i] = this._priority[j];
    this._priority[j] = p;
    const v = this._value[i];
    this._value[i] = this._value[j];
    this._value[j] = v;
  }
}
