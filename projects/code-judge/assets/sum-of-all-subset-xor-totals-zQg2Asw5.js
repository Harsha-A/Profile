const e=[{slug:"sum-of-all-subset-xor-totals",title:"Sum of All Subsets XOR Total",difficulty:"Easy",tags:["array","backtracking","bit-manipulation"],function:{name:"subsetXORSum",params:[{name:"nums",type:"number[]"}],returns:"number"},compare:{mode:"exact"},limits:{timeMs:1e3},tests:[{input:[[2,5]],expected:14,public:!0},{input:[[4,4,1]],expected:20,public:!0},{input:[[7]],expected:7,public:!0},{input:[[1,2,3]],expected:12,public:!1},{input:[[20,20,20,20,20,20,20,20,20,20,20,20]],public:!1,expected:40960},{input:[[1,2,4,8,16,3,5,9,17,19,11,13]],public:!1,expected:63488}],generated:{seeds:[901,902,903],perSeed:4},variantId:"default",key:"sum-of-all-subset-xor-totals:default",generatedTests:[{seed:901,index:0,input:[[15,13]],expected:30,public:!1},{seed:901,index:1,input:[[13,11,11,9,19,1,18,1]],expected:3968,public:!1},{seed:901,index:2,input:[[16,13,11,7,7,15,14,6,1]],expected:7936,public:!1},{seed:901,index:3,input:[[13,16,12,7,14,13,6,6,17,16]],expected:15872,public:!1},{seed:902,index:0,input:[[12,12,8,14,12,7,16,16,16,20,9]],expected:31744,public:!1},{seed:902,index:1,input:[[12,9,1,7,9,10,15]],expected:960,public:!1},{seed:902,index:2,input:[[6,1,3,16,5,19,15,15,18,17,8]],expected:31744,public:!1},{seed:902,index:3,input:[[6]],expected:6,public:!1},{seed:903,index:0,input:[[16,20,7,11,14]],expected:496,public:!1},{seed:903,index:1,input:[[10,6,11,5,7]],expected:240,public:!1},{seed:903,index:2,input:[[13,5,16,11,10,10,9,13]],expected:3968,public:!1},{seed:903,index:3,input:[[13,14,11,11,11,4,18,15,4]],expected:7936,public:!1}],descriptionMarkdown:`# Sum of All Subsets XOR Total

You are given an array of positive integers \`nums\`. For any selection of
elements from \`nums\` (a subset, chosen by index), its XOR total is the
bitwise XOR of all selected values; the empty selection has an XOR total of
\`0\`.

Return the sum of the XOR totals over every one of the \`2^n\` subsets, where
\`n\` is the length of \`nums\`. Elements with equal values at different indices
are distinct choices, so subsets that happen to contain the same values are
each counted.

## Examples

\`\`\`
Input: nums = [2, 5]
Output: 14
Explanation: the subsets are [], [2], [5], [2, 5] with XOR totals
0, 2, 5 and 7, which add up to 14.
\`\`\`

\`\`\`
Input: nums = [4, 4, 1]
Output: 20
Explanation: totals are 0, 4, 4, 1, 0, 5, 5, 1 for the eight index subsets.
\`\`\`

## Constraints

- \`1 <= nums.length <= 12\`
- \`1 <= nums[i] <= 20\`

## Notes

Enumerating subsets by recursion works. There is also a closed form: every
bit set in at least one element contributes to exactly half of the subsets,
so the answer is the bitwise OR of all elements times \`2^(n-1)\`.
`}];export{e as default};
