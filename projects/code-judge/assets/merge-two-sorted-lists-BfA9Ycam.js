const e=[{slug:"merge-two-sorted-lists",title:"Merge Two Sorted Lists",difficulty:"Easy",tags:["linked-list","two-pointers","recursion"],function:{name:"mergeTwoLists",params:[{name:"list1",type:"ListNode"},{name:"list2",type:"ListNode"}],returns:"ListNode"},compare:{mode:"exact"},limits:{timeMs:1e3},tests:[{input:[[2,5,9],[1,5,6,12]],expected:[1,2,5,5,6,9,12],public:!0},{input:[[],[3,4]],expected:[3,4],public:!0},{input:[[],[]],expected:[],public:!1},{input:[[-7,-7,0],[]],expected:[-7,-7,0],public:!1},{input:[[10,20,30],[1,2,3]],public:!1,expected:[1,2,3,10,20,30]}],generated:{seeds:[1201,1202,1203],perSeed:5},variantId:"default",key:"merge-two-sorted-lists:default",generatedTests:[{seed:1201,index:0,input:[[20],[-92,-84,-54,-51,16,76]],expected:[-92,-84,-54,-51,16,20,76],public:!1},{seed:1201,index:1,input:[[-95,-78,-27,-9,13,14,16,16,48,58],[-81,-4,-4,20,40,48,51,61,63]],expected:[-95,-81,-78,-27,-9,-4,-4,13,14,16,16,20,40,48,48,51,58,61,63],public:!1},{seed:1201,index:2,input:[[-76,-65,30,51,53,76],[-84,-54,-46,-15,60,65]],expected:[-84,-76,-65,-54,-46,-15,30,51,53,60,65,76],public:!1},{seed:1201,index:3,input:[[-89,-71,-46,-8,-2,50],[-64,-30,-6,1,22,23,32,45,54,57,71]],expected:[-89,-71,-64,-46,-30,-8,-6,-2,1,22,23,32,45,50,54,57,71],public:!1},{seed:1201,index:4,input:[[-95,-75,-28,3,7,30,44],[52]],expected:[-95,-75,-28,3,7,30,44,52],public:!1},{seed:1202,index:0,input:[[-93,-74,-66,24,37,42,48,59,75,92],[-60,-32,-31,2,6,15,20,47,63,91,98]],expected:[-93,-74,-66,-60,-32,-31,2,6,15,20,24,37,42,47,48,59,63,75,91,92,98],public:!1},{seed:1202,index:1,input:[[29,43,74],[-93,-82,-29,7,8,20,28,38,56,59,90]],expected:[-93,-82,-29,7,8,20,28,29,38,43,56,59,74,90],public:!1},{seed:1202,index:2,input:[[],[]],expected:[],public:!1},{seed:1202,index:3,input:[[-87,-13,26,43],[7]],expected:[-87,-13,7,26,43],public:!1},{seed:1202,index:4,input:[[-28,-15,0,28,44,81],[-78,-6]],expected:[-78,-28,-15,-6,0,28,44,81],public:!1},{seed:1203,index:0,input:[[-88,-71,-68,-3,36],[91]],expected:[-88,-71,-68,-3,36,91],public:!1},{seed:1203,index:1,input:[[-35,-21,-21,-15,8,43,50,56,73,77],[-59]],expected:[-59,-35,-21,-21,-15,8,43,50,56,73,77],public:!1},{seed:1203,index:2,input:[[-92,-90,-10,-1,6,9,24,27,35,94,98],[-90]],expected:[-92,-90,-90,-10,-1,6,9,24,27,35,94,98],public:!1},{seed:1203,index:3,input:[[-77,-50,-33,-10,18,74,79,91,95],[]],expected:[-77,-50,-33,-10,18,74,79,91,95],public:!1},{seed:1203,index:4,input:[[-71,-63,-57,-41,-39,-28,-26,-3],[-91,-89,-73,-72,-27,25,47]],expected:[-91,-89,-73,-72,-71,-63,-57,-41,-39,-28,-27,-26,-3,25,47],public:!1}],descriptionMarkdown:`# Merge Two Sorted Lists

You are given the heads of two singly linked lists, \`list1\` and \`list2\`.
Each list is sorted in non-decreasing order. Combine them into one list that
is also sorted in non-decreasing order and contains every node from both
inputs, then return its head. Relinking the existing nodes is preferred over
allocating new ones.

## Examples

\`\`\`
Input: list1 = [2, 5, 9], list2 = [1, 5, 6, 12]
Output: [1, 2, 5, 5, 6, 9, 12]
\`\`\`

\`\`\`
Input: list1 = [], list2 = [3, 4]
Output: [3, 4]
\`\`\`

## Constraints

- \`0 <= number of nodes in each list <= 50\`
- \`-100 <= node.val <= 100\`
- Both lists are sorted in non-decreasing order.

## Notes

Keep a dummy head and a tail pointer. Repeatedly attach whichever front node
is smaller, then append whatever remains of the non-empty list.
`}];export{e as default};
