const e=[{slug:"candy",title:"Candy",difficulty:"Hard",tags:["array","greedy"],function:{name:"candy",params:[{name:"ratings",type:"number[]"}],returns:"number"},compare:{mode:"exact"},limits:{timeMs:1e3},tests:[{input:[[3,1,4]],expected:5,public:!0},{input:[[2,5,5,1]],expected:6,public:!0},{input:[[7]],expected:1,public:!1},{input:[[1,2,3,4]],expected:10,public:!1},{input:[[4,4,4]],expected:3,public:!1},{input:[[1,3,5,2,1,6,6]],public:!1,expected:12}],generated:{seeds:[2701,2702,2703],perSeed:5},variantId:"default",key:"candy:default",generatedTests:[{seed:2701,index:0,input:[[4,0,4,5]],expected:8,public:!1},{seed:2701,index:1,input:[[2,1,5,1,5,1,2,5,2,1,2,0,0,4,1,4,3]],expected:27,public:!1},{seed:2701,index:2,input:[[1]],expected:1,public:!1},{seed:2701,index:3,input:[[2]],expected:1,public:!1},{seed:2701,index:4,input:[[1,0,0,0,0,1,0,0,1,0,0,0,0,0,1]],expected:19,public:!1},{seed:2702,index:0,input:[[4,2,2,4,3,0,4,1,3,3,2,2,1,4,4]],expected:24,public:!1},{seed:2702,index:1,input:[[1,4,0,0,2,4,2,1,1,3,2,0,1,3,1]],expected:26,public:!1},{seed:2702,index:2,input:[[2,0,2,1,2,0,2,1,1,0,2,2,0,0,2]],expected:23,public:!1},{seed:2702,index:3,input:[[7,2,5,0,6,4,0,0,3,2,6,1]],expected:19,public:!1},{seed:2702,index:4,input:[[5,6,6,3,0,1,3,5]],expected:18,public:!1},{seed:2703,index:0,input:[[1,1,1,4,3,4,4,2,4,0,2,1,3]],expected:19,public:!1},{seed:2703,index:1,input:[[3,6,5,5,6,2,1]],expected:11,public:!1},{seed:2703,index:2,input:[[7,6,6,5,0]],expected:9,public:!1},{seed:2703,index:3,input:[[5,1]],expected:3,public:!1},{seed:2703,index:4,input:[[1,4,1,5,0,0,5,5,3,4,5,5,3,3,1,3,0]],expected:27,public:!1}],descriptionMarkdown:`# Candy

A row of \`n\` people each has an integer score, given as \`ratings\`. You must
hand each person a whole number of tokens so that:

- every person receives at least \`1\` token, and
- any person whose score is strictly greater than that of an immediate
  neighbour (left or right) receives strictly more tokens than that
  neighbour.

Neighbours with equal scores have no constraint between them. Return the
minimum total number of tokens that satisfies both rules.

## Examples

\`\`\`
Input: ratings = [3, 1, 4]
Output: 5
Explanation: Hand out [2, 1, 2].
\`\`\`

\`\`\`
Input: ratings = [2, 5, 5, 1]
Output: 6
Explanation: Hand out [1, 2, 2, 1]. The two 5s are equal, so neither needs
more than the other.
\`\`\`

## Constraints

- \`1 <= n <= 2 * 10^4\`
- \`0 <= ratings[i] <= 2 * 10^4\`

## Notes

Give everyone \`1\`, then sweep left to right enforcing the left-neighbour rule
and right to left enforcing the right-neighbour rule, keeping the larger of
the two requirements at each position.
`}];export{e as default};
