const e=[{slug:"merge-intervals",title:"Merge Intervals",difficulty:"Medium",tags:["array","sorting","intervals"],function:{name:"merge",params:[{name:"intervals",type:"number[][]"}],returns:"number[][]"},compare:{mode:"exact"},limits:{timeMs:1e3},tests:[{input:[[[8,10],[1,4],[3,5],[12,13]]],expected:[[1,5],[8,10],[12,13]],public:!0},{input:[[[2,3],[3,7]]],expected:[[2,7]],public:!0},{input:[[[4,9]]],expected:[[4,9]],public:!1},{input:[[[1,10],[2,3],[4,5]]],expected:[[1,10]],public:!1},{input:[[[5,6],[1,2]]],expected:[[1,2],[5,6]],public:!1},{input:[[[0,0],[0,1],[2,2]]],public:!1,expected:[[0,1],[2,2]]}],generated:{seeds:[56,560,5600],perSeed:5},variantId:"default",key:"merge-intervals:default",generatedTests:[{seed:56,index:0,input:[[[13,19]]],expected:[[13,19]],public:!1},{seed:56,index:1,input:[[[13,18],[26,30]]],expected:[[13,18],[26,30]],public:!1},{seed:56,index:2,input:[[[14,15],[9,13],[6,8],[6,14],[14,16],[3,10],[20,28]]],expected:[[3,16],[20,28]],public:!1},{seed:56,index:3,input:[[[14,16],[19,25],[4,7],[2,3],[16,23],[21,29]]],expected:[[2,3],[4,7],[14,29]],public:!1},{seed:56,index:4,input:[[[1,9],[3,7],[27,29],[23,28],[1,5],[25,27]]],expected:[[1,9],[23,29]],public:!1},{seed:560,index:0,input:[[[18,21],[28,29]]],expected:[[18,21],[28,29]],public:!1},{seed:560,index:1,input:[[[3,5]]],expected:[[3,5]],public:!1},{seed:560,index:2,input:[[[26,29]]],expected:[[26,29]],public:!1},{seed:560,index:3,input:[[[14,15],[12,15],[1,2],[11,13],[5,11],[28,32],[26,32]]],expected:[[1,2],[5,15],[26,32]],public:!1},{seed:560,index:4,input:[[[8,10],[2,5]]],expected:[[2,5],[8,10]],public:!1},{seed:5600,index:0,input:[[[23,26],[21,23],[23,27],[19,23],[10,16],[10,16]]],expected:[[10,16],[19,27]],public:!1},{seed:5600,index:1,input:[[[18,21],[18,24]]],expected:[[18,24]],public:!1},{seed:5600,index:2,input:[[[2,3],[15,16],[4,6],[18,21],[0,5],[11,16]]],expected:[[0,6],[11,16],[18,21]],public:!1},{seed:5600,index:3,input:[[[9,16],[10,15]]],expected:[[9,16]],public:!1},{seed:5600,index:4,input:[[[10,15],[17,22],[27,32],[29,30],[6,12],[19,20]]],expected:[[6,15],[17,22],[27,32]],public:!1}],descriptionMarkdown:`# Merge Intervals

You are given a non-empty list \`intervals\` of closed intervals
\`[start, end]\` in no particular order. Two intervals overlap when they share
at least one point; for example \`[2, 3]\` and \`[3, 7]\` overlap at \`3\`.

Repeatedly combine overlapping intervals until none overlap, and return the
resulting list **sorted by \`start\`**. The output is compared exactly, so the
order matters.

## Examples

\`\`\`
Input: intervals = [[8, 10], [1, 4], [3, 5], [12, 13]]
Output: [[1, 5], [8, 10], [12, 13]]
Explanation: [1, 4] and [3, 5] overlap and become [1, 5].
\`\`\`

\`\`\`
Input: intervals = [[2, 3], [3, 7]]
Output: [[2, 7]]
\`\`\`

## Constraints

- \`1 <= intervals.length <= 10^4\`
- \`intervals[i].length == 2\`
- \`0 <= start <= end <= 10^4\`

## Notes

After sorting by \`start\`, each interval either extends the last merged
interval (when its start is at most that interval's end) or begins a new one.
`}];export{e as default};
