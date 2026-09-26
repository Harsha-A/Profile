const e=[{slug:"stone-game-iii",title:"Stone Game III",difficulty:"Hard",tags:["array","dynamic-programming","game-theory"],function:{name:"scoreMargin",params:[{name:"values",type:"number[]"}],returns:"number"},compare:{mode:"exact"},limits:{timeMs:1e3},tests:[{input:[[5,-2,1,3]],expected:3,public:!0},{input:[[-1,-2,-3]],expected:0,public:!0},{input:[[1,2,3]],expected:6,public:!1},{input:[[4,-10,1]],expected:13,public:!1},{input:[[-7]],expected:-7,public:!1},{input:[[0,0,0,0]],expected:0,public:!1},{input:[[3,-9,2,8,-1,-4,6,0,5]],public:!1,expected:4}],generated:{seeds:[1591,1592,1593],perSeed:5},variantId:"default",key:"stone-game-iii:default",generatedTests:[{seed:1591,index:0,input:[[15,-13]],expected:28,public:!1},{seed:1591,index:1,input:[[4,-3,9]],expected:10,public:!1},{seed:1591,index:2,input:[[12,-13,14]],expected:13,public:!1},{seed:1591,index:3,input:[[3,-9,0,19,5,20,-7]],expected:9,public:!1},{seed:1591,index:4,input:[[20,-18,-11,3,20,-10,-2,-6,-19,-16,14,0,-14,-8,19]],expected:48,public:!1},{seed:1592,index:0,input:[[-12,3,2,2,-19,5,2,-7,12,-17]],expected:-13,public:!1},{seed:1592,index:1,input:[[3,-6,-17,18,10,-8,-11,3,8,7,4,6,-3,-10,-2,16,-19]],expected:21,public:!1},{seed:1592,index:2,input:[[13,-2,14,-20,12,14,2,-10,5,-4,-13,-17,-4,3,-10,-2]],expected:25,public:!1},{seed:1592,index:3,input:[[13,-16,-4,20,-7,-5,11,-9,7,-6,-15,16,11,-10,-15,8,14,-11]],expected:42,public:!1},{seed:1592,index:4,input:[[-3,-8,-11,-17,-7,-3,-9,7,2,13,-19,-3,16,6,-20,-8,-9,3,4,-9,-15,18,-13,-10,-11,-3,6]],expected:15,public:!1},{seed:1593,index:0,input:[[17,2,2,-7,10,-14,-19,-8,-10,-16,-5,-12,14,-19,7,11,10,-8,0,19,12,-10,-17,8]],expected:19,public:!1},{seed:1593,index:1,input:[[-8,-7,17,14,-14,-14,-2,-12,10,2,3,6,20,-9,14,-13,-14,-5,2,-8,17,19,16,-10,-17,3]],expected:-22,public:!1},{seed:1593,index:2,input:[[-8,-19,-20,-14,6,-16,1,2,-17,4,15,-20,-3,-2,-15,-18,12,-19,-4,10,-3,-9,20,16]],expected:-5,public:!1},{seed:1593,index:3,input:[[2,-17,-13,11,12,-12,11,8]],expected:22,public:!1},{seed:1593,index:4,input:[[-18,-3,-19,-9]],expected:-11,public:!1}],descriptionMarkdown:`# Stone Game III

You are given an integer array \`values\`. Two players, the **first** and the
**second**, take turns, with the first player moving first. On each turn the
current player removes 1, 2, or 3 elements from the **front** of the
remaining array (never more than remain) and adds their sum to that player's
own total. Both totals start at 0, and play ends when the array is empty.

Each player plays optimally, meaning each one tries to maximize
(own total) minus (opponent's total).

Return the final value of **(first player's total) - (second player's
total)** under optimal play. The function returns this number, not a label:
a positive result means the first player finishes ahead, a negative result
means the second player does, and \`0\` means the totals are equal.

## Examples

\`\`\`
Input: values = [5, -2, 1, 3]
Output: 3
Explanation: the first player takes [5]. The second player's best reply is
to take all of [-2, 1, 3] for a total of 2, so the margin is 5 - 2 = 3.
Opening with [5, -2] or [5, -2, 1] instead leads to a smaller margin.
\`\`\`

\`\`\`
Input: values = [-1, -2, -3]
Output: 0
Explanation: the first player takes [-1, -2] (total -3) and the second must
take [-3] (total -3).
\`\`\`

## Constraints

- \`1 <= values.length <= 5 * 10^4\`
- \`-1000 <= values[i] <= 1000\`

## Notes

Let \`diff[i]\` be the best margin the player to move can secure when the
array starts at index \`i\`, with \`diff[n] = 0\`. Taking \`k\` elements yields
their sum minus \`diff[i + k]\`, and \`diff[i]\` is the maximum over
\`k = 1, 2, 3\`. The answer is \`diff[0]\`.
`}];export{e as default};
