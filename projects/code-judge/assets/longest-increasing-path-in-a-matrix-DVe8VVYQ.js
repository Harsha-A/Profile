const e=[{slug:"longest-increasing-path-in-a-matrix",title:"Longest Increasing Path In a Matrix",difficulty:"Hard",tags:["matrix","dynamic-programming","depth-first-search","memoization"],function:{name:"longestIncreasingPath",params:[{name:"matrix",type:"number[][]"}],returns:"number"},compare:{mode:"exact"},limits:{timeMs:1e3},tests:[{input:[[[1,2,3],[8,9,4],[7,6,5]]],expected:9,public:!0},{input:[[[5,5],[5,5]]],expected:1,public:!0},{input:[[[42]]],expected:1,public:!1},{input:[[[1,3,2,4]]],expected:2,public:!1},{input:[[[4,1],[3,2]]],expected:4,public:!1},{input:[[[0,7,2],[1,6,3],[9,5,4]]],public:!1,expected:6}],generated:{seeds:[3291,3292,3293],perSeed:5},variantId:"default",key:"longest-increasing-path-in-a-matrix:default",generatedTests:[{seed:3291,index:0,input:[[[9,1,6,8,7],[3,7,11,11,0],[8,2,2,6,7],[1,2,4,2,7]]],expected:4,public:!1},{seed:3291,index:1,input:[[[4,2,1,0,3],[3,0,3,4,0],[4,2,1,2,3]]],expected:4,public:!1},{seed:3291,index:2,input:[[[15,11,0]]],expected:3,public:!1},{seed:3291,index:3,input:[[[14,4],[5,10]]],expected:2,public:!1},{seed:3291,index:4,input:[[[17,13,2,16],[15,5,14,7]]],expected:3,public:!1},{seed:3292,index:0,input:[[[2,4,3,5,3]]],expected:2,public:!1},{seed:3292,index:1,input:[[[15,7,5],[9,16,16],[15,5,16],[1,11,13],[13,15,9]]],expected:4,public:!1},{seed:3292,index:2,input:[[[8],[13]]],expected:2,public:!1},{seed:3292,index:3,input:[[[7,14,7,4],[4,6,13,13],[9,2,14,2],[14,15,15,3],[3,15,6,17]]],expected:5,public:!1},{seed:3292,index:4,input:[[[11],[18]]],expected:2,public:!1},{seed:3293,index:0,input:[[[3],[6],[0]]],expected:2,public:!1},{seed:3293,index:1,input:[[[4,13],[11,13]]],expected:3,public:!1},{seed:3293,index:2,input:[[[4,0,13,5,7],[5,1,1,4,8],[8,13,12,5,6]]],expected:5,public:!1},{seed:3293,index:3,input:[[[12,5,1,9],[9,0,10,2],[6,2,15,9],[11,6,7,9]]],expected:5,public:!1},{seed:3293,index:4,input:[[[1,1,6],[0,3,4],[5,6,6],[3,4,2],[5,1,1]]],expected:4,public:!1}],descriptionMarkdown:`# Longest Increasing Path In a Matrix

You are given an \`m x n\` grid of integers \`matrix\`. A path is a sequence of
cells in which each consecutive pair of cells shares an edge (up, down, left,
or right; no diagonal moves and no wrapping around the border). A path is
**strictly increasing** if every cell's value is strictly greater than the
value of the cell before it.

Return the number of cells in the longest strictly increasing path in the
grid. A single cell on its own is a path of length \`1\`.

## Examples

\`\`\`
Input: matrix = [[1, 2, 3],
                 [8, 9, 4],
                 [7, 6, 5]]
Output: 9
Explanation: 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7 -> 8 -> 9 spirals through every cell.
\`\`\`

\`\`\`
Input: matrix = [[5, 5],
                 [5, 5]]
Output: 1
Explanation: equal neighbours do not count as increasing.
\`\`\`

## Constraints

- \`1 <= m, n <= 200\`
- \`0 <= matrix[i][j] <= 2^31 - 1\`

## Notes

Because values strictly increase along a path, no path can revisit a cell, so
the length of the best path starting at each cell can be memoized with a
depth-first search.
`}];export{e as default};
