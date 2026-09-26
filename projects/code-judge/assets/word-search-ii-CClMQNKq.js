const e=[{slug:"word-search-ii",title:"Word Search II",difficulty:"Hard",tags:["array","string","trie","backtracking","matrix"],function:{name:"findWords",params:[{name:"board",type:"string[][]"},{name:"words",type:"string[]"}],returns:"string[]"},compare:{mode:"unordered"},limits:{timeMs:1e3},tests:[{input:[[["c","a","t"],["x","r","s"],["m","o","p"]],["cat","car","cars","rot","tap","mop"]],expected:["car","cars","cat","mop"],public:!0},{input:[[["a","b"],["d","c"]],["abcd","abdc","acbd"]],expected:["abcd"],public:!0},{input:[[["a"]],["a","aa"]],expected:["a"],public:!1},{input:[[["a","a"]],["aaa"]],expected:[],public:!1},{input:[[["o","n"],["e","o"]],["one","neo","eon","noon"]],public:!1,expected:["eon"]}],generated:{seeds:[212,213,214],perSeed:5},variantId:"default",key:"word-search-ii:default",generatedTests:[{seed:212,index:0,input:[[["c","c","d","a"],["e","a","a","b"]],["c","daba"]],expected:["c","daba"],public:!1},{seed:212,index:1,input:[[["d"],["c"]],["dc"]],expected:["dc"],public:!1},{seed:212,index:2,input:[[["b","d","a"],["b","e","c"],["a","c","c"]],["e","c","ccce","ab"]],expected:["e","c","ccce","ab"],public:!1},{seed:212,index:3,input:[[["c","e"],["d","c"]],["cecd","bea","cd","d","dc"]],expected:["cd","cecd","d","dc"],public:!1},{seed:212,index:4,input:[[["b","a","e"],["c","d","b"],["c","b","c"],["b","e","b"]],["cbcc","ad"]],expected:["ad","cbcc"],public:!1},{seed:213,index:0,input:[[["c","d","a"],["b","b","e"]],["a","b","daebb","ebbcd"]],expected:["daebb","a","b","ebbcd"],public:!1},{seed:213,index:1,input:[[["e","b"],["e","a"]],["ee","eeab"]],expected:["ee","eeab"],public:!1},{seed:213,index:2,input:[[["a","c"],["e","e"],["e","a"],["c","e"]],["e","ea","ab","eeec","a"]],expected:["a","e","ea","eeec"],public:!1},{seed:213,index:3,input:[[["b","b","e","d"],["d","c","c","a"],["c","c","e","e"],["e","c","d","d"]],["de","d"]],expected:["d","de"],public:!1},{seed:213,index:4,input:[[["c","d","d"],["d","a","c"]],["d","dde","cd","edcbe","bce","dca"]],expected:["cd","d","dca"],public:!1},{seed:214,index:0,input:[[["e","e","a"],["a","b","a"]],["beaa","aeba","e"]],expected:["e","aeba","beaa"],public:!1},{seed:214,index:1,input:[[["d","e"],["a","c"]],["a","cb","d","dac","ce","bba","ecad"]],expected:["d","dac","ecad","a","ce"],public:!1},{seed:214,index:2,input:[[["a","b"],["e","a"],["a","b"],["c","d"]],["a","ebcbd"]],expected:["a"],public:!1},{seed:214,index:3,input:[[["b","e","d","b"],["a","e","d","e"]],["bedb","ae"]],expected:["bedb","ae"],public:!1},{seed:214,index:4,input:[[["c","a","a","a"],["c","d","a","b"]],["ddcba","eeae","bee","badac","dadc"]],expected:["badac"],public:!1}],descriptionMarkdown:`# Word Search II

You are given a rectangular grid \`board\` whose cells each hold one lowercase
letter, and a list of distinct lowercase strings \`words\`. A string is present
in the grid if it can be spelled by a path of cells where each step moves to a
horizontally or vertically adjacent cell, and no cell is visited twice within
the same path.

Return every string from \`words\` that is present in the grid. Each string
appears at most once in the result, and the result may be in any order.

## Examples

\`\`\`
Input:
  board = [["c","a","t"],
           ["x","r","s"],
           ["m","o","p"]]
  words = ["cat", "car", "cars", "rot", "tap", "mop"]
Output: ["cat", "car", "cars", "mop"]
Explanation: in "rot" the o is not adjacent to the t, and in "tap" the p is
not adjacent to the a, so neither can be spelled.
\`\`\`

\`\`\`
Input: board = [["a","a"]], words = ["aaa"]
Output: []
Explanation: only two cells exist, and a cell cannot be reused.
\`\`\`

## Constraints

- \`1 <= board.length, board[i].length <= 12\`
- \`board[i][j]\` is a single lowercase English letter.
- \`1 <= words.length <= 3 * 10^4\`
- \`1 <= words[i].length <= 10\`
- The strings in \`words\` are distinct and contain only lowercase letters.

## Notes

Searching the grid once per word repeats a lot of work. Put all words in a
trie and run one depth-first search from every cell, following trie edges and
stopping as soon as the current prefix leaves the trie. Removing a word from
the trie once it has been found prevents duplicates.
`}];export{e as default};
