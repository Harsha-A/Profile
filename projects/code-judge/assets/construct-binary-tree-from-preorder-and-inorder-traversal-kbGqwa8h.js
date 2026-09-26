const e=[{slug:"construct-binary-tree-from-preorder-and-inorder-traversal",title:"Construct Binary Tree From Preorder And Inorder Traversal",difficulty:"Medium",tags:["tree","array","hash-map","divide-and-conquer","binary-tree"],function:{name:"buildTree",params:[{name:"preorder",type:"number[]"},{name:"inorder",type:"number[]"}],returns:"TreeNode"},compare:{mode:"exact"},limits:{timeMs:1e3},tests:[{input:[[4,2,1,3,6,5],[1,2,3,4,5,6]],expected:[4,2,6,1,3,5],public:!0},{input:[[1,2,3],[3,2,1]],expected:[1,2,null,3],public:!0},{input:[[1],[1]],expected:[1],public:!1},{input:[[7,8,9],[7,8,9]],expected:[7,null,8,null,9],public:!1},{input:[[-1,5,0,3,-7],[0,5,3,-1,-7]],public:!1,expected:[-1,5,-7,0,3]}],generated:{seeds:[4701,4702,4703],perSeed:5},variantId:"default",key:"construct-binary-tree-from-preorder-and-inorder-traversal:default",generatedTests:[{seed:4701,index:0,input:[[-43,-61,-93,-59,64],[-93,-61,-43,-59,64]],expected:[-43,-61,-59,-93,null,null,64],public:!1},{seed:4701,index:1,input:[[31,-72,83,-87,-81,2,75,-37],[-72,83,31,2,-81,75,-87,-37]],expected:[31,-72,-87,null,83,-81,-37,null,null,2,75],public:!1},{seed:4701,index:2,input:[[-1,-85,-40,-100,-26,100,37,67,-16,16,-32,65,78],[-85,-100,-40,-1,37,67,100,-16,-26,16,65,-32,78]],expected:[-1,-85,-26,null,-40,100,16,-100,null,37,-16,null,-32,null,null,null,67,null,null,65,78],public:!1},{seed:4701,index:3,input:[[-23,42,-65,-37,98,8,72,14,-10,-76,-96,82,-89,-73,66],[42,72,8,14,-76,-10,-96,82,98,-89,-73,-37,-65,-23,66]],expected:[-23,42,66,null,-65,null,null,-37,null,98,null,8,-89,72,14,null,-73,null,null,null,-10,null,null,-76,-96,null,null,null,82],public:!1},{seed:4701,index:4,input:[[-6,83,7,94,97,84,-49,4,-60,-55,15],[7,84,97,94,-49,-60,4,83,-6,15,-55]],expected:[-6,83,-55,7,null,15,null,null,94,null,null,97,-49,84,null,null,4,null,null,-60],public:!1},{seed:4702,index:0,input:[[-82,-84,-59,-25,19,100,-38,5,-39,-66,43,15],[-84,-25,19,-59,-82,-38,5,-39,-66,100,15,43]],expected:[-82,-84,100,null,-59,-38,43,-25,null,null,5,15,null,null,19,null,-39,null,null,null,null,null,-66],public:!1},{seed:4702,index:1,input:[[-52,79],[-52,79]],expected:[-52,null,79],public:!1},{seed:4702,index:2,input:[[11,-63],[11,-63]],expected:[11,null,-63],public:!1},{seed:4702,index:3,input:[[95,66,-74,-79,-28,-33,0,-90,-57,4,75,-8],[-74,66,-33,-28,-79,0,75,4,-57,-90,95,-8]],expected:[95,66,-8,-74,-79,null,null,null,null,-28,0,-33,null,null,-90,null,null,-57,null,4,null,75],public:!1},{seed:4702,index:4,input:[[-93,23,24,-1,82,-18],[-93,24,23,82,-1,-18]],expected:[-93,null,23,24,-1,null,null,82,-18],public:!1},{seed:4703,index:0,input:[[93,89],[89,93]],expected:[93,89],public:!1},{seed:4703,index:1,input:[[11],[11]],expected:[11],public:!1},{seed:4703,index:2,input:[[-32,14,42],[14,-32,42]],expected:[-32,14,42],public:!1},{seed:4703,index:3,input:[[-99,20],[-99,20]],expected:[-99,null,20],public:!1},{seed:4703,index:4,input:[[-71,33,6,-28,-2,-85,3],[6,33,-28,-85,-2,-71,3]],expected:[-71,33,3,6,-28,null,null,null,null,null,-2,-85],public:!1}],descriptionMarkdown:`# Construct Binary Tree From Preorder And Inorder Traversal

You are given two integer arrays, \`preorder\` and \`inorder\`, which are
the preorder and inorder traversals of the same binary tree. All values in
the tree are distinct. Rebuild that tree and return its root.

- A preorder traversal lists a node, then its left subtree (in preorder),
  then its right subtree (in preorder).
- An inorder traversal lists a node's left subtree (in inorder), then the
  node, then its right subtree (in inorder).

Because the values are distinct, the two traversals determine exactly one
tree.

## Output format

Return the root node. It is compared as a level-order array: nodes are
listed level by level, left to right; each present node contributes its
value, and each missing child of a present node contributes \`null\`.
Children of a missing node are never listed, and trailing \`null\` entries
are dropped. For example, \`[1, 2, null, 3]\` is a root \`1\` with only a
left child \`2\`, which has only a left child \`3\`.

## Examples

\`\`\`
Input: preorder = [4, 2, 1, 3, 6, 5], inorder = [1, 2, 3, 4, 5, 6]
Output: [4, 2, 6, 1, 3, 5]
Explanation: 4 is the root. In inorder, 1, 2, 3 lie to its left and 5, 6 to
its right; repeating the split on each side gives the tree.
\`\`\`

\`\`\`
Input: preorder = [1, 2, 3], inorder = [3, 2, 1]
Output: [1, 2, null, 3]
\`\`\`

## Constraints

- \`1 <= preorder.length == inorder.length <= 3000\`
- \`-3000 <= value <= 3000\`
- All values are distinct.
- Both arrays come from the same binary tree.
`}];export{e as default};
