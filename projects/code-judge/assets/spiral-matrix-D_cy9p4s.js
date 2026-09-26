const e=[{slug:"spiral-matrix",title:"Spiral Matrix",difficulty:"Medium",tags:["array","matrix","simulation"],function:{name:"spiralOrder",params:[{name:"matrix",type:"number[][]"}],returns:"number[]"},compare:{mode:"exact"},limits:{timeMs:1e3},tests:[{input:[[[1,2,3],[4,5,6],[7,8,9]]],expected:[1,2,3,6,9,8,7,4,5],public:!0},{input:[[[10,20,30,40],[50,60,70,80]]],expected:[10,20,30,40,80,70,60,50],public:!0},{input:[[[5]]],expected:[5],public:!1},{input:[[[1],[2],[3]]],expected:[1,2,3],public:!1},{input:[[[1,2],[3,4],[5,6],[7,8]]],expected:[1,2,4,6,8,7,5,3],public:!1},{input:[[[1,2,3,4],[5,6,7,8],[9,10,11,12]]],public:!1,expected:[1,2,3,4,8,12,11,10,9,5,6,7]}],generated:{seeds:[2301,2302,2303],perSeed:5},variantId:"default",key:"spiral-matrix:default",generatedTests:[{seed:2301,index:0,input:[[[-11,-92,-83],[82,41,84],[54,-73,33],[87,4,-17]]],expected:[-11,-92,-83,84,33,-17,4,87,54,82,41,-73],public:!1},{seed:2301,index:1,input:[[[-25,58,26,19],[36,24,-85,-60],[-63,-80,-50,-1],[30,-54,-99,-10]]],expected:[-25,58,26,19,-60,-1,-10,-99,-54,30,-63,36,24,-85,-50,-80],public:!1},{seed:2301,index:2,input:[[[-43],[11],[-75],[35],[-38]]],expected:[-43,11,-75,35,-38],public:!1},{seed:2301,index:3,input:[[[87,50,-22,21,96],[31,-6,-68,-74,73],[48,-53,-45,16,92]]],expected:[87,50,-22,21,96,73,92,16,-45,-53,48,31,-6,-68,-74],public:!1},{seed:2301,index:4,input:[[[29,-5],[-76,81],[-14,-54],[-100,41],[16,63]]],expected:[29,-5,81,-54,41,63,16,-100,-14,-76],public:!1},{seed:2302,index:0,input:[[[-27,-58,96,61,87],[-32,0,-4,-87,32],[-50,27,-67,-40,53],[77,-50,40,-13,66]]],expected:[-27,-58,96,61,87,32,53,66,-13,40,-50,77,-50,-32,0,-4,-87,-40,-67,27],public:!1},{seed:2302,index:1,input:[[[71,-84],[-70,-18],[-93,-24]]],expected:[71,-84,-18,-24,-93,-70],public:!1},{seed:2302,index:2,input:[[[-96,4,-73,-75,19]]],expected:[-96,4,-73,-75,19],public:!1},{seed:2302,index:3,input:[[[-59,12,83],[-36,-27,-83]]],expected:[-59,12,83,-83,-27,-36],public:!1},{seed:2302,index:4,input:[[[81,24,-59],[-28,-12,16],[84,90,46],[79,56,68]]],expected:[81,24,-59,16,46,68,56,79,84,-28,-12,90],public:!1},{seed:2303,index:0,input:[[[20,-44,-52,12],[-78,7,-50,-91]]],expected:[20,-44,-52,12,-91,-50,7,-78],public:!1},{seed:2303,index:1,input:[[[-94,8,-6,32,-18],[-60,-39,16,92,-10]]],expected:[-94,8,-6,32,-18,-10,92,16,-39,-60],public:!1},{seed:2303,index:2,input:[[[-79],[-16],[14],[51],[-94]]],expected:[-79,-16,14,51,-94],public:!1},{seed:2303,index:3,input:[[[15,-47,74,5,3],[55,84,28,29,44],[41,88,-39,-30,100],[-69,40,28,36,60],[82,5,-6,-89,56]]],expected:[15,-47,74,5,3,44,100,60,56,-89,-6,5,82,-69,41,55,84,28,29,-30,36,28,40,88,-39],public:!1},{seed:2303,index:4,input:[[[11,-84],[-38,22],[15,-63],[14,-40]]],expected:[11,-84,22,-63,-40,14,15,-38],public:!1}],descriptionMarkdown:`# Spiral Matrix

You are given a rectangular grid of integers \`matrix\` with \`m\` rows and \`n\`
columns. Return every value of the grid in a single list, visited along an
inward clockwise spiral:

1. Start at the top-left cell and walk right along the top row.
2. Walk down the rightmost column.
3. Walk left along the bottom row.
4. Walk up the leftmost column.
5. Repeat on the remaining inner grid until every cell has been visited.

Each cell appears exactly once in the output.

## Examples

\`\`\`
Input: matrix = [[10, 20, 30, 40],
                 [50, 60, 70, 80]]
Output: [10, 20, 30, 40, 80, 70, 60, 50]
\`\`\`

\`\`\`
Input: matrix = [[1, 2],
                 [3, 4],
                 [5, 6],
                 [7, 8]]
Output: [1, 2, 4, 6, 8, 7, 5, 3]
\`\`\`

## Constraints

- \`1 <= m, n <= 10\`
- \`-100 <= matrix[i][j] <= 100\`
`}];export{e as default};
