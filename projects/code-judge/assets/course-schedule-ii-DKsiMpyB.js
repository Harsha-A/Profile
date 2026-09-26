const e=[{slug:"course-schedule-ii",title:"Course Schedule II",difficulty:"Medium",tags:["graph","topological-sort","depth-first-search","breadth-first-search"],function:{name:"findOrder",params:[{name:"numCourses",type:"number"},{name:"prerequisites",type:"number[][]"}],returns:"number[]"},compare:{mode:"custom"},limits:{timeMs:1e3},tests:[{input:[4,[[1,0],[2,0],[3,1],[3,2]]],public:!0,expected:[0,1,2,3]},{input:[3,[[1,0],[2,1],[0,2]]],public:!0,expected:[]},{input:[1,[]],public:!0,expected:[0]},{input:[3,[]],public:!1,expected:[0,1,2]},{input:[2,[[1,1]]],public:!1,expected:[]},{input:[6,[[5,4],[4,3],[3,2],[2,1],[1,0]]],public:!1,expected:[0,1,2,3,4,5]}],generated:{seeds:[1201,1202,1203],perSeed:5},variantId:"default",key:"course-schedule-ii:default",generatedTests:[{seed:1201,index:0,input:[2,[[0,1],[1,0]]],expected:[],public:!1},{seed:1201,index:1,input:[1,[]],expected:[0],public:!1},{seed:1201,index:2,input:[7,[[5,1],[2,5],[4,1]]],expected:[0,1,3,6,5,4,2],public:!1},{seed:1201,index:3,input:[8,[[2,7],[0,4],[6,5],[3,2],[1,2],[2,6],[5,7],[4,3]]],expected:[7,5,6,2,3,1,4,0],public:!1},{seed:1201,index:4,input:[5,[[4,3],[3,4]]],expected:[],public:!1},{seed:1202,index:0,input:[7,[[5,1],[3,1],[5,3],[5,2],[0,2]]],expected:[1,2,4,6,3,0,5],public:!1},{seed:1202,index:1,input:[8,[[0,7],[7,3],[2,3],[4,3],[4,6]]],expected:[1,3,5,6,7,2,4,0],public:!1},{seed:1202,index:2,input:[6,[[2,3],[4,1],[3,2]]],expected:[],public:!1},{seed:1202,index:3,input:[8,[[3,5],[7,1],[7,5],[0,5],[1,0],[2,3],[6,5]]],expected:[4,5,3,0,6,2,1,7],public:!1},{seed:1202,index:4,input:[4,[[3,2]]],expected:[0,1,2,3],public:!1},{seed:1203,index:0,input:[4,[[1,3],[0,1],[3,1]]],expected:[],public:!1},{seed:1203,index:1,input:[3,[]],expected:[0,1,2],public:!1},{seed:1203,index:2,input:[8,[[1,5],[4,5],[4,1],[3,6]]],expected:[0,2,5,6,7,1,3,4],public:!1},{seed:1203,index:3,input:[6,[[3,4],[4,3],[0,2]]],expected:[],public:!1},{seed:1203,index:4,input:[5,[[2,3],[3,4],[3,2],[1,2],[4,1],[4,0]]],expected:[],public:!1}],descriptionMarkdown:"# Course Schedule II\n\nThere are `numCourses` nodes labelled `0` to `numCourses - 1`. Each pair\n`[a, b]` in `prerequisites` is a directed dependency: node `b` must appear\nbefore node `a`.\n\nReturn a topological order: an array containing every node exactly once in\nwhich, for every pair `[a, b]`, `b` appears earlier than `a`. If the\ndependencies contain a cycle, so that no such order exists, return an empty\narray `[]`.\n\n## Accepted answers\n\nA graph usually has many valid topological orders. Any array that is a\npermutation of `0 .. numCourses - 1` and respects every dependency is\naccepted; the judge verifies the order instead of comparing it with one\nfixed answer. When a cycle exists, only `[]` is accepted.\n\n## Examples\n\n```\nInput: numCourses = 4, prerequisites = [[1, 0], [2, 0], [3, 1], [3, 2]]\nOutput: [0, 2, 1, 3]\nExplanation: [0, 1, 2, 3] is equally valid.\n```\n\n```\nInput: numCourses = 3, prerequisites = [[1, 0], [2, 1], [0, 2]]\nOutput: []\nExplanation: 0 -> 1 -> 2 -> 0 is a cycle.\n```\n\n## Constraints\n\n- `1 <= numCourses <= 2000`\n- `0 <= prerequisites.length <= numCourses * (numCourses - 1)`\n- `prerequisites[i].length == 2`\n- `0 <= a, b < numCourses`\n- No pair appears twice. A pair with `a == b` is a cycle.\n",checkerSrc:`// Accepts any valid topological order; requires [] exactly when a cycle exists.
function hasOrder(n, pairs) {
  const indegree = new Array(n).fill(0);
  const adj = Array.from({ length: n }, () => []);
  for (const [a, b] of pairs) {
    adj[b].push(a);
    indegree[a] += 1;
  }
  const queue = [];
  for (let i = 0; i < n; i++) if (indegree[i] === 0) queue.push(i);
  for (let head = 0; head < queue.length; head++) {
    for (const next of adj[queue[head]]) {
      indegree[next] -= 1;
      if (indegree[next] === 0) queue.push(next);
    }
  }
  return queue.length === n;
}

export function check(input, output) {
  const [n, pairs] = input;
  if (!Array.isArray(output)) return { ok: false, message: 'Expected an array.' };
  if (!hasOrder(n, pairs)) {
    return output.length === 0
      ? { ok: true }
      : { ok: false, message: 'The dependencies contain a cycle; expected [].' };
  }
  if (output.length !== n) {
    return { ok: false, message: \`Expected \${n} nodes, got \${output.length}.\` };
  }
  const position = new Array(n).fill(-1);
  for (let i = 0; i < output.length; i++) {
    const v = output[i];
    if (!Number.isInteger(v) || v < 0 || v >= n) {
      return { ok: false, message: \`Invalid node \${JSON.stringify(v)} at index \${i}.\` };
    }
    if (position[v] !== -1) return { ok: false, message: \`Node \${v} appears more than once.\` };
    position[v] = i;
  }
  for (const [a, b] of pairs) {
    if (position[b] > position[a]) {
      return { ok: false, message: \`Node \${b} must appear before node \${a}.\` };
    }
  }
  return { ok: true };
}
`,checkerExportName:"check"}];export{e as default};
