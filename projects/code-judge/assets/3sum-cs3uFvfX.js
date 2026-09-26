const e=[{slug:"3sum",title:"3Sum",difficulty:"Medium",tags:["array","two-pointers","sorting"],function:{name:"threeSum",params:[{name:"nums",type:"number[]"}],returns:"number[][]"},compare:{mode:"unordered",deep:!0},limits:{timeMs:1e3},tests:[{input:[[-2,0,1,1,2,-1]],expected:[[-2,0,2],[-2,1,1],[-1,0,1]],public:!0},{input:[[5,6,7]],expected:[],public:!0},{input:[[0,0,0,0]],expected:[[0,0,0]],public:!0},{input:[[-4,-1,-1,0,1,2]],expected:[[-1,-1,2],[-1,0,1]],public:!1},{input:[[3,-3,0]],expected:[[-3,0,3]],public:!1},{input:[[1,1,-2,-2,1,4,-2]],public:!1,expected:[[-2,-2,4],[-2,1,1]]},{input:[[-5,-5,10,5,0,0,5,-10]],public:!1,expected:[[-10,0,10],[-10,5,5],[-5,-5,10],[-5,0,5]]}],generated:{seeds:[1501,1502,1503],perSeed:5},variantId:"default",key:"3sum:default",generatedTests:[{seed:1501,index:0,input:[[-9,-6,-6,-7]],expected:[],public:!1},{seed:1501,index:1,input:[[9,7,3,10,-3,-10,-7,6]],expected:[[-10,3,7],[-7,-3,10]],public:!1},{seed:1501,index:2,input:[[-5,3,6]],expected:[],public:!1},{seed:1501,index:3,input:[[8,0,-10,8,-7,-10,2,-8,-8,-10,5,9,7,-6]],expected:[[-10,2,8],[-8,0,8],[-7,0,7],[-7,2,5]],public:!1},{seed:1501,index:4,input:[[7,-2,-4,-2,4,-10,3]],expected:[[-10,3,7],[-2,-2,4]],public:!1},{seed:1502,index:0,input:[[8,8,9]],expected:[],public:!1},{seed:1502,index:1,input:[[10,7,-1,8,4,-8]],expected:[],public:!1},{seed:1502,index:2,input:[[-9,-4,-7,-5,-9,-2,3,2,-2,0,10,9,10,-5,-8,9]],expected:[[-9,0,9],[-8,-2,10],[-7,-2,9],[-5,-5,10],[-5,-4,9],[-5,2,3],[-2,0,2]],public:!1},{seed:1502,index:3,input:[[-7,-8,5,-8,-4]],expected:[],public:!1},{seed:1502,index:4,input:[[5,9,-3,3,0,-10]],expected:[[-3,0,3]],public:!1},{seed:1503,index:0,input:[[1,-8,-3,-4,2,8,8,0,2,-6,8,7,5]],expected:[[-8,0,8],[-8,1,7],[-6,1,5],[-4,-3,7],[-4,2,2],[-3,1,2]],public:!1},{seed:1503,index:1,input:[[7,0,6,4,-4,-3,-10,-4,1,2,-3,-8,7]],expected:[[-10,4,6],[-8,1,7],[-8,2,6],[-4,-3,7],[-4,0,4],[-3,-3,6],[-3,1,2]],public:!1},{seed:1503,index:2,input:[[0,-1,5,-7]],expected:[],public:!1},{seed:1503,index:3,input:[[-8,-9,-8,8,8,-1,-7,5]],expected:[[-7,-1,8]],public:!1},{seed:1503,index:4,input:[[-10,4,-2,-10,-4,-10,-8,-2,-1,-7,3,-6,-10,2,1]],expected:[[-7,3,4],[-6,2,4],[-4,1,3],[-2,-2,4],[-2,-1,3]],public:!1}],descriptionMarkdown:`# 3Sum

You are given an integer array \`nums\`. Find every distinct combination of
three values, taken from three different positions of the array, whose sum
is exactly \`0\`. Return these combinations as a list of triples.

Two triples count as the same combination when they contain the same values
with the same multiplicities, regardless of which positions the values came
from. Each distinct combination must appear exactly once; repeating a
combination is wrong.

The order of the triples in the returned list does not matter, and the order
of the three values inside each triple does not matter either. The judge
compares your answer against the expected one after sorting every level.
Return an empty list when no triple sums to \`0\`.

## Examples

\`\`\`
Input: nums = [-2, 0, 1, 1, 2, -1]
Output: [[-2, 0, 2], [-2, 1, 1], [-1, 0, 1]]
\`\`\`

\`\`\`
Input: nums = [0, 0, 0, 0]
Output: [[0, 0, 0]]
Explanation: four zeros only give one distinct combination.
\`\`\`

## Constraints

- \`3 <= nums.length <= 3000\`
- \`-10^5 <= nums[i] <= 10^5\`

## Notes

Sort the array, fix the smallest value of the triple, and close in on the
remaining pair with two pointers. Skipping values equal to the previous one
at each level avoids emitting duplicates.
`}];export{e as default};
