const e=[{slug:"reverse-linked-list",title:"Reverse Linked List",difficulty:"Easy",tags:["linked-list","recursion"],function:{name:"reverseList",params:[{name:"head",type:"ListNode"}],returns:"ListNode"},compare:{mode:"exact"},limits:{timeMs:1e3},tests:[{input:[[4,8,15,16]],expected:[16,15,8,4],public:!0},{input:[[9,-2]],expected:[-2,9],public:!0},{input:[[]],expected:[],public:!1},{input:[[7]],expected:[7],public:!1},{input:[[3,3,1,3]],public:!1,expected:[3,1,3,3]}],generated:{seeds:[1101,1102,1103],perSeed:5},variantId:"default",key:"reverse-linked-list:default",generatedTests:[{seed:1101,index:0,input:[[53,55,100,41]],expected:[41,100,55,53],public:!1},{seed:1101,index:1,input:[[-18,13,35,92,2,-97,77,-26,-4,44,10,45,36,23,-25]],expected:[-25,23,36,45,10,44,-4,-26,77,-97,2,92,35,13,-18],public:!1},{seed:1101,index:2,input:[[-59,-57,-77,4,61]],expected:[61,4,-77,-57,-59],public:!1},{seed:1101,index:3,input:[[48]],expected:[48],public:!1},{seed:1101,index:4,input:[[-74,-39,86,-40,-62,3]],expected:[3,-62,-40,86,-39,-74],public:!1},{seed:1102,index:0,input:[[73,41,39,42,29]],expected:[29,42,39,41,73],public:!1},{seed:1102,index:1,input:[[0,81,90,-81,26,7,-10,83,65,10,44,-20,-4,68,-63]],expected:[-63,68,-4,-20,44,10,65,83,-10,7,26,-81,90,81,0],public:!1},{seed:1102,index:2,input:[[12,-42,-76,16,77,59,47,-70,-99,-67,48,-2,-87,77,-46]],expected:[-46,77,-87,-2,48,-67,-99,-70,47,59,77,16,-76,-42,12],public:!1},{seed:1102,index:3,input:[[-41,45,40,-98,71,-61,31,-13,14,-82,66]],expected:[66,-82,14,-13,31,-61,71,-98,40,45,-41],public:!1},{seed:1102,index:4,input:[[68,-44,37,-8,-22]],expected:[-22,-8,37,-44,68],public:!1},{seed:1103,index:0,input:[[-66,-71,-95,-63,-30,-73,-34,-60,-17,-45]],expected:[-45,-17,-60,-34,-73,-30,-63,-95,-71,-66],public:!1},{seed:1103,index:1,input:[[-3,-63,-39,66,69,-31]],expected:[-31,69,66,-39,-63,-3],public:!1},{seed:1103,index:2,input:[[-31,60,-72,-34,30,20,97,-14,44]],expected:[44,-14,97,20,30,-34,-72,60,-31],public:!1},{seed:1103,index:3,input:[[-57,86,62,-80,-33,-11,-87,37,43]],expected:[43,37,-87,-11,-33,-80,62,86,-57],public:!1},{seed:1103,index:4,input:[[]],expected:[],public:!1}],descriptionMarkdown:`# Reverse Linked List

You are given \`head\`, the first node of a singly linked list (possibly
empty). Reverse the order of the nodes and return the head of the reversed
list.

## Examples

\`\`\`
Input: head = [4, 8, 15, 16]
Output: [16, 15, 8, 4]
\`\`\`

\`\`\`
Input: head = []
Output: []
\`\`\`

## Constraints

- \`0 <= number of nodes <= 5000\`
- \`-5000 <= node.val <= 5000\`

## Notes

Walk the list once, redirecting each node's \`next\` pointer to the node that
came before it. Both an iterative and a recursive version are possible.
`}];export{e as default};
