const e=[{slug:"clone-graph",title:"Clone Graph",difficulty:"Medium",tags:["graph","hash-map","bfs","dfs"],function:{name:"cloneGraph",params:[{name:"node",type:"Node"}],returns:"Node",deepCopyOf:"arg:0"},compare:{mode:"exact"},limits:{timeMs:1e3},tests:[{input:[[[2,4],[1,3],[2,4],[1,3]]],expected:[[2,4],[1,3],[2,4],[1,3]],public:!0},{input:[[[2,3],[1],[1]]],expected:[[2,3],[1],[1]],public:!0},{input:[[]],expected:[],public:!0},{input:[[[]]],expected:[[]],public:!1},{input:[[[2],[1]]],expected:[[2],[1]],public:!1},{input:[[[2,3,4,5],[1,3],[1,2],[1,5],[1,4]]],public:!1,expected:[[2,3,4,5],[1,3],[1,2],[1,5],[1,4]]},{input:[[[2],[1,3],[2,4],[3,5],[4,6],[5]]],public:!1,expected:[[2],[1,3],[2,4],[3,5],[4,6],[5]]},{input:[[[3,2],[1,3],[2,1]]],public:!1,expected:[[3,2],[1,3],[2,1]]}],generated:{seeds:[1331,1332,1333],perSeed:5},variantId:"default",key:"clone-graph:default",generatedTests:[{seed:1331,index:0,input:[[[2,4,6],[1,3,5,6],[2,4],[3,1],[2,6],[2,1,5]]],expected:[[2,4,6],[1,3,5,6],[2,4],[3,1],[2,6],[2,1,5]],public:!1},{seed:1331,index:1,input:[[[2,3,4],[1,3],[1,2],[1]]],expected:[[2,3,4],[1,3],[1,2],[1]],public:!1},{seed:1331,index:2,input:[[[2],[1,3,4],[2,5],[2],[3,6],[5]]],expected:[[2],[1,3,4],[2,5],[2],[3,6],[5]],public:!1},{seed:1331,index:3,input:[[[2],[1]]],expected:[[2],[1]],public:!1},{seed:1331,index:4,input:[[[2],[1,3],[2,4],[3,5],[4]]],expected:[[2],[1,3],[2,4],[3,5],[4]],public:!1},{seed:1332,index:0,input:[[[2],[1,3],[2]]],expected:[[2],[1,3],[2]],public:!1},{seed:1332,index:1,input:[[[2,3,4],[1],[1],[1]]],expected:[[2,3,4],[1],[1],[1]],public:!1},{seed:1332,index:2,input:[[[2,3],[1,4,3],[1,2],[2]]],expected:[[2,3],[1,4,3],[1,2],[2]],public:!1},{seed:1332,index:3,input:[[[2],[1]]],expected:[[2],[1]],public:!1},{seed:1332,index:4,input:[[[2,4],[1,3],[2,4],[1,5,6,3],[4],[4]]],expected:[[2,4],[1,3],[2,4],[1,5,6,3],[4],[4]],public:!1},{seed:1333,index:0,input:[[[2,5],[1,3,4],[2],[2],[1,6],[5]]],expected:[[2,5],[1,3,4],[2],[2],[1,6],[5]],public:!1},{seed:1333,index:1,input:[[[2],[1]]],expected:[[2],[1]],public:!1},{seed:1333,index:2,input:[[[2],[1]]],expected:[[2],[1]],public:!1},{seed:1333,index:3,input:[[[2],[1]]],expected:[[2],[1]],public:!1},{seed:1333,index:4,input:[[[2,3,4,5],[1],[1],[1],[1]]],expected:[[2,3,4,5],[1],[1],[1],[1]],public:!1}],descriptionMarkdown:`# Clone Graph

You receive a reference to one node of a connected, undirected graph, or
\`null\` when the graph is empty. Each node has an integer \`val\` and an array
\`neighbors\` of the nodes it is joined to. Build and return a **deep copy** of
the whole graph: a brand-new set of nodes with the same values and the same
connections, starting from the copy of the node you were given.

The returned graph must contain **no node object from the input**. Returning
the original node, or reusing any original node anywhere in the copy, is
judged Wrong Answer even if the structure looks correct.

Create nodes with the provided global constructor, \`new Node(val)\`, whose
\`neighbors\` array starts empty. Do not import or declare \`Node\` yourself.

## Graph format

Tests describe a graph as an adjacency list: entry \`i\` lists the values of
the neighbours of the node whose value is \`i + 1\`. The function receives the
node with value \`1\`. The judge serialises your returned graph the same way,
and compares it exactly, so each copied node should list its neighbours in
the same order as the original.

- The graph is **connected**: every node is reachable from the node passed in.
- Node values are exactly \`1..n\`, each used once.
- Edges are undirected: if node \`a\` lists \`b\`, then \`b\` lists \`a\`. There are
  no self-loops and no repeated edges.

## Examples

\`\`\`
Input: adjacency = [[2, 3], [1], [1]]
Output: [[2, 3], [1], [1]]
Explanation: node 1 is joined to nodes 2 and 3; the copy has the same shape
but is made of three new node objects.
\`\`\`

\`\`\`
Input: adjacency = [[]]
Output: [[]]
Explanation: a single node with no neighbours; return a new node with value 1.
\`\`\`

An empty graph (\`[]\`) is passed as \`null\`; return \`null\`.

## Constraints

- \`0 <= n <= 100\`
- \`1 <= Node.val <= n\`, all values distinct
- The graph is connected, undirected, and has no self-loops or repeated edges.

## Notes

Keep a map from each original node to its copy. Traverse with BFS or DFS;
when you meet a neighbour that has no copy yet, create one and schedule it
for processing, then append the neighbour's copy to the current copy's list.
`}];export{e as default};
