/**
 * Seeded name generators for streets. Purely cosmetic — used for labels in
 * the UI/renderer, never for graph structure or algorithm behaviour.
 */

const ORDINALS = [
  '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th',
  '11th', '12th', '13th', '14th', '15th', '16th', '17th', '18th', '19th', '20th',
];

const NAMED_ROADS = [
  'MG Road', 'Church Street', 'Brigade Road', 'Residency Road', 'Richmond Road',
  'Cunningham Road', 'Lavelle Road', 'Infantry Road', 'Museum Road', 'Palace Road',
];

const CROSS_SUFFIXES = ['Cross', 'Main', 'Block'];

/**
 * @param {import('../core/rng.js').Rng} rng
 * @param {number} rowCount
 * @param {number} colCount
 * @returns {{ rowNames: string[], colNames: string[] }}
 */
export function generateStreetNames(rng, rowCount, colCount) {
  const rowNames = [];
  const colNames = [];
  const usedNamed = new Set();

  for (let r = 0; r < rowCount; r++) {
    if (rng.chance(0.15) && usedNamed.size < NAMED_ROADS.length) {
      let name;
      do {
        name = rng.pick(NAMED_ROADS);
      } while (usedNamed.has(name));
      usedNamed.add(name);
      rowNames.push(name);
    } else {
      const ord = ORDINALS[r % ORDINALS.length];
      const suffix = rng.pick(CROSS_SUFFIXES);
      rowNames.push(`${ord} ${suffix}`);
    }
  }

  for (let c = 0; c < colCount; c++) {
    colNames.push(`${ORDINALS[c % ORDINALS.length]} Avenue`);
  }

  return { rowNames, colNames };
}
