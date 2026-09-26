const e=[{slug:"split-array-largest-sum",title:"Split Array Largest Sum",difficulty:"Hard",tags:["array","binary-search","greedy","prefix-sum"],function:{name:"splitArray",params:[{name:"nums",type:"number[]"},{name:"k",type:"number"}],returns:"number"},compare:{mode:"exact"},limits:{timeMs:1e3},tests:[{input:[[4,1,6,2,3],3],expected:6,public:!0},{input:[[9,3,3],2],expected:9,public:!0},{input:[[5],1],expected:5,public:!1},{input:[[2,2,2,2],4],expected:2,public:!1},{input:[[1,2,3,4],1],expected:10,public:!1},{input:[[0,0,7,0],2],expected:7,public:!1},{input:[[10,5,13,4,8,4,5,11,14,9,16,10,20,8],8],public:!1,expected:25}],generated:{seeds:[4101,4102,4103],perSeed:5},variantId:"default",key:"split-array-largest-sum:default",generatedTests:[{seed:4101,index:0,input:[[36,19,44,23,10,12,15],1],expected:159,public:!1},{seed:4101,index:1,input:[[7,31,39,12,0,4,47,49,11,21,26,0,13,37,18],4],expected:94,public:!1},{seed:4101,index:2,input:[[43,32,7,9,14,9,3,49,46,4,19,18,5,38],1],expected:296,public:!1},{seed:4101,index:3,input:[[25,36,42],2],expected:61,public:!1},{seed:4101,index:4,input:[[45,40,2,0,49,45,0,0],2],expected:94,public:!1},{seed:4102,index:0,input:[[11,33,29,18],4],expected:33,public:!1},{seed:4102,index:1,input:[[2,37,11,33,48],2],expected:81,public:!1},{seed:4102,index:2,input:[[39,0],1],expected:39,public:!1},{seed:4102,index:3,input:[[25,44,39,10],1],expected:118,public:!1},{seed:4102,index:4,input:[[8,11,0,20,0,44,37,6,15,25],8],expected:44,public:!1},{seed:4103,index:0,input:[[15,37,41,27,6,48,20,34,38],5],expected:68,public:!1},{seed:4103,index:1,input:[[41,28,0,26],3],expected:41,public:!1},{seed:4103,index:2,input:[[22,0,19,48,0,33,20,10,48,20,11,20,36,2,35],12],expected:48,public:!1},{seed:4103,index:3,input:[[13,0,8,20,47,48,5,29],7],expected:48,public:!1},{seed:4103,index:4,input:[[32,24,11,35,0,48,24,46,34,25,34,0,30,35],7],expected:70,public:!1}],descriptionMarkdown:`# Split Array Largest Sum

You are given an array \`nums\` of non-negative integers and an integer \`k\`.
Cut \`nums\` into exactly \`k\` non-empty pieces, each made of consecutive
elements, so that every element belongs to exactly one piece. For a given
cut, its cost is the largest sum among the \`k\` pieces.

Return the smallest cost achievable over all valid cuts.

## Examples

\`\`\`
Input: nums = [4, 1, 6, 2, 3], k = 3
Output: 6
Explanation: the pieces [4, 1], [6], [2, 3] have sums 5, 6, 5.
No cut into three pieces does better, since the piece holding 6 sums to at least 6.
\`\`\`

\`\`\`
Input: nums = [9, 3, 3], k = 2
Output: 9
Explanation: [9] and [3, 3] have sums 9 and 6.
\`\`\`

## Constraints

- \`1 <= nums.length <= 1000\`
- \`0 <= nums[i] <= 10^6\`
- \`1 <= k <= min(50, nums.length)\`

## Notes

The answer lies between the largest element and the total sum. For a
candidate cost, a greedy left-to-right scan tells you the fewest pieces
needed to keep every piece at or below it; that count only decreases as the
candidate grows, so binary search on the candidate.
`}];export{e as default};
