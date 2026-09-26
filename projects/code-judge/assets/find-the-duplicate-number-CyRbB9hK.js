const e=[{slug:"find-the-duplicate-number",title:"Find The Duplicate Number",difficulty:"Medium",tags:["array","two-pointers","binary-search","cycle-detection"],function:{name:"findDuplicate",params:[{name:"nums",type:"number[]"}],returns:"number"},compare:{mode:"exact"},limits:{timeMs:1e3},tests:[{input:[[2,5,1,4,5,3]],expected:5,public:!0},{input:[[3,3,3,1]],expected:3,public:!0},{input:[[1,1]],expected:1,public:!1},{input:[[4,2,1,3,2]],expected:2,public:!1},{input:[[6,2,7,1,7,7,3,5]],public:!1,expected:7}],generated:{seeds:[1601,1602,1603],perSeed:5},variantId:"default",key:"find-the-duplicate-number:default",generatedTests:[{seed:1601,index:0,input:[[1,1,3,5,1,8,2,9,7,4]],expected:1,public:!1},{seed:1601,index:1,input:[[3,3,3,3,3,3,3,3,3,2]],expected:3,public:!1},{seed:1601,index:2,input:[[1,4,2,2,5,3,2]],expected:2,public:!1},{seed:1601,index:3,input:[[7,3,13,9,4,8,10,6,13,2,16,13,13,19,13,13,17,13,18,13]],expected:13,public:!1},{seed:1601,index:4,input:[[10,6,5,3,3,1,7,9,11,8,3,2]],expected:3,public:!1},{seed:1602,index:0,input:[[7,4,5,3,1,4,8,6,2]],expected:4,public:!1},{seed:1602,index:1,input:[[4,3,3,3,3,3,3,3,3,3]],expected:3,public:!1},{seed:1602,index:2,input:[[5,4,1,7,1,3,1,1]],expected:1,public:!1},{seed:1602,index:3,input:[[1,4,3,2,4]],expected:4,public:!1},{seed:1602,index:4,input:[[9,8,8,8,8,8,4,8,8,8]],expected:8,public:!1},{seed:1603,index:0,input:[[10,7,7,7,7,7,12,7,7,9,4,7,7]],expected:7,public:!1},{seed:1603,index:1,input:[[18,14,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17]],expected:17,public:!1},{seed:1603,index:2,input:[[7,1,5,2,7,7,7,3]],expected:7,public:!1},{seed:1603,index:3,input:[[5,1,6,6,9,3,6,6,6,2,10]],expected:6,public:!1},{seed:1603,index:4,input:[[13,6,6,6,10,6,6,12,5,3,7,4,9,6,14,1]],expected:6,public:!1}],descriptionMarkdown:`# Find The Duplicate Number

You are given an array \`nums\` of length \`n + 1\` whose values all lie in the
range \`1..n\`. By counting, at least one value must appear more than once. In
every input exactly one distinct value is repeated (it may occur two or more
times); every other value appears at most once. Return the repeated value.

Do not modify \`nums\`, and aim for constant extra space.

## Examples

\`\`\`
Input: nums = [2, 5, 1, 4, 5, 3]
Output: 5
\`\`\`

\`\`\`
Input: nums = [3, 3, 3, 1]
Output: 3
\`\`\`

## Constraints

- \`1 <= n <= 10^5\`
- \`nums.length == n + 1\`
- \`1 <= nums[i] <= n\`
- Exactly one value occurs more than once.

## Notes

Treat each index \`i\` as a node with an edge to index \`nums[i]\`. Starting from
index \`0\`, following edges must eventually enter a cycle, and the cycle's
entry point is the repeated value. Floyd's slow/fast pointer technique finds
it in linear time with constant space.
`}];export{e as default};
