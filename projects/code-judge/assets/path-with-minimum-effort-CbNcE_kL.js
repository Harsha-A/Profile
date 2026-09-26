const e=[{slug:"path-with-minimum-effort",title:"Path with Minimum Effort",difficulty:"Medium",tags:["graph","matrix","heap","dijkstra","binary-search","union-find"],function:{name:"minimumEffortPath",params:[{name:"heights",type:"number[][]"}],returns:"number"},compare:{mode:"exact"},limits:{timeMs:1e3},tests:[{input:[[[1,3,8],[2,9,7],[4,5,6]]],expected:2,public:!0},{input:[[[7]]],expected:0,public:!0},{input:[[[1,10,1,1],[1,10,1,10],[1,1,1,10]]],public:!0,expected:9},{input:[[[1,100]]],expected:99,public:!1},{input:[[[5],[3],[8],[8]]],expected:5,public:!1},{input:[[[4,9,5],[6,8,2],[5,7,3]]],expected:4,public:!1},{input:[[[1,2,3,4,5],[9,9,9,9,6],[1,1,1,9,7]]],public:!1,expected:1}],generated:{seeds:[16311,16312,16313],perSeed:5},variantId:"default",key:"path-with-minimum-effort:default",generatedTests:[{seed:16311,index:0,input:[[[7,14,10,20]]],expected:10,public:!1},{seed:16311,index:1,input:[[[17],[5],[8],[11],[19]]],expected:12,public:!1},{seed:16311,index:2,input:[[[1],[12],[14]]],expected:11,public:!1},{seed:16311,index:3,input:[[[3,8,7]]],expected:5,public:!1},{seed:16311,index:4,input:[[[18],[12],[3],[19]]],expected:16,public:!1},{seed:16312,index:0,input:[[[16,1,16,19,6,10],[3,12,14,17,6,16],[2,4,11,8,1,13],[19,7,16,17,5,19],[19,7,6,8,15,4]]],expected:13,public:!1},{seed:16312,index:1,input:[[[18,11,15],[19,10,19],[4,8,2],[4,18,14],[8,12,17]]],expected:7,public:!1},{seed:16312,index:2,input:[[[9,7,9,16,9],[2,9,3,3,4],[1,6,5,5,6],[14,4,11,8,1],[18,6,3,8,10],[6,9,9,2,1]]],expected:6,public:!1},{seed:16312,index:3,input:[[[6,4,7]]],expected:3,public:!1},{seed:16312,index:4,input:[[[2,15,4,2,4,14],[4,5,3,15,16,2],[8,16,17,16,15,19]]],expected:8,public:!1},{seed:16313,index:0,input:[[[2,3,19],[16,5,11],[5,6,1],[15,6,4],[8,15,9],[11,14,6]]],expected:5,public:!1},{seed:16313,index:1,input:[[[10,3],[6,18],[6,18],[14,9]]],expected:8,public:!1},{seed:16313,index:2,input:[[[7,12,9,11],[3,10,17,7],[2,10,10,19],[9,7,4,7]]],expected:5,public:!1},{seed:16313,index:3,input:[[[5,11],[2,20],[8,9],[20,1],[6,4],[2,16]]],expected:12,public:!1},{seed:16313,index:4,input:[[[19],[14]]],expected:5,public:!1}],descriptionMarkdown:`# Path with Minimum Effort

You are given a grid \`heights\` of \`rows x cols\` integers. A path starts at
the top-left cell \`(0, 0)\`, ends at the bottom-right cell
\`(rows - 1, cols - 1)\`, and moves one step at a time to a cell that shares
an edge with the current one (up, down, left, or right). Cells may be
revisited.

The cost of a single step is the absolute difference between the values of
the two cells it connects. The effort of a path is the largest step cost
along it. Return the smallest effort over all possible paths. A grid with a
single cell has effort \`0\`.

## Examples

\`\`\`
Input: heights = [[1, 3, 8], [2, 9, 7], [4, 5, 6]]
Output: 2
Explanation: the path 1 -> 2 -> 4 -> 5 -> 6 has step costs 1, 2, 1, 1, so
its effort is 2. Every step out of the pair of cells {1, 2} costs at least
2, so no path does better.
\`\`\`

\`\`\`
Input: heights = [[1, 100]]
Output: 99
\`\`\`

## Constraints

- \`1 <= rows, cols <= 100\`
- \`1 <= heights[i][j] <= 10^6\`

## Notes

Run Dijkstra's algorithm where the distance of a cell is the smallest
maximum step cost needed to reach it. Binary search on the answer combined
with a reachability search, or adding edges in increasing cost order to a
union-find, also work.
`}];export{e as default};
