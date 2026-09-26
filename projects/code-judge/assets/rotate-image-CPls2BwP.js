const e=[{slug:"rotate-image",title:"Rotate Image",difficulty:"Medium",tags:["array","math","matrix","in-place"],function:{name:"rotate",params:[{name:"matrix",type:"number[][]"}],returns:"void",resultFrom:"arg:0"},compare:{mode:"exact"},limits:{timeMs:1e3},tests:[{input:[[[1,2],[3,4]]],expected:[[3,1],[4,2]],public:!0},{input:[[[9,8,7],[6,5,4],[3,2,1]]],expected:[[3,6,9],[2,5,8],[1,4,7]],public:!0},{input:[[[42]]],expected:[[42]],public:!1},{input:[[[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,16]]],expected:[[13,9,5,1],[14,10,6,2],[15,11,7,3],[16,12,8,4]],public:!1},{input:[[[0,-5,3],[7,7,-2],[1,0,4]]],public:!1,expected:[[1,7,0],[0,7,-5],[4,-2,3]]}],generated:{seeds:[2201,2202,2203],perSeed:5},variantId:"default",key:"rotate-image:default",generatedTests:[{seed:2201,index:0,input:[[[-25]]],expected:[[-25]],public:!1},{seed:2201,index:1,input:[[[-46,11,-70,-69],[37,-7,1,-38],[56,-15,-47,25],[-96,33,29,-46]]],expected:[[-96,56,37,-46],[33,-15,-7,11],[29,-47,1,-70],[-46,25,-38,-69]],public:!1},{seed:2201,index:2,input:[[[-72,-75,82,-26,76],[45,-8,52,65,-7],[48,62,-75,-12,-24],[59,-91,-98,-45,-25],[88,1,49,-78,-88]]],expected:[[88,59,48,45,-72],[1,-91,62,-8,-75],[49,-98,-75,52,82],[-78,-45,-12,65,-26],[-88,-25,-24,-7,76]],public:!1},{seed:2201,index:3,input:[[[-91,54,55,86],[-89,-52,31,-94],[49,-96,-78,64],[99,30,76,-67]]],expected:[[99,49,-89,-91],[30,-96,-52,54],[76,-78,31,55],[-67,64,-94,86]],public:!1},{seed:2201,index:4,input:[[[95,-90,-41,-98],[-33,91,61,51],[-36,99,69,-3],[-22,62,-21,40]]],expected:[[-22,-36,-33,95],[62,99,91,-90],[-21,69,61,-41],[40,-3,51,-98]],public:!1},{seed:2202,index:0,input:[[[91,-98,-73,16,77],[61,68,-85,-80,-48],[51,42,97,-39,-2],[-28,9,-95,48,-20],[-49,3,-81,-9,0]]],expected:[[-49,-28,51,61,91],[3,9,42,68,-98],[-81,-95,97,-85,-73],[-9,48,-39,-80,16],[0,-20,-2,-48,77]],public:!1},{seed:2202,index:1,input:[[[17,-84],[-32,-49]]],expected:[[-32,17],[-49,-84]],public:!1},{seed:2202,index:2,input:[[[-61,-51,-67],[93,-95,-54],[11,18,1]]],expected:[[11,93,-61],[18,-95,-51],[1,-54,-67]],public:!1},{seed:2202,index:3,input:[[[0]]],expected:[[0]],public:!1},{seed:2202,index:4,input:[[[17,-38,57,-95,91],[33,-84,-66,74,-82],[-69,-62,8,-83,28],[74,52,24,58,-96],[20,-64,-20,81,-23]]],expected:[[20,74,-69,33,17],[-64,52,-62,-84,-38],[-20,24,8,-66,57],[81,58,-83,74,-95],[-23,-96,28,-82,91]],public:!1},{seed:2203,index:0,input:[[[-93,-2,-63,13],[7,-22,-64,82],[54,88,-68,-11],[42,68,80,31]]],expected:[[42,54,7,-93],[68,88,-22,-2],[80,-68,-64,-63],[31,-11,82,13]],public:!1},{seed:2203,index:1,input:[[[-4,-39,22],[-52,81,-61],[-22,69,98]]],expected:[[-22,-52,-4],[69,81,-39],[98,-61,22]],public:!1},{seed:2203,index:2,input:[[[15,-45],[59,47]]],expected:[[59,15],[47,-45]],public:!1},{seed:2203,index:3,input:[[[-23,28,-3,76],[-23,-41,-25,25],[-20,17,-16,-72],[-8,85,-53,15]]],expected:[[-8,-20,-23,-23],[85,17,-41,28],[-53,-16,-25,-3],[15,-72,25,76]],public:!1},{seed:2203,index:4,input:[[[-90,27],[-80,-67]]],expected:[[-80,-90],[-67,27]],public:!1}],descriptionMarkdown:`# Rotate Image

You are given an \`n x n\` grid of integers \`matrix\`. Turn the grid a quarter
turn **clockwise** (90 degrees to the right) **in place**: after the
rotation, the first row of the grid holds what used to be the first column,
read from bottom to top. Equivalently, the value that was at row \`i\`,
column \`j\` ends up at row \`j\`, column \`n - 1 - i\`.

The function returns nothing; the judge inspects \`matrix\` after your
function finishes. Modify the given grid directly rather than building and
returning a new one.

## Examples

\`\`\`
Input: matrix = [[1, 2],
                 [3, 4]]
After the call: matrix = [[3, 1],
                          [4, 2]]
\`\`\`

\`\`\`
Input: matrix = [[9, 8, 7],
                 [6, 5, 4],
                 [3, 2, 1]]
After the call: matrix = [[3, 6, 9],
                          [2, 5, 8],
                          [1, 4, 7]]
\`\`\`

## Constraints

- \`matrix.length == n\` and \`matrix[i].length == n\`
- \`1 <= n <= 20\`
- \`-1000 <= matrix[i][j] <= 1000\`

## Notes

A clockwise quarter turn is the same as transposing the grid across its main
diagonal and then reversing each row. Both steps can be done with swaps.
`}];export{e as default};
