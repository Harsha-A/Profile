const e=[{slug:"alien-dictionary",title:"Alien Dictionary",difficulty:"Hard",tags:["graph","topological-sort","string","breadth-first-search"],function:{name:"alienOrder",params:[{name:"words",type:"string[]"}],returns:"string"},compare:{mode:"custom"},limits:{timeMs:1e3},tests:[{input:[["dbc","dba","ca","cb","a"]],public:!0,expected:"dcab"},{input:[["pq","p"]],public:!0,expected:""},{input:[["x","y","x"]],public:!0,expected:""},{input:[["zz"]],public:!1,expected:"z"},{input:[["ab","abc","b","bd"]],public:!1,expected:"acdb"},{input:[["m","n","o","mn"]],public:!1,expected:""},{input:[["same","same","sand"]],public:!1,expected:"samedn"}],generated:{seeds:[2691,2692,2693],perSeed:6},variantId:"default",key:"alien-dictionary:default",generatedTests:[{seed:2691,index:0,input:[["a","a","b"]],expected:"ab",public:!1},{seed:2691,index:1,input:[["a","a","aaa","aaba","abba","baa","bb"]],expected:"ab",public:!1},{seed:2691,index:2,input:[["cb","a","dc","d","dfe","fcf","ffba"]],expected:"",public:!1},{seed:2691,index:3,input:[["a","ab","baa","bb","bba","bbaa"]],expected:"ab",public:!1},{seed:2691,index:4,input:[["aabb"]],expected:"ab",public:!1},{seed:2691,index:5,input:[["da","fa","bc","ecff"]],expected:"dacfbe",public:!1},{seed:2692,index:0,input:[["d","c","cc","bdb","bc","bc","bba"]],expected:"dacb",public:!1},{seed:2692,index:1,input:[["fef","edfb","aff"]],expected:"fdbea",public:!1},{seed:2692,index:2,input:[["baba","cc"]],expected:"bac",public:!1},{seed:2692,index:3,input:[["a","aabe","b"]],expected:"aeb",public:!1},{seed:2692,index:4,input:[["a","bd","b"]],expected:"",public:!1},{seed:2692,index:5,input:[["cc","ccaa","ce","cdb","e","dad"]],expected:"cabed",public:!1},{seed:2693,index:0,input:[["cfccd","cfcc","cedb","a","efb"]],expected:"",public:!1},{seed:2693,index:1,input:[["a","b","ebaf"]],expected:"afbe",public:!1},{seed:2693,index:2,input:[["baa","dbc","c","a","ac","ecd","ee"]],expected:"bdcae",public:!1},{seed:2693,index:3,input:[["aa","aaba","b","b","b","bba"]],expected:"ab",public:!1},{seed:2693,index:4,input:[["be","cb","dddc","a","ea","ea","eaec"]],expected:"bcdae",public:!1},{seed:2693,index:5,input:[["ab","ba","baaa","babaa","baba","bb","bbbb"]],expected:"",public:!1}],descriptionMarkdown:`# Alien Dictionary

You are given a list \`words\` of non-empty lowercase strings. The list is
claimed to be sorted in lexicographic order under some unknown ranking of
the letters, where lexicographic order means: compare two words at the
first position where they differ, and if one word is a prefix of the other,
the shorter word comes first.

Find a ranking consistent with that claim and return it as a string that
contains every distinct letter appearing in \`words\` exactly once, from
lowest rank to highest. Letters that do not appear in \`words\` must not
appear in the answer.

Each adjacent pair \`words[i]\`, \`words[i + 1]\` gives at most one constraint:

- If they differ first at position \`p\`, then \`words[i][p]\` must rank below
  \`words[i + 1][p]\`.
- If they have no differing position and \`words[i]\` is strictly longer than
  \`words[i + 1]\`, the list cannot be sorted under any ranking.
- Otherwise (equal words, or a proper prefix placed first) there is no
  constraint.

If the constraints contradict each other (they form a cycle) or a longer
word is placed before its own prefix, return the empty string \`""\`.

Many rankings are usually valid, because letters with no constraint
between them may appear in either order. Any valid ranking is accepted; the
judge checks that the answer uses exactly the right letters and satisfies
every constraint.

## Examples

\`\`\`
Input: words = ["dbc", "dba", "ca", "cb", "a"]
Output: "dcab"
Explanation: the adjacent pairs give c < a, d < c, a < b, and c < a again.
Together they force d < c < a < b, so "dcab" is the only valid answer.
\`\`\`

\`\`\`
Input: words = ["pq", "p"]
Output: ""
Explanation: "pq" cannot come before its own prefix "p".
\`\`\`

## Constraints

- \`1 <= words.length <= 100\`
- \`1 <= words[i].length <= 100\`
- Each word contains only lowercase English letters.

## Notes

Build a directed graph with one edge per constraint and run a topological
sort (Kahn's algorithm or a depth-first search with cycle detection).
`,checkerSrc:`// Many rankings can be valid, so the answer is checked against the
// constraints derived from the input rather than compared to one string.
function deriveConstraints(words) {
  const letters = new Set();
  for (const w of words) for (const ch of w) letters.add(ch);
  const edges = [];
  for (let i = 0; i + 1 < words.length; i++) {
    const a = words[i];
    const b = words[i + 1];
    const len = Math.min(a.length, b.length);
    let p = 0;
    while (p < len && a[p] === b[p]) p++;
    if (p === len) {
      if (a.length > b.length) return { letters, edges, invalid: true };
    } else {
      edges.push([a[p], b[p]]);
    }
  }
  return { letters, edges, invalid: false };
}

function hasCycle(letters, edges) {
  const indeg = new Map();
  const adj = new Map();
  for (const ch of letters) {
    indeg.set(ch, 0);
    adj.set(ch, []);
  }
  for (const [u, v] of edges) {
    adj.get(u).push(v);
    indeg.set(v, indeg.get(v) + 1);
  }
  const queue = [...letters].filter((ch) => indeg.get(ch) === 0);
  let seen = 0;
  while (queue.length > 0) {
    const u = queue.shift();
    seen++;
    for (const v of adj.get(u)) {
      indeg.set(v, indeg.get(v) - 1);
      if (indeg.get(v) === 0) queue.push(v);
    }
  }
  return seen !== letters.size;
}

export function check(input, output) {
  const [words] = input;
  if (typeof output !== 'string') {
    return { ok: false, message: 'Expected a string.' };
  }
  const { letters, edges, invalid } = deriveConstraints(words);
  if (invalid || hasCycle(letters, edges)) {
    return output === ''
      ? { ok: true }
      : { ok: false, message: 'No valid ranking exists, so the answer must be "".' };
  }
  if (output.length !== letters.size) {
    return { ok: false, message: \`Expected \${letters.size} letters, got \${output.length}.\` };
  }
  const rank = new Map();
  for (let i = 0; i < output.length; i++) {
    const ch = output[i];
    if (!letters.has(ch)) return { ok: false, message: \`Letter "\${ch}" does not appear in words.\` };
    if (rank.has(ch)) return { ok: false, message: \`Letter "\${ch}" appears more than once.\` };
    rank.set(ch, i);
  }
  for (const [u, v] of edges) {
    if (rank.get(u) >= rank.get(v)) {
      return { ok: false, message: \`"\${u}" must come before "\${v}".\` };
    }
  }
  return { ok: true };
}
`,checkerExportName:"check"}];export{e as default};
