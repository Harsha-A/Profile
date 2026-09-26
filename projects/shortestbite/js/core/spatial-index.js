import { dist } from './geometry.js';

/**
 * Uniform grid spatial index over 2D points, used for nearest-node lookup
 * and click hit-testing. Search expands outward ring by ring from the
 * query point's cell.
 */
export class SpatialIndex {
  /** @param {number} [cellSize] metres per grid cell. */
  constructor(cellSize = 100) {
    this.cellSize = cellSize;
    /** @type {Map<string, Array<{ id: number, x: number, y: number }>>} */
    this._cells = new Map();
  }

  _key(cx, cy) {
    return `${cx},${cy}`;
  }

  _cellOf(x, y) {
    return [Math.floor(x / this.cellSize), Math.floor(y / this.cellSize)];
  }

  /** Insert a point identified by `id`. */
  insert(id, x, y) {
    const [cx, cy] = this._cellOf(x, y);
    const key = this._key(cx, cy);
    if (!this._cells.has(key)) this._cells.set(key, []);
    this._cells.get(key).push({ id, x, y });
  }

  clear() {
    this._cells.clear();
  }

  /**
   * Find the nearest inserted point to (x, y), or null if the index is empty.
   * @returns {{ id: number, x: number, y: number, distance: number } | null}
   */
  nearest(x, y) {
    const [cx, cy] = this._cellOf(x, y);
    let best = null;
    let bestDist = Infinity;
    const maxRing = 1000; // absolute safety cap; empty grids return early below
    let emptyRingsSinceFound = 0;
    for (let ring = 0; ring <= maxRing; ring++) {
      let sawAny = false;
      for (let dx = -ring; dx <= ring; dx++) {
        for (let dy = -ring; dy <= ring; dy++) {
          if (Math.max(Math.abs(dx), Math.abs(dy)) !== ring) continue; // only the ring border
          const cell = this._cells.get(this._key(cx + dx, cy + dy));
          if (!cell) continue;
          sawAny = true;
          for (const p of cell) {
            const d = dist(x, y, p.x, p.y);
            if (d < bestDist) {
              bestDist = d;
              best = p;
            }
          }
        }
      }
      if (best) {
        // Once the current ring's inner radius exceeds the best distance
        // found so far, no closer point can exist in a farther ring.
        if (ring * this.cellSize > bestDist) break;
        emptyRingsSinceFound += sawAny ? 0 : 1;
        if (emptyRingsSinceFound > 2) break;
      } else if (ring > 20 && !sawAny) {
        break; // grid is sparse/empty in this area; give up
      }
    }
    return best ? { ...best, distance: bestDist } : null;
  }

  /**
   * All inserted points within `radius` of (x, y).
   * @returns {Array<{ id: number, x: number, y: number, distance: number }>}
   */
  within(x, y, radius) {
    const [cx, cy] = this._cellOf(x, y);
    const ringSpan = Math.ceil(radius / this.cellSize);
    const results = [];
    for (let dx = -ringSpan; dx <= ringSpan; dx++) {
      for (let dy = -ringSpan; dy <= ringSpan; dy++) {
        const cell = this._cells.get(this._key(cx + dx, cy + dy));
        if (!cell) continue;
        for (const p of cell) {
          const d = dist(x, y, p.x, p.y);
          if (d <= radius) results.push({ ...p, distance: d });
        }
      }
    }
    return results;
  }
}

/** Build a spatial index over every node of a Graph. */
export function buildNodeIndex(graph, cellSize = 100) {
  const index = new SpatialIndex(cellSize);
  for (let i = 0; i < graph.nodeCount; i++) {
    index.insert(i, graph.nodeX[i], graph.nodeY[i]);
  }
  return index;
}
