const e=[{slug:"last-stone-weight-ii",title:"Last Stone Weight II",difficulty:"Medium",tags:["dynamic-programming","array","knapsack"],function:{name:"lastStoneWeightII",params:[{name:"stones",type:"number[]"}],returns:"number"},compare:{mode:"exact"},limits:{timeMs:1e3},tests:[{input:[[3,5,6,10]],expected:2,public:!0},{input:[[4,4,9]],expected:1,public:!0},{input:[[7]],expected:7,public:!1},{input:[[1,2,3]],expected:0,public:!1},{input:[[1,100]],expected:99,public:!1}],generated:{seeds:[1049,1050,1051],perSeed:5},variantId:"default",key:"last-stone-weight-ii:default",generatedTests:[{seed:1049,index:0,input:[[35,32,34,4,6,10,12,23,3,38]],expected:1,public:!1},{seed:1049,index:1,input:[[10,37,33,26,25,34,27,20,23]],expected:1,public:!1},{seed:1049,index:2,input:[[13,1,3,21,15,5,1]],expected:1,public:!1},{seed:1049,index:3,input:[[6,27,31,14,22,3,38,37]],expected:0,public:!1},{seed:1049,index:4,input:[[11,20,30,25,15,10]],expected:1,public:!1},{seed:1050,index:0,input:[[29,19,7,6,1,9,29]],expected:2,public:!1},{seed:1050,index:1,input:[[39,27,32,17,3,18,24,16,3]],expected:1,public:!1},{seed:1050,index:2,input:[[13,25,40,31,25,2]],expected:2,public:!1},{seed:1050,index:3,input:[[19,13,4,34,18,34,29,4,9]],expected:0,public:!1},{seed:1050,index:4,input:[[6,13,34,34,28,34,22,15,13]],expected:1,public:!1},{seed:1051,index:0,input:[[21,3,23]],expected:1,public:!1},{seed:1051,index:1,input:[[31,5,34]],expected:2,public:!1},{seed:1051,index:2,input:[[5,35,17,9,37,35]],expected:2,public:!1},{seed:1051,index:3,input:[[38,29,24,31,30]],expected:14,public:!1},{seed:1051,index:4,input:[[28,21,38,6,21,13,34,7]],expected:2,public:!1}],descriptionMarkdown:`# Last Stone Weight II

You are given an array of positive integers \`stones\`. Split the elements into
two groups \`A\` and \`B\` so that every element belongs to exactly one group
(either group may be empty). Let \`sum(A)\` and \`sum(B)\` be the totals of the
two groups.

Return the smallest possible value of \`|sum(A) - sum(B)|\`.

This equals the smallest weight that can remain when stones are repeatedly
paired up and each pair is replaced by the difference of its two weights.

## Examples

\`\`\`
Input: stones = [3, 5, 6, 10]
Output: 2
Explanation: the groups [3, 10] and [5, 6] have totals 13 and 11.
\`\`\`

\`\`\`
Input: stones = [4, 4, 9]
Output: 1
Explanation: the groups [4, 4] and [9] have totals 8 and 9.
\`\`\`

## Constraints

- \`1 <= stones.length <= 30\`
- \`1 <= stones[i] <= 100\`
`}];export{e as default};
