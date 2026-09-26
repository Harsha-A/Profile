const e=[{slug:"word-search",title:"Word Search",difficulty:"Medium",tags:["array","string","backtracking","matrix","depth-first-search"],function:{name:"exist",params:[{name:"board",type:"string[][]"},{name:"word",type:"string"}],returns:"boolean"},compare:{mode:"exact"},limits:{timeMs:1e3},tests:[{input:[[["c","a","t"],["x","r","s"],["o","d","e"]],"cars"],expected:!0,public:!0},{input:[[["c","a","t"],["x","r","s"],["o","d","e"]],"tact"],expected:!1,public:!0},{input:[[["q"]],"q"],expected:!0,public:!0},{input:[[["a","b"],["b","a"]],"abab"],expected:!0,public:!1},{input:[[["a","a"],["a","a"]],"aaaaa"],expected:!1,public:!1},{input:[[["m","n","o"]],"onm"],expected:!0,public:!1},{input:[[["x","y"],["z","w"]],"xw"],expected:!1,public:!1}],generated:{seeds:[7901,7902,7903],perSeed:5},variantId:"default",key:"word-search:default",generatedTests:[{seed:7901,index:0,input:[[["a"],["a"],["b"],["d"]],"dadca"],expected:!1,public:!1},{seed:7901,index:1,input:[[["d"],["b"],["b"],["a"]],"d"],expected:!0,public:!1},{seed:7901,index:2,input:[[["b"],["c"],["b"],["c"]],"cadbdc"],expected:!1,public:!1},{seed:7901,index:3,input:[[["c","a","b"],["b","c","d"]],"bcacdb"],expected:!0,public:!1},{seed:7901,index:4,input:[[["d"],["c"]],"adb"],expected:!1,public:!1},{seed:7902,index:0,input:[[["d","b","b"],["d","c","c"],["c","a","a"],["d","b","d"]],"bacd"],expected:!0,public:!1},{seed:7902,index:1,input:[[["a"]],"a"],expected:!0,public:!1},{seed:7902,index:2,input:[[["a","d","c"]],"adc"],expected:!0,public:!1},{seed:7902,index:3,input:[[["b"]],"cccba"],expected:!1,public:!1},{seed:7902,index:4,input:[[["c","c","b","b"],["c","c","a","c"]],"aa"],expected:!1,public:!1},{seed:7903,index:0,input:[[["b","c","d"],["d","b","c"],["d","d","b"]],"db"],expected:!0,public:!1},{seed:7903,index:1,input:[[["a","b"]],"ab"],expected:!0,public:!1},{seed:7903,index:2,input:[[["c","b"],["a","d"]],"bd"],expected:!0,public:!1},{seed:7903,index:3,input:[[["c"],["b"]],"baadd"],expected:!1,public:!1},{seed:7903,index:4,input:[[["d","d","c","d"]],"cd"],expected:!0,public:!1}],descriptionMarkdown:`# Word Search

You are given a rectangular grid \`board\` whose cells each hold one lowercase
letter, and a string \`word\`. Decide whether \`word\` can be traced through the
grid as a path of cells.

A path starts at any cell and moves one step at a time to a cell that shares
an edge with the current one (up, down, left, or right; never diagonally).
The letters along the path, read in order, must spell \`word\`. A single cell
may be used at most once within one path.

Return \`true\` if such a path exists and \`false\` otherwise.

## Examples

\`\`\`
Input:
  board = [["c","a","t"],
           ["x","r","s"],
           ["o","d","e"]]
  word = "cars"
Output: true
Explanation: c(0,0) -> a(0,1) -> r(1,1) -> s(1,2).
\`\`\`

\`\`\`
Input: same board, word = "tact"
Output: false
Explanation: there is only one "t" and it cannot be revisited.
\`\`\`

## Constraints

- \`1 <= board.length, board[i].length <= 6\`
- All rows have the same length.
- \`1 <= word.length <= 15\`
- \`board\` and \`word\` contain only lowercase English letters.

## Notes

Depth-first search from every cell, marking a cell as used while it is on
the current path and restoring it when backtracking. Checking letter counts
up front rules out many impossible words cheaply.
`}];export{e as default};
