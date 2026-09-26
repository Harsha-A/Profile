const e=[{slug:"single-number",title:"Single Number",difficulty:"Easy",tags:["array","bit-manipulation","xor"],function:{name:"singleNumber",params:[{name:"nums",type:"number[]"}],returns:"number"},compare:{mode:"exact"},limits:{timeMs:1e3},tests:[{input:[[6,3,6]],expected:3,public:!0},{input:[[-8,5,11,5,-8]],expected:11,public:!0},{input:[[42]],expected:42,public:!1},{input:[[0,-1,-1]],expected:0,public:!1},{input:[[7,2,9,2,7,4,9]],public:!1,expected:4}],generated:{seeds:[1361,1362,1363],perSeed:5},variantId:"default",key:"single-number:default",generatedTests:[{seed:1361,index:0,input:[[491,910,695,695,-418,491,910,610,-418]],expected:610,public:!1},{seed:1361,index:1,input:[[-9]],expected:-9,public:!1},{seed:1361,index:2,input:[[559,801,-830,847,499,-841,559,855,847,855,-548,-46,801,-46,-841,-548,-830,558,499]],expected:558,public:!1},{seed:1361,index:3,input:[[-525,-498,150,-498,-187,36,-525,150,-344,36,-612,-504,-612,-187,-504]],expected:-344,public:!1},{seed:1361,index:4,input:[[574,-592,-884,-592,-862,-884,574,-849,-849]],expected:-862,public:!1},{seed:1362,index:0,input:[[-490,242,-490,-486,927,238,242,238,677,-573,-536,-486,-573,283,283,524,677,927,524]],expected:-536,public:!1},{seed:1362,index:1,input:[[-732,-270,-732]],expected:-270,public:!1},{seed:1362,index:2,input:[[92]],expected:92,public:!1},{seed:1362,index:3,input:[[331,-521,-521,491,491]],expected:331,public:!1},{seed:1362,index:4,input:[[802,895,90,932,90,419,802,932,419]],expected:895,public:!1},{seed:1363,index:0,input:[[-685,-474,-778,-466,726,-778,-685,-68,-474,480,-68,480,726]],expected:-466,public:!1},{seed:1363,index:1,input:[[572,973,-561,973,-536,153,153,572,-561]],expected:-536,public:!1},{seed:1363,index:2,input:[[-536,-523,518,48,518,-536,48]],expected:-523,public:!1},{seed:1363,index:3,input:[[-903,175,-591,-591,-828,45,531,-903,-828,587,-382,175,792,531,587,-23,-23,45,792]],expected:-382,public:!1},{seed:1363,index:4,input:[[561,935,-515,884,561,-17,-515,-17,884,-517,-158,555,-491,615,935,555,-491,-158,615]],expected:-517,public:!1}],descriptionMarkdown:`# Single Number

You are given a non-empty integer array \`nums\`. Every value in the array
occurs exactly twice, except for one value that occurs exactly once. Return
that lone value.

Aim for linear time and constant extra space.

## Examples

\`\`\`
Input: nums = [6, 3, 6]
Output: 3
\`\`\`

\`\`\`
Input: nums = [-8, 5, 11, 5, -8]
Output: 11
\`\`\`

## Constraints

- \`1 <= nums.length <= 3 * 10^4\`, and \`nums.length\` is odd.
- \`-3 * 10^4 <= nums[i] <= 3 * 10^4\`
- Exactly one value occurs once; every other value occurs exactly twice.

## Bit width

All values fit comfortably in a signed 32-bit integer, so JavaScript's
32-bit bitwise operators (\`^\`) are exact for every input.

## Notes

XOR is associative and commutative, \`v ^ v == 0\`, and \`v ^ 0 == v\`. Folding
every element together with XOR cancels each pair and leaves the single value.
`}];export{e as default};
