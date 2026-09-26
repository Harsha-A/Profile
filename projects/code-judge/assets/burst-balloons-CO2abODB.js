const e=[{slug:"burst-balloons",title:"Burst Balloons",difficulty:"Hard",tags:["array","dynamic-programming","interval-dp"],function:{name:"maxCoins",params:[{name:"nums",type:"number[]"}],returns:"number"},compare:{mode:"exact"},limits:{timeMs:1e3},tests:[{input:[[2,4,3]],expected:33,public:!0},{input:[[0,5]],expected:5,public:!0},{input:[[7]],expected:7,public:!1},{input:[[1,2,3,4]],expected:40,public:!1},{input:[[6,0,2,9,1]],expected:180,public:!1},{input:[[9,1,8,2,7,3]],public:!1,expected:913}],generated:{seeds:[3121,3122,3123],perSeed:5},variantId:"default",key:"burst-balloons:default",generatedTests:[{seed:3121,index:0,input:[[2,3,1,0,2,3,8]],expected:174,public:!1},{seed:3121,index:1,input:[[9,2,2,5,5,7]],expected:738,public:!1},{seed:3121,index:2,input:[[8,0,8,6,3,6,5,7]],expected:1454,public:!1},{seed:3121,index:3,input:[[5,7,3,3,6,5]],expected:604,public:!1},{seed:3121,index:4,input:[[2,1,7,4,4,8,4,3]],expected:725,public:!1},{seed:3122,index:0,input:[[5,6]],expected:36,public:!1},{seed:3122,index:1,input:[[2,7,1,8,3,0,0,9]],expected:929,public:!1},{seed:3122,index:2,input:[[4]],expected:4,public:!1},{seed:3122,index:3,input:[[7,6,0]],expected:49,public:!1},{seed:3122,index:4,input:[[0,0,0]],expected:0,public:!1},{seed:3123,index:0,input:[[2,2,8,9,5,2,0]],expected:512,public:!1},{seed:3123,index:1,input:[[1]],expected:1,public:!1},{seed:3123,index:2,input:[[8,9,7,8,8]],expected:1728,public:!1},{seed:3123,index:3,input:[[4,3,5,8]],expected:260,public:!1},{seed:3123,index:4,input:[[5,7]],expected:42,public:!1}],descriptionMarkdown:`# Burst Balloons

You are given an array \`nums\` of non-negative integers. You must remove every
element, one at a time, in an order of your choosing.

When you remove the element with value \`v\`, you earn \`left * v * right\`
points, where \`left\` and \`right\` are the values of the elements immediately
to its left and right **among the elements still present** at that moment. If
there is no element on a side (it is at the current boundary), that side
counts as \`1\`. After removal, the former neighbours become adjacent.

Return the maximum total number of points obtainable by removing all
elements.

## Examples

\`\`\`
Input: nums = [2, 4, 3]
Output: 33
Explanation: remove 4 first (2 * 4 * 3 = 24), leaving [2, 3];
remove 2 (1 * 2 * 3 = 6), leaving [3]; remove 3 (1 * 3 * 1 = 3).
Total 24 + 6 + 3 = 33.
\`\`\`

\`\`\`
Input: nums = [0, 5]
Output: 5
Explanation: remove 0 first (1 * 0 * 5 = 0), then 5 (1 * 5 * 1 = 5).
\`\`\`

## Constraints

- \`1 <= nums.length <= 300\`
- \`0 <= nums[i] <= 100\`

## Notes

Pad the array with a \`1\` at each end. For an open interval \`(l, r)\`, choose
the element \`k\` inside it that is removed **last**; at that moment its
neighbours are exactly \`l\` and \`r\`, so
\`dp[l][r] = max over l < k < r of dp[l][k] + dp[k][r] + vals[l] * vals[k] * vals[r]\`.
`}];export{e as default};
