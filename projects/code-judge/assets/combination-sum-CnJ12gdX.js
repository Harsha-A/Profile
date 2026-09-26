const e=[{slug:"combination-sum",title:"Combination Sum",difficulty:"Medium",tags:["array","backtracking"],function:{name:"combinationSum",params:[{name:"candidates",type:"number[]"},{name:"target",type:"number"}],returns:"number[][]"},compare:{mode:"unordered",deep:!0},limits:{timeMs:1e3},tests:[{input:[[3,5,4],8],expected:[[3,5],[4,4]],public:!0},{input:[[2,3],7],expected:[[2,2,3]],public:!0},{input:[[6],4],expected:[],public:!0},{input:[[2],2],expected:[[2]],public:!1},{input:[[2,3,5,7],16],public:!1,expected:[[2,2,2,2,2,2,2,2],[2,2,2,2,2,3,3],[2,2,2,2,3,5],[2,2,2,3,7],[2,2,2,5,5],[2,2,3,3,3,3],[2,2,5,7],[2,3,3,3,5],[2,7,7],[3,3,3,7],[3,3,5,5]]},{input:[[9,4,11,6,2],20],public:!1,expected:[[2,2,2,2,2,2,2,2,2,2],[2,2,2,2,2,2,2,2,4],[2,2,2,2,2,2,2,6],[2,2,2,2,2,2,4,4],[2,2,2,2,2,4,6],[2,2,2,2,4,4,4],[2,2,2,2,6,6],[2,2,2,4,4,6],[2,2,4,4,4,4],[2,2,4,6,6],[2,4,4,4,6],[2,6,6,6],[2,9,9],[4,4,4,4,4],[4,4,6,6],[9,11]]},{input:[[3,4,5],1],public:!1,expected:[]}],generated:{seeds:[921,922,923],perSeed:4},variantId:"default",key:"combination-sum:default",generatedTests:[{seed:921,index:0,input:[[9,4,16,19,18,15],6],expected:[],public:!1},{seed:921,index:1,input:[[13,20,19,14,17,5],22],expected:[[5,17]],public:!1},{seed:921,index:2,input:[[6,16,2],12],expected:[[2,2,2,2,2,2],[2,2,2,6],[6,6]],public:!1},{seed:921,index:3,input:[[7,13,15],3],expected:[],public:!1},{seed:922,index:0,input:[[4],22],expected:[],public:!1},{seed:922,index:1,input:[[8,12,19],8],expected:[[8]],public:!1},{seed:922,index:2,input:[[16,10,9,14],24],expected:[[10,14]],public:!1},{seed:922,index:3,input:[[5,9,12,14],1],expected:[],public:!1},{seed:923,index:0,input:[[5,14,20,15],12],expected:[],public:!1},{seed:923,index:1,input:[[5,10,6,7,18,15],18],expected:[[5,6,7],[6,6,6],[18]],public:!1},{seed:923,index:2,input:[[17,13,12,14,9,3],18],expected:[[3,3,3,3,3,3],[3,3,3,9],[3,3,12],[9,9]],public:!1},{seed:923,index:3,input:[[8,16,2,19],2],expected:[[2]],public:!1}],descriptionMarkdown:`# Combination Sum

You are given an array \`candidates\` of distinct positive integers and a
positive integer \`target\`. Return every distinct combination of candidate
values whose sum equals \`target\`. Any candidate may be used any number of
times within a single combination.

Two combinations are the same when they contain each value the same number
of times, regardless of order; each such multiset must appear only once. The
order of combinations in the result, and the order of values inside each
combination, do not matter. If no combination exists, return an empty list.

## Examples

\`\`\`
Input: candidates = [3, 5, 4], target = 8
Output: [[3, 5], [4, 4]]
\`\`\`

\`\`\`
Input: candidates = [6], target = 4
Output: []
\`\`\`

## Constraints

- \`1 <= candidates.length <= 10\`
- \`2 <= candidates[i] <= 20\`
- All values in \`candidates\` are distinct.
- \`1 <= target <= 24\`

## Notes

Recurse over candidate indices, allowing the same index to be reused but
never an earlier one; this produces each multiset exactly once.
`}];export{e as default};
