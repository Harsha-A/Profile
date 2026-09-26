const l=[{slug:"serialize-and-deserialize-binary-tree",title:"Serialize And Deserialize Binary Tree",difficulty:"Hard",tags:["tree","binary-tree","design","depth-first-search","breadth-first-search","serialization"],function:{name:"roundTrip",params:[{name:"root",type:"TreeNode"}],returns:"TreeNode",deepCopyOf:"arg:0"},compare:{mode:"exact"},limits:{timeMs:1e3},tests:[{input:[[8,3,10,null,6,null,14]],expected:[8,3,10,null,6,null,14],public:!0},{input:[[]],expected:[],public:!0},{input:[[-7]],expected:[-7],public:!0},{input:[[1,1,1,null,1,1]],expected:[1,1,1,null,1,1],public:!1},{input:[[1,null,2,null,3,null,4,null,5]],expected:[1,null,2,null,3,null,4,null,5],public:!1},{input:[[-1e3,1e3,-12,0,null,345,null,-6]],expected:[-1e3,1e3,-12,0,null,345,null,-6],public:!1},{input:[[5,4,null,3,null,2,null,1]],public:!1,expected:[5,4,null,3,null,2,null,1]},{input:[[0,10,20,30,40,50,60,70,80,90,100,110,120,130,140]],public:!1,expected:[0,10,20,30,40,50,60,70,80,90,100,110,120,130,140]}],generated:{seeds:[297,298,299,300],perSeed:5},variantId:"default",key:"serialize-and-deserialize-binary-tree:default",generatedTests:[{seed:297,index:0,input:[[-661,-840,-286,null,null,-733]],expected:[-661,-840,-286,null,null,-733],public:!1},{seed:297,index:1,input:[[0,-840,1,334,-556,-309,-777,272,null,null,null,null,null,-983,-122,null,null,null,810]],expected:[0,-840,1,334,-556,-309,-777,272,null,null,null,null,null,-983,-122,null,null,null,810],public:!1},{seed:297,index:2,input:[[407,558,-132,null,null,962,0,null,1,511,1]],expected:[407,558,-132,null,null,962,0,null,1,511,1],public:!1},{seed:297,index:3,input:[[]],expected:[],public:!1},{seed:297,index:4,input:[[585,2,-656,null,null,null,-650,-822,-358,null,-153,null,1,null,null,93,-615]],expected:[585,2,-656,null,null,null,-650,-822,-358,null,-153,null,1,null,null,93,-615],public:!1},{seed:298,index:0,input:[[2,-883,-652,-207,-464,null,null,null,0,null,null,null,370]],expected:[2,-883,-652,-207,-464,null,null,null,0,null,null,null,370],public:!1},{seed:298,index:1,input:[[831,1]],expected:[831,1],public:!1},{seed:298,index:2,input:[[1,801,7,null,null,null,198,null,0]],expected:[1,801,7,null,null,null,198,null,0],public:!1},{seed:298,index:3,input:[[430]],expected:[430],public:!1},{seed:298,index:4,input:[[65,1,-561,null,null,21,185,null,null,1,null,null,0]],expected:[65,1,-561,null,null,21,185,null,null,1,null,null,0],public:!1},{seed:299,index:0,input:[[2,2,-407,1,null,null,null,792,1,430,-938,null,-852,null,null,null,null,-871,0,null,null,1]],expected:[2,2,-407,1,null,null,null,792,1,430,-938,null,-852,null,null,null,null,-871,0,null,null,1],public:!1},{seed:299,index:1,input:[[-141,-533,838,null,-848,899,2,641,-49,-940,null,null,2,null,null,null,-957,null,null,null,null,-335]],expected:[-141,-533,838,null,-848,899,2,641,-49,-940,null,null,2,null,null,null,-957,null,null,null,null,-335],public:!1},{seed:299,index:2,input:[[248,241,null,1,null,1,null,-76,null,-128,null,0,null,246,null,-515,null,138,null,0,null,2,null,-201]],expected:[248,241,null,1,null,1,null,-76,null,-128,null,0,null,246,null,-515,null,138,null,0,null,2,null,-201],public:!1},{seed:299,index:3,input:[[1,-44,2,-474,2,null,null,null,null,2,-430,null,-85,-726,null,null,-25]],expected:[1,-44,2,-474,2,null,null,null,null,2,-430,null,-85,-726,null,null,-25],public:!1},{seed:299,index:4,input:[[-877,null,-813]],expected:[-877,null,-813],public:!1},{seed:300,index:0,input:[[-721,null,-274,null,-972,null,1,null,-972,null,-162,null,-370,null,731,null,1,null,710,null,-358,null,-11]],expected:[-721,null,-274,null,-972,null,1,null,-972,null,-162,null,-370,null,731,null,1,null,710,null,-358,null,-11],public:!1},{seed:300,index:1,input:[[-267,-257,null,2,null,-30,null,2,null,1,null,-228,null,-285,null,485,null,-920,null,-523,null,80,null,572]],expected:[-267,-257,null,2,null,-30,null,2,null,1,null,-228,null,-285,null,485,null,-920,null,-523,null,80,null,572],public:!1},{seed:300,index:2,input:[[956,-787,1,216,-359,-207,null,-316,null,-888,null,null,null,-1e3,-828,null,null,464,null,-732,1,null,null,null,-837,-835]],expected:[956,-787,1,216,-359,-207,null,-316,null,-888,null,null,null,-1e3,-828,null,null,464,null,-732,1,null,null,null,-837,-835],public:!1},{seed:300,index:3,input:[[-835,249,null,1,null,1,null,738,null,-952,null,155,null,-424]],expected:[-835,249,null,1,null,1,null,738,null,-952,null,155,null,-424],public:!1},{seed:300,index:4,input:[[-356,-633,147,-255,2,453,null,-102,-743,null,null,null,null,0,824,null,null,null,289]],expected:[-356,-633,147,-255,2,453,null,-102,-743,null,null,null,null,0,824,null,null,null,289],public:!1}],descriptionMarkdown:`# Serialize And Deserialize Binary Tree

Design a pair of conversions for binary trees of integers:

- **serialize** turns a tree into a single string;
- **deserialize** turns such a string back into a tree with exactly the same
  shape and the same value at every position.

The string format is yours to choose. It only has to be readable by your own
deserializer.

## What the judge calls

This judge calls exactly one function, so the problem is expressed as a
round trip. Implement \`roundTrip(root)\`, which receives the root of a tree
(or \`null\` for the empty tree) and returns the root of the rebuilt tree.
Write \`serialize(root)\` and \`deserialize(data)\` as separate helper
functions and have \`roundTrip\` return \`deserialize(serialize(root))\`.

The judge compares the returned tree with the input tree, and it rejects a
result that shares any node with the input. It cannot see the intermediate
string, so it cannot tell a real string round trip from a direct node-by-node
copy. Going through a string is the exercise; do not skip it.

Trees are written in examples in level order: values row by row, with
\`null\` marking a missing child and trailing \`null\` entries dropped.

## Examples

\`\`\`
Input: root = [8, 3, 10, null, 6, null, 14]
Output: [8, 3, 10, null, 6, null, 14]
Explanation: one possible serialization is the preorder walk
"8,3,N,6,N,N,10,N,14,N,N", where N marks an empty child.
\`\`\`

\`\`\`
Input: root = [1, 1, 1, null, 1, 1]
Output: [1, 1, 1, null, 1, 1]
Explanation: every value is equal, so the format must record structure
explicitly; the values alone do not determine the shape.
\`\`\`

\`\`\`
Input: root = []
Output: []
\`\`\`

## Constraints

- The tree has between \`0\` and \`10^4\` nodes.
- \`-1000 <= node.val <= 1000\`
- Values may repeat and may be negative.

## Notes

A preorder walk that emits a marker for each missing child can be rebuilt
recursively by reading tokens in the same order. A level-order walk with
markers also works. Either way, both halves run in \`O(n)\`.
`}];export{l as default};
