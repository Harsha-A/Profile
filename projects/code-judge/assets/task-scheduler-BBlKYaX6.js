const e=[{slug:"task-scheduler",title:"Task Scheduler",difficulty:"Medium",tags:["array","hash-map","greedy","heap","counting"],function:{name:"leastInterval",params:[{name:"tasks",type:"string[]"},{name:"n",type:"number"}],returns:"number"},compare:{mode:"exact"},limits:{timeMs:1e3},tests:[{input:[["X","X","X","Y","Y","Z"],2],expected:7,public:!0},{input:[["P","Q","P","Q"],0],expected:4,public:!0},{input:[["K","K","K","K"],3],expected:13,public:!1},{input:[["A","B","C","D","A","B"],1],expected:6,public:!1},{input:[["M"],5],expected:1,public:!1},{input:[["A","A","B","B","C","C"],2],expected:6,public:!1},{input:[["A","A","A","B","B","B"],3],public:!1,expected:10}],generated:{seeds:[621,622,623],perSeed:5},variantId:"default",key:"task-scheduler:default",generatedTests:[{seed:621,index:0,input:[["B","A","D","C","E","E","A","B","A","D","E","C","D","C"],3],expected:14,public:!1},{seed:621,index:1,input:[["C","B","B","C","B","C","C","C","B","A"],5],expected:25,public:!1},{seed:621,index:2,input:[["B","B","B","A","A","A","B","B","B","B","A"],1],expected:13,public:!1},{seed:621,index:3,input:[["B","C","D","A","B","D","C"],1],expected:7,public:!1},{seed:621,index:4,input:[["C","C","A","B","C","A","B","B","B","B","B","A","B"],5],expected:37,public:!1},{seed:622,index:0,input:[["B","B","B","A","C","A","B"],0],expected:7,public:!1},{seed:622,index:1,input:[["A","A"],5],expected:7,public:!1},{seed:622,index:2,input:[["D","A","A","B","D","C","C","B","A","A","B","C","A","D","D","C"],5],expected:25,public:!1},{seed:622,index:3,input:[["A","A","A","A","A","A","A","A","A","A","A","A"],3],expected:45,public:!1},{seed:622,index:4,input:[["D","C","C","E","A","E","A","C","B","B","E","B","D","D","D"],5],expected:19,public:!1},{seed:623,index:0,input:[["B","B","A","A","A","A","B","A","B","B","B","A"],2],expected:17,public:!1},{seed:623,index:1,input:[["A","A","A","A","A","A","A","A","A","A","A","A","A","A","A","A","A","A"],3],expected:69,public:!1},{seed:623,index:2,input:[["A","A","A","A","A","A"],1],expected:11,public:!1},{seed:623,index:3,input:[["B","B","A","A","B"],4],expected:11,public:!1},{seed:623,index:4,input:[["A","A","A"],4],expected:11,public:!1}],descriptionMarkdown:`# Task Scheduler

You are given an array \`tasks\` of single uppercase letters and a
non-negative integer \`n\`. Each letter is a job label; equal letters are jobs
of the same kind. Every job takes exactly one time slot.

Jobs are placed into consecutive time slots numbered \`0, 1, 2, ...\`. Each
slot holds either one job or nothing (an idle slot). Jobs may run in any
order, but two jobs with the same label must be placed at slots \`i\` and \`j\`
with \`|i - j| > n\`, that is, at least \`n\` other slots lie between them.

Return the smallest total number of slots, idle slots included, needed to
place every job. The count ends at the slot of the last job.

## Examples

\`\`\`
Input: tasks = ["X", "X", "X", "Y", "Y", "Z"], n = 2
Output: 7
Explanation: one valid layout is X Y Z X Y idle X.
\`\`\`

\`\`\`
Input: tasks = ["K", "K", "K", "K"], n = 3
Output: 13
Explanation: K idle idle idle K idle idle idle K idle idle idle K.
\`\`\`

## Constraints

- \`1 <= tasks.length <= 10^4\`
- Each \`tasks[i]\` is one uppercase English letter.
- \`0 <= n <= 100\`

## Notes

Only the counts matter. The most frequent label forces a frame of
\`(maxCount - 1) * (n + 1)\` slots plus one slot for each label that reaches
\`maxCount\`; if other jobs overflow that frame, no idle slot is needed at all.
A max-heap simulation over counts gives the same result.
`}];export{e as default};
