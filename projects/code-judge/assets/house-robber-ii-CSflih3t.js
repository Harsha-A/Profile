const e=[{slug:"house-robber-ii",title:"House Robber II",difficulty:"Medium",tags:["array","dynamic-programming"],function:{name:"rob",params:[{name:"nums",type:"number[]"}],returns:"number"},compare:{mode:"exact"},limits:{timeMs:1e3},tests:[{input:[[5,3,4,11,2]],expected:16,public:!0},{input:[[7,2,7]],expected:7,public:!0},{input:[[9]],expected:9,public:!1},{input:[[1,8]],expected:8,public:!1},{input:[[6,1,1,6]],expected:7,public:!1},{input:[[2,7,9,3,1,4]],public:!1,expected:14}],generated:{seeds:[1141,1142,1143],perSeed:5},variantId:"default",key:"house-robber-ii:default",generatedTests:[{seed:1141,index:0,input:[[204,475,980]],expected:980,public:!1},{seed:1141,index:1,input:[[586,165,702,789,696,661,479,813,649,698,250,359,661,534,0,275,610,144,24,695,563]],expected:5745,public:!1},{seed:1141,index:2,input:[[823,536,977,598,397,417,648,570,629,372,228,468,890,864]],expected:4592,public:!1},{seed:1141,index:3,input:[[759,19,636,752]],expected:1395,public:!1},{seed:1141,index:4,input:[[244,995,80,579,895,584,570,133,987,954,932,287,257]],expected:4636,public:!1},{seed:1142,index:0,input:[[723,264]],expected:723,public:!1},{seed:1142,index:1,input:[[971,51]],expected:971,public:!1},{seed:1142,index:2,input:[[727,272,584,752,827,266,292,4,90,257,3,596,672,817,740,2,611,190,590]],expected:4711,public:!1},{seed:1142,index:3,input:[[581,759,849]],expected:849,public:!1},{seed:1142,index:4,input:[[921,289,13,253,395,943,292,557,788,539,173,275,850,68,59,395,943,982,260,331,525,291,129,995,972,425,42,946]],expected:7796,public:!1},{seed:1143,index:0,input:[[319,201,222,232,538,580,466,713]],expected:1726,public:!1},{seed:1143,index:1,input:[[129,714,530,318,750,295,343,565,559,479,418,598]],expected:3106,public:!1},{seed:1143,index:2,input:[[651,481,367,533,10,360,98,2,830,25,959,400,112,665,817,347,93,666,430,881,294,628,928,90,283]],expected:6933,public:!1},{seed:1143,index:3,input:[[481,539]],expected:539,public:!1},{seed:1143,index:4,input:[[243]],expected:243,public:!1}],descriptionMarkdown:`# House Robber II

You are given an array \`nums\` of non-negative integers arranged in a
**circle**: index \`nums.length - 1\` is adjacent to index \`0\`, in addition to
the usual neighbours \`i\` and \`i + 1\`. Choose a subset of indices such that no
two chosen indices are adjacent in this circular sense, and return the
maximum possible sum of the chosen elements. The empty subset is allowed.

When \`nums.length == 1\`, the single element has no neighbours other than
itself and may be chosen.

## Examples

\`\`\`
Input: nums = [5, 3, 4, 11, 2]
Output: 16
Explanation: choose indices 0 and 3: 5 + 11 = 16. Indices 0 and 4 are adjacent.
\`\`\`

\`\`\`
Input: nums = [7, 2, 7]
Output: 7
Explanation: the two 7s are neighbours around the circle, so only one can be chosen.
\`\`\`

## Constraints

- \`1 <= nums.length <= 100\`
- \`0 <= nums[i] <= 1000\`
`}];export{e as default};
