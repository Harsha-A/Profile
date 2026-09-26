const e=[{slug:"combination-sum-ii",title:"Combination Sum II",difficulty:"Medium",tags:["array","backtracking"],function:{name:"combinationSum2",params:[{name:"candidates",type:"number[]"},{name:"target",type:"number"}],returns:"number[][]"},compare:{mode:"unordered",deep:!0},limits:{timeMs:1e3},tests:[{input:[[4,2,2,6,1],8],expected:[[2,2,4],[2,6]],public:!0},{input:[[3,3,3],6],expected:[[3,3]],public:!0},{input:[[5,7],3],expected:[],public:!0},{input:[[1,1,1,1,1,1,1,1],4],expected:[[1,1,1,1]],public:!1},{input:[[10,1,2,7,6,1,5,3,3,2],9],public:!1,expected:[[1,1,2,2,3],[1,1,2,5],[1,1,7],[1,2,3,3],[1,2,6],[1,3,5],[2,2,5],[2,7],[3,6]]},{input:[[2,5,2,1,2,4,4,3],7],public:!1,expected:[[1,2,2,2],[1,2,4],[2,2,3],[2,5],[3,4]]}],generated:{seeds:[931,932,933],perSeed:4},variantId:"default",key:"combination-sum-ii:default",generatedTests:[{seed:931,index:0,input:[[1,2,6,4],16],expected:[],public:!1},{seed:931,index:1,input:[[4,3,4,1,6,1,4,1,1],17],expected:[[1,1,1,1,3,4,6],[1,1,1,4,4,6],[1,1,3,4,4,4],[3,4,4,6]],public:!1},{seed:931,index:2,input:[[5],11],expected:[],public:!1},{seed:931,index:3,input:[[2,5,5,1,3,2,3,6],12],expected:[[1,2,3,6],[1,3,3,5],[1,5,6],[2,2,3,5],[2,5,5],[3,3,6]],public:!1},{seed:932,index:0,input:[[3,6,4,5,4,4,2],17],expected:[[2,3,4,4,4],[2,4,5,6],[3,4,4,6],[4,4,4,5]],public:!1},{seed:932,index:1,input:[[3,6,4,4,2,6,1,3,6,6,1,4],20],expected:[[1,1,2,3,3,4,6],[1,1,2,4,6,6],[1,1,3,3,4,4,4],[1,1,3,3,6,6],[1,1,4,4,4,6],[1,1,6,6,6],[1,2,3,4,4,6],[1,3,4,6,6],[2,3,3,4,4,4],[2,3,3,6,6],[2,4,4,4,6],[2,6,6,6],[3,3,4,4,6],[4,4,6,6]],public:!1},{seed:932,index:2,input:[[1,2,1,6,5],14],expected:[[1,2,5,6]],public:!1},{seed:932,index:3,input:[[5,4,2,3,5,4,5,1],19],expected:[[1,2,3,4,4,5],[1,3,5,5,5],[1,4,4,5,5],[2,3,4,5,5],[4,5,5,5]],public:!1},{seed:933,index:0,input:[[5,3,3],10],expected:[],public:!1},{seed:933,index:1,input:[[4,5,2,4,6,6,3],6],expected:[[2,4],[6]],public:!1},{seed:933,index:2,input:[[1,1,4,4,3,5,5],15],expected:[[1,1,3,5,5],[1,1,4,4,5],[1,4,5,5]],public:!1},{seed:933,index:3,input:[[6],5],expected:[],public:!1}],descriptionMarkdown:`# Combination Sum II

You are given an array \`candidates\` of positive integers, which may contain
duplicate values, and a positive integer \`target\`. Return every distinct
combination of elements whose sum equals \`target\`, where each element (each
index) may be used at most once in a combination.

The input may contain repeated values, but the result must contain only
distinct combinations: two combinations are the same when they contain each
value the same number of times. Each distinct multiset must appear exactly
once. The order of combinations in the result, and the order of values
inside each combination, do not matter. If none exist, return an empty list.

## Examples

\`\`\`
Input: candidates = [4, 2, 2, 6, 1], target = 8
Output: [[2, 6], [2, 2, 4]]
Explanation: [2, 6] can be formed with either copy of 2, but it is
reported only once.
\`\`\`

\`\`\`
Input: candidates = [5, 7], target = 3
Output: []
\`\`\`

## Constraints

- \`1 <= candidates.length <= 12\`
- \`1 <= candidates[i] <= 10\`
- \`1 <= target <= 20\`

## Notes

Sort the candidates first. At each recursion depth, skip a value equal to
the one tried just before it at the same depth; this removes duplicate
combinations without a separate set.
`}];export{e as default};
