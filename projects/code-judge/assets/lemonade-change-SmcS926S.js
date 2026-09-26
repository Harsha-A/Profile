const e=[{slug:"lemonade-change",title:"Lemonade Change",difficulty:"Easy",tags:["array","greedy","simulation"],function:{name:"lemonadeChange",params:[{name:"bills",type:"number[]"}],returns:"boolean"},compare:{mode:"exact"},limits:{timeMs:1e3},tests:[{input:[[5,5,10,20]],expected:!0,public:!0},{input:[[5,10,10]],expected:!1,public:!0},{input:[[10]],expected:!1,public:!1},{input:[[5,5,5,20]],expected:!0,public:!1},{input:[[5,5,10,10,20]],expected:!1,public:!1},{input:[[5,10,5,20,5,5,5,20]],public:!1,expected:!0}],generated:{seeds:[1601,1602,1603],perSeed:5},variantId:"default",key:"lemonade-change:default",generatedTests:[{seed:1601,index:0,input:[[5,5,5,5,10,5,10]],expected:!0,public:!1},{seed:1601,index:1,input:[[5,5,5]],expected:!0,public:!1},{seed:1601,index:2,input:[[10]],expected:!1,public:!1},{seed:1601,index:3,input:[[5,5,5,5,5,20,5]],expected:!0,public:!1},{seed:1601,index:4,input:[[20,5,10,10,5,20,5]],expected:!1,public:!1},{seed:1602,index:0,input:[[5,5,5,5,5,10]],expected:!0,public:!1},{seed:1602,index:1,input:[[5]],expected:!0,public:!1},{seed:1602,index:2,input:[[5,5,5]],expected:!0,public:!1},{seed:1602,index:3,input:[[5,5,5,20,20,5,5]],expected:!1,public:!1},{seed:1602,index:4,input:[[10,5,5,5]],expected:!1,public:!1},{seed:1603,index:0,input:[[10,20,5,20,5,5,10,5,10]],expected:!1,public:!1},{seed:1603,index:1,input:[[5,20,5,5,5,5,5,10,20,5,20,5,20]],expected:!1,public:!1},{seed:1603,index:2,input:[[5,5,5,5,5,20,5,5,5,5,5,5,5,5]],expected:!0,public:!1},{seed:1603,index:3,input:[[20,5]],expected:!1,public:!1},{seed:1603,index:4,input:[[10,20,10,10,10,20,5]],expected:!1,public:!1}],descriptionMarkdown:`# Lemonade Change

A vendor sells one item priced at 5 units. Customers arrive one at a time in
the order given by \`bills\`, and each pays with exactly one bill worth \`5\`,
\`10\`, or \`20\` units. The vendor starts with no money at all.

For every customer, the vendor must immediately hand back change equal to the
bill value minus 5, using only bills received from earlier customers. Bills
received are kept and may be used as change later. A \`20\` bill is never
useful as change, since no payment requires 20 units back.

Return \`true\` if the vendor can give correct change to every customer in
order, and \`false\` as soon as any customer cannot be served.

## Examples

\`\`\`
Input: bills = [5, 5, 10, 20]
Output: true
Explanation: Keep two 5s. Give one 5 back for the 10. For the 20, give back
the 10 and the remaining 5.
\`\`\`

\`\`\`
Input: bills = [5, 10, 10]
Output: false
Explanation: After the first 10 the vendor holds only a 10, which cannot make
5 units of change for the second 10.
\`\`\`

## Constraints

- \`1 <= bills.length <= 10^5\`
- Each \`bills[i]\` is \`5\`, \`10\`, or \`20\`.

## Notes

Track the count of 5s and 10s held. When making 15 units of change, prefer
one 10 plus one 5 over three 5s, because 5s are more flexible later.
`}];export{e as default};
