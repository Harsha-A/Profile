const e=[{slug:"unique-paths",title:"Unique Paths",difficulty:"Medium",tags:["dynamic-programming","math","combinatorics"],function:{name:"uniquePaths",params:[{name:"m",type:"number"},{name:"n",type:"number"}],returns:"number"},compare:{mode:"exact"},limits:{timeMs:1e3},tests:[{input:[2,4],expected:4,public:!0},{input:[3,3],expected:6,public:!0},{input:[1,1],expected:1,public:!1},{input:[1,9],expected:1,public:!1},{input:[5,4],expected:35,public:!1},{input:[20,20],expected:35345263800,public:!1}],generated:{seeds:[6201,6202,6203],perSeed:5},variantId:"default",key:"unique-paths:default",generatedTests:[{seed:6201,index:0,input:[16,15],expected:77558760,public:!1},{seed:6201,index:1,input:[14,7],expected:27132,public:!1},{seed:6201,index:2,input:[5,3],expected:15,public:!1},{seed:6201,index:3,input:[20,1],expected:1,public:!1},{seed:6201,index:4,input:[18,10],expected:3124550,public:!1},{seed:6202,index:0,input:[13,6],expected:6188,public:!1},{seed:6202,index:1,input:[4,9],expected:165,public:!1},{seed:6202,index:2,input:[10,13],expected:293930,public:!1},{seed:6202,index:3,input:[13,17],expected:30421755,public:!1},{seed:6202,index:4,input:[3,3],expected:6,public:!1},{seed:6203,index:0,input:[17,8],expected:245157,public:!1},{seed:6203,index:1,input:[6,4],expected:56,public:!1},{seed:6203,index:2,input:[7,3],expected:28,public:!1},{seed:6203,index:3,input:[13,20],expected:141120525,public:!1},{seed:6203,index:4,input:[12,14],expected:2496144,public:!1}],descriptionMarkdown:`# Unique Paths

A grid has \`m\` rows and \`n\` columns. You start in the top-left cell
\`(0, 0)\` and want to reach the bottom-right cell \`(m - 1, n - 1)\`. Each move
goes exactly one cell either down (row + 1) or right (column + 1).

Return the number of distinct move sequences that lead from the start cell to
the end cell.

## Examples

\`\`\`
Input: m = 2, n = 4
Output: 4
Explanation: every route consists of 1 down move and 3 right moves; the down
move can be placed in any of 4 positions.
\`\`\`

\`\`\`
Input: m = 1, n = 9
Output: 1
Explanation: the only route is 8 right moves.
\`\`\`

## Constraints

- \`1 <= m, n <= 20\`
- The answer is at most \`C(38, 19)\`, which fits exactly in a double.
`}];export{e as default};
