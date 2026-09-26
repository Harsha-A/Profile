const e=[{slug:"rotting-oranges",title:"Rotting Oranges",difficulty:"Medium",tags:["array","matrix","breadth-first-search"],function:{name:"orangesRotting",params:[{name:"grid",type:"number[][]"}],returns:"number"},compare:{mode:"exact"},limits:{timeMs:1e3},tests:[{input:[[[2,1,0],[0,1,1],[1,0,1]]],expected:-1,public:!0},{input:[[[2,1,1],[0,0,1],[1,1,1]]],expected:6,public:!0},{input:[[[0,0],[0,0]]],expected:0,public:!0},{input:[[[2,2],[2,0]]],expected:0,public:!1},{input:[[[1]]],expected:-1,public:!1},{input:[[[1,1,2,1,1]]],expected:2,public:!1},{input:[[[2,1,1,1],[1,1,0,1],[0,1,1,2]]],public:!1,expected:2}],generated:{seeds:[1701,1702,1703],perSeed:5},variantId:"default",key:"rotting-oranges:default",generatedTests:[{seed:1701,index:0,input:[[[1,1,0,0,0,1],[0,1,1,1,0,0],[1,1,2,1,1,0],[1,0,0,1,0,1],[1,1,1,1,0,1],[1,1,2,0,1,2]]],expected:-1,public:!1},{seed:1701,index:1,input:[[[1,1,1],[1,1,1],[1,1,1]]],expected:-1,public:!1},{seed:1701,index:2,input:[[[1,1,1],[2,0,0],[1,2,1],[1,1,1]]],expected:3,public:!1},{seed:1701,index:3,input:[[[2,1,2,2],[1,0,1,1],[1,1,0,1]]],expected:3,public:!1},{seed:1701,index:4,input:[[[0,1,0,0,1,1],[1,1,1,1,1,1],[0,1,2,1,0,1]]],expected:5,public:!1},{seed:1702,index:0,input:[[[1,1,2,1,1,2],[1,1,1,1,0,1],[2,1,2,1,2,2],[1,1,0,2,1,0]]],expected:2,public:!1},{seed:1702,index:1,input:[[[1,1,1]]],expected:-1,public:!1},{seed:1702,index:2,input:[[[0,1,1,1,1,1],[1,1,1,2,0,2],[0,0,1,0,1,2],[1,1,1,0,1,1],[1,1,1,1,2,1],[1,1,1,1,1,0]]],expected:5,public:!1},{seed:1702,index:3,input:[[[1,1],[1,1],[2,1]]],expected:3,public:!1},{seed:1702,index:4,input:[[[1,0,1,0,1,0],[1,1,1,2,1,0],[1,1,0,1,1,1],[0,1,1,1,1,1]]],expected:4,public:!1},{seed:1703,index:0,input:[[[2,1,2,1],[1,1,1,1],[0,1,0,0]]],expected:3,public:!1},{seed:1703,index:1,input:[[[0,1,0,1,1,1],[0,1,2,1,1,2],[1,0,1,1,2,1],[1,1,1,1,0,1],[1,1,1,1,0,1],[1,2,1,1,1,0]]],expected:4,public:!1},{seed:1703,index:2,input:[[[1,2,0,1],[2,1,1,1],[1,1,1,2],[1,1,1,0]]],expected:3,public:!1},{seed:1703,index:3,input:[[[1,0],[1,1],[1,0],[0,1],[1,1]]],expected:-1,public:!1},{seed:1703,index:4,input:[[[1,1,2,0],[2,2,1,1],[1,2,1,1]]],expected:2,public:!1}],descriptionMarkdown:`# Rotting Oranges

You are given a rectangular grid \`grid\` of type \`number[][]\`. Each cell
holds one of three values:

- \`0\`: an empty cell.
- \`1\`: a healthy item.
- \`2\`: an infected item.

The grid changes in discrete rounds. In each round, every healthy item that
shares an edge (up, down, left, or right) with an item that was infected at
the start of that round becomes infected. Diagonal neighbours do not
spread infection, and empty cells do not pass it on.

Return the number of rounds needed until no healthy item remains. If there
are no healthy items at the start, return \`0\`. If some healthy item can
never become infected, return \`-1\`.

## Examples

\`\`\`
Input: grid = [[2, 1, 1],
               [0, 0, 1],
               [1, 1, 1]]
Output: 6
Explanation: infection travels along the top row, down the right column,
and back along the bottom row, one cell per round.
\`\`\`

\`\`\`
Input: grid = [[2, 1, 0],
               [0, 1, 1],
               [1, 0, 1]]
Output: -1
Explanation: the healthy item in the bottom-left corner has no healthy or
infected neighbour, so it is never reached.
\`\`\`

## Constraints

- \`1 <= grid.length, grid[i].length <= 10\`
- Each \`grid[i][j]\` is \`0\`, \`1\`, or \`2\`.
`}];export{e as default};
