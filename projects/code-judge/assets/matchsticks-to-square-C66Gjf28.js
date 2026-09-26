const e=[{slug:"matchsticks-to-square",title:"Matchsticks to Square",difficulty:"Medium",tags:["array","backtracking","bit-manipulation","dynamic-programming"],function:{name:"makesquare",params:[{name:"matchsticks",type:"number[]"}],returns:"boolean"},compare:{mode:"exact"},limits:{timeMs:1e3},tests:[{input:[[4,1,3,2,2,4]],expected:!0,public:!0},{input:[[5,5,5,6]],expected:!1,public:!0},{input:[[3,3,3,3,4]],expected:!1,public:!0},{input:[[1,1,1]],expected:!1,public:!1},{input:[[7,7,7,7]],expected:!0,public:!1},{input:[[6,2,2,2,4,4,4]],expected:!0,public:!1},{input:[[4,4,4,2,2,2,2]],expected:!1,public:!1},{input:[[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]],public:!1,expected:!0}],generated:{seeds:[4731,4732,4733],perSeed:5},variantId:"default",key:"matchsticks-to-square:default",generatedTests:[{seed:4731,index:0,input:[[1,3]],expected:!1,public:!1},{seed:4731,index:1,input:[[6,2,8,2,1,2,2,1,3,2,2,1]],expected:!0,public:!1},{seed:4731,index:2,input:[[5,3,2,6,2,3,3,4,1]],expected:!1,public:!1},{seed:4731,index:3,input:[[1,5,7,5,10,3,4,2,1,10]],expected:!0,public:!1},{seed:4731,index:4,input:[[8]],expected:!1,public:!1},{seed:4732,index:0,input:[[12,5,1,8,6,2,5,7,4,6]],expected:!0,public:!1},{seed:4732,index:1,input:[[16,2,8,5,8,7,5,13,1,6,7,14]],expected:!0,public:!1},{seed:4732,index:2,input:[[3,3,7,8,6,9,8,3,8]],expected:!1,public:!1},{seed:4732,index:3,input:[[7,4,1,4,5,4,5,4,2]],expected:!0,public:!1},{seed:4732,index:4,input:[[5,1,2,5,5,2,11,3,9,1]],expected:!0,public:!1},{seed:4733,index:0,input:[[1,2,13,10,3,1,3,12,1,4,1,17]],expected:!0,public:!1},{seed:4733,index:1,input:[[6,1,1,3,3,5,7,3,3]],expected:!1,public:!1},{seed:4733,index:2,input:[[5,2,4,1,10,2,7,7]],expected:!1,public:!1},{seed:4733,index:3,input:[[6,8,2,8,3,9,7,2]],expected:!1,public:!1},{seed:4733,index:4,input:[[6,3,13,1,1,12,2,4,10,1,1,2]],expected:!0,public:!1}],descriptionMarkdown:`# Matchsticks to Square

You are given an array \`matchsticks\` of positive integers. Decide whether
the array can be split into exactly four groups such that:

- every element belongs to exactly one group (each element is used once,
  and none are left over), and
- all four groups have the same sum.

Return \`true\` if such a split exists and \`false\` otherwise. Groups are
multisets: two elements with equal values are still distinct elements.

## Examples

\`\`\`
Input: matchsticks = [4, 1, 3, 2, 2, 4]
Output: true
Explanation: the total is 16, and [4], [4], [1, 3], [2, 2] each sum to 4.
\`\`\`

\`\`\`
Input: matchsticks = [5, 5, 5, 6]
Output: false
Explanation: the total, 21, is not divisible by 4.
\`\`\`

## Constraints

- \`1 <= matchsticks.length <= 15\`
- \`1 <= matchsticks[i] <= 10^8\`

## Notes

Reject early if the total is not a multiple of four or any element exceeds a
quarter of it. Then assign elements, largest first, to one of four running
sums, skipping buckets that already hold the same running total.
`}];export{e as default};
