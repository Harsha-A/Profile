const e=[{slug:"integer-break",title:"Integer Break",difficulty:"Medium",tags:["math","dynamic-programming"],function:{name:"integerBreak",params:[{name:"n",type:"number"}],returns:"number"},compare:{mode:"exact"},limits:{timeMs:1e3},tests:[{input:[6],expected:9,public:!0},{input:[2],expected:1,public:!0},{input:[3],expected:2,public:!1},{input:[7],expected:12,public:!1},{input:[10],expected:36,public:!1},{input:[58],expected:1549681956,public:!1},{input:[41],public:!1,expected:3188646}],generated:{seeds:[1581,1582,1583],perSeed:5},variantId:"default",key:"integer-break:default",generatedTests:[{seed:1581,index:0,input:[6],expected:9,public:!1},{seed:1581,index:1,input:[10],expected:36,public:!1},{seed:1581,index:2,input:[28],expected:26244,public:!1},{seed:1581,index:3,input:[26],expected:13122,public:!1},{seed:1581,index:4,input:[12],expected:81,public:!1},{seed:1582,index:0,input:[38],expected:1062882,public:!1},{seed:1582,index:1,input:[36],expected:531441,public:!1},{seed:1582,index:2,input:[23],expected:4374,public:!1},{seed:1582,index:3,input:[13],expected:108,public:!1},{seed:1582,index:4,input:[2],expected:1,public:!1},{seed:1583,index:0,input:[45],expected:14348907,public:!1},{seed:1583,index:1,input:[6],expected:9,public:!1},{seed:1583,index:2,input:[48],expected:43046721,public:!1},{seed:1583,index:3,input:[11],expected:54,public:!1},{seed:1583,index:4,input:[11],expected:54,public:!1}],descriptionMarkdown:`# Integer Break

Given an integer \`n\`, write it as a sum of **at least two** positive
integers. Among all such ways, return the largest possible product of the
parts.

## Examples

\`\`\`
Input: n = 6
Output: 9
Explanation: 6 = 3 + 3 gives 9; 2 + 2 + 2 gives only 8.
\`\`\`

\`\`\`
Input: n = 2
Output: 1
Explanation: the only split is 1 + 1.
\`\`\`

## Constraints

- \`2 <= n <= 58\`
- The maximum product for \`n = 58\` is \`3^18 * 4 = 1549681956\`, which fits
  comfortably in a 32-bit signed integer, so no overflow handling is needed.

## Notes

Let \`best[m]\` be the largest product for a total of \`m\` where a part may
also be left whole. For each first part \`j\`, the rest either stays whole
(\`m - j\`) or is split further (\`best[m - j]\`). Using many 3s, with 2s to
absorb the remainder, is also optimal and gives a closed form.
`}];export{e as default};
