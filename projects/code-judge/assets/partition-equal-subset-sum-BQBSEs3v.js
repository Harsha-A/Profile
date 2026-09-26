const e=[{slug:"partition-equal-subset-sum",title:"Partition Equal Subset Sum",difficulty:"Medium",tags:["array","dynamic-programming","knapsack"],function:{name:"canPartition",params:[{name:"nums",type:"number[]"}],returns:"boolean"},compare:{mode:"exact"},limits:{timeMs:1e3},tests:[{input:[[3,1,4,2]],expected:!0,public:!0},{input:[[2,3,6]],expected:!1,public:!0},{input:[[1,1]],expected:!0,public:!1},{input:[[1,2,5]],expected:!1,public:!1},{input:[[4,4,4,4]],expected:!0,public:!1},{input:[[7]],expected:!1,public:!1},{input:[[9,5,3,1,8,6]],public:!1,expected:!0}],generated:{seeds:[1551,1552,1553],perSeed:5},variantId:"default",key:"partition-equal-subset-sum:default",generatedTests:[{seed:1551,index:0,input:[[28,6,9,11,2,29,5,23,9,15,29,10]],expected:!0,public:!1},{seed:1551,index:1,input:[[16,6]],expected:!1,public:!1},{seed:1551,index:2,input:[[28,2,17,12,20,26,4,2,22,3,19,25,3,24,7,8,6]],expected:!0,public:!1},{seed:1551,index:3,input:[[9,22]],expected:!1,public:!1},{seed:1551,index:4,input:[[30,15,9,24]],expected:!0,public:!1},{seed:1552,index:0,input:[[1,28,29,22,15,18,17,22,8]],expected:!0,public:!1},{seed:1552,index:1,input:[[23,24,11,30,22,22,13,25,27,25,30,20]],expected:!0,public:!1},{seed:1552,index:2,input:[[8,26,20,25,7,11,3,1,26,3,2,12]],expected:!0,public:!1},{seed:1552,index:3,input:[[3,8,7,4]],expected:!0,public:!1},{seed:1552,index:4,input:[[8,26,17,6,22,26,16,5]],expected:!0,public:!1},{seed:1553,index:0,input:[[20,4,26,20,22,5,17,18,9,2,7,30,29,16,7,22,9,3,2,14]],expected:!0,public:!1},{seed:1553,index:1,input:[[15,16,18,9,15,16]],expected:!1,public:!1},{seed:1553,index:2,input:[[1,28]],expected:!1,public:!1},{seed:1553,index:3,input:[[14,12,2]],expected:!0,public:!1},{seed:1553,index:4,input:[[20,16,6,26,26,2]],expected:!0,public:!1}],descriptionMarkdown:`# Partition Equal Subset Sum

You are given a non-empty array \`nums\` of positive integers. Decide whether
the elements can be split into two groups, with every element in exactly one
group, such that both groups have the same sum.

Return \`true\` if such a split exists and \`false\` otherwise.

## Examples

\`\`\`
Input: nums = [3, 1, 4, 2]
Output: true
Explanation: {3, 2} and {1, 4} both sum to 5.
\`\`\`

\`\`\`
Input: nums = [2, 3, 6]
Output: false
Explanation: the total, 11, is odd, so no equal split is possible.
\`\`\`

## Constraints

- \`1 <= nums.length <= 200\`
- \`1 <= nums[i] <= 100\`

## Notes

An equal split exists exactly when some subset sums to half of the total.
That is a 0/1 knapsack reachability question: keep a boolean table of
reachable sums up to \`total / 2\`, iterating sums downward for each element
so it is used at most once.
`}];export{e as default};
