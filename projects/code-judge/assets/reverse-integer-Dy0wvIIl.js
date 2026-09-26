const e=[{slug:"reverse-integer",title:"Reverse Integer",difficulty:"Medium",tags:["math"],function:{name:"reverse",params:[{name:"x",type:"number"}],returns:"number"},compare:{mode:"exact"},limits:{timeMs:1e3},tests:[{input:[4096],expected:6904,public:!0},{input:[-5710],expected:-175,public:!0},{input:[0],expected:0,public:!1},{input:[7],expected:7,public:!1},{input:[1463847412],expected:2147483641,public:!1},{input:[1534236469],expected:0,public:!1},{input:[-2147483648],expected:0,public:!1},{input:[2147483647],expected:0,public:!1},{input:[-1463847412],expected:-2147483641,public:!1},{input:[-123456789],public:!1,expected:-987654321}],generated:{seeds:[71,72,73],perSeed:5},variantId:"default",key:"reverse-integer:default",generatedTests:[{seed:71,index:0,input:[60495],expected:59406,public:!1},{seed:71,index:1,input:[-19562],expected:-26591,public:!1},{seed:71,index:2,input:[-2082217743],expected:0,public:!1},{seed:71,index:3,input:[1951416370],expected:736141591,public:!1},{seed:71,index:4,input:[1768119610],expected:169118671,public:!1},{seed:72,index:0,input:[-270760],expected:-67072,public:!1},{seed:72,index:1,input:[-82964],expected:-46928,public:!1},{seed:72,index:2,input:[56938],expected:83965,public:!1},{seed:72,index:3,input:[-1144240531],expected:-1350424411,public:!1},{seed:72,index:4,input:[-1734914238],expected:0,public:!1},{seed:73,index:0,input:[2136013530],expected:353106312,public:!1},{seed:73,index:1,input:[226580],expected:85622,public:!1},{seed:73,index:2,input:[12476],expected:67421,public:!1},{seed:73,index:3,input:[-1693459278],expected:0,public:!1},{seed:73,index:4,input:[-64100],expected:-146,public:!1}],descriptionMarkdown:`# Reverse Integer

You are given a signed 32-bit integer \`x\`. Reverse the order of its decimal
digits, keeping the sign, and return the result. Trailing zeros of \`x\` become
leading zeros of the reversal and simply disappear (\`4096\` becomes \`6904\`,
\`-5710\` becomes \`-175\`).

If the reversed value falls outside the signed 32-bit range, return \`0\`
instead.

## Examples

\`\`\`
Input: x = 4096
Output: 6904
\`\`\`

\`\`\`
Input: x = 1534236469
Output: 0
Explanation: the reversal, 9646324351, exceeds 2^31 - 1.
\`\`\`

## Constraints

- \`-2^31 <= x <= 2^31 - 1\`

## Bit width

The valid range is the signed 32-bit interval \`[-2147483648, 2147483647]\`.
The overflow rule: if the reversed value is greater than \`2147483647\` or less
than \`-2147483648\`, the answer is \`0\`. The input itself is always in range.

For the spirit of the problem, pretend your environment cannot hold any
integer outside that interval, so detect overflow before (or as) it would
happen rather than relying on a wider type. In practice any JavaScript
intermediate here is at most ten digits, so it is exact as a double either
way; do not use BigInt.
`}];export{e as default};
