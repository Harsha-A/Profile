const e=[{slug:"insert-greatest-common-divisors-in-linked-list",title:"Insert Greatest Common Divisors in Linked List",difficulty:"Medium",tags:["linked-list","math","number-theory"],function:{name:"insertGreatestCommonDivisors",params:[{name:"head",type:"ListNode"}],returns:"ListNode"},compare:{mode:"exact"},limits:{timeMs:1e3},tests:[{input:[[12,8,20]],expected:[12,4,8,4,20],public:!0},{input:[[9]],expected:[9],public:!0},{input:[[7,13]],expected:[7,1,13],public:!1},{input:[[30,45,60,60]],expected:[30,15,45,15,60,60,60],public:!1},{input:[[1,1e3,250]],public:!1,expected:[1,1,1e3,250,250]}],generated:{seeds:[2701,2702,2703],perSeed:5},variantId:"default",key:"insert-greatest-common-divisors-in-linked-list:default",generatedTests:[{seed:2701,index:0,input:[[99,792,972]],expected:[99,99,792,36,972],public:!1},{seed:2701,index:1,input:[[330,865,310,910,330,500,905,440,255,445,55]],expected:[330,5,865,5,310,10,910,10,330,10,500,5,905,5,440,5,255,5,445,5,55],public:!1},{seed:2701,index:2,input:[[251]],expected:[251],public:!1},{seed:2701,index:3,input:[[33,523,222,37,278,742,736,38,574]],expected:[33,1,523,1,222,37,37,1,278,2,742,2,736,2,38,2,574],public:!1},{seed:2701,index:4,input:[[24,894,81,102]],expected:[24,6,894,3,81,3,102],public:!1},{seed:2702,index:0,input:[[588,540,996,612,24,876,300,648,780]],expected:[588,12,540,12,996,12,612,12,24,12,876,12,300,12,648,12,780],public:!1},{seed:2702,index:1,input:[[876,896,748,308,288,868]],expected:[876,4,896,4,748,44,308,4,288,4,868],public:!1},{seed:2702,index:2,input:[[861]],expected:[861],public:!1},{seed:2702,index:3,input:[[656,504,60,396,792,396]],expected:[656,8,504,12,60,12,396,396,792,396,396],public:!1},{seed:2702,index:4,input:[[250,940,550,890,190,780,380,380,210]],expected:[250,10,940,10,550,10,890,10,190,10,780,20,380,380,380,10,210],public:!1},{seed:2703,index:0,input:[[237,396,843,708,933,885,495,957]],expected:[237,3,396,3,843,3,708,3,933,3,885,15,495,33,957],public:!1},{seed:2703,index:1,input:[[605,335]],expected:[605,5,335],public:!1},{seed:2703,index:2,input:[[630,650,770,270,150,220,700,990]],expected:[630,10,650,10,770,10,270,30,150,10,220,20,700,10,990],public:!1},{seed:2703,index:3,input:[[691,16,60,440,865,256,802,433,170,802]],expected:[691,1,16,4,60,20,440,5,865,1,256,2,802,1,433,1,170,2,802],public:!1},{seed:2703,index:4,input:[[73,134,911]],expected:[73,1,134,1,911],public:!1}],descriptionMarkdown:`# Insert Greatest Common Divisors in Linked List

You are given \`head\`, the first node of a non-empty singly linked list of
positive integers. Between every pair of adjacent nodes, insert one new node
whose value is the greatest common divisor of those two neighbours' values.
Return the head of the resulting list.

A list of \`k\` nodes therefore becomes a list of \`2k - 1\` nodes. The original
values keep their relative order; the new nodes are inserted only between
original neighbours, never between a new node and an original one.

The greatest common divisor of two positive integers is the largest positive
integer that divides both of them exactly.

## Examples

\`\`\`
Input: head = [12, 8, 20]
Output: [12, 4, 8, 4, 20]
Explanation: gcd(12, 8) = 4 and gcd(8, 20) = 4.
\`\`\`

\`\`\`
Input: head = [9]
Output: [9]
Explanation: A single node has no neighbours, so nothing is inserted.
\`\`\`

## Constraints

- The list has between \`1\` and \`5000\` nodes.
- \`1 <= Node.val <= 1000\`

## Notes

Each node has a numeric \`val\` field and a \`next\` field (the following node,
or \`null\` at the end). No \`ListNode\` constructor is provided at run time; the
class in the starter code is shown only as a comment. To create a new node,
declare your own class or use a plain object such as \`{ val: 4, next: node }\`.
The judge reads only \`val\` and \`next\` from the list you return.
`}];export{e as default};
