const e=[{slug:"add-two-numbers",title:"Add Two Numbers",difficulty:"Medium",tags:["linked-list","math","simulation"],function:{name:"addTwoNumbers",params:[{name:"l1",type:"ListNode"},{name:"l2",type:"ListNode"}],returns:"ListNode"},compare:{mode:"exact"},limits:{timeMs:1e3},tests:[{input:[[6,1,3],[7,2]],expected:[3,4,3],public:!0},{input:[[5],[5]],expected:[0,1],public:!0},{input:[[0],[0]],expected:[0],public:!1},{input:[[9,9,9,9],[1]],expected:[0,0,0,0,1],public:!1},{input:[[2,4,0,8],[8,5,9]],public:!1,expected:[0,0,0,9]}],generated:{seeds:[1501,1502,1503],perSeed:5},variantId:"default",key:"add-two-numbers:default",generatedTests:[{seed:1501,index:0,input:[[2,2],[9,8,6,9,3,0,1,8]],expected:[1,1,7,9,3,0,1,8],public:!1},{seed:1501,index:1,input:[[0],[7,8,8,5,0,8,1,0,5,1,1,0,7]],expected:[7,8,8,5,0,8,1,0,5,1,1,0,7],public:!1},{seed:1501,index:2,input:[[2,3,8,3,2,4,7,0,6,9,8,2,2,7,3,8,3],[9,0,1,3,4,8,8,6,7,9,5,6,7,5,3,4,6,8,0,9]],expected:[1,4,9,6,6,2,6,7,3,9,4,9,9,2,7,2,0,9,0,9],public:!1},{seed:1501,index:3,input:[[7,4,5,1,3,6,7,6],[4,2,7,6]],expected:[1,7,2,8,3,6,7,6],public:!1},{seed:1501,index:4,input:[[7,9,6,7,2,8,6,6],[7,9,1,3,7,4,4,4,3,8,0,2,4,2,2,0,7]],expected:[4,9,8,0,0,3,1,1,4,8,0,2,4,2,2,0,7],public:!1},{seed:1502,index:0,input:[[0],[9,2,9,8,4,8,6,1,9,0,3,1,2,0,4,6,6,3,5]],expected:[9,2,9,8,4,8,6,1,9,0,3,1,2,0,4,6,6,3,5],public:!1},{seed:1502,index:1,input:[[9,2,1,9,2,1,1,7,1,3,2,7,9,3,6,5,0,3,5],[9,3,8,3,3,3,3,4]],expected:[8,6,9,2,6,4,4,1,2,3,2,7,9,3,6,5,0,3,5],public:!1},{seed:1502,index:2,input:[[8,2,9,3,7,5,1,1],[6,1,8,0,9,7,3,5,2,3,8,0,1,5,6,7,1,7,9,9]],expected:[4,4,7,4,6,3,5,6,2,3,8,0,1,5,6,7,1,7,9,9],public:!1},{seed:1502,index:3,input:[[0],[0]],expected:[0],public:!1},{seed:1502,index:4,input:[[0,8,6,1,8,7,4,6],[5,8,4,4,1,3,4,5,9,7,6,9,8,4,5,2,3,3,2]],expected:[5,6,1,6,9,0,9,1,0,8,6,9,8,4,5,2,3,3,2],public:!1},{seed:1503,index:0,input:[[1,3,2,6,8,8,5,5,2,8,8,7],[5,7,6,3,3,0,3,5,6,3,1,8,1,4,4,7,2]],expected:[6,0,9,9,1,9,8,0,9,1,0,6,2,4,4,7,2],public:!1},{seed:1503,index:1,input:[[0,1,8],[1,7,8,0,7,4,0,3,0,2]],expected:[1,8,6,1,7,4,0,3,0,2],public:!1},{seed:1503,index:2,input:[[1,6,2,0,5,5,7,2,8],[4,1,9,5]],expected:[5,7,1,6,5,5,7,2,8],public:!1},{seed:1503,index:3,input:[[6,1,5,1,0,2,8,1,9,2,0,7,7,9,2,1],[5,7,6,3,1,8,2,6,3,5,8,6,5,4,8,3,9,8,1]],expected:[1,9,1,5,1,0,1,8,2,8,8,3,3,4,1,5,9,8,1],public:!1},{seed:1503,index:4,input:[[2,4,3,4,6,8,2,4,2,2,2,1,5,2,8,4,5,8,1,5],[6,1,8,9,6,0,7,5,3,4,5,6,0,9,3]],expected:[8,5,1,4,3,9,9,9,5,6,7,7,5,1,2,5,5,8,1,5],public:!1}],descriptionMarkdown:`# Add Two Numbers

Two non-negative integers are each stored as a singly linked list of decimal
digits, **least significant digit first**: the head holds the ones digit, the
next node the tens digit, and so on. Given the heads \`l1\` and \`l2\`, return a
list in the same format that represents their sum.

Neither input has leading zeros (a most significant digit of \`0\`), except
the number zero itself, which is the single-node list \`[0]\`. Your output must
follow the same rule.

## Examples

\`\`\`
Input: l1 = [6, 1, 3], l2 = [7, 2]
Output: [3, 4, 3]
Explanation: 316 + 27 = 343.
\`\`\`

\`\`\`
Input: l1 = [5], l2 = [5]
Output: [0, 1]
Explanation: 5 + 5 = 10.
\`\`\`

## Constraints

- \`1 <= number of nodes in each list <= 100\`
- \`0 <= node.val <= 9\`
- Neither list has leading zeros unless it is exactly \`[0]\`.

## Notes

The numbers can be far larger than a JavaScript number can hold exactly, so
add digit by digit with a carry rather than converting to integers. Remember
a final carry may add one more node.
`}];export{e as default};
