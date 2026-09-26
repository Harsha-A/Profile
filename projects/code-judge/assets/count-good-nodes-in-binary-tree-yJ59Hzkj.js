const e=[{slug:"count-good-nodes-in-binary-tree",title:"Count Good Nodes In Binary Tree",difficulty:"Medium",tags:["tree","depth-first-search","binary-tree"],function:{name:"goodNodes",params:[{name:"root",type:"TreeNode"}],returns:"number"},compare:{mode:"exact"},limits:{timeMs:1e3},tests:[{input:[[4,2,6,5,1,null,7]],expected:4,public:!0},{input:[[9,8,null,10,7]],expected:2,public:!0},{input:[[-3]],expected:1,public:!1},{input:[[2,2,2]],expected:3,public:!1},{input:[[5,1,8,6,null,3,9,null,7]],public:!1,expected:5}],generated:{seeds:[4401,4402,4403],perSeed:5},variantId:"default",key:"count-good-nodes-in-binary-tree:default",generatedTests:[{seed:4401,index:0,input:[[-4,6,4,9,-3,-10,null,null,null,8,2,null,1,5,null,-4,0,null,4,-6,null,null,null,0]],expected:6,public:!1},{seed:4401,index:1,input:[[4]],expected:1,public:!1},{seed:4401,index:2,input:[[-6,3,null,5,7,7,null,null,4,-7,6,null,null,-7,null,null,null,-3,9,null,null,6,-3]],expected:6,public:!1},{seed:4401,index:3,input:[[-5,10,-6,null,null,-9,-9,-6,null,5]],expected:3,public:!1},{seed:4401,index:4,input:[[1]],expected:1,public:!1},{seed:4402,index:0,input:[[0,null,-1,null,-6]],expected:1,public:!1},{seed:4402,index:1,input:[[4,null,-2,3,null,6,4,5,-10,null,null,null,-3,null,-10,6,null,null,null,-8]],expected:4,public:!1},{seed:4402,index:2,input:[[6,6,-5,-4,null,10,6,null,null,3,2,null,3,null,null,null,null,10,-1,null,null,-4,null,3,null,null,10]],expected:6,public:!1},{seed:4402,index:3,input:[[3,0,-8,-5,-6,0,5,null,null,null,6,null,null,null,null,null,10,null,-7,null,-7]],expected:4,public:!1},{seed:4402,index:4,input:[[5,-3,9,2,5,-7,null,-2,-7,null,null,null,null,-2,null,null,null,7,null,9,-5]],expected:5,public:!1},{seed:4403,index:0,input:[[0,4,10,2,-9,null,-10,-9,0,-6,null,null,-5,null,null,null,null,null,null,1]],expected:3,public:!1},{seed:4403,index:1,input:[[9,-1,-7,null,3,3,null,0,-5,1,null,-5,3]],expected:1,public:!1},{seed:4403,index:2,input:[[-2,-3,null,-10,0,null,-10]],expected:2,public:!1},{seed:4403,index:3,input:[[1,null,-4,-8,null,3]],expected:2,public:!1},{seed:4403,index:4,input:[[0,-6,6,null,-1,null,-3,null,-7,null,2,-6,5,null,-5,-7,-10]],expected:3,public:!1}],descriptionMarkdown:`# Count Good Nodes In Binary Tree

You are given the root of a non-empty binary tree. Call a node *good* when
its value is greater than or equal to every value on the path from the root
down to that node (the path includes the root and the node itself). The
root is therefore always good. Return how many good nodes the tree has.

## Tree format

A tree is written as a level-order array. Nodes are listed level by level,
left to right; each present node contributes its value, and each missing
child of a present node contributes \`null\`. Children of a missing node are
never listed, and trailing \`null\` entries are dropped. An empty tree is
\`[]\`. For example, \`[9, 8, null, 10, 7]\` is a root \`9\` with only a
left child \`8\`, and \`8\` has children \`10\` and \`7\`.

## Examples

\`\`\`
Input: root = [4, 2, 6, 5, 1, null, 7]
Output: 4
Explanation: 4 (root), 6, 7, and 5 are good. 5 is good because the path
4 -> 2 -> 5 has no value above 5. Node 2 and node 1 are not good, because 4
lies above each of them.
\`\`\`

\`\`\`
Input: root = [9, 8, null, 10, 7]
Output: 2
Explanation: 9 and 10 are good.
\`\`\`

## Constraints

- \`1 <= number of nodes <= 10^5\`
- \`-10^4 <= node value <= 10^4\`
`}];export{e as default};
