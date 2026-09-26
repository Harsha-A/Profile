const e=[{slug:"plus-one",title:"Plus One",difficulty:"Easy",tags:["array","math"],function:{name:"plusOne",params:[{name:"digits",type:"number[]"}],returns:"number[]"},compare:{mode:"exact"},limits:{timeMs:1e3},tests:[{input:[[4,0,7]],expected:[4,0,8],public:!0},{input:[[2,9,9]],expected:[3,0,0],public:!0},{input:[[9,9,9,9]],expected:[1,0,0,0,0],public:!1},{input:[[0]],expected:[1],public:!1},{input:[[9]],expected:[1,0],public:!1},{input:[[8,1,9,3,7,4,6,2,5,0,1,9,9,9,9,9,9,9,9,9]],public:!1,expected:[8,1,9,3,7,4,6,2,5,0,2,0,0,0,0,0,0,0,0,0]}],generated:{seeds:[661,662,663],perSeed:5},variantId:"default",key:"plus-one:default",generatedTests:[{seed:661,index:0,input:[[7]],expected:[8],public:!1},{seed:661,index:1,input:[[9,9,9,9,9,9,9,9,9,9]],expected:[1,0,0,0,0,0,0,0,0,0,0],public:!1},{seed:661,index:2,input:[[9,2,8,3,6,7,4,1,3,2,3,9,9,2,4,4,2,5,3]],expected:[9,2,8,3,6,7,4,1,3,2,3,9,9,2,4,4,2,5,4],public:!1},{seed:661,index:3,input:[[4,1,6,9,7,8,8,6,0,5,4,9,0,4,9,8]],expected:[4,1,6,9,7,8,8,6,0,5,4,9,0,4,9,9],public:!1},{seed:661,index:4,input:[[6,5,1,8,6,1,1,3,3,7,0,2,9,9,2,1,4,9,3,2,2,9,9,9,9,9,9,9]],expected:[6,5,1,8,6,1,1,3,3,7,0,2,9,9,2,1,4,9,3,2,3,0,0,0,0,0,0,0],public:!1},{seed:662,index:0,input:[[9,2,7]],expected:[9,2,8],public:!1},{seed:662,index:1,input:[[4,2,4,6,8,6,0,1,8,8,3,3,5,8,9,4,1,1,2,3,1,9]],expected:[4,2,4,6,8,6,0,1,8,8,3,3,5,8,9,4,1,1,2,3,2,0],public:!1},{seed:662,index:2,input:[[2,9,9,5,0,8,7,7,8,4,0,0,2,5,1,9,3,9,9,9]],expected:[2,9,9,5,0,8,7,7,8,4,0,0,2,5,1,9,4,0,0,0],public:!1},{seed:662,index:3,input:[[5,2,6,0,2,0,2,5,7]],expected:[5,2,6,0,2,0,2,5,8],public:!1},{seed:662,index:4,input:[[9,3,4,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9]],expected:[9,3,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],public:!1},{seed:663,index:0,input:[[6,5,3,1,2,6,1,0,0,6,9,7,2,1,5]],expected:[6,5,3,1,2,6,1,0,0,6,9,7,2,1,6],public:!1},{seed:663,index:1,input:[[9,1]],expected:[9,2],public:!1},{seed:663,index:2,input:[[8,3,6,0,9,6,9,3,9,1,1,4,2,6,5,3,2,4,1,8,4,4,5,9,8,7,0,9,9,9]],expected:[8,3,6,0,9,6,9,3,9,1,1,4,2,6,5,3,2,4,1,8,4,4,5,9,8,7,1,0,0,0],public:!1},{seed:663,index:3,input:[[4,6,4,1,1,3,7,1,8,1,7,7,1,6,6,9,5,8,8]],expected:[4,6,4,1,1,3,7,1,8,1,7,7,1,6,6,9,5,8,9],public:!1},{seed:663,index:4,input:[[4,1,2,1,7,0,6,9,2,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9]],expected:[4,1,2,1,7,0,6,9,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],public:!1}],descriptionMarkdown:`# Plus One

A non-negative integer is given as an array \`digits\` of its decimal digits,
most significant digit first. Return the digit array of that integer plus one,
in the same format.

The input has no leading zeros, except that the number zero itself is written
as \`[0]\`. The output must follow the same rule. The number may be far longer
than what fits in a double, so work on the digits directly.

## Example

\`\`\`
Input: digits = [4, 0, 7]
Output: [4, 0, 8]
\`\`\`

\`\`\`
Input: digits = [2, 9, 9]
Output: [3, 0, 0]
Explanation: 299 + 1 = 300; the carry propagates through both nines.
\`\`\`

## Constraints

- \`1 <= digits.length <= 100\`
- \`0 <= digits[i] <= 9\`
- \`digits[0] != 0\` unless \`digits\` is exactly \`[0]\`
`}];export{e as default};
