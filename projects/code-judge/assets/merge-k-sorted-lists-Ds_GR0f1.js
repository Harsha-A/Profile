const e=[{slug:"merge-k-sorted-lists",title:"Merge K Sorted Lists",difficulty:"Hard",tags:["linked-list","divide-and-conquer","heap","merge-sort"],function:{name:"mergeKLists",params:[{name:"lists",type:"ListNode[]"}],returns:"ListNode"},compare:{mode:"exact"},limits:{timeMs:1e3},tests:[{input:[[[3,8,20],[1,9],[4,4,15]]],expected:[1,3,4,4,8,9,15,20],public:!0},{input:[[]],expected:[],public:!0},{input:[[[]]],expected:[],public:!1},{input:[[[],[-2,0],[]]],expected:[-2,0],public:!1},{input:[[[5],[5],[5],[1,6]]],expected:[1,5,5,5,6],public:!1},{input:[[[-10,-1,7],[2,3],[0],[-4,8,9,12]]],public:!1,expected:[-10,-4,-1,0,2,3,7,8,9,12]}],generated:{seeds:[1801,1802,1803],perSeed:5},variantId:"default",key:"merge-k-sorted-lists:default",generatedTests:[{seed:1801,index:0,input:[[[13],[-48,-22,-20,-3,10,14,93],[-61,-55,-46,-24,12,14,69],[43,50,52,83]]],expected:[-61,-55,-48,-46,-24,-22,-20,-3,10,12,13,14,14,43,50,52,69,83,93],public:!1},{seed:1801,index:1,input:[[]],expected:[],public:!1},{seed:1801,index:2,input:[[[-25,-2,6,77,89],[-67,-55,-15,85],[],[-94,-70,-36,9,18,36,79],[],[91]]],expected:[-94,-70,-67,-55,-36,-25,-15,-2,6,9,18,36,77,79,85,89,91],public:!1},{seed:1801,index:3,input:[[[-41],[85],[-16,91],[]]],expected:[-41,-16,85,91],public:!1},{seed:1801,index:4,input:[[[-44,-5,33,34]]],expected:[-44,-5,33,34],public:!1},{seed:1802,index:0,input:[[[-63,6],[-85,-34,-21,30,33,63,77],[-96,-29],[-87,-78,-35,-28,17,46],[-99,-80,-48,10,28,58],[-99,-64,32,54]]],expected:[-99,-99,-96,-87,-85,-80,-78,-64,-63,-48,-35,-34,-29,-28,-21,6,10,17,28,30,32,33,46,54,58,63,77],public:!1},{seed:1802,index:1,input:[[[-37,-6,33],[40],[-96,-84,-79,-47,-25,13,55],[-81,13,38,45],[-55,-42,10,34,52,66,95],[45,78,86]]],expected:[-96,-84,-81,-79,-55,-47,-42,-37,-25,-6,10,13,13,33,34,38,40,45,45,52,55,66,78,86,95],public:!1},{seed:1802,index:2,input:[[[-59,26,67],[-25,35,62],[-84,-66,61],[-15,12,12,29,96],[]]],expected:[-84,-66,-59,-25,-15,12,12,26,29,35,61,62,67,96],public:!1},{seed:1802,index:3,input:[[[-55,-43,19],[-85,-45,-34,68],[],[-34,43,51,67,68],[],[-29,-5,21,27]]],expected:[-85,-55,-45,-43,-34,-34,-29,-5,19,21,27,43,51,67,68,68],public:!1},{seed:1802,index:4,input:[[[-1,85]]],expected:[-1,85],public:!1},{seed:1803,index:0,input:[[[93]]],expected:[93],public:!1},{seed:1803,index:1,input:[[[-68,-26,3,36,53],[-68,61,82],[-53,79],[-17,55],[38,56,56]]],expected:[-68,-68,-53,-26,-17,3,36,38,53,55,56,56,61,79,82],public:!1},{seed:1803,index:2,input:[[[11,31]]],expected:[11,31],public:!1},{seed:1803,index:3,input:[[[-100,-40],[-76,-44,18,22],[-72,-27,-9,4,6,21,55],[-25]]],expected:[-100,-76,-72,-44,-40,-27,-25,-9,4,6,18,21,22,55],public:!1},{seed:1803,index:4,input:[[[-60,-54,8,92],[-80,-52,11,90],[-54,-10,68]]],expected:[-80,-60,-54,-54,-52,-10,8,11,68,90,92],public:!1}],descriptionMarkdown:`# Merge K Sorted Lists

You are given an array \`lists\` holding the heads of \`k\` singly linked lists.
Each list is sorted in non-decreasing order, and any of them may be empty.
Combine all of their nodes into one list sorted in non-decreasing order and
return its head. If there are no nodes at all, return an empty list.

## Examples

\`\`\`
Input: lists = [[3, 8, 20], [1, 9], [4, 4, 15]]
Output: [1, 3, 4, 4, 8, 9, 15, 20]
\`\`\`

\`\`\`
Input: lists = [[], [-2, 0], []]
Output: [-2, 0]
\`\`\`

## Constraints

- \`0 <= k <= 10^4\`
- \`0 <= length of each list <= 500\`
- \`-10^4 <= node.val <= 10^4\`
- Each list is sorted in non-decreasing order.
- The total number of nodes is at most \`10^4\`.

## Notes

Merging the lists one after another costs \`O(k * N)\` for \`N\` total nodes.
Merging them in pairs, round after round, or repeatedly taking the smallest
front node from a min-heap, brings this down to \`O(N log k)\`.
`}];export{e as default};
