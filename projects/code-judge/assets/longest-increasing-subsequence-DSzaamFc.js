const e=[{slug:"longest-increasing-subsequence",title:"Longest Increasing Subsequence",difficulty:"Medium",tags:["array","dynamic-programming","binary-search"],function:{name:"lengthOfLIS",params:[{name:"nums",type:"number[]"}],returns:"number"},compare:{mode:"exact"},limits:{timeMs:1e3},tests:[{input:[[4,1,5,2,6,3]],expected:3,public:!0},{input:[[7,7,7]],expected:1,public:!0},{input:[[1,3,2,4,3,5]],expected:4,public:!1},{input:[[10]],expected:1,public:!1},{input:[[5,4,3,2,1]],expected:1,public:!1},{input:[[-3,-1,-2,0,8,2,3]],expected:5,public:!1},{input:[[2,9,3,8,4,7,5,6]],public:!1,expected:5}],generated:{seeds:[1541,1542,1543],perSeed:5},variantId:"default",key:"longest-increasing-subsequence:default",generatedTests:[{seed:1541,index:0,input:[[-11,7,-24,19]],expected:3,public:!1},{seed:1541,index:1,input:[[0,0,0,-2,2,0,0,-3,-1,-3,1,-3,-3,-1,1,2,-3,0,2,0,-2,0,-2,-3]],expected:4,public:!1},{seed:1541,index:2,input:[[4,-14,-15,19,-23,-11,-8,22,22,19,-11,14,-15,-25,-27,12,20,-23,-17,-19,-13,-10,18,3,-17,14,9,21,-13,-27]],expected:8,public:!1},{seed:1541,index:3,input:[[7,-4]],expected:1,public:!1},{seed:1541,index:4,input:[[6,-15,0,-3,16,7,13,-12]],expected:4,public:!1},{seed:1542,index:0,input:[[22,17,-27,-4,9,8,-5,-22,-27,-26,-2,-3,16,9,6,-3,-23,-13,13,-14,-2,-11]],expected:5,public:!1},{seed:1542,index:1,input:[[1,2,-3,-3,3,-3,-3,-3]],expected:3,public:!1},{seed:1542,index:2,input:[[9,5,-19,-19,-7,-2,8,8,3,12]],expected:5,public:!1},{seed:1542,index:3,input:[[-26,-26,-28,-7,22,-4,-28,24,-25,6,12,-20,13]],expected:6,public:!1},{seed:1542,index:4,input:[[-10,11,10,-7,-8,-10,-7,0,-7,4]],expected:5,public:!1},{seed:1543,index:0,input:[[6,-6,13,-15,13,-11,-9,-5,-9,2,7,1,14,0,-2,12,-10]],expected:7,public:!1},{seed:1543,index:1,input:[[3,3,-6,-6,9,7,-10,-5,-5,-11,10,-1,15,12,-2,-14,-4,-19,7,7,16,15,-2]],expected:5,public:!1},{seed:1543,index:2,input:[[1,1,2,0,0,0,-1,2]],expected:2,public:!1},{seed:1543,index:3,input:[[-3,3,1,-3,-1,0,1,-1,2,2,-2,-3,-3,3,-4,-3,1,-3,-4,-3,-4,1,3,-1,-4,0,-4,0,-4,-3]],expected:6,public:!1},{seed:1543,index:4,input:[[7,7,5,2,14,-11,8,-8,0,0,16,0,-20,20,-16,-19,1,-5,-20,17,13,6,-20,-15]],expected:5,public:!1}],descriptionMarkdown:`# Longest Increasing Subsequence

You are given a non-empty integer array \`nums\`. A subsequence keeps some of
the elements (at least one) in their original order, not necessarily
adjacent. It is strictly increasing when every kept element is larger than
the one kept before it.

Return the **length** of the longest strictly increasing subsequence. Only
the length is returned, not the subsequence itself.

## Examples

\`\`\`
Input: nums = [4, 1, 5, 2, 6, 3]
Output: 3
Explanation: [1, 2, 3], [1, 5, 6] and [4, 5, 6] all have length 3;
nothing longer exists.
\`\`\`

\`\`\`
Input: nums = [7, 7, 7]
Output: 1
Explanation: equal values do not count as increasing.
\`\`\`

## Constraints

- \`1 <= nums.length <= 2500\`
- \`-10^4 <= nums[i] <= 10^4\`

## Notes

The quadratic DP (\`len[i]\` = best length ending at \`i\`) is enough for these
bounds. An \`O(n log n)\` approach keeps, for each length, the smallest
possible tail value and updates it with binary search.
`}];export{e as default};
