const e=[{slug:"4sum",title:"4Sum",difficulty:"Medium",tags:["array","two-pointers","sorting"],function:{name:"fourSum",params:[{name:"nums",type:"number[]"},{name:"target",type:"number"}],returns:"number[][]"},compare:{mode:"unordered",deep:!0},limits:{timeMs:1e3},tests:[{input:[[3,-1,0,2,-2,1],2],expected:[[-2,-1,2,3],[-2,0,1,3],[-1,0,1,2]],public:!0},{input:[[4,4,4,4,4],16],expected:[[4,4,4,4]],public:!0},{input:[[1,2,3],6],expected:[],public:!1},{input:[[1,1,1,1],5],expected:[],public:!1},{input:[[1e9,1e9,1e9,1e9],-294967296],expected:[],public:!1},{input:[[-3,-2,-1,0,0,1,2,3],0],public:!1,expected:[[-3,-2,2,3],[-3,-1,1,3],[-3,0,0,3],[-3,0,1,2],[-2,-1,0,3],[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]},{input:[[2,2,2,2,1,3,1,3],8],public:!1,expected:[[1,1,3,3],[1,2,2,3],[2,2,2,2]]}],generated:{seeds:[1801,1802,1803],perSeed:5},variantId:"default",key:"4sum:default",generatedTests:[{seed:1801,index:0,input:[[-6,1,8,1,0,1,-2,8,-2,-4],8],expected:[[-6,-2,8,8],[-2,1,1,8]],public:!1},{seed:1801,index:1,input:[[6,1,-5,1,-5,-4],2],expected:[],public:!1},{seed:1801,index:2,input:[[4,7,4,-7,8,3,8,-2,0,7,1],2],expected:[[-7,-2,3,8],[-7,-2,4,7],[-7,0,1,8],[-7,1,4,4],[-2,0,1,3]],public:!1},{seed:1801,index:3,input:[[7,-5,-6,-8,8,1],2],expected:[[-8,-5,7,8]],public:!1},{seed:1801,index:4,input:[[-8,3,-3,-6,-7,-6,8,3,-5,-4,-5,7,-4],-2],expected:[[-8,-5,3,8],[-8,-4,3,7],[-7,-6,3,8],[-7,-5,3,7],[-6,-6,3,7],[-5,-3,3,3],[-4,-4,3,3]],public:!1},{seed:1802,index:0,input:[[-3,0,-5,7,-3,-7,7,3,2,5,-2,-3,-2],-10],expected:[[-7,-5,-3,5],[-7,-5,0,2],[-7,-3,-3,3],[-7,-3,-2,2],[-5,-3,-2,0],[-3,-3,-2,-2]],public:!1},{seed:1802,index:1,input:[[-7,-3,4,1,-2,-7,5,-7,5,-8,2,1],-5],expected:[[-8,-7,5,5],[-8,-3,1,5],[-8,-3,2,4],[-8,-2,1,4],[-7,-7,4,5],[-7,-3,1,4]],public:!1},{seed:1802,index:2,input:[[-8,3,-5,5,7,-1,0,-3,3],-6],expected:[[-8,-5,0,7],[-8,-3,0,5],[-8,-1,0,3],[-5,-3,-1,3]],public:!1},{seed:1802,index:3,input:[[8,-7,5,-7,1,-8,-2,-4,1,4],1],expected:[[-8,-4,5,8],[-7,-4,4,8]],public:!1},{seed:1802,index:4,input:[[-7,8,1,6,3,4,-4,-5,8,-2],8],expected:[[-7,1,6,8],[-7,3,4,8],[-5,1,4,8],[-5,3,4,6],[-4,-2,6,8],[-4,1,3,8],[-2,1,3,6]],public:!1},{seed:1803,index:0,input:[[-5,8,6],3],expected:[],public:!1},{seed:1803,index:1,input:[[-2,-6,4,0,0,-6,5,7,-2,7],-5],expected:[[-6,-6,0,7],[-6,-2,-2,5]],public:!1},{seed:1803,index:2,input:[[-1,5,-1,5],4],expected:[],public:!1},{seed:1803,index:3,input:[[-5,-3,3,1,1,-3,-8,-3,2,-4,2],-8],expected:[[-8,-5,2,3],[-8,-4,1,3],[-8,-4,2,2],[-8,-3,1,2],[-5,-3,-3,3],[-4,-3,-3,2],[-3,-3,-3,1]],public:!1},{seed:1803,index:4,input:[[7,2,-1,0,5,-2,-6,0,-5],-3],expected:[[-6,-2,0,5],[-5,-2,-1,5],[-5,0,0,2],[-2,-1,0,0]],public:!1}],descriptionMarkdown:`# 4Sum

You are given an integer array \`nums\` and an integer \`target\`. Find every
distinct combination of four values, taken from four different positions of
the array, whose sum equals \`target\`. Return these combinations as a list of
quadruples.

Two quadruples count as the same combination when they contain the same
values with the same multiplicities, regardless of which positions the values
came from. Each distinct combination must appear exactly once.

The order of the quadruples in the returned list does not matter, and the
order of the four values inside each quadruple does not matter either. The
judge compares your answer against the expected one after sorting every
level. Return an empty list when no quadruple works (including when the
array has fewer than four elements).

## Examples

\`\`\`
Input: nums = [3, -1, 0, 2, -2, 1], target = 2
Output: [[-2, -1, 2, 3], [-2, 0, 1, 3], [-1, 0, 1, 2]]
\`\`\`

\`\`\`
Input: nums = [4, 4, 4, 4, 4], target = 16
Output: [[4, 4, 4, 4]]
\`\`\`

## Constraints

- \`1 <= nums.length <= 200\`
- \`-10^9 <= nums[i] <= 10^9\`
- \`-10^9 <= target <= 10^9\`

## Notes

Sort, fix the first two values with nested loops, and find the last two with
two pointers, skipping repeated values at every level. Sums of four values
can reach \`4 * 10^9\`; in JavaScript these are still exact, but beware of
32-bit tricks that would overflow.
`}];export{e as default};
