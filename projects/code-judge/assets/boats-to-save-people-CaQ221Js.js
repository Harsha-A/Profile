const e=[{slug:"boats-to-save-people",title:"Boats to Save People",difficulty:"Medium",tags:["array","two-pointers","greedy","sorting"],function:{name:"numRescueBoats",params:[{name:"people",type:"number[]"},{name:"limit",type:"number"}],returns:"number"},compare:{mode:"exact"},limits:{timeMs:1e3},tests:[{input:[[4,2,7,5],9],expected:2,public:!0},{input:[[6,6,6],10],expected:3,public:!0},{input:[[1],1],expected:1,public:!1},{input:[[1,1,1,1],2],expected:2,public:!1},{input:[[3,5,3,4],5],expected:4,public:!1},{input:[[2,8,3,7,5,5,1,9],10],public:!1,expected:4}],generated:{seeds:[8801,8802,8803],perSeed:5},variantId:"default",key:"boats-to-save-people:default",generatedTests:[{seed:8801,index:0,input:[[11,7,1,2,6,2,5,9,7,10,6,3,1,9,11],11],expected:9,public:!1},{seed:8801,index:1,input:[[5,3,3,1,1,1,2,1,3,1,5,3,4,3,1,5,1,3,2,3],5],expected:12,public:!1},{seed:8801,index:2,input:[[7,16,12,17,13,13,7,6,3,9,3,8,15,4],17],expected:9,public:!1},{seed:8801,index:3,input:[[10],11],expected:1,public:!1},{seed:8801,index:4,input:[[2,21,20,2,12,2,1,12,6,11,20,18,16,2,17],21],expected:9,public:!1},{seed:8802,index:0,input:[[5,1,1],5],expected:2,public:!1},{seed:8802,index:1,input:[[5,3,5,2,7,1,3,7,4,7,7,7,2,1,5,6,6,5],7],expected:13,public:!1},{seed:8802,index:2,input:[[6,18,19,15,6,6,5,10,7,5,1,11,3,17,18,5],21],expected:9,public:!1},{seed:8802,index:3,input:[[3,6,3,6,6,4,2,1,2,6,5,5,2,6],6],expected:10,public:!1},{seed:8802,index:4,input:[[9,4,13,13,7,8,2,7,3,11,8,12,13,3,12,4,11,1,3,10],14],expected:12,public:!1},{seed:8803,index:0,input:[[1,3,8,8,4,1,8],11],expected:4,public:!1},{seed:8803,index:1,input:[[2,5,3,3,5,3,5,7,2,4,3,1,7,4,2,7,7,3],7],expected:11,public:!1},{seed:8803,index:2,input:[[5],11],expected:1,public:!1},{seed:8803,index:3,input:[[16,16,14,5,8,14,15,1,2],18],expected:6,public:!1},{seed:8803,index:4,input:[[4,1,3,3,4,2,1,1,1,2],4],expected:6,public:!1}],descriptionMarkdown:`# Boats to Save People

You are given an array \`people\` where \`people[i]\` is the weight of the
\`i\`-th item, and an integer \`limit\`. Items are packed into carriers. Each
carrier holds **at most two** items, and the total weight in a carrier must
not exceed \`limit\`. Every individual weight is at most \`limit\`, so a single
item always fits on its own.

Return the minimum number of carriers needed to pack every item.

## Examples

\`\`\`
Input: people = [4, 2, 7, 5], limit = 9
Output: 2
Explanation: pair 2 with 7 and 4 with 5.
\`\`\`

\`\`\`
Input: people = [6, 6, 6], limit = 10
Output: 3
Explanation: no two weights fit together, so each needs its own carrier.
\`\`\`

## Constraints

- \`1 <= people.length <= 5 * 10^4\`
- \`1 <= people[i] <= limit <= 3 * 10^4\`

## Notes

After sorting, the heaviest remaining item always takes a carrier; add the
lightest remaining item to it whenever the pair fits.
`}];export{e as default};
