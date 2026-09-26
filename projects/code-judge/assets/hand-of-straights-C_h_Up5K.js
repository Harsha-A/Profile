const e=[{slug:"hand-of-straights",title:"Hand of Straights",difficulty:"Medium",tags:["array","hash-map","greedy","sorting"],function:{name:"isNStraightHand",params:[{name:"hand",type:"number[]"},{name:"groupSize",type:"number"}],returns:"boolean"},compare:{mode:"exact"},limits:{timeMs:1e3},tests:[{input:[[5,3,4,10,11,12],3],expected:!0,public:!0},{input:[[1,2,3,5,6,7],2],expected:!1,public:!0},{input:[[6,6,7,7,8,8],3],expected:!0,public:!1},{input:[[1,2,3,4,5],2],expected:!1,public:!1},{input:[[9],1],expected:!0,public:!1},{input:[[2,3,3,4,4,5],3],public:!1,expected:!0}],generated:{seeds:[2201,2202,2203],perSeed:5},variantId:"default",key:"hand-of-straights:default",generatedTests:[{seed:2201,index:0,input:[[10,9,2,4,6,2,8],1],expected:!0,public:!1},{seed:2201,index:1,input:[[5,2,4,4,12,6,14,2,3,3,1,13],3],expected:!0,public:!1},{seed:2201,index:2,input:[[1,1,14,6,5,4,8,5,0,12,7,11,15,3],2],expected:!1,public:!1},{seed:2201,index:3,input:[[15,16,2,3,14,5,4,14,9,6,0,2,10,1,4],3],expected:!1,public:!1},{seed:2201,index:4,input:[[7,5,8,12,6,7,3,14,4,13,12],1],expected:!0,public:!1},{seed:2202,index:0,input:[[3,2,16,4,0,10,8,13,2,11,5,9,3,15,1,14],4],expected:!0,public:!1},{seed:2202,index:1,input:[[7,8,8],3],expected:!1,public:!1},{seed:2202,index:2,input:[[3,2,0,1,3,15,14,4,2,5],2],expected:!0,public:!1},{seed:2202,index:3,input:[[3,4,2],3],expected:!0,public:!1},{seed:2202,index:4,input:[[9,11,4,11,0,1,13,9,8],1],expected:!0,public:!1},{seed:2203,index:0,input:[[9,7,10],3],expected:!1,public:!1},{seed:2203,index:1,input:[[8,14,9,5,2,3,13,15,6,16,10,17,11,4,7,12],4],expected:!0,public:!1},{seed:2203,index:2,input:[[8,11,6,9,10,10,12,13,12,7,5,13],4],expected:!1,public:!1},{seed:2203,index:3,input:[[10,10],2],expected:!1,public:!1},{seed:2203,index:4,input:[[5,13,6,9,1,12,9,8,2,8,11,1,2,2,14,1],2],expected:!0,public:!1}],descriptionMarkdown:`# Hand of Straights

You are given an array of integers \`hand\`, representing a collection of
numbered cards, and an integer \`groupSize\`. Decide whether every card can be
placed into groups such that:

- each group contains exactly \`groupSize\` cards, and
- the values in each group form a run of consecutive integers
  (for example \`4, 5, 6\`).

Each card must be used in exactly one group. Return \`true\` if such a
partition exists and \`false\` otherwise.

## Examples

\`\`\`
Input: hand = [5, 3, 4, 10, 11, 12], groupSize = 3
Output: true
Explanation: The groups are [3, 4, 5] and [10, 11, 12].
\`\`\`

\`\`\`
Input: hand = [1, 2, 3, 5, 6, 7], groupSize = 2
Output: false
Explanation: The smallest card 1 must pair with 2. Then 3 is the smallest
remaining card and needs a 4, which does not exist.
\`\`\`

## Constraints

- \`1 <= hand.length <= 10^4\`
- \`0 <= hand[i] <= 10^9\`
- \`1 <= groupSize <= hand.length\`
`}];export{e as default};
