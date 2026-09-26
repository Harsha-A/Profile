const e=[{slug:"find-critical-and-pseudo-critical-edges-in-minimum-spanning-tree",title:"Find Critical and Pseudo Critical Edges in Minimum Spanning Tree",difficulty:"Hard",tags:["graph","minimum-spanning-tree","union-find","kruskal","sorting"],function:{name:"findCriticalAndPseudoCriticalEdges",params:[{name:"n",type:"number"},{name:"edges",type:"number[][]"}],returns:"number[][]"},compare:{mode:"custom"},limits:{timeMs:1e3},tests:[{input:[4,[[0,1,2],[1,2,2],[2,3,1],[0,2,5],[1,3,2]]],public:!0,expected:[[0,2],[1,4]]},{input:[3,[[0,1,4],[1,2,4],[0,2,4]]],public:!0,expected:[[],[0,1,2]]},{input:[2,[[0,1,7]]],public:!0,expected:[[0],[]]},{input:[4,[[0,1,1],[1,2,1],[2,3,1],[3,0,1],[0,2,3]]],public:!1,expected:[[],[0,1,2,3]]},{input:[5,[[0,1,1],[1,2,2],[2,3,3],[3,4,4],[0,4,4],[1,3,3]]],public:!1,expected:[[0,1],[2,3,4,5]]}],generated:{seeds:[14891,14892,14893],perSeed:6},variantId:"default",key:"find-critical-and-pseudo-critical-edges-in-minimum-spanning-tree:default",generatedTests:[{seed:14891,index:0,input:[6,[[3,5,1],[2,4,1],[3,0,2],[2,3,4],[0,2,3],[0,1,2]]],expected:[[0,1,2,4,5],[]],public:!1},{seed:14891,index:1,input:[4,[[0,1,1],[1,3,3],[0,2,1]]],expected:[[0,1,2],[]],public:!1},{seed:14891,index:2,input:[7,[[5,6,4],[3,5,4],[1,6,3],[0,1,4],[1,2,4],[4,5,2],[2,3,4],[2,5,4],[1,4,3],[3,6,2],[2,0,2]]],expected:[[2,5,8,9,10],[3,4,6,7]],public:!1},{seed:14891,index:3,input:[7,[[3,6,3],[2,4,3],[0,2,4],[2,3,2],[1,5,2],[0,1,1]]],expected:[[0,1,2,3,4,5],[]],public:!1},{seed:14891,index:4,input:[6,[[0,4,4],[1,5,2],[0,1,4],[0,2,1],[0,3,4]]],expected:[[0,1,2,3,4],[]],public:!1},{seed:14891,index:5,input:[5,[[1,3,3],[4,1,1],[1,2,4],[0,4,2],[0,3,3],[0,2,4],[3,4,3],[0,1,1]]],expected:[[1,7],[0,2,4,5,6]],public:!1},{seed:14892,index:0,input:[5,[[3,1,1],[0,2,1],[1,4,4],[1,2,2],[0,1,3],[0,3,4]]],expected:[[0,1,2,3],[]],public:!1},{seed:14892,index:1,input:[2,[[0,1,1]]],expected:[[0],[]],public:!1},{seed:14892,index:2,input:[7,[[1,2,1],[0,1,2],[0,6,4],[3,5,4],[0,3,2],[5,2,4],[4,5,2],[2,3,2],[3,4,3],[4,6,3],[5,1,2]]],expected:[[0,6,9,10],[1,4,7]],public:!1},{seed:14892,index:3,input:[2,[[0,1,4]]],expected:[[0],[]],public:!1},{seed:14892,index:4,input:[4,[[1,2,4],[2,3,4],[0,1,4],[1,3,2],[0,2,1]]],expected:[[3,4],[0,1,2]],public:!1},{seed:14892,index:5,input:[4,[[1,3,1],[1,2,1],[0,3,2],[0,2,4],[0,1,1]]],expected:[[0,1,4],[]],public:!1},{seed:14893,index:0,input:[3,[[0,2,4],[0,1,3],[2,1,4]]],expected:[[1],[0,2]],public:!1},{seed:14893,index:1,input:[7,[[4,6,1],[0,1,4],[1,2,1],[0,4,1],[0,3,2],[0,5,2]]],expected:[[0,1,2,3,4,5],[]],public:!1},{seed:14893,index:2,input:[3,[[0,1,2],[0,2,2],[1,2,2]]],expected:[[],[0,1,2]],public:!1},{seed:14893,index:3,input:[7,[[3,5,2],[0,3,4],[0,4,2],[0,1,1],[0,2,4],[2,6,3],[2,5,1],[4,5,1],[2,4,4],[4,6,2]]],expected:[[0,2,3,6,7,9],[]],public:!1},{seed:14893,index:4,input:[6,[[3,4,4],[0,1,3],[0,3,4],[1,2,4],[2,5,2],[0,5,2],[4,5,4]]],expected:[[1,4,5],[0,2,6]],public:!1},{seed:14893,index:5,input:[3,[[0,2,4],[1,2,4],[0,1,1]]],expected:[[2],[0,1]],public:!1}],descriptionMarkdown:`# Find Critical and Pseudo Critical Edges in Minimum Spanning Tree

You are given a connected, undirected, weighted graph with \`n\` vertices
numbered \`0\` to \`n - 1\`. Each entry \`edges[i] = [a, b, w]\` is an edge
between \`a\` and \`b\` with weight \`w\`; its identifier is its index \`i\`.

A minimum spanning tree (MST) is a set of \`n - 1\` edges that connects every
vertex and has the smallest possible total weight. A graph can have several
MSTs of the same total weight. Classify each edge:

- **Critical**: the edge belongs to every MST. Equivalently, deleting it
  either disconnects the graph or raises the minimum spanning weight.
- **Pseudo-critical**: the edge belongs to at least one MST but not to all
  of them.
- Edges in no MST belong to neither list.

Return \`[critical, pseudoCritical]\`, two lists of edge indices. The order of
the indices inside each list does not matter, but the critical list must
come first.

## Examples

\`\`\`
Input: n = 4, edges = [[0, 1, 2], [1, 2, 2], [2, 3, 1], [0, 2, 5], [1, 3, 2]]
Output: [[0, 2], [1, 4]]
Explanation: the minimum spanning weight is 5. Edge 2 (weight 1) and edge 0
(the only light edge touching vertex 0) are in every MST. Edges 1 and 4
both join vertex 1 to the {2, 3} pair, so each MST uses exactly one of
them. Edge 3 (weight 5) is never used.
\`\`\`

\`\`\`
Input: n = 3, edges = [[0, 1, 4], [1, 2, 4], [0, 2, 4]]
Output: [[], [0, 1, 2]]
Explanation: any two of the three equal edges form an MST.
\`\`\`

## Constraints

- \`2 <= n <= 100\`
- \`n - 1 <= edges.length <= min(200, n * (n - 1) / 2)\`
- \`0 <= a, b < n\`, \`a != b\`, and no unordered pair repeats.
- \`1 <= w <= 1000\`
- The graph is connected.

## Notes

Compute the MST weight once with Kruskal's algorithm. Then, for every edge,
rerun Kruskal without it (critical if the weight rises or the graph
disconnects) and, if it is not critical, rerun Kruskal with it forced in
first (pseudo-critical if the weight is unchanged).
`,checkerSrc:`// Each list is order-free, but the two lists must not be interchangeable,
// so the answer is compared list by list against a recomputed answer.
function mstWeight(n, edges, order, skip, force) {
  const parent = Array.from({ length: n }, (_, i) => i);
  const find = (x) => {
    while (parent[x] !== x) x = parent[x] = parent[parent[x]];
    return x;
  };
  let weight = 0;
  let joined = 0;
  if (force !== -1) {
    parent[find(edges[force][0])] = find(edges[force][1]);
    weight += edges[force][2];
    joined++;
  }
  for (const i of order) {
    if (i === skip || i === force) continue;
    const ra = find(edges[i][0]);
    const rb = find(edges[i][1]);
    if (ra === rb) continue;
    parent[ra] = rb;
    weight += edges[i][2];
    joined++;
  }
  return joined === n - 1 ? weight : Infinity;
}

function sameSet(actual, expected) {
  if (!Array.isArray(actual) || actual.length !== expected.length) return false;
  const a = [...actual].sort((x, y) => x - y);
  const e = [...expected].sort((x, y) => x - y);
  return a.every((v, i) => v === e[i]);
}

export function check(input, output) {
  const [n, edges] = input;
  if (!Array.isArray(output) || output.length !== 2) {
    return { ok: false, message: 'Expected [criticalIndices, pseudoCriticalIndices].' };
  }
  const order = edges.map((_, i) => i).sort((x, y) => edges[x][2] - edges[y][2]);
  const best = mstWeight(n, edges, order, -1, -1);
  const critical = [];
  const pseudo = [];
  for (let i = 0; i < edges.length; i++) {
    if (mstWeight(n, edges, order, i, -1) > best) critical.push(i);
    else if (mstWeight(n, edges, order, -1, i) === best) pseudo.push(i);
  }
  if (!sameSet(output[0], critical)) {
    return { ok: false, message: \`Critical edges should be [\${critical.join(', ')}] in some order.\` };
  }
  if (!sameSet(output[1], pseudo)) {
    return { ok: false, message: \`Pseudo-critical edges should be [\${pseudo.join(', ')}] in some order.\` };
  }
  return { ok: true };
}
`,checkerExportName:"check"}];export{e as default};
