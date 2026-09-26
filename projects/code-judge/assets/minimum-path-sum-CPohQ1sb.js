const e=[{slug:"minimum-path-sum",title:"Minimum Path Sum",difficulty:"Medium",tags:["dynamic-programming","array","matrix"],function:{name:"minPathSum",params:[{name:"grid",type:"number[][]"}],returns:"number"},compare:{mode:"exact"},limits:{timeMs:1e3},tests:[{input:[[[2,9,1],[3,4,8],[7,1,2]]],expected:12,public:!0},{input:[[[5,0,6,2]]],expected:13,public:!0},{input:[[[4]]],expected:4,public:!1},{input:[[[1],[2],[3]]],expected:6,public:!1},{input:[[[0,0],[0,0]]],expected:0,public:!1}],generated:{seeds:[6401,6402,6403],perSeed:5},variantId:"default",key:"minimum-path-sum:default",generatedTests:[{seed:6401,index:0,input:[[[8],[9],[18],[0],[6]]],expected:41,public:!1},{seed:6401,index:1,input:[[[15,11,0,11,3]]],expected:40,public:!1},{seed:6401,index:2,input:[[[2,15],[2,8],[15,4],[2,5],[9,6],[9,15]]],expected:42,public:!1},{seed:6401,index:3,input:[[[15],[0],[20],[6],[14],[16]]],expected:71,public:!1},{seed:6401,index:4,input:[[[15,1,8],[0,8,5]]],expected:28,public:!1},{seed:6402,index:0,input:[[[2,18],[2,9]]],expected:13,public:!1},{seed:6402,index:1,input:[[[5,4,1,7],[15,19,15,11],[14,19,3,15],[15,10,7,20],[7,18,18,20]]],expected:73,public:!1},{seed:6402,index:2,input:[[[3,1],[15,9],[17,10]]],expected:23,public:!1},{seed:6402,index:3,input:[[[2,1,12,2],[9,13,12,11],[14,4,1,17]]],expected:38,public:!1},{seed:6402,index:4,input:[[[4,16,6,11,12,19],[5,5,2,14,18,5]]],expected:53,public:!1},{seed:6403,index:0,input:[[[10,13,8,17,13]]],expected:61,public:!1},{seed:6403,index:1,input:[[[16],[17]]],expected:33,public:!1},{seed:6403,index:2,input:[[[1],[19],[3],[19],[10]]],expected:52,public:!1},{seed:6403,index:3,input:[[[20],[12],[15],[4]]],expected:51,public:!1},{seed:6403,index:4,input:[[[4,20],[19,8],[5,0],[9,4],[12,17],[9,0]]],expected:49,public:!1}],descriptionMarkdown:`# Minimum Path Sum

You are given an \`m x n\` grid \`grid\` of non-negative integers. A route starts
at the top-left cell \`(0, 0)\`, ends at the bottom-right cell
\`(m - 1, n - 1)\`, and each step moves one cell either down or right.

The cost of a route is the sum of the values of every cell it visits,
including the first and last cells. Return the smallest possible cost.

## Examples

\`\`\`
Input: grid = [[2, 9, 1],
               [3, 4, 8],
               [7, 1, 2]]
Output: 12
Explanation: the route 2 -> 3 -> 4 -> 1 -> 2 costs 12.
\`\`\`

\`\`\`
Input: grid = [[5, 0, 6, 2]]
Output: 13
\`\`\`

## Constraints

- \`1 <= m, n <= 50\`
- \`0 <= grid[i][j] <= 100\`
`}];export{e as default};
