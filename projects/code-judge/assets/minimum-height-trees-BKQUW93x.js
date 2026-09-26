const e=[{slug:"minimum-height-trees",title:"Minimum Height Trees",difficulty:"Medium",tags:["graph","tree","topological-sort","breadth-first-search"],function:{name:"findMinHeightTrees",params:[{name:"n",type:"number"},{name:"edges",type:"number[][]"}],returns:"number[]"},compare:{mode:"unordered"},limits:{timeMs:1e3},tests:[{input:[5,[[0,1],[1,2],[2,3],[3,4]]],expected:[2],public:!0},{input:[6,[[0,3],[1,3],[2,3],[3,4],[4,5]]],expected:[3,4],public:!0},{input:[1,[]],expected:[0],public:!0},{input:[2,[[1,0]]],expected:[0,1],public:!1},{input:[7,[[0,1],[0,2],[0,3],[3,4],[4,5],[4,6]]],public:!1,expected:[3]}],generated:{seeds:[1901,1902,1903],perSeed:5},variantId:"default",key:"minimum-height-trees:default",generatedTests:[{seed:1901,index:0,input:[7,[[1,3],[3,6],[2,6],[2,0],[5,0],[0,4]]],expected:[6,2],public:!1},{seed:1901,index:1,input:[6,[[3,5],[0,5],[2,0],[4,3],[1,5]]],expected:[5],public:!1},{seed:1901,index:2,input:[5,[[2,4],[1,4],[1,3],[3,0]]],expected:[1],public:!1},{seed:1901,index:3,input:[1,[]],expected:[0],public:!1},{seed:1901,index:4,input:[2,[[1,0]]],expected:[0,1],public:!1},{seed:1902,index:0,input:[10,[[2,5],[9,5],[9,3],[5,0],[0,4],[4,1],[7,4],[8,7],[6,2]]],expected:[0],public:!1},{seed:1902,index:1,input:[6,[[2,4],[2,0],[2,3],[3,5],[1,3]]],expected:[2,3],public:!1},{seed:1902,index:2,input:[10,[[8,9],[8,7],[8,0],[8,1],[1,3],[3,2],[7,4],[2,5],[8,6]]],expected:[1],public:!1},{seed:1902,index:3,input:[5,[[1,0],[3,1],[2,0],[4,0]]],expected:[1,0],public:!1},{seed:1902,index:4,input:[5,[[0,4],[0,1],[4,2],[3,1]]],expected:[0],public:!1},{seed:1903,index:0,input:[5,[[2,4],[3,2],[0,4],[0,1]]],expected:[4],public:!1},{seed:1903,index:1,input:[9,[[1,5],[0,1],[4,0],[4,7],[8,4],[3,8],[7,2],[6,8]]],expected:[0,4],public:!1},{seed:1903,index:2,input:[3,[[0,1],[1,2]]],expected:[1],public:!1},{seed:1903,index:3,input:[2,[[0,1]]],expected:[0,1],public:!1},{seed:1903,index:4,input:[10,[[8,2],[8,5],[1,2],[2,3],[9,1],[6,5],[0,2],[9,4],[8,7]]],expected:[2],public:!1}],descriptionMarkdown:`# Minimum Height Trees

\`edges\` describes an undirected tree on nodes \`0\` to \`n - 1\` (it is
connected and has exactly \`n - 1\` edges). Choosing any node as the root
gives a rooted tree whose height is the number of edges on the longest path
from the root down to a leaf.

Return every node that, when chosen as the root, gives the smallest
possible height. A tree always has either one or two such nodes (its
centre). The returned nodes may be in any order.

## Examples

\`\`\`
Input: n = 5, edges = [[0, 1], [1, 2], [2, 3], [3, 4]]
Output: [2]
Explanation: rooted at 2 the height is 2; any other root gives at least 3.
\`\`\`

\`\`\`
Input: n = 6, edges = [[0, 3], [1, 3], [2, 3], [3, 4], [4, 5]]
Output: [3, 4]
Explanation: roots 3 and 4 both give height 2.
\`\`\`

## Constraints

- \`1 <= n <= 2 * 10^4\`
- \`edges.length == n - 1\`, \`0 <= u, v < n\`, \`u != v\`
- The edges form a tree.
`}];export{e as default};
