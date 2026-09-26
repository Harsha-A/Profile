const e=[{slug:"maximum-sum-circular-subarray",title:"Maximum Sum Circular Subarray",difficulty:"Medium",tags:["array","greedy","dynamic-programming","kadane"],function:{name:"maxSubarraySumCircular",params:[{name:"nums",type:"number[]"}],returns:"number"},compare:{mode:"exact"},limits:{timeMs:1e3},tests:[{input:[[4,-7,2,-1,3]],expected:8,public:!0},{input:[[-4,-1,-6]],expected:-1,public:!0},{input:[[-2,6,-3]],expected:6,public:!1},{input:[[2,2,2]],expected:6,public:!1},{input:[[7]],expected:7,public:!1},{input:[[5,-2,-2,5,-8,3]],public:!1,expected:9}],generated:{seeds:[1621,1622,1623],perSeed:5},variantId:"default",key:"maximum-sum-circular-subarray:default",generatedTests:[{seed:1621,index:0,input:[[37,27,5,-30,48,-42,-39,48,3,30]],expected:168,public:!1},{seed:1621,index:1,input:[[16,17]],expected:33,public:!1},{seed:1621,index:2,input:[[0,-43,32]],expected:32,public:!1},{seed:1621,index:3,input:[[16,26,-15,-35,-16]],expected:42,public:!1},{seed:1621,index:4,input:[[40,-40,-11,-1]],expected:40,public:!1},{seed:1622,index:0,input:[[15,17,-21,-44,12,44,-15,-40,-32,26]],expected:58,public:!1},{seed:1622,index:1,input:[[-39,-7,-19,-4,-1,-35,-33,-19,-3,-46,-50,-12,-30,-39,-43,-31,-2,-42]],expected:-1,public:!1},{seed:1622,index:2,input:[[-29,27,-41]],expected:27,public:!1},{seed:1622,index:3,input:[[-36,13,4,-22,-35,45,42,-2,-22,-41,-4,2,-6,-1,46,48,-20,-10,6,10]],expected:107,public:!1},{seed:1622,index:4,input:[[-25,-13,-41,12,-34,-24,-3,25]],expected:25,public:!1},{seed:1623,index:0,input:[[-19,4,-16,-22,22,17,-19,-16,-3,32,14,30,-12,-27,38,28]],expected:104,public:!1},{seed:1623,index:1,input:[[-30,-23,-12,-45,-22,-3,-11,-27,-19]],expected:-3,public:!1},{seed:1623,index:2,input:[[26,17,-40,-12,-36,46,43,19]],expected:151,public:!1},{seed:1623,index:3,input:[[-25,18,1,14,-45,35,43,40,-30,31,3,-6,-2]],expected:122,public:!1},{seed:1623,index:4,input:[[-32,-34,20,-12,-1,16,14,-28,3,5,-17,-1,-34,17,-24]],expected:37,public:!1}],descriptionMarkdown:`# Maximum Sum Circular Subarray

You are given an integer array \`nums\` of length \`n\` that is treated as
circular: the element after \`nums[n - 1]\` is \`nums[0]\`.

A circular subarray is a run of \`k\` consecutive positions
\`i, (i + 1) mod n, ..., (i + k - 1) mod n\` with \`1 <= k <= n\`. It may wrap
around the end of the array, but it can include each index **at most once**,
so it never contains more than \`n\` elements.

Return the largest sum of any **non-empty** circular subarray. If every value
is negative, the answer is the single largest element.

## Examples

\`\`\`
Input: nums = [4, -7, 2, -1, 3]
Output: 8
Explanation: Wrapping from index 2 around to index 0 gives [2, -1, 3, 4] = 8.
\`\`\`

\`\`\`
Input: nums = [-4, -1, -6]
Output: -1
\`\`\`

## Constraints

- \`1 <= nums.length <= 3 * 10^4\`
- \`-3 * 10^4 <= nums[i] <= 3 * 10^4\`

## Notes

A wrapping subarray is the whole array minus a non-wrapping middle block, so
its best sum is the total minus the minimum-sum subarray. Compare that with
the ordinary maximum subarray sum. When all values are negative, the
"total minus minimum" candidate corresponds to an empty selection and must
be ignored.
`}];export{e as default};
