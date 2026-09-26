const e=[{slug:"number-of-1-bits",title:"Number of 1 Bits",difficulty:"Easy",tags:["bit-manipulation"],function:{name:"hammingWeight",params:[{name:"n",type:"number"}],returns:"number"},compare:{mode:"exact"},limits:{timeMs:1e3},tests:[{input:[13],expected:3,public:!0},{input:[256],expected:1,public:!0},{input:[0],expected:0,public:!1},{input:[4294967295],expected:32,public:!1},{input:[2147483648],expected:1,public:!1},{input:[2863311530],expected:16,public:!1},{input:[1023],public:!1,expected:10}],generated:{seeds:[1911,1912,1913],perSeed:5},variantId:"default",key:"number-of-1-bits:default",generatedTests:[{seed:1911,index:0,input:[2691327304],expected:12,public:!1},{seed:1911,index:1,input:[2607843980],expected:14,public:!1},{seed:1911,index:2,input:[88234885],expected:12,public:!1},{seed:1911,index:3,input:[4082924892],expected:20,public:!1},{seed:1911,index:4,input:[883084889],expected:15,public:!1},{seed:1912,index:0,input:[2654797910],expected:14,public:!1},{seed:1912,index:1,input:[2031235746],expected:13,public:!1},{seed:1912,index:2,input:[3406269309],expected:18,public:!1},{seed:1912,index:3,input:[1829772948],expected:13,public:!1},{seed:1912,index:4,input:[1480041783],expected:17,public:!1},{seed:1913,index:0,input:[180930415],expected:16,public:!1},{seed:1913,index:1,input:[3442715671],expected:17,public:!1},{seed:1913,index:2,input:[1142235253],expected:11,public:!1},{seed:1913,index:3,input:[3613189278],expected:19,public:!1},{seed:1913,index:4,input:[2585836981],expected:16,public:!1}],descriptionMarkdown:`# Number of 1 Bits

You are given a non-negative integer \`n\` that represents a 32-bit unsigned
value. Return how many bits are set to \`1\` in its binary representation
(its population count).

## Examples

\`\`\`
Input: n = 13
Output: 3
Explanation: 13 is 1101 in binary.
\`\`\`

\`\`\`
Input: n = 4294967295
Output: 32
Explanation: this is 2^32 - 1, all 32 bits set.
\`\`\`

## Constraints

- \`0 <= n <= 2^32 - 1\` (\`4294967295\`)

## Bit width

The input is a 32-bit **unsigned** integer passed as an ordinary JavaScript
number. Values at or above \`2^31\` have their top bit set. JavaScript bitwise
operators reinterpret such a value as a negative signed 32-bit integer, but
the bit pattern is unchanged, so counting set bits still works; just do not
loop on a condition like \`n > 0\` after a signed operation. Use \`>>>\` or test
\`n !== 0\` instead.

## Notes

\`n & (n - 1)\` clears the lowest set bit, so repeating it until the value is
zero takes one step per set bit.
`}];export{e as default};
