const l=[{slug:"delete-leaves-with-a-given-value",title:"Delete Leaves With a Given Value",difficulty:"Medium",tags:["tree","depth-first-search","binary-tree"],function:{name:"removeLeafNodes",params:[{name:"root",type:"TreeNode"},{name:"target",type:"number"}],returns:"TreeNode"},compare:{mode:"exact"},limits:{timeMs:1e3},tests:[{input:[[3,3,5,3,null,3,3],3],expected:[3,null,5],public:!0},{input:[[1,1,1],1],expected:[],public:!0},{input:[[4,2,4,null,4],2],expected:[4,2,4,null,4],public:!1},{input:[[6,7,6,6,null,null,6],6],expected:[6,7],public:!1},{input:[[2,1,2,2,2,null,2,null,null,2],2],public:!1,expected:[2,1]}],generated:{seeds:[4901,4902,4903],perSeed:5},variantId:"default",key:"delete-leaves-with-a-given-value:default",generatedTests:[{seed:4901,index:0,input:[[3,1,3,null,1,1,2,2,null,3,2,null,2,null,2,3,3,null,2,null,null,null,null,null,null,null,null,1],3],expected:[3,1,3,null,1,1,2,2,null,null,2,null,2,null,2,null,2,null,null,null,null,1],public:!1},{seed:4901,index:1,input:[[1],3],expected:[1],public:!1},{seed:4901,index:2,input:[[3,2,3,3,3,null,null,null,1,null,2],3],expected:[3,2,null,3,3,null,1,null,2],public:!1},{seed:4901,index:3,input:[[2,2,3,null,2,2,2,null,null,null,2,2,2,2,null,null,1,3,null,null,1,null,null,null,null,1,2],1],expected:[2,2,3,null,2,2,2,null,null,null,2,2,2,2,null,null,null,3,null,null,1,null,null,null,2],public:!1},{seed:4901,index:4,input:[[1,null,3,2],3],expected:[1,null,3,2],public:!1},{seed:4902,index:0,input:[[1,2,1,1,2,2,3,null,null,null,1,null,null,2,2,2,null,null,null,null,null,2,null,1,null,null,3],2],expected:[1,2,1,1,2,null,3,null,null,null,1,null,null,2,null,2,null,1,null,null,3],public:!1},{seed:4902,index:1,input:[[3,2],1],expected:[3,2],public:!1},{seed:4902,index:2,input:[[1,2,1,3,3,null,1,2,null,null,null,null,null,2],1],expected:[1,2,null,3,3,2,null,null,null,2],public:!1},{seed:4902,index:3,input:[[2,2,3,3,2,null,1,null,null,null,1,null,2,1,3,2,null,null,null,null,null,null,1],1],expected:[2,2,3,3,2,null,1,null,null,null,1,null,2,null,3,2],public:!1},{seed:4902,index:4,input:[[3,3,3,2,null,2,null,null,3,null,3,null,2],2],expected:[3,3,3,2,null,2,null,null,3,null,3],public:!1},{seed:4903,index:0,input:[[1,1,1,3,1,null,2,1,1,null,2,null,null,1,null,3,null,null,null,1,null,null,2,null,3,null,null,null,3],3],expected:[1,1,1,3,1,null,2,1,1,null,2,null,null,1,null,3,null,null,null,1,null,null,2],public:!1},{seed:4903,index:1,input:[[3,null,2,3,3,null,null,null,3],1],expected:[3,null,2,3,3,null,null,null,3],public:!1},{seed:4903,index:2,input:[[1,2,1,null,1,3,null,null,3,null,2],1],expected:[1,2,1,null,1,3,null,null,3,null,2],public:!1},{seed:4903,index:3,input:[[1,2,null,1,3,2,null,2,3,null,null,2,3,null,2,3,null,null,3,null,2,null,null,null,null,1],2],expected:[1,2,null,1,3,null,null,2,3,2,3,null,2,3,null,null,3,null,2,null,null,null,null,1],public:!1},{seed:4903,index:4,input:[[1,1,3,null,2,null,null,1,null,1,null,null,3,3,2],2],expected:[1,1,3,null,2,null,null,1,null,1,null,null,3,3],public:!1}],descriptionMarkdown:`# Delete Leaves With a Given Value

You are given the root of a non-empty binary tree and an integer
\`target\`. Remove every leaf whose value equals \`target\`. Removing a leaf
may turn its parent into a leaf; if that parent's value also equals
\`target\`, it must be removed too. Keep going until no leaf holds
\`target\`, then return the root of what remains. If every node is removed,
return an empty tree.

A leaf is a node with no children.

## Tree format

A tree is written as a level-order array. Nodes are listed level by level,
left to right; each present node contributes its value, and each missing
child of a present node contributes \`null\`. Children of a missing node are
never listed, and trailing \`null\` entries are dropped. An empty tree is
\`[]\`. For example, \`[3, null, 5]\` is a root \`3\` with only a right
child \`5\`.

## Examples

\`\`\`
Input: root = [3, 3, 5, 3, null, 3, 3], target = 3
Output: [3, null, 5]
Explanation: the three leaves with value 3 are removed. The left child of the
root then becomes a leaf with value 3, so it is removed as well. Node 5 is
kept, which keeps the root from becoming a leaf.
\`\`\`

\`\`\`
Input: root = [1, 1, 1], target = 1
Output: []
\`\`\`

## Constraints

- \`1 <= number of nodes <= 3000\`
- \`1 <= node value, target <= 1000\`
`}];export{l as default};
