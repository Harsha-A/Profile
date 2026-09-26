const e=[{slug:"number-of-islands",title:"Number of Islands",difficulty:"Medium",tags:["array","matrix","depth-first-search","breadth-first-search","union-find"],function:{name:"numIslands",params:[{name:"grid",type:"string[][]"}],returns:"number"},compare:{mode:"exact"},limits:{timeMs:1e3},tests:[{input:[[["1","1","0","0"],["0","1","0","1"],["0","0","0","1"],["1","0","0","0"]]],expected:3,public:!0},{input:[[["1","0","1"],["0","1","0"],["1","0","1"]]],expected:5,public:!0},{input:[[["0"]]],expected:0,public:!0},{input:[[["1","1","1"],["1","0","1"],["1","1","1"]]],expected:1,public:!1},{input:[[["1","0","1","0","1"]]],expected:3,public:!1},{input:[[["1"],["1"],["0"],["1"]]],public:!1,expected:2}],generated:{seeds:[1401,1402,1403],perSeed:5},variantId:"default",key:"number-of-islands:default",generatedTests:[{seed:1401,index:0,input:[[["1"],["1"],["1"],["0"],["1"]]],expected:2,public:!1},{seed:1401,index:1,input:[[["1","0","0","0","1","0"]]],expected:2,public:!1},{seed:1401,index:2,input:[[["0","0","0"],["1","0","1"],["1","0","1"]]],expected:2,public:!1},{seed:1401,index:3,input:[[["1","1","1","1","0","1"],["0","0","0","1","0","1"],["1","0","1","0","1","0"],["1","1","1","0","1","1"],["0","0","1","1","0","0"],["0","0","1","0","0","0"]]],expected:4,public:!1},{seed:1401,index:4,input:[[["0"],["0"],["0"],["1"]]],expected:1,public:!1},{seed:1402,index:0,input:[[["1","1","0","0","1","1"],["0","1","1","0","0","0"]]],expected:2,public:!1},{seed:1402,index:1,input:[[["1","1","1","0","0"],["0","0","0","1","1"],["0","0","1","1","1"],["1","1","1","0","1"],["1","1","0","1","1"]]],expected:2,public:!1},{seed:1402,index:2,input:[[["1","0","1","0","0"],["0","0","0","1","0"],["0","0","1","1","0"],["1","0","0","0","0"]]],expected:4,public:!1},{seed:1402,index:3,input:[[["1","1","0","0","1"],["0","1","1","0","1"],["0","0","1","1","0"],["1","1","1","0","1"],["0","0","0","0","0"],["1","0","1","0","0"]]],expected:5,public:!1},{seed:1402,index:4,input:[[["1"],["0"]]],expected:1,public:!1},{seed:1403,index:0,input:[[["0","1"]]],expected:1,public:!1},{seed:1403,index:1,input:[[["1"],["0"],["1"],["1"],["1"],["1"]]],expected:2,public:!1},{seed:1403,index:2,input:[[["1","1","0","0","0"]]],expected:1,public:!1},{seed:1403,index:3,input:[[["0","0"]]],expected:0,public:!1},{seed:1403,index:4,input:[[["1"],["0"],["1"]]],expected:2,public:!1}],descriptionMarkdown:`# Number of Islands

You are given a rectangular grid \`grid\` of type \`string[][]\`. Each cell is
the one-character string \`"1"\` (land) or \`"0"\` (water).

Two land cells belong to the same island when you can walk from one to the
other by moving only between land cells that share an edge (up, down,
left, or right). Diagonal neighbours are not connected. Everything outside
the grid counts as water.

Return the number of islands, that is, the number of maximal
edge-connected groups of land cells.

## Examples

\`\`\`
Input: grid = [["1", "1", "0", "0"],
               ["0", "1", "0", "1"],
               ["0", "0", "0", "1"],
               ["1", "0", "0", "0"]]
Output: 3
Explanation: the top-left group of three cells, the two cells on the right
edge, and the single cell in the bottom-left corner.
\`\`\`

\`\`\`
Input: grid = [["1", "0", "1"],
               ["0", "1", "0"],
               ["1", "0", "1"]]
Output: 5
Explanation: cells that touch only at corners are separate islands.
\`\`\`

## Constraints

- \`1 <= grid.length, grid[i].length <= 300\`
- Each \`grid[i][j]\` is \`"0"\` or \`"1"\`.
`}];export{e as default};
