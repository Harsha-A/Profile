const e=[{slug:"binary-tree-maximum-path-sum",title:"Binary Tree Maximum Path Sum",difficulty:"Hard",tags:["tree","depth-first-search","dynamic-programming","binary-tree"],function:{name:"maxPathSum",params:[{name:"root",type:"TreeNode"}],returns:"number"},compare:{mode:"exact"},limits:{timeMs:1e3},tests:[{input:[[2,-1,3]],expected:5,public:!0},{input:[[-4,6,8,null,null,-2,5]],expected:15,public:!0},{input:[[-7]],expected:-7,public:!1},{input:[[-3,-1,-2]],expected:-1,public:!1},{input:[[1,-2,3,4,5,-6,2,null,-1]],public:!1,expected:9}],generated:{seeds:[5001,5002,5003],perSeed:5},variantId:"default",key:"binary-tree-maximum-path-sum:default",generatedTests:[{seed:5001,index:0,input:[[-87,-15,-39,-23,-75,null,-73,null,-86,null,-77,-28,-89,null,null,null,null,-96,-26,null,null,null,null,null,-35]],expected:-15,public:!1},{seed:5001,index:1,input:[[100,-31,20,null,null,-98]],expected:120,public:!1},{seed:5001,index:2,input:[[-90,-69,null,-10]],expected:-10,public:!1},{seed:5001,index:3,input:[[-64,22,-33,-67,null,-25,null,91,-10,null,null,null,98]],expected:189,public:!1},{seed:5001,index:4,input:[[-17,null,92]],expected:92,public:!1},{seed:5002,index:0,input:[[14,68,87,null,null,-10,null,-64,56,94,null,-59,null,56,null,null,null,-79,38]],expected:283,public:!1},{seed:5002,index:1,input:[[-18,null,-86,20,31,94,null,null,85,null,-31,7,-19,62,6,null,null,18,-70]],expected:182,public:!1},{seed:5002,index:2,input:[[34,73,33,null,null,82,28,-94,76,null,null,-40]],expected:298,public:!1},{seed:5002,index:3,input:[[-10]],expected:-10,public:!1},{seed:5002,index:4,input:[[0]],expected:0,public:!1},{seed:5003,index:0,input:[[-27,-84,-84,-73,-49,-61,-13,-88,-97,null,null,-82,-50,-96,null,-43,null,null,-19]],expected:-13,public:!1},{seed:5003,index:1,input:[[-65,-67,-84,-20,-19,-69,-55,-36,-1,null,null,null,null,-44,null,null,-78,null,-34,-75,null,null,null,-25,null,-15]],expected:-1,public:!1},{seed:5003,index:2,input:[[14]],expected:14,public:!1},{seed:5003,index:3,input:[[-36,59,34,null,-18,52,-55,null,null,null,null,45,null,-62,24,36]],expected:109,public:!1},{seed:5003,index:4,input:[[-8,-38,-53,-72,48,null,null,52,86,16,67,null,null,null,null,null,null,35]],expected:166,public:!1}],descriptionMarkdown:`# Binary Tree Maximum Path Sum

You are given the root of a non-empty binary tree with integer values
(possibly negative). A *path* is a sequence of one or more distinct nodes in
which every consecutive pair is joined by an edge (parent to child or child
to parent). A path does not have to pass through the root, and it may
consist of a single node. The sum of a path is the total of its node values.
Return the largest sum over all paths.

## Tree format

A tree is written as a level-order array. Nodes are listed level by level,
left to right; each present node contributes its value, and each missing
child of a present node contributes \`null\`. Children of a missing node are
never listed, and trailing \`null\` entries are dropped. An empty tree is
\`[]\`. For example, \`[-4, 6, 8, null, null, -2, 5]\` is a root \`-4\`
with a leaf \`6\` on the left and \`8\` on the right, where \`8\` has
children \`-2\` and \`5\`.

## Examples

\`\`\`
Input: root = [-4, 6, 8, null, null, -2, 5]
Output: 15
Explanation: the path 6 -> -4 -> 8 -> 5 sums to 15, which beats 8 -> 5 (13).
\`\`\`

\`\`\`
Input: root = [-3, -1, -2]
Output: -1
Explanation: every value is negative, so the best path is the single node -1.
\`\`\`

## Constraints

- \`1 <= number of nodes <= 3 * 10^4\`
- \`-1000 <= node value <= 1000\`

## Notes

For each node, compute the best downward path starting at it (ignoring a
child's contribution when it is negative), and update the answer with the
node plus the best downward paths of both children.
`}];export{e as default};
