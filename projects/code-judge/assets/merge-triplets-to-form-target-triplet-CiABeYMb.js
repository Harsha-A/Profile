const e=[{slug:"merge-triplets-to-form-target-triplet",title:"Merge Triplets to Form Target Triplet",difficulty:"Medium",tags:["array","greedy"],function:{name:"mergeTriplets",params:[{name:"triplets",type:"number[][]"},{name:"target",type:"number[]"}],returns:"boolean"},compare:{mode:"exact"},limits:{timeMs:1e3},tests:[{input:[[[1,4,2],[3,1,5],[2,2,2]],[3,4,5]],expected:!0,public:!0},{input:[[[2,6,1],[5,1,3]],[5,3,3]],expected:!1,public:!0},{input:[[[4,4,4]],[4,4,4]],expected:!0,public:!1},{input:[[[1,1,1],[2,2,2]],[2,1,2]],expected:!1,public:!1},{input:[[[3,5,1],[1,2,7],[3,1,7],[9,9,9]],[3,5,7]],public:!1,expected:!0}],generated:{seeds:[2401,2402,2403],perSeed:5},variantId:"default",key:"merge-triplets-to-form-target-triplet:default",generatedTests:[{seed:2401,index:0,input:[[[1,1,5],[2,5,4],[4,3,4],[5,4,5],[1,6,4],[5,3,5],[4,1,5],[5,4,1]],[6,4,5]],expected:!1,public:!1},{seed:2401,index:1,input:[[[4,2,4],[5,3,5],[5,5,6],[6,4,5],[3,5,4],[6,6,5]],[3,4,6]],expected:!1,public:!1},{seed:2401,index:2,input:[[[2,3,1],[5,5,1],[4,5,5],[2,4,2]],[2,6,4]],expected:!1,public:!1},{seed:2401,index:3,input:[[[2,5,3],[4,4,2]],[3,1,6]],expected:!1,public:!1},{seed:2401,index:4,input:[[[3,6,6],[6,4,3],[5,5,5],[3,1,3],[6,4,1],[5,2,1],[5,4,5],[1,5,4],[3,2,5],[5,6,3]],[4,5,6]],expected:!1,public:!1},{seed:2402,index:0,input:[[[1,6,5],[1,2,1],[6,5,3]],[6,6,3]],expected:!1,public:!1},{seed:2402,index:1,input:[[[2,1,2],[6,2,6],[4,2,3],[4,1,6]],[4,5,5]],expected:!1,public:!1},{seed:2402,index:2,input:[[[1,3,1],[2,2,5]],[6,3,6]],expected:!1,public:!1},{seed:2402,index:3,input:[[[5,5,2],[3,5,6],[1,1,4],[5,4,5],[2,5,4],[3,3,5],[2,2,1]],[3,1,1]],expected:!1,public:!1},{seed:2402,index:4,input:[[[6,5,2],[1,5,6]],[4,4,4]],expected:!1,public:!1},{seed:2403,index:0,input:[[[4,2,3],[1,4,3]],[6,1,5]],expected:!1,public:!1},{seed:2403,index:1,input:[[[6,5,1],[5,3,6],[4,1,2],[5,3,5],[3,4,1],[1,3,1],[5,6,3]],[6,6,4]],expected:!1,public:!1},{seed:2403,index:2,input:[[[3,3,1],[3,5,2],[3,3,1]],[3,2,2]],expected:!1,public:!1},{seed:2403,index:3,input:[[[1,1,5],[5,6,6],[5,1,2]],[3,4,5]],expected:!1,public:!1},{seed:2403,index:4,input:[[[3,6,3],[4,3,1],[1,6,1]],[6,4,3]],expected:!1,public:!1}],descriptionMarkdown:`# Merge Triplets to Form Target Triplet

You are given a list \`triplets\`, where each entry is an array of three
integers, and a three-integer array \`target\`.

You may repeat the following operation any number of times: choose two
different indices \`i\` and \`j\` and replace \`triplets[j]\` with the
component-wise maximum of the two, that is
\`[max(a0, b0), max(a1, b1), max(a2, b2)]\`.

Return \`true\` if, after some sequence of operations (possibly none), some
entry of \`triplets\` is exactly equal to \`target\`. Otherwise return \`false\`.

## Examples

\`\`\`
Input: triplets = [[1, 4, 2], [3, 1, 5], [2, 2, 2]], target = [3, 4, 5]
Output: true
Explanation: Merging [1, 4, 2] into [3, 1, 5] gives [3, 4, 5].
\`\`\`

\`\`\`
Input: triplets = [[2, 6, 1], [5, 1, 3]], target = [5, 3, 3]
Output: false
Explanation: No triplet has second component 3 without exceeding another
target component.
\`\`\`

## Constraints

- \`1 <= triplets.length <= 10^5\`
- \`triplets[i].length == target.length == 3\`
- \`1 <= triplets[i][k], target[k] <= 1000\`

## Notes

Any triplet with a component larger than the matching target component can
never be used. Among the rest, check that each target component is matched
exactly by at least one of them.
`}];export{e as default};
