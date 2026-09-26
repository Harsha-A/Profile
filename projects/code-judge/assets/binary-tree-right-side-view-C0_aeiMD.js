const e=[{slug:"binary-tree-right-side-view",title:"Binary Tree Right Side View",difficulty:"Medium",tags:["tree","breadth-first-search","depth-first-search","binary-tree"],function:{name:"rightSideView",params:[{name:"root",type:"TreeNode"}],returns:"number[]"},compare:{mode:"exact"},limits:{timeMs:1e3},tests:[{input:[[10,4,6,3,null,null,null,8]],expected:[10,6,3,8],public:!0},{input:[[2,null,5,1]],expected:[2,5,1],public:!0},{input:[[]],expected:[],public:!1},{input:[[1,2,3,4,5,6,7]],expected:[1,3,7],public:!1},{input:[[1,2,3,null,4,null,null,5,6]],public:!1,expected:[1,3,4,6]}],generated:{seeds:[4301,4302,4303],perSeed:5},variantId:"default",key:"binary-tree-right-side-view:default",generatedTests:[{seed:4301,index:0,input:[[-16,-26,-31,35,null,null,66,null,null,-56,-90,-42,null,null,-19,52]],expected:[-16,-31,66,-90,-19,52],public:!1},{seed:4301,index:1,input:[[-61,-57,-73,-94,-4,33,null,null,-30,null,null,-27,null,11,98,null,-62,null,null,37,null,null,null,-10]],expected:[-61,-73,33,-27,-62,37,-10],public:!1},{seed:4301,index:2,input:[[-14,null,7]],expected:[-14,7],public:!1},{seed:4301,index:3,input:[[83,-75,null,78,-88,null,-78,21,null,-18,11]],expected:[83,-75,-88,21,11],public:!1},{seed:4301,index:4,input:[[]],expected:[],public:!1},{seed:4302,index:0,input:[[35,-25,-41,23,13,-91,null,94,null,-82,null,null,41,null,-100,null,null,null,62,null,null,null,2]],expected:[35,-41,-91,41,62,2],public:!1},{seed:4302,index:1,input:[[-43,-20,17,-2]],expected:[-43,17,-2],public:!1},{seed:4302,index:2,input:[[35,-78,-89,-44,-43,-57,-19,null,null,null,null,null,null,90,null,null,-59]],expected:[35,-89,-19,90,-59],public:!1},{seed:4302,index:3,input:[[-20,-64,33,-65,60,41,-44,78,null,null,null,null,null,null,-20]],expected:[-20,33,-44,-20],public:!1},{seed:4302,index:4,input:[[85,94,null,53,37,null,null,-66,-3,null,null,-80]],expected:[85,94,37,-3,-80],public:!1},{seed:4303,index:0,input:[[]],expected:[],public:!1},{seed:4303,index:1,input:[[-87,null,-39,69,-23]],expected:[-87,-39,-23],public:!1},{seed:4303,index:2,input:[[26,-33,-14,33,81,-91,null,31,null,-7,null,null,null,null,null,36,-76,null,50]],expected:[26,-14,-91,-7,-76,50],public:!1},{seed:4303,index:3,input:[[38,17,61,84,null,-7,30,-79,10,-54,null,47,-38,null,null,null,null,null,null,null,null,null,-50]],expected:[38,61,30,-38,-50],public:!1},{seed:4303,index:4,input:[[6,-82,null,96,19,null,null,64]],expected:[6,-82,19,64],public:!1}],descriptionMarkdown:`# Binary Tree Right Side View

You are given the root of a binary tree. For every depth of the tree, take
the rightmost node present at that depth (the last node when that depth is
read from left to right). Return those values ordered from the root's depth
down to the deepest level. An empty tree yields an empty list.

Note that the rightmost node at some depth may sit in the left subtree of
the root, when the right subtree is shallower.

## Tree format

A tree is written as a level-order array. Nodes are listed level by level,
left to right; each present node contributes its value, and each missing
child of a present node contributes \`null\`. Children of a missing node are
never listed, and trailing \`null\` entries are dropped. An empty tree is
\`[]\`. For example, \`[2, null, 5, 1]\` is a root \`2\` with only a right
child \`5\`, and \`5\` has only a left child \`1\`.

## Examples

\`\`\`
Input: root = [10, 4, 6, 3, null, null, null, 8]
Output: [10, 6, 3, 8]
Explanation: depth 1 holds 4 and 6, so 6 is taken. Depths 2 and 3 only
contain nodes under 4 (3, then 8).
\`\`\`

\`\`\`
Input: root = [2, null, 5, 1]
Output: [2, 5, 1]
\`\`\`

## Constraints

- \`0 <= number of nodes <= 100\`
- \`-100 <= node value <= 100\`
`}];export{e as default};
