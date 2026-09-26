const e=[{slug:"minimum-size-subarray-sum",title:"Minimum Size Subarray Sum",difficulty:"Medium",tags:["array","sliding-window","prefix-sum"],function:{name:"minSubArrayLen",params:[{name:"target",type:"number"},{name:"nums",type:"number[]"}],returns:"number"},compare:{mode:"exact"},limits:{timeMs:1e3},tests:[{input:[10,[3,1,6,2,5,1]],expected:3,public:!0},{input:[50,[4,9,2]],expected:0,public:!0},{input:[5,[5]],expected:1,public:!1},{input:[6,[5]],expected:0,public:!1},{input:[15,[1,2,3,4,5]],expected:5,public:!1},{input:[7,[1,1,1,1,7]],expected:1,public:!1},{input:[11,[2,8,1,1,9,3,2]],public:!1,expected:2}],generated:{seeds:[1601,1602,1603],perSeed:5},variantId:"default",key:"minimum-size-subarray-sum:default",generatedTests:[{seed:1601,index:0,input:[48,[2,10,10,10,4,15,10]],expected:5,public:!1},{seed:1601,index:1,input:[21,[10,5,13]],expected:3,public:!1},{seed:1601,index:2,input:[26,[19]],expected:0,public:!1},{seed:1601,index:3,input:[37,[7,9,7,5,5,5,19]],expected:5,public:!1},{seed:1601,index:4,input:[57,[8,18,2,16,15,11,19]],expected:4,public:!1},{seed:1602,index:0,input:[33,[10,7,1,2,3,7]],expected:0,public:!1},{seed:1602,index:1,input:[8,[5]],expected:0,public:!1},{seed:1602,index:2,input:[14,[13,14,9]],expected:1,public:!1},{seed:1602,index:3,input:[32,[9,5,8,4,20,20,5]],expected:2,public:!1},{seed:1602,index:4,input:[60,[19,18,10,14]],expected:4,public:!1},{seed:1603,index:0,input:[93,[12,15,18,9,20,9,9,16,6]],expected:7,public:!1},{seed:1603,index:1,input:[144,[14,11,20,3,1,12,3,7,16,19,9,20,8]],expected:0,public:!1},{seed:1603,index:2,input:[110,[18,16,9,10,2,8,19,14,4,2,16,3,2,6]],expected:11,public:!1},{seed:1603,index:3,input:[27,[15,19]],expected:2,public:!1},{seed:1603,index:4,input:[45,[11,17,20,16,17,16,20]],expected:3,public:!1}],descriptionMarkdown:`# Minimum Size Subarray Sum

You are given a positive integer \`target\` and an array \`nums\` of positive
integers. Return the smallest length of a contiguous, non-empty subarray whose
elements sum to at least \`target\`. If no such subarray exists, return \`0\`.

## Examples

\`\`\`
Input: target = 10, nums = [3, 1, 6, 2, 5, 1]
Output: 3
Explanation: [3, 1, 6] and [6, 2, 5] both reach the target with 3 elements;
no pair of adjacent elements does.
\`\`\`

\`\`\`
Input: target = 50, nums = [4, 9, 2]
Output: 0
\`\`\`

## Constraints

- \`1 <= target <= 10^9\`
- \`1 <= nums.length <= 10^5\`
- \`1 <= nums[i] <= 10^4\`

## Notes

Because every element is positive, the window sum only grows when the right
edge advances and only shrinks when the left edge advances. Expand on the
right, then shrink from the left while the sum still meets the target.
`}];export{e as default};
