const e=[{slug:"meeting-rooms-ii",title:"Meeting Rooms II",difficulty:"Medium",tags:["array","sorting","heap","intervals","sweep-line"],function:{name:"minMeetingRooms",params:[{name:"intervals",type:"number[][]"}],returns:"number"},compare:{mode:"exact"},limits:{timeMs:1e3},tests:[{input:[[[0,5],[1,3],[2,7],[6,9]]],expected:3,public:!0},{input:[[[3,6],[6,8],[1,3]]],expected:1,public:!0},{input:[[]],expected:0,public:!1},{input:[[[1,2],[1,2],[1,2],[1,2]]],expected:4,public:!1},{input:[[[0,10],[2,4],[5,7],[8,9]]],expected:2,public:!1},{input:[[[4,9],[1,5],[8,12],[2,3]]],public:!1,expected:2}],generated:{seeds:[253,2530,25300],perSeed:5},variantId:"default",key:"meeting-rooms-ii:default",generatedTests:[{seed:253,index:0,input:[[[14,18],[13,17],[3,5]]],expected:2,public:!1},{seed:253,index:1,input:[[[19,22]]],expected:1,public:!1},{seed:253,index:2,input:[[[5,8],[14,19],[9,16],[28,32],[28,29],[18,24],[6,9]]],expected:2,public:!1},{seed:253,index:3,input:[[[10,18],[15,21],[26,34],[9,16],[2,9]]],expected:3,public:!1},{seed:253,index:4,input:[[[6,12],[7,11],[8,14],[23,25]]],expected:3,public:!1},{seed:2530,index:0,input:[[[20,24]]],expected:1,public:!1},{seed:2530,index:1,input:[[[8,15],[11,14]]],expected:2,public:!1},{seed:2530,index:2,input:[[[7,14],[5,13],[2,5],[27,30]]],expected:2,public:!1},{seed:2530,index:3,input:[[[29,35],[25,27],[9,17],[24,31],[11,15],[20,23],[7,13],[20,23],[18,23],[20,22]]],expected:4,public:!1},{seed:2530,index:4,input:[[[26,32],[19,26],[25,28]]],expected:2,public:!1},{seed:25300,index:0,input:[[[27,34],[14,18],[27,33]]],expected:2,public:!1},{seed:25300,index:1,input:[[[18,19],[23,27],[8,16],[18,25],[15,17],[17,25]]],expected:3,public:!1},{seed:25300,index:2,input:[[[11,15],[11,16]]],expected:2,public:!1},{seed:25300,index:3,input:[[[7,14],[29,30],[1,8],[13,16],[23,27],[23,26],[25,26]]],expected:3,public:!1},{seed:25300,index:4,input:[[]],expected:0,public:!1}],descriptionMarkdown:`# Meeting Rooms II

You are given a list \`intervals\` of half-open time intervals \`[start, end)\`
with \`start < end\`. An interval is active at time \`t\` when
\`start <= t < end\`, so an interval ending at \`t\` and another starting at \`t\`
are never active together.

Return the largest number of intervals that are active at the same moment.
This is the fewest groups the intervals can be split into so that no two
intervals within one group are active together. An empty list gives \`0\`.

## Examples

\`\`\`
Input: intervals = [[0, 5], [1, 3], [2, 7], [6, 9]]
Output: 3
Explanation: at time 2, [0, 5], [1, 3] and [2, 7] are all active.
\`\`\`

\`\`\`
Input: intervals = [[3, 6], [6, 8], [1, 3]]
Output: 1
Explanation: the intervals only meet at endpoints.
\`\`\`

## Constraints

- \`0 <= intervals.length <= 10^4\`
- \`intervals[i].length == 2\`
- \`0 <= start < end <= 10^6\`

## Notes

Sort all starts and all ends separately and sweep through them with two
pointers, processing an end before a start at the same time. Alternatively,
keep a min-heap of the end times of currently active intervals.
`}];export{e as default};
