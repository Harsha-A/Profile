const e=[{slug:"swim-in-rising-water",title:"Swim In Rising Water",difficulty:"Hard",tags:["graph","matrix","heap","dijkstra","binary-search","union-find"],function:{name:"swimInWater",params:[{name:"grid",type:"number[][]"}],returns:"number"},compare:{mode:"exact"},limits:{timeMs:1e3},tests:[{input:[[[0,3],[1,2]]],expected:2,public:!0},{input:[[[0,8,2],[7,1,3],[6,5,4]]],expected:7,public:!0},{input:[[[0]]],expected:0,public:!0},{input:[[[3,2],[1,0]]],expected:3,public:!1},{input:[[[0,1,2],[7,8,3],[6,5,4]]],expected:4,public:!1},{input:[[[0,1,2,3,4],[24,23,22,21,5],[12,13,14,15,16],[11,17,18,19,20],[10,9,8,7,6]]],public:!1,expected:16}],generated:{seeds:[7781,7782,7783],perSeed:5},variantId:"default",key:"swim-in-rising-water:default",generatedTests:[{seed:7781,index:0,input:[[[3,4,2],[7,0,5],[8,1,6]]],expected:6,public:!1},{seed:7781,index:1,input:[[[6,2,1,4],[15,12,10,13],[9,5,11,14],[8,0,3,7]]],expected:11,public:!1},{seed:7781,index:2,input:[[[4,1,7],[6,8,3],[2,5,0]]],expected:6,public:!1},{seed:7781,index:3,input:[[[11,4,9,10],[0,15,6,12],[8,14,1,2],[3,13,7,5]]],expected:11,public:!1},{seed:7781,index:4,input:[[[2,1],[3,0]]],expected:2,public:!1},{seed:7782,index:0,input:[[[13,9,2,5],[12,14,7,6],[11,4,15,3],[0,10,8,1]]],expected:13,public:!1},{seed:7782,index:1,input:[[[0]]],expected:0,public:!1},{seed:7782,index:2,input:[[[0]]],expected:0,public:!1},{seed:7782,index:3,input:[[[4,1,5],[8,7,3],[0,2,6]]],expected:6,public:!1},{seed:7782,index:4,input:[[[22,0,16,10,14],[5,12,15,24,6],[18,9,7,21,11],[20,3,23,2,17],[19,13,8,4,1]]],expected:22,public:!1},{seed:7783,index:0,input:[[[29,18,2,26,32,0],[34,17,9,31,21,7],[3,27,16,19,30,23],[10,14,1,11,24,28],[6,33,4,8,22,13],[15,12,20,35,5,25]]],expected:29,public:!1},{seed:7783,index:1,input:[[[0,3],[1,2]]],expected:2,public:!1},{seed:7783,index:2,input:[[[19,9,22,7,3],[15,17,6,4,23],[0,8,5,10,16],[1,13,20,2,24],[18,11,21,14,12]]],expected:19,public:!1},{seed:7783,index:3,input:[[[7,6,8],[5,4,2],[0,1,3]]],expected:7,public:!1},{seed:7783,index:4,input:[[[3,0,18,13,10],[11,2,6,7,21],[19,1,8,24,12],[16,5,22,14,20],[4,17,15,9,23]]],expected:23,public:!1}],descriptionMarkdown:`# Swim In Rising Water

You are given an \`n x n\` grid whose cells hold the integers \`0\` through
\`n^2 - 1\`, each exactly once. A path runs from the top-left cell \`(0, 0)\` to
the bottom-right cell \`(n - 1, n - 1)\`, moving between cells that share an
edge. The cost of a path is the largest value of any cell on it, including
both endpoints.

Return the smallest cost over all such paths. Equivalently: if a cell
becomes passable at time \`t\` once \`t\` is at least its value, return the
earliest time at which the two corners are connected by passable cells.

## Examples

\`\`\`
Input: grid = [[0, 3], [1, 2]]
Output: 2
Explanation: the path 0 -> 1 -> 2 never touches a value above 2, while the
only other path passes through 3.
\`\`\`

\`\`\`
Input: grid = [[0, 8, 2], [7, 1, 3], [6, 5, 4]]
Output: 7
Explanation: leaving the top-left cell requires entering either 8 or 7.
After 7, the path 7 -> 1 -> 3 -> 4 (or 7 -> 6 -> 5 -> 4) stays below 7.
\`\`\`

## Constraints

- \`1 <= n <= 50\`
- The values of \`grid\` are a permutation of \`0 .. n^2 - 1\`.

## Notes

Dijkstra's algorithm where a cell's key is the maximum value seen on the
best path to it solves this in \`O(n^2 log n)\`. Binary search on the answer
with a flood fill, or union-find over cells in increasing value order, also
work.
`}];export{e as default};
