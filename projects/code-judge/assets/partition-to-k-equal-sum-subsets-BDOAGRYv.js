const e=[{slug:"partition-to-k-equal-sum-subsets",title:"Partition to K Equal Sum Subsets",difficulty:"Medium",tags:["array","backtracking","bit-manipulation","dynamic-programming"],function:{name:"canPartitionKSubsets",params:[{name:"nums",type:"number[]"},{name:"k",type:"number"}],returns:"boolean"},compare:{mode:"exact"},limits:{timeMs:1e3},tests:[{input:[[6,1,5,2,4,3,3],3],expected:!0,public:!0},{input:[[2,2,2,5],2],expected:!1,public:!0},{input:[[9],1],expected:!0,public:!0},{input:[[1,1,1,1],4],expected:!0,public:!1},{input:[[3,3,3,3,6],3],expected:!0,public:!1},{input:[[10,10,5,5,5,5],3],expected:!1,public:!1},{input:[[10,10,5,5,5,5],4],expected:!0,public:!1},{input:[[4,4,4,6],2],expected:!1,public:!1},{input:[[8,2,7,3,6,4,5,5],4],expected:!0,public:!1},{input:[[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16],8],public:!1,expected:!0}],generated:{seeds:[6981,6982,6983],perSeed:5},variantId:"default",key:"partition-to-k-equal-sum-subsets:default",generatedTests:[{seed:6981,index:0,input:[[6,2,2,1,4,1,1,5,2,1,3,8],4],expected:!0,public:!1},{seed:6981,index:1,input:[[14,7,3,12,10,3,2,6,3],3],expected:!0,public:!1},{seed:6981,index:2,input:[[5,12,7,7],1],expected:!0,public:!1},{seed:6981,index:3,input:[[5,11,8,8,2,4,4,18],3],expected:!0,public:!1},{seed:6981,index:4,input:[[6,4,4,7,10,1,9,1],2],expected:!0,public:!1},{seed:6982,index:0,input:[[3,1,3,4,5,3,1,2,1,2,9,3,2,5],4],expected:!0,public:!1},{seed:6982,index:1,input:[[1,20,1,20,2,21,2,7,14],4],expected:!0,public:!1},{seed:6982,index:2,input:[[8,10,11,8],4],expected:!1,public:!1},{seed:6982,index:3,input:[[6,2,5,1,2,5],3],expected:!0,public:!1},{seed:6982,index:4,input:[[12,9,9,5,2],5],expected:!1,public:!1},{seed:6983,index:0,input:[[9,11,1,3,7,6,10,4,7,7,6,12],4],expected:!1,public:!1},{seed:6983,index:1,input:[[14,2],1],expected:!0,public:!1},{seed:6983,index:2,input:[[11,7,6,6,9,3,1],3],expected:!1,public:!1},{seed:6983,index:3,input:[[2,11,12,4,8,11,6,2],5],expected:!1,public:!1},{seed:6983,index:4,input:[[5,4,2,2,1],2],expected:!0,public:!1}],descriptionMarkdown:`# Partition to K Equal Sum Subsets

You are given an array \`nums\` of positive integers and an integer \`k\`.
Decide whether the elements of \`nums\` can be divided into exactly \`k\`
non-empty groups so that every element belongs to exactly one group and all
\`k\` groups have the same sum.

Return \`true\` if such a division exists and \`false\` otherwise.

## Examples

\`\`\`
Input: nums = [6, 1, 5, 2, 4, 3, 3], k = 3
Output: true
Explanation: the total is 24; [6, 2], [5, 3], [1, 4, 3] each sum to 8.
\`\`\`

\`\`\`
Input: nums = [2, 2, 2, 5], k = 2
Output: false
Explanation: each half would need to sum to 5.5.
\`\`\`

## Constraints

- \`1 <= k <= nums.length <= 16\`
- \`1 <= nums[i] <= 10^4\`

## Notes

The target per group is \`sum / k\`; reject if it is not an integer or if the
largest element exceeds it. Fill groups one at a time with backtracking over
the unused elements (largest first), or run a bitmask DP over used subsets.
`}];export{e as default};
