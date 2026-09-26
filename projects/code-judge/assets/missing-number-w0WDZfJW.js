const e=[{slug:"missing-number",title:"Missing Number",difficulty:"Easy",tags:["array","math","bit-manipulation","xor"],function:{name:"missingNumber",params:[{name:"nums",type:"number[]"}],returns:"number"},compare:{mode:"exact"},limits:{timeMs:1e3},tests:[{input:[[4,0,1,3]],expected:2,public:!0},{input:[[1,2,0]],expected:3,public:!0},{input:[[1]],expected:0,public:!1},{input:[[0]],expected:1,public:!1},{input:[[5,2,6,0,1,3]],expected:4,public:!1},{input:[[8,3,5,2,4,6,0,1]],public:!1,expected:7}],generated:{seeds:[2681,2682,2683],perSeed:5},variantId:"default",key:"missing-number:default",generatedTests:[{seed:2681,index:0,input:[[0,9,11,4,12,3,6,8,1,7,5,10]],expected:2,public:!1},{seed:2681,index:1,input:[[18,19,4,2,11,1,8,6,15,12,16,7,20,21,5,9,0,14,17,10,13]],expected:3,public:!1},{seed:2681,index:2,input:[[12,9,11,5,4,10,19,26,8,6,7,14,2,24,25,23,1,18,22,3,13,15,21,16,20,17]],expected:0,public:!1},{seed:2681,index:3,input:[[7,4,3,12,5,8,18,9,16,14,15,6,0,13,1,10,11,2]],expected:17,public:!1},{seed:2681,index:4,input:[[15,10,11,8,2,17,16,0,4,5,6,9,14,12,3,13,1]],expected:7,public:!1},{seed:2682,index:0,input:[[1,3,0]],expected:2,public:!1},{seed:2682,index:1,input:[[25,18,15,21,0,14,24,4,19,6,12,13,20,27,8,26,11,30,9,2,17,22,3,10,29,7,23,5,28,1]],expected:16,public:!1},{seed:2682,index:2,input:[[5,0,4,1,2]],expected:3,public:!1},{seed:2682,index:3,input:[[5,1,3,2,0,15,13,10,11,9,14,4,6,12,8]],expected:7,public:!1},{seed:2682,index:4,input:[[3,20,23,4,2,18,10,17,12,11,14,13,22,21,7,5,8,19,9,1,6,0,16]],expected:15,public:!1},{seed:2683,index:0,input:[[5,1,9,13,8,7,12,2,14,0,10,11,4,6]],expected:3,public:!1},{seed:2683,index:1,input:[[5,12,2,1,8,7,15,6,0,16,9,11,4,10,3,13]],expected:14,public:!1},{seed:2683,index:2,input:[[18,13,19,4,5,12,10,20,8,7,2,11,6,17,9,15,14,0,3,1]],expected:16,public:!1},{seed:2683,index:3,input:[[3,2,0,4,1]],expected:5,public:!1},{seed:2683,index:4,input:[[5,1,3,4,2]],expected:0,public:!1}],descriptionMarkdown:`# Missing Number

You are given an array \`nums\` of length \`n\` whose elements are distinct
integers drawn from the range \`0\` to \`n\` inclusive. That range has \`n + 1\`
values, so exactly one of them is absent from the array. Return the absent
value.

Aim for linear time and constant extra space.

## Examples

\`\`\`
Input: nums = [4, 0, 1, 3]
Output: 2
Explanation: n = 4, the range is 0..4, and 2 does not appear.
\`\`\`

\`\`\`
Input: nums = [1, 2, 0]
Output: 3
Explanation: n = 3, and the missing value is the top of the range.
\`\`\`

## Constraints

- \`1 <= n == nums.length <= 10^4\`
- \`0 <= nums[i] <= n\`
- All elements of \`nums\` are distinct.

## Bit width

All indices and values are at most \`10^4\`, far inside the signed 32-bit
range, so XOR-based solutions are exact. The arithmetic approach (expected
sum \`n * (n + 1) / 2\` minus the actual sum) is also exact in doubles.

## Notes

XOR every index \`0..n\` together with every element; each present value
cancels with its matching index and only the missing value remains.
`}];export{e as default};
