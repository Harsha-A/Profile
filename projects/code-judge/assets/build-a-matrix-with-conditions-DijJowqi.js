const e=[{slug:"build-a-matrix-with-conditions",title:"Build a Matrix With Conditions",difficulty:"Hard",tags:["graph","topological-sort","matrix"],function:{name:"buildMatrix",params:[{name:"k",type:"number"},{name:"rowConditions",type:"number[][]"},{name:"colConditions",type:"number[][]"}],returns:"number[][]"},compare:{mode:"custom"},limits:{timeMs:1e3},tests:[{input:[3,[[1,2],[3,2]],[[2,1],[3,2]]],public:!0,expected:[[0,0,1],[3,0,0],[0,2,0]]},{input:[2,[[1,2],[2,1]],[]],public:!0,expected:[]},{input:[1,[],[]],public:!0,expected:[[1]]},{input:[4,[[1,2],[2,3],[3,4]],[[4,3],[3,2],[2,1]]],public:!1,expected:[[0,0,0,1],[0,0,2,0],[0,3,0,0],[4,0,0,0]]},{input:[3,[[1,2],[1,2],[2,3]],[[1,3],[3,1]]],public:!1,expected:[]},{input:[5,[],[]],public:!1,expected:[[1,0,0,0,0],[0,2,0,0,0],[0,0,3,0,0],[0,0,0,4,0],[0,0,0,0,5]]}],generated:{seeds:[23921,23922,23923],perSeed:6},variantId:"default",key:"build-a-matrix-with-conditions:default",generatedTests:[{seed:23921,index:0,input:[4,[[1,3],[2,1]],[[4,1],[4,2],[4,2]]],expected:[[0,0,0,2],[0,4,0,0],[0,0,1,0],[3,0,0,0]],public:!1},{seed:23921,index:1,input:[6,[[2,6]],[[6,3],[1,3]]],expected:[[1,0,0,0,0,0],[0,2,0,0,0,0],[0,0,0,0,0,3],[0,0,4,0,0,0],[0,0,0,5,0,0],[0,0,0,0,6,0]],public:!1},{seed:23921,index:2,input:[3,[[3,1],[3,1]],[[3,2],[2,1],[2,1],[3,2],[2,1]]],expected:[[0,2,0],[3,0,0],[0,0,1]],public:!1},{seed:23921,index:3,input:[5,[[5,4],[1,4],[2,4],[2,3],[5,4],[2,3]],[[4,5],[1,2],[3,4],[3,1]]],expected:[[0,0,1,0,0],[0,0,0,0,2],[0,0,0,5,0],[3,0,0,0,0],[0,4,0,0,0]],public:!1},{seed:23921,index:4,input:[5,[[5,2],[5,2]],[[3,1]]],expected:[[0,0,0,0,1],[0,3,0,0,0],[0,0,4,0,0],[0,0,0,5,0],[2,0,0,0,0]],public:!1},{seed:23921,index:5,input:[3,[[3,1]],[]],expected:[[0,2,0],[0,0,3],[1,0,0]],public:!1},{seed:23922,index:0,input:[4,[[4,1]],[[4,2],[3,1],[3,1],[4,1],[2,3]]],expected:[[0,2,0,0],[0,0,3,0],[4,0,0,0],[0,0,0,1]],public:!1},{seed:23922,index:1,input:[2,[],[[1,2],[2,1]]],expected:[],public:!1},{seed:23922,index:2,input:[5,[],[[2,5],[2,5],[2,1]]],expected:[[0,0,0,0,1],[2,0,0,0,0],[0,3,0,0,0],[0,0,4,0,0],[0,0,0,5,0]],public:!1},{seed:23922,index:3,input:[5,[[3,1],[5,2],[5,3],[5,3],[5,2]],[[1,2],[5,4],[4,2]]],expected:[[0,0,0,4,0],[0,0,5,0,0],[0,3,0,0,0],[0,0,0,0,2],[1,0,0,0,0]],public:!1},{seed:23922,index:4,input:[2,[[1,2],[1,2]],[]],expected:[[1,0],[0,2]],public:!1},{seed:23922,index:5,input:[2,[[2,1]],[[1,2],[1,2],[2,1]]],expected:[],public:!1},{seed:23923,index:0,input:[6,[[3,2],[3,1],[5,1],[6,3],[6,5],[3,2],[3,4],[2,1]],[[4,2],[5,2],[5,4],[4,2],[6,3],[3,2],[1,6],[5,2],[1,6]]],expected:[[0,0,6,0,0,0],[0,0,0,0,3,0],[0,5,0,0,0,0],[0,0,0,0,0,2],[0,0,0,4,0,0],[1,0,0,0,0,0]],public:!1},{seed:23923,index:1,input:[5,[[3,5],[4,2],[4,5],[1,3],[4,5],[5,1]],[]],expected:[],public:!1},{seed:23923,index:2,input:[4,[[2,3],[4,2],[2,3],[2,1],[1,2]],[[2,3]]],expected:[],public:!1},{seed:23923,index:3,input:[4,[],[[1,2],[4,2]]],expected:[[1,0,0,0],[0,0,0,2],[0,3,0,0],[0,0,4,0]],public:!1},{seed:23923,index:4,input:[6,[[1,4],[2,6],[1,6],[5,1],[2,5],[3,1]],[[2,1],[3,2],[6,5],[3,5],[5,2],[5,6],[1,4],[5,4]]],expected:[],public:!1},{seed:23923,index:5,input:[4,[[4,3],[2,1],[4,3]],[[2,1],[4,1],[1,3],[1,3]]],expected:[[2,0,0,0],[0,4,0,0],[0,0,1,0],[0,0,0,3]],public:!1}],descriptionMarkdown:"# Build a Matrix With Conditions\n\nYou are given a positive integer `k` and two lists of ordered pairs,\n`rowConditions` and `colConditions`, each pair `[a, b]` using values from\n`1` to `k`.\n\nBuild a `k x k` matrix that contains each of the integers `1` through `k`\nexactly once, with every other cell equal to `0`, such that:\n\n- for every `[a, b]` in `rowConditions`, the row holding `a` is strictly\n  above (has a smaller index than) the row holding `b`;\n- for every `[a, b]` in `colConditions`, the column holding `a` is strictly\n  to the left of (has a smaller index than) the column holding `b`.\n\nReturn any matrix that satisfies all conditions. If no such matrix exists,\nreturn the empty array `[]`.\n\nUsually many matrices are valid, so any correct one is accepted; the judge\nchecks the shape, the placement of `1..k`, the zeros, and every condition.\n\n## Examples\n\n```\nInput: k = 3, rowConditions = [[1, 2], [3, 2]], colConditions = [[2, 1], [3, 2]]\nOutput: [[0, 0, 1], [3, 0, 0], [0, 2, 0]]\nExplanation: rows: 1 (row 0) and 3 (row 1) are both above 2 (row 2).\nColumns: 3 (column 0) is left of 2 (column 1), which is left of 1\n(column 2). Other matrices, such as [[3, 0, 0], [0, 0, 1], [0, 2, 0]], are\nalso valid.\n```\n\n```\nInput: k = 2, rowConditions = [[1, 2], [2, 1]], colConditions = []\nOutput: []\nExplanation: 1 cannot be both above and below 2.\n```\n\n## Constraints\n\n- `1 <= k <= 400`\n- `0 <= rowConditions.length, colConditions.length <= 10^4`\n- Each pair `[a, b]` has `1 <= a, b <= k` and `a != b`. Pairs may repeat.\n\n## Notes\n\nRows and columns are independent. Topologically sort `1..k` under the row\nconditions to choose each value's row, do the same under the column\nconditions to choose its column, and return `[]` if either graph has a\ncycle.\n",checkerSrc:`// Many matrices can be valid, so the answer is checked structurally.
function acyclic(k, conditions) {
  const adj = Array.from({ length: k + 1 }, () => []);
  const indeg = new Array(k + 1).fill(0);
  for (const [a, b] of conditions) {
    adj[a].push(b);
    indeg[b]++;
  }
  const queue = [];
  for (let v = 1; v <= k; v++) if (indeg[v] === 0) queue.push(v);
  let seen = 0;
  for (let head = 0; head < queue.length; head++) {
    seen++;
    for (const v of adj[queue[head]]) {
      indeg[v]--;
      if (indeg[v] === 0) queue.push(v);
    }
  }
  return seen === k;
}

export function check(input, output) {
  const [k, rowConditions, colConditions] = input;
  if (!Array.isArray(output)) return { ok: false, message: 'Expected an array.' };
  if (!acyclic(k, rowConditions) || !acyclic(k, colConditions)) {
    return output.length === 0
      ? { ok: true }
      : { ok: false, message: 'The conditions contain a cycle, so the answer must be [].' };
  }
  if (output.length !== k) return { ok: false, message: \`Expected \${k} rows, got \${output.length}.\` };
  const rowOf = new Array(k + 1).fill(-1);
  const colOf = new Array(k + 1).fill(-1);
  for (let r = 0; r < k; r++) {
    const row = output[r];
    if (!Array.isArray(row) || row.length !== k) {
      return { ok: false, message: \`Row \${r} must have exactly \${k} entries.\` };
    }
    for (let c = 0; c < k; c++) {
      const v = row[c];
      if (v === 0) continue;
      if (!Number.isInteger(v) || v < 1 || v > k) {
        return { ok: false, message: \`Cell (\${r}, \${c}) holds \${v}, which is not 0 or in 1..\${k}.\` };
      }
      if (rowOf[v] !== -1) return { ok: false, message: \`Value \${v} appears more than once.\` };
      rowOf[v] = r;
      colOf[v] = c;
    }
  }
  for (let v = 1; v <= k; v++) {
    if (rowOf[v] === -1) return { ok: false, message: \`Value \${v} is missing.\` };
  }
  for (const [a, b] of rowConditions) {
    if (rowOf[a] >= rowOf[b]) return { ok: false, message: \`\${a} must be in a row above \${b}.\` };
  }
  for (const [a, b] of colConditions) {
    if (colOf[a] >= colOf[b]) return { ok: false, message: \`\${a} must be in a column left of \${b}.\` };
  }
  return { ok: true };
}
`,checkerExportName:"check"}];export{e as default};
