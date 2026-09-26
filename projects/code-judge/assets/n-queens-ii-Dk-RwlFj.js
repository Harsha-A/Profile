const e=[{slug:"n-queens-ii",title:"N Queens II",difficulty:"Hard",tags:["backtracking"],function:{name:"totalNQueens",params:[{name:"n",type:"number"}],returns:"number"},compare:{mode:"exact"},limits:{timeMs:1e3},tests:[{input:[4],expected:2,public:!0},{input:[1],expected:1,public:!0},{input:[3],expected:0,public:!0},{input:[2],expected:0,public:!1},{input:[5],expected:10,public:!1},{input:[6],expected:4,public:!1},{input:[7],expected:40,public:!1},{input:[8],expected:92,public:!1},{input:[9],expected:352,public:!1}],generated:{seeds:[521,522],perSeed:3},variantId:"default",key:"n-queens-ii:default",generatedTests:[{seed:521,index:0,input:[7],expected:40,public:!1},{seed:521,index:1,input:[4],expected:2,public:!1},{seed:521,index:2,input:[9],expected:352,public:!1},{seed:522,index:0,input:[5],expected:10,public:!1},{seed:522,index:1,input:[6],expected:4,public:!1},{seed:522,index:2,input:[2],expected:0,public:!1}],descriptionMarkdown:`# N Queens II

You are given an integer \`n\`. Count the number of ways to place \`n\` queens
on an \`n x n\` chessboard so that no two queens attack each other. Two queens
attack each other when they share a row, a column, or a diagonal (in either
direction).

Two placements are different when at least one square holds a queen in one
placement and is empty in the other. Rotations and reflections of the same
placement count as separate placements.

Return the count as an integer.

## Examples

\`\`\`
Input: n = 5
Output: 10
\`\`\`

\`\`\`
Input: n = 2
Output: 0
Explanation: any two queens on a 2 x 2 board share a row, column, or diagonal.
\`\`\`

## Constraints

- \`1 <= n <= 9\`

## Notes

Place one queen per row and track attacked columns and diagonals; bitmasks
make each step a few integer operations.
`}];export{e as default};
