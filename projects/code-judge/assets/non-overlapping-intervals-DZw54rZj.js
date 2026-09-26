const e=[{slug:"non-overlapping-intervals",title:"Non Overlapping Intervals",difficulty:"Medium",tags:["array","greedy","sorting","intervals"],function:{name:"eraseOverlapIntervals",params:[{name:"intervals",type:"number[][]"}],returns:"number"},compare:{mode:"exact"},limits:{timeMs:1e3},tests:[{input:[[[1,5],[2,3],[3,4],[4,6]]],expected:1,public:!0},{input:[[[0,2],[2,4],[4,6]]],expected:0,public:!0},{input:[[[1,3],[1,3],[1,3]]],expected:2,public:!1},{input:[[[-5,5]]],expected:0,public:!1},{input:[[[0,10],[1,2],[3,4],[5,6]]],expected:1,public:!1},{input:[[[1,4],[2,5],[3,6],[7,8]]],public:!1,expected:2}],generated:{seeds:[435,436,437],perSeed:5},variantId:"default",key:"non-overlapping-intervals:default",generatedTests:[{seed:435,index:0,input:[[[16,20],[-6,-4],[18,19],[9,11],[13,15],[4,7],[5,9],[18,24],[4,6]]],expected:4,public:!1},{seed:435,index:1,input:[[[17,20],[4,11],[10,11],[-1,5]]],expected:1,public:!1},{seed:435,index:2,input:[[[6,7],[8,10],[-6,-1],[-1,7]]],expected:1,public:!1},{seed:435,index:3,input:[[[0,1]]],expected:0,public:!1},{seed:435,index:4,input:[[[-7,-6],[16,20],[-5,0],[11,12],[15,20],[13,14],[-7,-6]]],expected:2,public:!1},{seed:436,index:0,input:[[[-5,-4]]],expected:0,public:!1},{seed:436,index:1,input:[[[8,14],[1,8],[6,9],[-5,-1],[8,14],[-3,0],[-9,-6]]],expected:3,public:!1},{seed:436,index:2,input:[[[15,22],[15,21],[10,15],[1,8],[19,22],[-5,1],[-5,2],[-7,-4],[18,23]]],expected:5,public:!1},{seed:436,index:3,input:[[[-3,4],[-6,-1],[-4,2],[1,9],[-10,-6],[-1,7],[-10,-6]]],expected:4,public:!1},{seed:436,index:4,input:[[[-6,2],[-1,5],[-4,4],[-7,-6],[8,11],[3,5]]],expected:2,public:!1},{seed:437,index:0,input:[[[-8,-4]]],expected:0,public:!1},{seed:437,index:1,input:[[[18,22]]],expected:0,public:!1},{seed:437,index:2,input:[[[7,13],[16,22],[9,10],[17,24]]],expected:2,public:!1},{seed:437,index:3,input:[[[-7,-3],[8,9]]],expected:0,public:!1},{seed:437,index:4,input:[[[-6,1],[13,19],[0,2],[5,7],[-5,2],[-9,-1],[11,12],[-8,-2]]],expected:3,public:!1}],descriptionMarkdown:`# Non Overlapping Intervals

You are given a non-empty list \`intervals\` of half-open intervals
\`[start, end)\` with \`start < end\`. Two intervals conflict when they share a
stretch of positive length; intervals that only meet at an endpoint, such as
\`[0, 2]\` and \`[2, 4]\`, do not conflict.

Return the smallest number of intervals you must delete so that no two of
the remaining intervals conflict.

## Examples

\`\`\`
Input: intervals = [[1, 5], [2, 3], [3, 4], [4, 6]]
Output: 1
Explanation: deleting [1, 5] leaves [2, 3], [3, 4], [4, 6], which only touch.
\`\`\`

\`\`\`
Input: intervals = [[1, 3], [1, 3], [1, 3]]
Output: 2
\`\`\`

## Constraints

- \`1 <= intervals.length <= 10^5\`
- \`intervals[i].length == 2\`
- \`-5 * 10^4 <= start < end <= 5 * 10^4\`

## Notes

Equivalently, keep as many intervals as possible. Sorting by \`end\` and
greedily keeping each interval that starts no earlier than the last kept end
maximises the number kept.
`}];export{e as default};
