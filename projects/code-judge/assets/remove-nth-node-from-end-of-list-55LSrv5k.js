const e=[{slug:"remove-nth-node-from-end-of-list",title:"Remove Nth Node From End of List",difficulty:"Medium",tags:["linked-list","two-pointers"],function:{name:"removeNthFromEnd",params:[{name:"head",type:"ListNode"},{name:"n",type:"number"}],returns:"ListNode"},compare:{mode:"exact"},limits:{timeMs:1e3},tests:[{input:[[3,6,9,12,15],4],expected:[3,9,12,15],public:!0},{input:[[42],1],expected:[],public:!0},{input:[[7,8],2],expected:[8],public:!1},{input:[[7,8],1],expected:[7],public:!1},{input:[[5,4,3,2,1,0],6],public:!1,expected:[4,3,2,1,0]}],generated:{seeds:[1401,1402,1403],perSeed:5},variantId:"default",key:"remove-nth-node-from-end-of-list:default",generatedTests:[{seed:1401,index:0,input:[[12,89,31,17,2,98,36,4,94,86,60,73,73],11],expected:[12,89,17,2,98,36,4,94,86,60,73,73],public:!1},{seed:1401,index:1,input:[[85,33,39,59,92,99],6],expected:[33,39,59,92,99],public:!1},{seed:1401,index:2,input:[[93,17,1],3],expected:[17,1],public:!1},{seed:1401,index:3,input:[[97],1],expected:[],public:!1},{seed:1401,index:4,input:[[30,46,39,22,65,4,81,73,88,42],9],expected:[30,39,22,65,4,81,73,88,42],public:!1},{seed:1402,index:0,input:[[94,54,6,33],3],expected:[94,6,33],public:!1},{seed:1402,index:1,input:[[44,40,93,30,25,97,100,74,83,77,86,37,51],2],expected:[44,40,93,30,25,97,100,74,83,77,86,51],public:!1},{seed:1402,index:2,input:[[80,90,82,77,58,10,99,91,23,62,1,28],5],expected:[80,90,82,77,58,10,99,23,62,1,28],public:!1},{seed:1402,index:3,input:[[82,7],1],expected:[82],public:!1},{seed:1402,index:4,input:[[90,40,14,51,70,1,1],3],expected:[90,40,14,51,1,1],public:!1},{seed:1403,index:0,input:[[30,21],2],expected:[21],public:!1},{seed:1403,index:1,input:[[97],1],expected:[],public:!1},{seed:1403,index:2,input:[[40,58,34,45,55,54,10,76,43,38],3],expected:[40,58,34,45,55,54,10,43,38],public:!1},{seed:1403,index:3,input:[[78,59,12,32,57,62,71,40],2],expected:[78,59,12,32,57,62,40],public:!1},{seed:1403,index:4,input:[[8,63,2,54,21,66,45,14,38,53],7],expected:[8,63,2,21,66,45,14,38,53],public:!1}],descriptionMarkdown:`# Remove Nth Node From End of List

You are given \`head\`, the first node of a non-empty singly linked list, and
an integer \`n\`. Counting from the tail, where the last node is position \`1\`,
delete the node at position \`n\` and return the head of the resulting list.
If the deleted node was the head, the new head is the node after it (or an
empty list if nothing remains).

## Examples

\`\`\`
Input: head = [3, 6, 9, 12, 15], n = 4
Output: [3, 9, 12, 15]
Explanation: counting from the end, 15 is 1st, 12 is 2nd, 9 is 3rd, 6 is 4th.
\`\`\`

\`\`\`
Input: head = [42], n = 1
Output: []
\`\`\`

## Constraints

- \`1 <= number of nodes <= 30\`
- \`0 <= node.val <= 100\`
- \`1 <= n <= number of nodes\`

## Notes

A single pass is possible: advance a lead pointer \`n\` steps ahead of a trail
pointer that starts at a dummy node before the head, then move both until the
lead reaches the last node. The trail pointer then sits just before the node
to delete.
`}];export{e as default};
