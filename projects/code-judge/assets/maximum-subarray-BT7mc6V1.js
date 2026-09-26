const e=[{slug:"maximum-subarray",title:"Maximum Subarray",difficulty:"Medium",tags:["array","greedy","dynamic-programming","kadane"],function:{name:"maxSubArray",params:[{name:"nums",type:"number[]"}],returns:"number"},compare:{mode:"exact"},limits:{timeMs:1e3},tests:[{input:[[3,-4,5,-1,2,-6,1]],expected:6,public:!0},{input:[[-7,-2,-9]],expected:-2,public:!0},{input:[[4]],expected:4,public:!1},{input:[[1,2,3,4]],expected:10,public:!1},{input:[[-1,0,-2]],expected:0,public:!1},{input:[[2,-1,2,-1,2,-10,5]],public:!1,expected:5}],generated:{seeds:[1611,1612,1613],perSeed:5},variantId:"default",key:"maximum-subarray:default",generatedTests:[{seed:1611,index:0,input:[[1,21,-43,-13,-11,45,-12,0,12,21,45,10,9,2,-42]],expected:132,public:!1},{seed:1611,index:1,input:[[-1,-42,-1,-23,-27,-16,-21,-2,-30]],expected:-1,public:!1},{seed:1611,index:2,input:[[8,30,36,14,18,-10,-9,-4,-43,-36,12,-4,-43,8]],expected:106,public:!1},{seed:1611,index:3,input:[[-13,15,-8,0,-27,-29,-38,1,42,-17]],expected:43,public:!1},{seed:1611,index:4,input:[[5,32,-15,16,-38,22,7,41,-9]],expected:70,public:!1},{seed:1612,index:0,input:[[29,-11,39,-37,32,23,43,-33,34,-25,-39,-40,-1,21,18,45]],expected:119,public:!1},{seed:1612,index:1,input:[[-48,-3,2,20,45,48,37,-41,-28,43,44,14,28,-41,-12,12]],expected:212,public:!1},{seed:1612,index:2,input:[[39,21,37]],expected:97,public:!1},{seed:1612,index:3,input:[[33,16,-2,23,-32,-7,20]],expected:70,public:!1},{seed:1612,index:4,input:[[48,3,-35,-2,-4,42,10]],expected:62,public:!1},{seed:1613,index:0,input:[[30,-2,-11,28]],expected:45,public:!1},{seed:1613,index:1,input:[[-3,-13,-28,-49,-17,-5,-12,-19,-7,-41,-21,-36,-43,-32,-12,-3,-42,-27,-41,-49]],expected:-3,public:!1},{seed:1613,index:2,input:[[-18,-45,3,-21,23,24,-41,-50,-26,6,-41,-13,50,30,-32,-4]],expected:80,public:!1},{seed:1613,index:3,input:[[-7,-35,32,8,-22]],expected:40,public:!1},{seed:1613,index:4,input:[[-1,12,-48,24,-40,-48,14]],expected:24,public:!1}],descriptionMarkdown:`# Maximum Subarray

You are given an integer array \`nums\`. A subarray is a contiguous block of
one or more consecutive elements. Return the largest possible sum of any
**non-empty** subarray.

Because the subarray must contain at least one element, an array whose
values are all negative has as its answer its single largest element, not 0.

## Examples

\`\`\`
Input: nums = [3, -4, 5, -1, 2, -6, 1]
Output: 6
Explanation: The subarray [5, -1, 2] sums to 6.
\`\`\`

\`\`\`
Input: nums = [-7, -2, -9]
Output: -2
Explanation: Every subarray has a negative sum; the best is [-2] alone.
\`\`\`

## Constraints

- \`1 <= nums.length <= 10^5\`
- \`-10^4 <= nums[i] <= 10^4\`

## Notes

Scan left to right keeping the best sum of a subarray that ends at the
current index: either extend the previous one or start fresh at the current
element, whichever is larger. The answer is the maximum of those values.
`}];export{e as default};
