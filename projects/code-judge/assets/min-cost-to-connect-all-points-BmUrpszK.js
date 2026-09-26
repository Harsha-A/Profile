const e=[{slug:"min-cost-to-connect-all-points",title:"Min Cost to Connect All Points",difficulty:"Medium",tags:["graph","minimum-spanning-tree","prim","union-find"],function:{name:"minCostConnectPoints",params:[{name:"points",type:"number[][]"}],returns:"number"},compare:{mode:"exact"},limits:{timeMs:1e3},tests:[{input:[[[0,0],[4,1],[1,3],[5,5]]],expected:14,public:!0},{input:[[[2,-3]]],expected:0,public:!0},{input:[[[0,0],[10,0]]],expected:10,public:!0},{input:[[[-1,-1],[1,1],[-1,1],[1,-1]]],expected:6,public:!1},{input:[[[0,0],[1,1],[2,2],[3,3],[100,100]]],expected:200,public:!1},{input:[[[3,12],[-2,5],[-4,1],[7,-8],[0,0]]],public:!1,expected:38}],generated:{seeds:[15841,15842,15843],perSeed:5},variantId:"default",key:"min-cost-to-connect-all-points:default",generatedTests:[{seed:15841,index:0,input:[[[8,1],[-5,-12],[-14,19],[-13,18]]],expected:66,public:!1},{seed:15841,index:1,input:[[[-16,20],[-14,10],[-7,1],[-18,-1],[11,5],[-7,-18],[19,6],[-11,-7],[-4,4],[1,-3]]],expected:110,public:!1},{seed:15841,index:2,input:[[[20,18],[-12,16],[-4,-7],[4,-7],[-1,-14],[-20,15],[14,0],[11,4],[-19,4],[-5,8]]],expected:117,public:!1},{seed:15841,index:3,input:[[[-3,15],[15,14],[-12,8]]],expected:35,public:!1},{seed:15841,index:4,input:[[[17,-9],[-18,18],[-5,9]]],expected:62,public:!1},{seed:15842,index:0,input:[[[8,8],[2,-20]]],expected:34,public:!1},{seed:15842,index:1,input:[[[7,-3],[10,-18],[-4,17]]],expected:49,public:!1},{seed:15842,index:2,input:[[[10,0],[20,-4],[-13,-10],[-19,0],[-14,1],[-2,17]]],expected:85,public:!1},{seed:15842,index:3,input:[[[-16,2],[5,-19]]],expected:42,public:!1},{seed:15842,index:4,input:[[[-9,-11]]],expected:0,public:!1},{seed:15843,index:0,input:[[[9,-12],[-17,11],[19,-2],[-5,2],[-18,-12]]],expected:92,public:!1},{seed:15843,index:1,input:[[[20,19],[20,15],[1,-12],[13,-10],[10,4],[-9,7]]],expected:78,public:!1},{seed:15843,index:2,input:[[[15,1]]],expected:0,public:!1},{seed:15843,index:3,input:[[[-11,19],[12,-4]]],expected:46,public:!1},{seed:15843,index:4,input:[[[2,12],[-2,-6],[-16,-3],[-15,4]]],expected:47,public:!1}],descriptionMarkdown:`# Min Cost to Connect All Points

You are given \`points\`, a list of distinct integer coordinates
\`points[i] = [x, y]\`. Consider the complete undirected graph on these
points where the weight of the edge between \`[x1, y1]\` and \`[x2, y2]\` is
the Manhattan distance \`|x1 - x2| + |y1 - y2|\`.

Return the total weight of a minimum spanning tree of that graph: the
smallest possible sum of edge weights over a set of edges that connects
every point to every other point through some path. A single point needs no
edges, so its answer is \`0\`.

## Examples

\`\`\`
Input: points = [[0, 0], [4, 1], [1, 3], [5, 5]]
Output: 14
Explanation: the pairwise distances are 4 between [0, 0] and [1, 3], 5 for
[0, 0]-[4, 1], [4, 1]-[1, 3] and [4, 1]-[5, 5], 6 for [1, 3]-[5, 5], and 10
for [0, 0]-[5, 5]. Taking the edge of weight 4 and then two edges of
weight 5, such as [0, 0]-[4, 1] and [4, 1]-[5, 5], connects everything for
4 + 5 + 5 = 14.
\`\`\`

\`\`\`
Input: points = [[0, 0], [10, 0]]
Output: 10
\`\`\`

## Constraints

- \`1 <= points.length <= 1000\`
- \`-10^6 <= x, y <= 10^6\`
- All points are distinct.

## Notes

With a dense graph, Prim's algorithm using an array of best-known
connection costs runs in \`O(n^2)\` without building the edge list. Kruskal's
algorithm with a union-find over all \`n(n-1)/2\` edges also works.
`}];export{e as default};
