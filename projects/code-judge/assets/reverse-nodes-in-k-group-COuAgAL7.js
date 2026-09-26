const e=[{slug:"reverse-nodes-in-k-group",title:"Reverse Nodes In K Group",difficulty:"Hard",tags:["linked-list","recursion"],function:{name:"reverseKGroup",params:[{name:"head",type:"ListNode"},{name:"k",type:"number"}],returns:"ListNode"},compare:{mode:"exact"},limits:{timeMs:1e3},tests:[{input:[[1,2,3,4,5,6,7,8],3],expected:[3,2,1,6,5,4,7,8],public:!0},{input:[[40,30,20,10],2],expected:[30,40,10,20],public:!0},{input:[[5,6,7],1],expected:[5,6,7],public:!1},{input:[[5,6,7],3],expected:[7,6,5],public:!1},{input:[[9],1],expected:[9],public:!1},{input:[[2,4,6,8,10,12,14],4],public:!1,expected:[8,6,4,2,10,12,14]}],generated:{seeds:[1901,1902,1903],perSeed:5},variantId:"default",key:"reverse-nodes-in-k-group:default",generatedTests:[{seed:1901,index:0,input:[[714,986,83,566,273,664,57,663,238,481,879],11],expected:[879,481,238,663,57,664,273,566,83,986,714],public:!1},{seed:1901,index:1,input:[[153,820,954,726,283,523,220,980,734,307,338,936,892],3],expected:[954,820,153,523,283,726,734,980,220,936,338,307,892],public:!1},{seed:1901,index:2,input:[[968,897,354,615,147,823,476,4,848,569,580],7],expected:[476,823,147,615,354,897,968,4,848,569,580],public:!1},{seed:1901,index:3,input:[[85,952,822,63,965,132,12,149,619,381,562,217,642,117,63],8],expected:[149,12,132,965,63,822,952,85,619,381,562,217,642,117,63],public:!1},{seed:1901,index:4,input:[[186,734,662,801,689,686,56,5,300,392,620,284,661],1],expected:[186,734,662,801,689,686,56,5,300,392,620,284,661],public:!1},{seed:1902,index:0,input:[[645,902,893,220,753,168,823,359,383,120,48,778,780,940,162,450],4],expected:[220,893,902,645,359,823,168,753,778,48,120,383,450,162,940,780],public:!1},{seed:1902,index:1,input:[[451,996,361,798,598,927,919,70,798,564,177,247,910,71,279,945],9],expected:[798,70,919,927,598,798,361,996,451,564,177,247,910,71,279,945],public:!1},{seed:1902,index:2,input:[[425,654,52,939,28,740,683,907,675],6],expected:[740,28,939,52,654,425,683,907,675],public:!1},{seed:1902,index:3,input:[[291,657,289,142,540,153,338,823,650],4],expected:[142,289,657,291,823,338,153,540,650],public:!1},{seed:1902,index:4,input:[[320,441,294,857,115,953,482,331,276,794],2],expected:[441,320,857,294,953,115,331,482,794,276],public:!1},{seed:1903,index:0,input:[[360,79,173,261,145,930,791],6],expected:[930,145,261,173,79,360,791],public:!1},{seed:1903,index:1,input:[[576,802],1],expected:[576,802],public:!1},{seed:1903,index:2,input:[[742,324,434,664,486,690,41,731,103,709,844,842,933],9],expected:[103,731,41,690,486,664,434,324,742,709,844,842,933],public:!1},{seed:1903,index:3,input:[[21,787,833,866,881,616,33,664,562,298,759,94,286,744,415],7],expected:[33,616,881,866,833,787,21,744,286,94,759,298,562,664,415],public:!1},{seed:1903,index:4,input:[[465,828,531],3],expected:[531,828,465],public:!1}],descriptionMarkdown:`# Reverse Nodes In K Group

You are given \`head\`, the first node of a non-empty singly linked list, and
a positive integer \`k\` no larger than the list's length. Split the list, from
the front, into consecutive blocks of exactly \`k\` nodes. Reverse the order of
the nodes inside each full block. If fewer than \`k\` nodes remain at the end,
leave that final partial block in its original order. Return the head of the
resulting list.

Rewire the \`next\` pointers only; do not change any node's \`val\`.

## Examples

\`\`\`
Input: head = [1, 2, 3, 4, 5, 6, 7, 8], k = 3
Output: [3, 2, 1, 6, 5, 4, 7, 8]
Explanation: blocks are [1,2,3], [4,5,6] and the partial block [7,8].
\`\`\`

\`\`\`
Input: head = [40, 30, 20, 10], k = 2
Output: [30, 40, 10, 20]
\`\`\`

## Constraints

- \`1 <= number of nodes <= 5000\`
- \`0 <= node.val <= 1000\`
- \`1 <= k <= number of nodes\`

## Notes

Keep a pointer to the node just before the current block. Check that \`k\`
nodes remain ahead; if so, reverse them in place and reconnect the block's
new first node to the previous part and its new last node to the rest. An
\`O(1)\` extra space solution is possible.
`}];export{e as default};
