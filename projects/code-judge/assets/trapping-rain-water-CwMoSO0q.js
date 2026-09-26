const e=[{slug:"trapping-rain-water",title:"Trapping Rain Water",difficulty:"Hard",tags:["array","two-pointers","dynamic-programming","stack"],function:{name:"trap",params:[{name:"height",type:"number[]"}],returns:"number"},compare:{mode:"exact"},limits:{timeMs:1e3},tests:[{input:[[3,0,1,0,2,4,1,2]],expected:10,public:!0},{input:[[1,2,3,2,1]],expected:0,public:!0},{input:[[5]],expected:0,public:!1},{input:[[2,0,2]],expected:2,public:!1},{input:[[0,0,0,0]],expected:0,public:!1},{input:[[5,1,1,1,3]],expected:6,public:!1},{input:[[4,2,0,3,2,5,0,1,6,2,3]],public:!1,expected:19}],generated:{seeds:[4201,4202,4203],perSeed:5},variantId:"default",key:"trapping-rain-water:default",generatedTests:[{seed:4201,index:0,input:[[6,6,6,6,3,8,1]],expected:3,public:!1},{seed:4201,index:1,input:[[8,0,0,3]],expected:6,public:!1},{seed:4201,index:2,input:[[4,3,2,5,2,5,2,9,7,4,1,3,8,2,7,4]],expected:31,public:!1},{seed:4201,index:3,input:[[8,0,7,8,1,3,0,1,5,1,6,7,9,4,0,6,0,0,2,1,5,1,1]],expected:74,public:!1},{seed:4201,index:4,input:[[5,9]],expected:0,public:!1},{seed:4202,index:0,input:[[5,4,3,4,9,1,2,4,0,5,6,1,3,4,6,1,8,8,0,1,3,1]],expected:64,public:!1},{seed:4202,index:1,input:[[7,0,9,0,2,6,5,4,4,9,5,0,4,6,6,3,6,0,6,7,4,5]],expected:68,public:!1},{seed:4202,index:2,input:[[8,8,9,5,6,1,1,2,3,7,5]],expected:24,public:!1},{seed:4202,index:3,input:[[5,9,8]],expected:0,public:!1},{seed:4202,index:4,input:[[0,5,9,2,4,2,4,7,0,1,9,0,2]],expected:45,public:!1},{seed:4203,index:0,input:[[1,3,5,9,3,1,2,3,7,0,3,4,3,6,7,2,7,5]],expected:43,public:!1},{seed:4203,index:1,input:[[0,3,4,7,8,7,6,4,5,2,1,1,5]],expected:12,public:!1},{seed:4203,index:2,input:[[1,4,5,5,5,1,2,3,5,2,8,6,4]],expected:12,public:!1},{seed:4203,index:3,input:[[2,5,7,4,0,2,7]],expected:15,public:!1},{seed:4203,index:4,input:[[8,4,3,8,3,3]],expected:9,public:!1}],descriptionMarkdown:`# Trapping Rain Water

You are given an array \`height\` of non-negative integers describing a row of
unit-width columns: column \`i\` has height \`height[i]\`. Water poured over the
row settles in the dips between columns and spills off both ends.

The water level above column \`i\` equals the smaller of the tallest column at
or left of \`i\` and the tallest column at or right of \`i\`. The water held
above column \`i\` is that level minus \`height[i]\`. Return the total amount of
water held across all columns.

## Examples

\`\`\`
Input: height = [3, 0, 1, 0, 2, 4, 1, 2]
Output: 10
Explanation: columns 1..4 hold 3 + 2 + 3 + 1 units; column 6 holds 1 more.
\`\`\`

\`\`\`
Input: height = [1, 2, 3, 2, 1]
Output: 0
Explanation: the profile never dips, so nothing is held.
\`\`\`

## Constraints

- \`1 <= height.length <= 2 * 10^4\`
- \`0 <= height[i] <= 10^5\`

## Notes

Two pointers moving inward can track the running maximum on each side. The
side with the smaller current column is bounded by its own running maximum,
so its water can be settled immediately.
`}];export{e as default};
