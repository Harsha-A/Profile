const e=[{slug:"jump-game-ii",title:"Jump Game II",difficulty:"Medium",tags:["array","greedy","bfs"],function:{name:"jump",params:[{name:"nums",type:"number[]"}],returns:"number"},compare:{mode:"exact"},limits:{timeMs:1e3},tests:[{input:[[1,2,0,1,1]],expected:3,public:!0},{input:[[1,4,0,0,1,2]],expected:2,public:!0},{input:[[0]],expected:0,public:!1},{input:[[5,0,0,0]],expected:1,public:!1},{input:[[1,1,1,1]],expected:3,public:!1},{input:[[2,3,0,1,4,1,1,1]],public:!1,expected:3}],generated:{seeds:[1651,1652,1653],perSeed:5},variantId:"default",key:"jump-game-ii:default",generatedTests:[{seed:1651,index:0,input:[[1,3,4]],expected:2,public:!1},{seed:1651,index:1,input:[[4,0,3,1,1,3,0,3,2,1,4,0,4,0,3]],expected:5,public:!1},{seed:1651,index:2,input:[[4,3]],expected:1,public:!1},{seed:1651,index:3,input:[[3,3,2,2,2,0,2,3,4,2,3,3,4,0,2,4,4,4]],expected:7,public:!1},{seed:1651,index:4,input:[[3,4,1,0,2,3,3,1,3,4,4,4,4]],expected:5,public:!1},{seed:1652,index:0,input:[[4,4]],expected:1,public:!1},{seed:1652,index:1,input:[[3,3,1]],expected:1,public:!1},{seed:1652,index:2,input:[[1,3,3,4,4,0,1,0,2,0,3,2,0,4]],expected:5,public:!1},{seed:1652,index:3,input:[[2,2]],expected:1,public:!1},{seed:1652,index:4,input:[[2]],expected:0,public:!1},{seed:1653,index:0,input:[[3,2]],expected:1,public:!1},{seed:1653,index:1,input:[[3,2,3,3,4,1,4,3,2,0,1,2,0,1,0]],expected:6,public:!1},{seed:1653,index:2,input:[[1,2,1,3,1,1,1,4,0,3,3,3,0,1,1,4,1]],expected:8,public:!1},{seed:1653,index:3,input:[[3,1]],expected:1,public:!1},{seed:1653,index:4,input:[[2,2,1,1,4,3,4,3,1,3,0]],expected:5,public:!1}],descriptionMarkdown:`# Jump Game II

You are given an array \`nums\` of non-negative integers. You start at index
\`0\`. From index \`i\` a single move takes you to any index \`j\` with
\`i < j <= i + nums[i]\`.

Every input is guaranteed to allow reaching the last index
\`nums.length - 1\`; the tests never include an array where the end is
unreachable. Return the minimum number of moves needed to get there. An array
of length 1 needs \`0\` moves.

## Examples

\`\`\`
Input: nums = [1, 2, 0, 1, 1]
Output: 3
Explanation: 0 -> 1 -> 3 -> 4. Index 2 holds 0, so it is a dead end.
\`\`\`

\`\`\`
Input: nums = [1, 4, 0, 0, 1, 2]
Output: 2
Explanation: 0 -> 1, then index 1 jumps straight to index 5.
\`\`\`

## Constraints

- \`1 <= nums.length <= 10^4\`
- \`0 <= nums[i] <= 1000\`
- The last index is always reachable from index \`0\`.

## Notes

Treat the indices reachable in exactly \`k\` moves as a contiguous band. While
scanning the current band, track the furthest index any of them can reach;
that becomes the end of the next band, and crossing a band boundary costs
one move.
`}];export{e as default};
