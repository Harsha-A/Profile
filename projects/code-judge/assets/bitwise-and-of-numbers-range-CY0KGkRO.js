const e=[{slug:"bitwise-and-of-numbers-range",title:"Bitwise AND of Numbers Range",difficulty:"Medium",tags:["bit-manipulation"],function:{name:"rangeBitwiseAnd",params:[{name:"left",type:"number"},{name:"right",type:"number"}],returns:"number"},compare:{mode:"exact"},limits:{timeMs:1e3},tests:[{input:[12,15],expected:12,public:!0},{input:[9,17],expected:0,public:!0},{input:[0,0],expected:0,public:!1},{input:[37,37],expected:37,public:!1},{input:[5,7],expected:4,public:!1},{input:[2147483646,2147483647],expected:2147483646,public:!1},{input:[1,2147483647],expected:0,public:!1},{input:[1073741824,2147483647],expected:1073741824,public:!1},{input:[6e5,600100],public:!1,expected:598016}],generated:{seeds:[2011,2012,2013],perSeed:5},variantId:"default",key:"bitwise-and-of-numbers-range:default",generatedTests:[{seed:2011,index:0,input:[720432890,720432899],expected:720432640,public:!1},{seed:2011,index:1,input:[1185410395,1185471171],expected:1184890880,public:!1},{seed:2011,index:2,input:[1733399461,2138103213],expected:1610612736,public:!1},{seed:2011,index:3,input:[179131434,722430202],expected:0,public:!1},{seed:2011,index:4,input:[77081203,77081204],expected:77081200,public:!1},{seed:2012,index:0,input:[847865779,847886368],expected:847839232,public:!1},{seed:2012,index:1,input:[1710451483,1710523911],expected:1710227456,public:!1},{seed:2012,index:2,input:[1681970930,1682022199],expected:1681915904,public:!1},{seed:2012,index:3,input:[890687059,890687071],expected:890687056,public:!1},{seed:2012,index:4,input:[752228698,752286950],expected:752222208,public:!1},{seed:2013,index:0,input:[1006861266,1006861266],expected:1006861266,public:!1},{seed:2013,index:1,input:[206005108,206005122],expected:206004992,public:!1},{seed:2013,index:2,input:[1514660760,1514683319],expected:1514143744,public:!1},{seed:2013,index:3,input:[415537638,415611839],expected:415498240,public:!1},{seed:2013,index:4,input:[968790083,968803359],expected:968785920,public:!1}],descriptionMarkdown:`# Bitwise AND of Numbers Range

You are given two integers \`left\` and \`right\` with \`left <= right\`. Return
the bitwise AND of every integer in the inclusive range \`[left, right]\`.

Iterating across the range is far too slow when it is wide; the answer can be
found in time proportional to the number of bits.

## Examples

\`\`\`
Input: left = 12, right = 15
Output: 12
Explanation: 1100 & 1101 & 1110 & 1111 = 1100.
\`\`\`

\`\`\`
Input: left = 9, right = 17
Output: 0
Explanation: the range crosses 16 (10000), so no bit survives.
\`\`\`

## Constraints

- \`0 <= left <= right <= 2^31 - 1\` (\`2147483647\`)

## Bit width

Inputs are capped at \`2^31 - 1\`, so every value, and every intermediate
produced by shifting or masking them, is a non-negative signed 32-bit integer
and therefore exact under JavaScript's \`&\`, \`>>\` and \`<<\`. No value in this
problem ever needs more than 31 bits.

## Notes

The answer is the common binary prefix of \`left\` and \`right\`, followed by
zeros. Shift both right until they are equal, then shift the shared prefix
back into place.
`}];export{e as default};
