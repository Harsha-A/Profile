const e=[{slug:"single-threaded-cpu",title:"Single Threaded CPU",difficulty:"Medium",tags:["array","sorting","heap","simulation"],function:{name:"getOrder",params:[{name:"tasks",type:"number[][]"}],returns:"number[]"},compare:{mode:"exact"},limits:{timeMs:1e3},tests:[{input:[[[0,3],[1,1],[1,2],[6,1]]],expected:[0,1,2,3],public:!0},{input:[[[4,2],[4,2],[4,1]]],expected:[2,0,1],public:!0},{input:[[[10,5]]],expected:[0],public:!1},{input:[[[0,10],[2,1],[3,1],[1,4]]],expected:[0,1,2,3],public:!1},{input:[[[5,2],[0,1],[20,3],[6,1]]],expected:[1,0,3,2],public:!1},{input:[[[3,4],[0,2],[0,2],[1,1],[9,1]]],public:!1,expected:[1,3,2,0,4]}],generated:{seeds:[1834,1835,1836],perSeed:5},variantId:"default",key:"single-threaded-cpu:default",generatedTests:[{seed:1834,index:0,input:[[[14,1],[29,3],[10,5],[6,1]]],expected:[3,2,0,1],public:!1},{seed:1834,index:1,input:[[[29,1],[16,1],[4,1],[2,6],[25,4]]],expected:[3,2,1,4,0],public:!1},{seed:1834,index:2,input:[[[22,5],[6,2],[6,1],[11,3],[15,4],[5,5]]],expected:[5,2,1,3,4,0],public:!1},{seed:1834,index:3,input:[[[0,3],[8,5],[7,5],[17,4],[19,2],[20,2],[10,2],[25,2],[29,1],[10,1],[17,6],[25,6]]],expected:[0,2,9,6,1,4,5,3,7,8,10,11],public:!1},{seed:1834,index:4,input:[[[13,1]]],expected:[0],public:!1},{seed:1835,index:0,input:[[[8,4],[2,3],[0,2],[10,6],[4,4],[28,6]]],expected:[2,1,4,0,3,5],public:!1},{seed:1835,index:1,input:[[[21,2],[27,1],[6,4],[6,2],[26,5],[12,1],[18,1],[19,4],[21,5]]],expected:[3,2,5,6,7,0,8,1,4],public:!1},{seed:1835,index:2,input:[[[8,4],[4,3],[16,5],[3,1],[10,3],[5,4],[26,5],[7,3],[10,4],[16,6],[21,3],[15,2]]],expected:[3,1,7,4,0,11,5,10,8,2,6,9],public:!1},{seed:1835,index:3,input:[[[27,3],[23,1],[5,2]]],expected:[2,1,0],public:!1},{seed:1835,index:4,input:[[[0,3],[28,1],[2,2],[6,6],[29,4],[14,6],[6,6],[21,6],[11,6],[21,3]]],expected:[0,2,3,6,5,9,7,1,4,8],public:!1},{seed:1836,index:0,input:[[[0,1],[2,4],[12,1]]],expected:[0,1,2],public:!1},{seed:1836,index:1,input:[[[13,3],[24,5],[20,2],[7,4],[15,4],[13,2],[6,4],[23,4],[10,2],[8,3],[2,3]]],expected:[10,6,8,9,5,0,2,3,4,7,1],public:!1},{seed:1836,index:2,input:[[[25,2],[10,6],[20,2],[2,3],[24,5],[19,6],[3,4],[2,2],[9,6],[1,5],[1,3],[11,3],[3,5]]],expected:[10,7,3,6,11,9,2,12,0,4,1,5,8],public:!1},{seed:1836,index:3,input:[[[26,2],[13,3],[5,4],[6,1],[15,1],[19,2],[28,4],[26,2],[12,4],[1,5]]],expected:[9,3,2,8,4,1,5,0,7,6],public:!1},{seed:1836,index:4,input:[[[22,2],[0,2],[24,3],[7,6],[3,1],[21,4],[10,2],[0,2],[9,1],[18,4],[0,2]]],expected:[1,7,4,10,3,8,6,9,0,2,5],public:!1}],descriptionMarkdown:`# Single Threaded CPU

You are given an array \`tasks\` where \`tasks[i] = [start, duration]\`. Task
\`i\` becomes available at time \`start\` and needs \`duration\` units of
uninterrupted processing. A single processor runs the tasks one at a time,
starting at time \`0\`, under these rules:

1. If the processor is idle and no task is available, it waits until the
   earliest \`start\` among the tasks not yet run.
2. If the processor is idle and at least one task is available (its \`start\`
   is less than or equal to the current time), it picks one and runs it to
   completion. The current time then advances by that task's \`duration\`.
   Picking takes no time, and a task that becomes available at the exact
   moment another finishes is eligible for the next pick.
3. Among the available tasks the processor always picks the one with the
   **smallest \`duration\`**; if several share that duration, it picks the one
   with the **smallest index** \`i\`.

Return the indices of the tasks in the order they are run.

## Examples

\`\`\`
Input: tasks = [[0, 3], [1, 1], [1, 2], [6, 1]]
Output: [0, 1, 2, 3]
Explanation: task 0 runs 0-3. At time 3 tasks 1 and 2 wait; task 1 is
shorter and runs 3-4, then task 2 runs 4-6. Task 3 is available at 6.
\`\`\`

\`\`\`
Input: tasks = [[4, 2], [4, 2], [4, 1]]
Output: [2, 0, 1]
Explanation: the processor waits until time 4. Task 2 is the shortest.
Tasks 0 and 1 tie on duration, so the smaller index goes first.
\`\`\`

## Constraints

- \`1 <= tasks.length <= 10^5\`
- \`0 <= start <= 10^9\`
- \`1 <= duration <= 10^9\`

## Notes

Sort indices by \`start\`, then sweep time forward while a min-heap keyed by
\`(duration, index)\` holds the tasks that have become available.
`}];export{e as default};
