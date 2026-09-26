const e=[{slug:"max-area-of-island",title:"Max Area of Island",difficulty:"Medium",tags:["array","matrix","depth-first-search","breadth-first-search","union-find"],function:{name:"maxAreaOfIsland",params:[{name:"grid",type:"number[][]"}],returns:"number"},compare:{mode:"exact"},limits:{timeMs:1e3},tests:[{input:[[[1,1,0,0],[0,1,0,1],[0,0,0,1],[1,0,0,0]]],expected:3,public:!0},{input:[[[0,0],[0,0]]],expected:0,public:!0},{input:[[[1,0,1],[0,1,0],[1,0,1]]],expected:1,public:!0},{input:[[[1,1,1],[1,0,1],[1,1,1]]],expected:8,public:!1},{input:[[[1,1,0,1,1,1]]],expected:3,public:!1},{input:[[[0,1,1,0],[1,1,0,0],[0,0,1,1],[1,0,1,1]]],public:!1,expected:4}],generated:{seeds:[1501,1502,1503],perSeed:5},variantId:"default",key:"max-area-of-island:default",generatedTests:[{seed:1501,index:0,input:[[[1]]],expected:1,public:!1},{seed:1501,index:1,input:[[[0,1,0],[1,1,1]]],expected:4,public:!1},{seed:1501,index:2,input:[[[0],[0],[0],[0],[0]]],expected:0,public:!1},{seed:1501,index:3,input:[[[1,0,1,1,1,0]]],expected:3,public:!1},{seed:1501,index:4,input:[[[1,0,0,1,0,0],[1,0,0,0,1,1],[0,1,0,1,1,0],[0,1,1,1,0,0],[0,0,0,0,0,0],[0,0,1,0,0,0]]],expected:8,public:!1},{seed:1502,index:0,input:[[[0,1,0,0,1,0]]],expected:1,public:!1},{seed:1502,index:1,input:[[[1],[1],[1],[1],[1]]],expected:5,public:!1},{seed:1502,index:2,input:[[[1,1,0,0],[0,1,1,0],[1,1,1,0]]],expected:7,public:!1},{seed:1502,index:3,input:[[[0,0]]],expected:0,public:!1},{seed:1502,index:4,input:[[[1,1,0,1],[1,0,1,0],[1,1,1,1]]],expected:8,public:!1},{seed:1503,index:0,input:[[[1,1,0,0],[0,0,0,1],[0,0,0,0],[0,0,0,0],[1,0,1,1]]],expected:2,public:!1},{seed:1503,index:1,input:[[[1,0,1,0],[0,0,1,1],[1,1,1,0],[0,0,1,0]]],expected:7,public:!1},{seed:1503,index:2,input:[[[1],[1],[1],[1],[1],[1]]],expected:6,public:!1},{seed:1503,index:3,input:[[[1,1],[0,1],[0,1]]],expected:4,public:!1},{seed:1503,index:4,input:[[[0,1,0,0,0,0],[0,1,0,1,1,1],[0,1,0,1,1,0],[0,0,1,1,0,0],[0,0,0,1,1,0],[1,0,1,0,0,0]]],expected:9,public:!1}],descriptionMarkdown:`# Max Area of Island

You are given a rectangular grid \`grid\` of type \`number[][]\`. Each cell is
\`1\` (land) or \`0\` (water).

An island is a maximal group of land cells in which every cell can be
reached from every other by moving between land cells that share an edge
(up, down, left, or right). Diagonal neighbours are not connected. The area
of an island is the number of cells it contains.

Return the largest area among all islands, or \`0\` if the grid has no land.

## Examples

\`\`\`
Input: grid = [[1, 1, 0, 0],
               [0, 1, 0, 1],
               [0, 0, 0, 1],
               [1, 0, 0, 0]]
Output: 3
Explanation: the islands have areas 3, 2 and 1.
\`\`\`

\`\`\`
Input: grid = [[1, 1, 1],
               [1, 0, 1],
               [1, 1, 1]]
Output: 8
Explanation: the ring of eight land cells is one island.
\`\`\`

## Constraints

- \`1 <= grid.length, grid[i].length <= 50\`
- Each \`grid[i][j]\` is \`0\` or \`1\`.
`}];export{e as default};
