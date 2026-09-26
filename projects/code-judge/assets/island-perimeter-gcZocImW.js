const e=[{slug:"island-perimeter",title:"Island Perimeter",difficulty:"Easy",tags:["array","matrix","depth-first-search","breadth-first-search"],function:{name:"islandPerimeter",params:[{name:"grid",type:"number[][]"}],returns:"number"},compare:{mode:"exact"},limits:{timeMs:1e3},tests:[{input:[[[0,1,1],[0,1,0],[0,0,0]]],expected:8,public:!0},{input:[[[1]]],expected:4,public:!0},{input:[[[1,1],[1,1]]],expected:8,public:!0},{input:[[[1,1,1,1]]],expected:10,public:!1},{input:[[[1,1,1],[1,0,1],[1,1,1]]],expected:16,public:!1},{input:[[[0,0,0],[0,1,0],[1,1,1],[0,1,0]]],public:!1,expected:12}],generated:{seeds:[1101,1102,1103],perSeed:5},variantId:"default",key:"island-perimeter:default",generatedTests:[{seed:1101,index:0,input:[[[0,1,1,1,1],[0,1,1,1,1]]],expected:12,public:!1},{seed:1101,index:1,input:[[[0,0],[1,1],[1,1]]],expected:8,public:!1},{seed:1101,index:2,input:[[[0,0,1,0,0]]],expected:4,public:!1},{seed:1101,index:3,input:[[[1,1],[0,1]]],expected:8,public:!1},{seed:1101,index:4,input:[[[0,1,1,1,1],[1,1,1,1,0],[1,1,0,1,1]]],expected:20,public:!1},{seed:1102,index:0,input:[[[0,0,1,1,1,1],[0,1,1,1,1,1]]],expected:14,public:!1},{seed:1102,index:1,input:[[[0,0,0,0,1],[0,0,0,0,1],[0,0,0,0,0],[0,0,0,0,0]]],expected:6,public:!1},{seed:1102,index:2,input:[[[0,0,0,0,1,0]]],expected:4,public:!1},{seed:1102,index:3,input:[[[0,1],[1,1],[1,1],[1,1],[1,1],[1,1]]],expected:16,public:!1},{seed:1102,index:4,input:[[[1,1,1,1,0],[1,1,1,1,0],[1,1,1,1,0],[1,1,1,1,0]]],expected:16,public:!1},{seed:1103,index:0,input:[[[1,0],[1,0],[0,0],[0,0]]],expected:6,public:!1},{seed:1103,index:1,input:[[[1,0],[1,0]]],expected:6,public:!1},{seed:1103,index:2,input:[[[1,1,1,0,0],[1,1,1,0,0]]],expected:10,public:!1},{seed:1103,index:3,input:[[[1,1,1,1,0]]],expected:10,public:!1},{seed:1103,index:4,input:[[[1,1],[1,1]]],expected:8,public:!1}],descriptionMarkdown:`# Island Perimeter

You are given a rectangular grid \`grid\` of type \`number[][]\`. Each cell is
\`1\` (land) or \`0\` (water). Every cell is a unit square. Two land cells are
connected when they share an edge (up, down, left, or right; diagonals do
not count).

The grid contains exactly one island: all land cells form a single
edge-connected group. The island may enclose water cells; such enclosed
water is not connected to the water outside the island.

Return the length of the island's boundary, counting every unit edge of a
land cell that borders either a water cell or the outside of the grid.
Edges shared by two land cells are not part of the boundary.

## Examples

\`\`\`
Input: grid = [[0, 1, 1],
               [0, 1, 0],
               [0, 0, 0]]
Output: 8
Explanation: three land cells contribute 12 edges, and the two shared
edges remove 4 of them.
\`\`\`

\`\`\`
Input: grid = [[1, 1, 1],
               [1, 0, 1],
               [1, 1, 1]]
Output: 16
Explanation: the 12 outer edges plus the 4 edges around the enclosed
water cell.
\`\`\`

## Constraints

- \`1 <= grid.length, grid[i].length <= 100\`
- Each \`grid[i][j]\` is \`0\` or \`1\`.
- Exactly one island exists.
`}];export{e as default};
