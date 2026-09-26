const e=[{slug:"set-matrix-zeroes",title:"Set Matrix Zeroes",difficulty:"Medium",tags:["array","hash-set","matrix","in-place"],function:{name:"setZeroes",params:[{name:"matrix",type:"number[][]"}],returns:"void",resultFrom:"arg:0"},compare:{mode:"exact"},limits:{timeMs:1e3},tests:[{input:[[[4,5,6],[7,0,8],[9,1,2]]],expected:[[4,0,6],[0,0,0],[9,0,2]],public:!0},{input:[[[0,3,5,1],[2,6,8,0]]],expected:[[0,0,0,0],[0,0,0,0]],public:!0},{input:[[[3,1],[4,1]]],expected:[[3,1],[4,1]],public:!1},{input:[[[0]]],expected:[[0]],public:!1},{input:[[[1,2,3],[4,5,6],[7,8,0]]],expected:[[1,2,0],[4,5,0],[0,0,0]],public:!1},{input:[[[-1,2],[0,3],[5,-6]]],public:!1,expected:[[0,2],[0,0],[0,-6]]}],generated:{seeds:[2401,2402,2403],perSeed:5},variantId:"default",key:"set-matrix-zeroes:default",generatedTests:[{seed:2401,index:0,input:[[[39,0,0,16,29],[23,39,38,0,32],[25,26,39,26,0],[20,45,17,42,36]]],expected:[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[20,0,0,0,0]],public:!1},{seed:2401,index:1,input:[[[43,34,36,47],[35,9,27,25],[0,37,0,41],[14,13,0,1],[12,24,29,50]]],expected:[[0,34,0,47],[0,9,0,25],[0,0,0,0],[0,0,0,0],[0,24,0,50]],public:!1},{seed:2401,index:2,input:[[[22,43,31,38],[40,2,48,5],[11,0,28,3],[30,12,37,19]]],expected:[[22,0,31,38],[40,0,48,5],[0,0,0,0],[30,0,37,19]],public:!1},{seed:2401,index:3,input:[[[12]]],expected:[[12]],public:!1},{seed:2401,index:4,input:[[[37],[9],[41],[38],[16]]],expected:[[37],[9],[41],[38],[16]],public:!1},{seed:2402,index:0,input:[[[19,0,40,0,3],[36,17,40,11,0]]],expected:[[0,0,0,0,0],[0,0,0,0,0]],public:!1},{seed:2402,index:1,input:[[[43,12,27,0,8],[19,6,2,10,34]]],expected:[[0,0,0,0,0],[19,6,2,0,34]],public:!1},{seed:2402,index:2,input:[[[0],[37],[23]]],expected:[[0],[0],[0]],public:!1},{seed:2402,index:3,input:[[[2,42,42,35,20],[40,9,0,0,33],[45,15,0,46,32],[0,33,11,24,0]]],expected:[[0,42,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],public:!1},{seed:2402,index:4,input:[[[3,45,22,34],[21,4,1,5]]],expected:[[3,45,22,34],[21,4,1,5]],public:!1},{seed:2403,index:0,input:[[[0,27,24,0,22]]],expected:[[0,0,0,0,0]],public:!1},{seed:2403,index:1,input:[[[27,38,0,23,32],[0,41,42,26,0],[0,6,46,15,17],[23,5,38,18,5]]],expected:[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,5,0,18,0]],public:!1},{seed:2403,index:2,input:[[[37,0,35],[49,38,0]]],expected:[[0,0,0],[0,0,0]],public:!1},{seed:2403,index:3,input:[[[27,20],[21,17]]],expected:[[27,20],[21,17]],public:!1},{seed:2403,index:4,input:[[[1]]],expected:[[1]],public:!1}],descriptionMarkdown:`# Set Matrix Zeroes

You are given a rectangular grid of integers \`matrix\` with \`m\` rows and \`n\`
columns. For every cell that holds \`0\` in the **original** grid, replace
every value in that cell's row and in that cell's column with \`0\`. Zeros
created by this process do not spread further; only zeros present before
any change count.

Perform the update **in place**. The function returns nothing; the judge
inspects \`matrix\` after your function finishes.

## Examples

\`\`\`
Input: matrix = [[4, 5, 6],
                 [7, 0, 8],
                 [9, 1, 2]]
After the call: matrix = [[4, 0, 6],
                          [0, 0, 0],
                          [9, 0, 2]]
\`\`\`

\`\`\`
Input: matrix = [[3, 1],
                 [4, 1]]
After the call: matrix = [[3, 1],
                          [4, 1]]
\`\`\`

## Constraints

- \`1 <= m, n <= 200\`
- \`-2^31 <= matrix[i][j] <= 2^31 - 1\`

## Notes

Record which rows and columns contain a zero before writing anything. It is
possible to do this with constant extra space by using the first row and
first column of the grid itself as the markers.
`}];export{e as default};
