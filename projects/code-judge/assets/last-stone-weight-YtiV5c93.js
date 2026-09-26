const e=[{slug:"last-stone-weight",title:"Last Stone Weight",difficulty:"Easy",tags:["array","heap"],function:{name:"lastStoneWeight",params:[{name:"stones",type:"number[]"}],returns:"number"},compare:{mode:"exact"},limits:{timeMs:1e3},tests:[{input:[[4,9,3,6]],expected:2,public:!0},{input:[[5]],expected:5,public:!0},{input:[[7,7]],expected:0,public:!1},{input:[[10,1,1,1]],expected:7,public:!1},{input:[[2,2,3,3,8,1]],public:!1,expected:1}],generated:{seeds:[1046,1047,1048],perSeed:5},variantId:"default",key:"last-stone-weight:default",generatedTests:[{seed:1046,index:0,input:[[13,6,2,45,10,6,22,34]],expected:0,public:!1},{seed:1046,index:1,input:[[9,36,5,35]],expected:3,public:!1},{seed:1046,index:2,input:[[20,41,33,10,24,40]],expected:0,public:!1},{seed:1046,index:3,input:[[22,10,34,3]],expected:1,public:!1},{seed:1046,index:4,input:[[39,31,49,5,17,28,10,39,31]],expected:1,public:!1},{seed:1047,index:0,input:[[40,30,44,42,14,7,5]],expected:0,public:!1},{seed:1047,index:1,input:[[47,8]],expected:39,public:!1},{seed:1047,index:2,input:[[49,45,23,40,7,18,24,47,17]],expected:0,public:!1},{seed:1047,index:3,input:[[26,30,30,42,14,46,47,11,19,38,5,44]],expected:0,public:!1},{seed:1047,index:4,input:[[34]],expected:34,public:!1},{seed:1048,index:0,input:[[30,36,8,38]],expected:20,public:!1},{seed:1048,index:1,input:[[39,24,19]],expected:4,public:!1},{seed:1048,index:2,input:[[48,7,20,48,11,36,17,9,40,19]],expected:1,public:!1},{seed:1048,index:3,input:[[11,44,49,3,19,24]],expected:2,public:!1},{seed:1048,index:4,input:[[41,1,46,2,31]],expected:23,public:!1}],descriptionMarkdown:`# Last Stone Weight

You are given an array \`stones\` of positive integers. Repeatedly apply the
following step while the array holds at least two values:

1. Remove the two largest values \`x\` and \`y\`, where \`x >= y\`.
2. If \`x > y\`, insert the value \`x - y\` back into the array. If \`x == y\`,
   insert nothing.

When fewer than two values remain, return the remaining value, or \`0\` if the
array is empty.

## Examples

\`\`\`
Input: stones = [4, 9, 3, 6]
Output: 2
Explanation: 9 and 6 -> insert 3, array [4, 3, 3].
             4 and 3 -> insert 1, array [3, 1].
             3 and 1 -> insert 2, array [2].
\`\`\`

\`\`\`
Input: stones = [7, 7]
Output: 0
\`\`\`

## Constraints

- \`1 <= stones.length <= 30\`
- \`1 <= stones[i] <= 1000\`

## Notes

A max-heap gives each step in \`O(log n)\`.
`}];export{e as default};
