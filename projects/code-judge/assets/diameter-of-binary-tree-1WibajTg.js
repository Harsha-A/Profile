const e=[{slug:"diameter-of-binary-tree",title:"Diameter of Binary Tree",difficulty:"Easy",tags:["tree","binary-tree","depth-first-search"],function:{name:"diameterOfBinaryTree",params:[{name:"root",type:"TreeNode"}],returns:"number"},compare:{mode:"exact"},limits:{timeMs:1e3},tests:[{input:[[4,2,6,1,3,5,7]],expected:4,public:!0},{input:[[1,2,null,3,4,5,null,null,6]],expected:4,public:!0},{input:[[9]],expected:0,public:!1},{input:[[5,3,null,null,4,8]],expected:3,public:!1},{input:[[1,2]],expected:1,public:!1},{input:[[1,2,3,4,null,null,5,6,null,null,7]],public:!1,expected:6}],generated:{seeds:[9151,9152,9153],perSeed:5},variantId:"default",key:"diameter-of-binary-tree:default",generatedTests:[{seed:9151,index:0,input:[[18,49,25]],expected:2,public:!1},{seed:9151,index:1,input:[[-65,-24,-56,53,null,-60,63,-99]],expected:5,public:!1},{seed:9151,index:2,input:[[55,-87,33,69,-75,null,null,null,-94,81,-26,null,null,-8,96,null,81,-89,null,null,-34,null,null,null,null,null,18]],expected:7,public:!1},{seed:9151,index:3,input:[[]],expected:0,public:!1},{seed:9151,index:4,input:[[93,-78,-17,null,null,null,11,-46]],expected:4,public:!1},{seed:9152,index:0,input:[[96,46,-31,-48,null,null,16,null,null,-20,24,null,-56]],expected:6,public:!1},{seed:9152,index:1,input:[[-50,-74,null,19,-32,null,70,-90,-91,-5,60,-46]],expected:6,public:!1},{seed:9152,index:2,input:[[92,-30,22]],expected:2,public:!1},{seed:9152,index:3,input:[[24,null,-22,-35,-24,-2,48,null,null,null,null,null,89]],expected:4,public:!1},{seed:9152,index:4,input:[[57,null,9,75,44,-6,null,null,-62,-9,-12,null,null,null,65]],expected:6,public:!1},{seed:9153,index:0,input:[[-70,67,-2]],expected:2,public:!1},{seed:9153,index:1,input:[[61,-20,null,-6,-90,null,88]],expected:3,public:!1},{seed:9153,index:2,input:[[89,89,77,41,-41,null,null,null,2,null,null,null,-49]],expected:5,public:!1},{seed:9153,index:3,input:[[-62,-38,73,-53,null,91,94,62,null,null,-85,null,74,null,null,null,null,null,34]],expected:7,public:!1},{seed:9153,index:4,input:[[92]],expected:0,public:!1}],descriptionMarkdown:`# Diameter of Binary Tree

You are given the root of a binary tree, \`root\`. A path is a sequence of
nodes in which each consecutive pair is joined by a parent-child edge, and no
node appears twice. Return the diameter of the tree: the number of **edges**
on the longest such path. The path does not have to pass through the root.

## Tree format

A tree is written as a level-order array. Nodes are listed breadth-first,
left to right; \`null\` stands for a missing child. A \`null\` has no children of
its own, so nothing is listed for it in later levels. Trailing \`null\`s are
dropped, and \`[]\` is the empty tree. For example, \`[5, 3, null, null, 4, 8]\`
is the tree below: \`5\` has only a left child \`3\`, \`3\` has only a right child
\`4\`, and \`4\` has only a left child \`8\`.

\`\`\`
    5
   /
  3
   \\
    4
   /
  8
\`\`\`

## Examples

\`\`\`
Input: root = [4, 2, 6, 1, 3, 5, 7]
Output: 4
Explanation: one longest path is 1 - 2 - 4 - 6 - 5, which has 4 edges.
\`\`\`

\`\`\`
Input: root = [1, 2, null, 3, 4, 5, null, null, 6]
Output: 4
Explanation: the path 5 - 3 - 2 - 4 - 6 stays below the root and has 4
edges; any path through the root has at most 3.
\`\`\`

## Constraints

- The tree has between \`1\` and \`10^4\` nodes.
- \`-100 <= node value <= 100\`

## Notes

The longest path that bends at a given node uses the heights of its two
subtrees. One post-order pass can compute every height and track the best sum.
`}];export{e as default};
