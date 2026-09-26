const e=[{slug:"search-in-rotated-sorted-array-ii",title:"Search In Rotated Sorted Array II",difficulty:"Medium",tags:["array","binary-search"],function:{name:"search",params:[{name:"nums",type:"number[]"},{name:"target",type:"number"}],returns:"boolean"},compare:{mode:"exact"},limits:{timeMs:1e3},tests:[{input:[[5,5,7,9,1,2,2,5],1],expected:!0,public:!0},{input:[[5,5,7,9,1,2,2,5],6],expected:!1,public:!0},{input:[[3,3,3,1,3],1],expected:!0,public:!1},{input:[[3,1,3,3,3],1],expected:!0,public:!1},{input:[[2,2,2,2],3],expected:!1,public:!1},{input:[[8],8],expected:!0,public:!1},{input:[[0,0,1,1,2,0],2],public:!1,expected:!0}],generated:{seeds:[811,812,813],perSeed:5},variantId:"default",key:"search-in-rotated-sorted-array-ii:default",generatedTests:[{seed:811,index:0,input:[[2,2,3,7,7],2],expected:!0,public:!1},{seed:811,index:1,input:[[0,2,2,3,3,3,3,4,5,5,6,6,6,6,7,7],7],expected:!0,public:!1},{seed:811,index:2,input:[[5,6,6,7,7,0,0,0,2,4,4,5],0],expected:!0,public:!1},{seed:811,index:3,input:[[5,6,7,7,7,7,2],7],expected:!0,public:!1},{seed:811,index:4,input:[[2,3,4,4,5,5,5,6,6,6,7,0,0,1,2,2],-2],expected:!1,public:!1},{seed:812,index:0,input:[[3,3,4,4,5,5,6,7,0,1,1,2],1],expected:!0,public:!1},{seed:812,index:1,input:[[1,1,2,4,5,5,5,5,6,7,7,0,0],2],expected:!0,public:!1},{seed:812,index:2,input:[[4,5,5,7,7,7,0,1,2,3],9],expected:!1,public:!1},{seed:812,index:3,input:[[1],-2],expected:!1,public:!1},{seed:812,index:4,input:[[0,1,2,3,3,4,4,7,7],4],expected:!0,public:!1},{seed:813,index:0,input:[[7,1,2,2],1],expected:!0,public:!1},{seed:813,index:1,input:[[4,4,4,4,4,5,6,6,7,7,0,0,2,4],0],expected:!0,public:!1},{seed:813,index:2,input:[[7,0,0,2,2,3,5,5,5,6,6,7,7],-1],expected:!1,public:!1},{seed:813,index:3,input:[[2,1,1],-1],expected:!1,public:!1},{seed:813,index:4,input:[[1,5,5,5,6,1],6],expected:!0,public:!1}],descriptionMarkdown:`# Search In Rotated Sorted Array II

You are given an array \`nums\` of integers and an integer \`target\`. \`nums\` was
formed by taking an array sorted in non-decreasing order (values may repeat)
and rotating it: a prefix of some length (possibly zero) was moved, in order,
to the end.

Return \`true\` if \`target\` occurs anywhere in \`nums\`, and \`false\` otherwise.

This function returns a boolean, not an index. Because values can repeat, a
value may occur at several positions, so only its presence is checked.

## Examples

\`\`\`
Input: nums = [5, 5, 7, 9, 1, 2, 2, 5], target = 1
Output: true
\`\`\`

\`\`\`
Input: nums = [5, 5, 7, 9, 1, 2, 2, 5], target = 6
Output: false
\`\`\`

## Constraints

- \`1 <= nums.length <= 5000\`
- \`-10^4 <= nums[i], target <= 10^4\`
- \`nums\` is a rotation of a non-decreasing array.

## Notes

Use the same half-is-sorted reasoning as the distinct-values version. When
the left end, middle, and right end are all equal, the sorted half cannot be
identified; shrink both ends by one and continue. That case makes the worst
case \`O(n)\`, while typical inputs remain logarithmic.
`}];export{e as default};
