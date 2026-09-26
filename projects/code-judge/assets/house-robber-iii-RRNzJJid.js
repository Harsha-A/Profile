const e=[{slug:"house-robber-iii",title:"House Robber III",difficulty:"Medium",tags:["tree","depth-first-search","dynamic-programming","binary-tree"],function:{name:"rob",params:[{name:"root",type:"TreeNode"}],returns:"number"},compare:{mode:"exact"},limits:{timeMs:1e3},tests:[{input:[[4,1,5,2,null,null,3]],expected:9,public:!0},{input:[[2,10,3,null,null,1,20]],expected:31,public:!0},{input:[[5]],expected:5,public:!1},{input:[[0,0,0]],expected:0,public:!1},{input:[[1,8,1,1,1,null,9,7]],public:!1,expected:24}],generated:{seeds:[4801,4802,4803],perSeed:5},variantId:"default",key:"house-robber-iii:default",generatedTests:[{seed:4801,index:0,input:[[6,42,null,null,14]],expected:42,public:!1},{seed:4801,index:1,input:[[7,13,33,null,null,null,4]],expected:46,public:!1},{seed:4801,index:2,input:[[28,49,3,47,null,41,49,null,null,10,45,40,18,null,null,null,1,null,null,22]],expected:201,public:!1},{seed:4801,index:3,input:[[40,17,7,2,46,null,40,null,14,37,37,5,null,null,null,null,null,25,null,2]],expected:170,public:!1},{seed:4801,index:4,input:[[28]],expected:28,public:!1},{seed:4802,index:0,input:[[43,12,null,48,41,20,45,10,null,null,null,19,42,25,31]],expected:249,public:!1},{seed:4802,index:1,input:[[24,41,25,null,50,21,null,47,36,29]],expected:178,public:!1},{seed:4802,index:2,input:[[8,34,36,24,16,21,null,41,16,null,null,null,null,null,null,32,null,33]],expected:160,public:!1},{seed:4802,index:3,input:[[46,14,16,42,20,null,4,0,null,43,22,0,38,null,null,49]],expected:197,public:!1},{seed:4802,index:4,input:[[16,40,44,42,39,3,null,null,12,null,11,null,39]],expected:164,public:!1},{seed:4803,index:0,input:[[45,21,19,null,28,18,8,null,null,45]],expected:126,public:!1},{seed:4803,index:1,input:[[6,48,36,null,7,null,38,23,null,11,8]],expected:126,public:!1},{seed:4803,index:2,input:[[33,48,8,null,29,48,10,null,39,15,13,null,null,2,null,7]],expected:152,public:!1},{seed:4803,index:3,input:[[7,39,31,25,null,null,44,12,19,28,null,null,41]],expected:158,public:!1},{seed:4803,index:4,input:[[42,16,34,null,null,3,15,null,null,4,31]],expected:85,public:!1}],descriptionMarkdown:`# House Robber III

You are given the root of a non-empty binary tree whose node values are
non-negative integers. Choose a subset of the nodes such that no two chosen
nodes are directly connected by an edge (a node and its parent may not both
be chosen; siblings, grandparents, and other non-adjacent pairs may). Return
the largest possible sum of the chosen nodes' values.

## Tree format

A tree is written as a level-order array. Nodes are listed level by level,
left to right; each present node contributes its value, and each missing
child of a present node contributes \`null\`. Children of a missing node are
never listed, and trailing \`null\` entries are dropped. An empty tree is
\`[]\`. For example, \`[2, 10, 3, null, null, 1, 20]\` is a root \`2\`
with a leaf \`10\` on the left and \`3\` on the right, where \`3\` has
children \`1\` and \`20\`.

## Examples

\`\`\`
Input: root = [4, 1, 5, 2, null, null, 3]
Output: 9
Explanation: choose 4, 2, and 3. None of them is a parent of another.
\`\`\`

\`\`\`
Input: root = [2, 10, 3, null, null, 1, 20]
Output: 31
Explanation: choose 10, 1, and 20; 1 and 20 are siblings, which is allowed.
\`\`\`

## Constraints

- \`1 <= number of nodes <= 10^4\`
- \`0 <= node value <= 10^4\`

## Notes

For each node, compute two values bottom-up: the best sum of its subtree
when the node is chosen, and when it is not.
`}];export{e as default};
