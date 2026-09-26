const e=[{slug:"majority-element-ii",title:"Majority Element II",difficulty:"Medium",tags:["array","hash-map","counting","boyer-moore"],function:{name:"majorityElement",params:[{name:"nums",type:"number[]"}],returns:"number[]"},compare:{mode:"unordered"},limits:{timeMs:1e3},tests:[{input:[[4,1,4,2,4,1,1]],expected:[4,1],public:!0},{input:[[6,3,9]],expected:[],public:!0},{input:[[7]],expected:[7],public:!1},{input:[[2,5]],expected:[2,5],public:!1},{input:[[1,2,3,1,2,3]],expected:[],public:!1},{input:[[-5,-5,0,8,-5,8,8,3]],public:!1,expected:[-5,8]}],generated:{seeds:[2291,2292,2293],perSeed:5},variantId:"default",key:"majority-element-ii:default",generatedTests:[{seed:2291,index:0,input:[[-16,-3,-3,-20,-16,-3,-16,13,-20,13,-16,-3,-3,-3,-3,-3,-16,-3,-16]],expected:[-3],public:!1},{seed:2291,index:1,input:[[4,6,4,-9,6,6,-9,-20,6,4,-20,-9,-20,6,-20]],expected:[],public:!1},{seed:2291,index:2,input:[[-3,-4,-3]],expected:[-3],public:!1},{seed:2291,index:3,input:[[5,5,5,5,5,18,-17,18,5,-17]],expected:[5],public:!1},{seed:2291,index:4,input:[[-2,-2,7,-10,-2,7,-10,7,7,7,-10,-10,7,7,7]],expected:[7],public:!1},{seed:2292,index:0,input:[[-11,-11,12,-11,12,-11]],expected:[-11],public:!1},{seed:2292,index:1,input:[[-5,0,0,0,0,-5,-15,-5,-5,0,0,0,0,-15]],expected:[0],public:!1},{seed:2292,index:2,input:[[-6,-8,-8,-8]],expected:[-8],public:!1},{seed:2292,index:3,input:[[7,0,7,0]],expected:[7,0],public:!1},{seed:2292,index:4,input:[[-11,-11,-11,10]],expected:[-11],public:!1},{seed:2293,index:0,input:[[8,8,-3,-3,3,3,8,8,-3,3,-3,3,8,-3,-3,-3,8,3,8,-1,-3,-3,-3,8,-3]],expected:[-3],public:!1},{seed:2293,index:1,input:[[-12,-12,-17,-12,-17,-17,-12,5,5,-12,-12,-12]],expected:[-12],public:!1},{seed:2293,index:2,input:[[-16,18,18,5,-16,5,18,20,18,18,18,5,18,-16,-17,18,18,5,18,18,18,-17,18]],expected:[18],public:!1},{seed:2293,index:3,input:[[1,1,7,7,7,1,7,7,7,1,7,1,7,7,7,7,1,7,1,1]],expected:[7,1],public:!1},{seed:2293,index:4,input:[[-18,-18,15,-18,15,-18,-18,-18,-2,-18,-18]],expected:[-18],public:!1}],descriptionMarkdown:`# Majority Element II

You are given an integer array \`nums\` of length \`n\`. Return every distinct
value that occurs strictly more than \`floor(n / 3)\` times. The values may be
returned in any order. If no value qualifies, return an empty array.

At most two values can satisfy this condition.

## Examples

\`\`\`
Input: nums = [4, 1, 4, 2, 4, 1, 1]
Output: [4, 1]
Explanation: n = 7, so the threshold is 2. Both 4 and 1 occur 3 times.
\`\`\`

\`\`\`
Input: nums = [6, 3, 9]
Output: []
Explanation: the threshold is 1 and every value occurs exactly once.
\`\`\`

## Constraints

- \`1 <= nums.length <= 5 * 10^4\`
- \`-10^9 <= nums[i] <= 10^9\`

## Notes

A hash map of counts solves this in \`O(n)\` time and \`O(n)\` space. A
two-candidate voting pass followed by a verification pass reaches \`O(1)\`
extra space.
`}];export{e as default};
