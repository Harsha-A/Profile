const e=[{slug:"partition-labels",title:"Partition Labels",difficulty:"Medium",tags:["string","hash-map","greedy","two-pointers"],function:{name:"partitionLabels",params:[{name:"s",type:"string"}],returns:"number[]"},compare:{mode:"exact"},limits:{timeMs:1e3},tests:[{input:["abacdcef"],expected:[3,3,1,1],public:!0},{input:["xyzzyx"],expected:[6],public:!0},{input:["q"],expected:[1],public:!1},{input:["abcd"],expected:[1,1,1,1],public:!1},{input:["aabbaccdde"],expected:[5,2,2,1],public:!1},{input:["mnomplqrsrt"],public:!1,expected:[4,1,1,1,3,1]}],generated:{seeds:[2501,2502,2503],perSeed:5},variantId:"default",key:"partition-labels:default",generatedTests:[{seed:2501,index:0,input:["eaf"],expected:[1,1,1],public:!1},{seed:2501,index:1,input:["accccabcabbbbaccaccc"],expected:[20],public:!1},{seed:2501,index:2,input:["dcb"],expected:[1,1,1],public:!1},{seed:2501,index:3,input:["caca"],expected:[4],public:!1},{seed:2501,index:4,input:["iadgieiihceafeih"],expected:[16],public:!1},{seed:2502,index:0,input:["e"],expected:[1],public:!1},{seed:2502,index:1,input:["cbdadddbad"],expected:[1,9],public:!1},{seed:2502,index:2,input:["cc"],expected:[2],public:!1},{seed:2502,index:3,input:["acfbbecefedefdcca"],expected:[17],public:!1},{seed:2502,index:4,input:["bbababbbaa"],expected:[10],public:!1},{seed:2503,index:0,input:["dhggbcchgc"],expected:[1,9],public:!1},{seed:2503,index:1,input:["daeebecgbd"],expected:[10],public:!1},{seed:2503,index:2,input:["ghgeaabgheahhdd"],expected:[13,2],public:!1},{seed:2503,index:3,input:["abbccbb"],expected:[1,6],public:!1},{seed:2503,index:4,input:["bbbaaaaaabaa"],expected:[12],public:!1}],descriptionMarkdown:`# Partition Labels

You are given a string \`s\` of lowercase English letters. Cut \`s\` into as
many contiguous pieces as possible so that every letter appears in at most
one piece. Concatenating the pieces in order must reproduce \`s\`.

Return an array containing the length of each piece, listed in left-to-right
order. The order is part of the answer and is checked exactly.

## Examples

\`\`\`
Input: s = "abacdcef"
Output: [3, 3, 1, 1]
Explanation: The pieces are "aba", "cdc", "e", "f".
\`\`\`

\`\`\`
Input: s = "xyzzyx"
Output: [6]
Explanation: 'x' occurs at both ends, so the whole string is one piece.
\`\`\`

## Constraints

- \`1 <= s.length <= 500\`
- \`s\` contains only lowercase English letters.

## Notes

Record the last index of every letter. Scan left to right, extending the
current piece's end to the last occurrence of each letter seen; when the scan
reaches that end, close the piece.
`}];export{e as default};
