const e=[{slug:"reorder-list",title:"Reorder List",difficulty:"Medium",tags:["linked-list","two-pointers","in-place"],function:{name:"reorderList",params:[{name:"head",type:"ListNode"}],returns:"void",resultFrom:"arg:0"},compare:{mode:"exact"},limits:{timeMs:1e3},tests:[{input:[[10,20,30,40,50,60]],expected:[10,60,20,50,30,40],public:!0},{input:[[5,6,7]],expected:[5,7,6],public:!0},{input:[[1]],expected:[1],public:!1},{input:[[8,2]],expected:[8,2],public:!1},{input:[[1,2,3,4,5]],expected:[1,5,2,4,3],public:!1},{input:[[9,9,4,4,4,1,0]],public:!1,expected:[9,0,9,1,4,4,4]}],generated:{seeds:[1301,1302,1303],perSeed:5},variantId:"default",key:"reorder-list:default",generatedTests:[{seed:1301,index:0,input:[[496,599,724,390,245,480,993,871,30,330,267,593]],expected:[496,593,599,267,724,330,390,30,245,871,480,993],public:!1},{seed:1301,index:1,input:[[850,845,587]],expected:[850,587,845],public:!1},{seed:1301,index:2,input:[[126,956,358]],expected:[126,358,956],public:!1},{seed:1301,index:3,input:[[797,766,963,792]],expected:[797,792,766,963],public:!1},{seed:1301,index:4,input:[[925,630,27,684,521,627]],expected:[925,627,630,521,27,684],public:!1},{seed:1302,index:0,input:[[207,292,679]],expected:[207,679,292],public:!1},{seed:1302,index:1,input:[[800,467,599,977,329,170,625,347,160,175,977]],expected:[800,977,467,175,599,160,977,347,329,625,170],public:!1},{seed:1302,index:2,input:[[774,145,167,103,404,881,85,837,766,486,167,561,475,585,434]],expected:[774,434,145,585,167,475,103,561,404,167,881,486,85,766,837],public:!1},{seed:1302,index:3,input:[[613,479,359,134,807,590,264,996,451,970,401,710,139,873]],expected:[613,873,479,139,359,710,134,401,807,970,590,451,264,996],public:!1},{seed:1302,index:4,input:[[710,78,282,333,947]],expected:[710,947,78,333,282],public:!1},{seed:1303,index:0,input:[[426,512,375,493,258,838,473,281,954,157,691,664,877,76,544]],expected:[426,544,512,76,375,877,493,664,258,691,838,157,473,954,281],public:!1},{seed:1303,index:1,input:[[313,775,273,28,458,637,375,936,817,474,841,747,859,148]],expected:[313,148,775,859,273,747,28,841,458,474,637,817,375,936],public:!1},{seed:1303,index:2,input:[[612,869]],expected:[612,869],public:!1},{seed:1303,index:3,input:[[404,78,62,54,975,567,997,972,582,561,889,355]],expected:[404,355,78,889,62,561,54,582,975,972,567,997],public:!1},{seed:1303,index:4,input:[[585]],expected:[585],public:!1}],descriptionMarkdown:`# Reorder List

You are given \`head\`, the first node of a non-empty singly linked list whose
nodes are, in order, \`N0, N1, N2, ..., N(n-1)\`. Rearrange the nodes **in
place** so the list reads

\`\`\`
N0, N(n-1), N1, N(n-2), N2, N(n-3), ...
\`\`\`

that is, alternately take the next unused node from the front and the next
unused node from the back. Rewire the \`next\` pointers only; do not change any
node's \`val\`. The function returns nothing; the judge reads the list starting
from the original \`head\` after your function finishes.

## Examples

\`\`\`
Input: head = [10, 20, 30, 40, 50, 60]
After the call: [10, 60, 20, 50, 30, 40]
\`\`\`

\`\`\`
Input: head = [5, 6, 7]
After the call: [5, 7, 6]
\`\`\`

## Constraints

- \`1 <= number of nodes <= 5 * 10^4\`
- \`1 <= node.val <= 1000\`

## Notes

Find the middle with slow and fast pointers, reverse the second half, then
interleave the two halves node by node.
`}];export{e as default};
