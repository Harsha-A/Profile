const e=[{slug:"n-queens",title:"N Queens",difficulty:"Hard",tags:["array","backtracking"],function:{name:"solveNQueens",params:[{name:"n",type:"number"}],returns:"string[][]"},compare:{mode:"unordered"},limits:{timeMs:1e3},tests:[{input:[4],expected:[[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]],public:!0},{input:[1],expected:[["Q"]],public:!0},{input:[3],expected:[],public:!0},{input:[2],expected:[],public:!1},{input:[5],public:!1,expected:[["Q....","..Q..","....Q",".Q...","...Q."],["Q....","...Q.",".Q...","....Q","..Q.."],[".Q...","...Q.","Q....","..Q..","....Q"],[".Q...","....Q","..Q..","Q....","...Q."],["..Q..","Q....","...Q.",".Q...","....Q"],["..Q..","....Q",".Q...","...Q.","Q...."],["...Q.","Q....","..Q..","....Q",".Q..."],["...Q.",".Q...","....Q","..Q..","Q...."],["....Q",".Q...","...Q.","Q....","..Q.."],["....Q","..Q..","Q....","...Q.",".Q..."]]},{input:[6],public:!1,expected:[[".Q....","...Q..",".....Q","Q.....","..Q...","....Q."],["..Q...",".....Q",".Q....","....Q.","Q.....","...Q.."],["...Q..","Q.....","....Q.",".Q....",".....Q","..Q..."],["....Q.","..Q...","Q.....",".....Q","...Q..",".Q...."]]}],generated:{seeds:[511,512],perSeed:3},variantId:"default",key:"n-queens:default",generatedTests:[{seed:511,index:0,input:[3],expected:[],public:!1},{seed:511,index:1,input:[2],expected:[],public:!1},{seed:511,index:2,input:[4],expected:[[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]],public:!1},{seed:512,index:0,input:[6],expected:[[".Q....","...Q..",".....Q","Q.....","..Q...","....Q."],["..Q...",".....Q",".Q....","....Q.","Q.....","...Q.."],["...Q..","Q.....","....Q.",".Q....",".....Q","..Q..."],["....Q.","..Q...","Q.....",".....Q","...Q..",".Q...."]],public:!1},{seed:512,index:1,input:[3],expected:[],public:!1},{seed:512,index:2,input:[3],expected:[],public:!1}],descriptionMarkdown:`# N Queens

You are given an integer \`n\`. Find every way to place \`n\` queens on an
\`n x n\` chessboard so that no two queens attack each other. Two queens
attack each other when they share a row, a column, or a diagonal (in either
direction).

Return every valid placement. Each placement is a board given as a list of
\`n\` strings, one per row from top to bottom. Each string has length \`n\` and
uses exactly these two characters:

- \`'Q'\` (uppercase letter Q) for a square holding a queen,
- \`'.'\` (period) for an empty square.

The rows inside a board must stay in top-to-bottom order. The order in which
the boards themselves are listed does not matter. If no placement exists,
return an empty list.

## Examples

\`\`\`
Input: n = 4
Output: [[".Q..",
          "...Q",
          "Q...",
          "..Q."],
         ["..Q.",
          "Q...",
          "...Q",
          ".Q.."]]
\`\`\`

\`\`\`
Input: n = 3
Output: []
Explanation: every arrangement of three queens on a 3 x 3 board has an attacking pair.
\`\`\`

## Constraints

- \`1 <= n <= 6\`

## Notes

Every valid board has exactly one queen per row, so place row by row and
track the occupied columns and both diagonal directions (\`r - c\` and
\`r + c\`) in sets for constant-time conflict checks.
`}];export{e as default};
