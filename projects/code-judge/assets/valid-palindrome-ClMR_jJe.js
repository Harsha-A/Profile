const e=[{slug:"valid-palindrome",title:"Valid Palindrome",difficulty:"Easy",tags:["string","two-pointers"],function:{name:"isPalindrome",params:[{name:"s",type:"string"}],returns:"boolean"},compare:{mode:"exact"},limits:{timeMs:1e3},tests:[{input:["Step on, no pets!"],expected:!0,public:!0},{input:["Road 42, daor"],expected:!1,public:!0},{input:["?!, "],expected:!0,public:!1},{input:["0x"],expected:!1,public:!1},{input:["1a2B1"],expected:!1,public:!1},{input:["Ab1 1bA"],expected:!0,public:!1},{input:["z"],public:!1,expected:!0}],generated:{seeds:[1201,1202,1203],perSeed:5},variantId:"default",key:"valid-palindrome:default",generatedTests:[{seed:1201,index:0,input:["!"],expected:!0,public:!1},{seed:1201,index:1,input:["320"],expected:!1,public:!1},{seed:1201,index:2,input:["a012:0a"],expected:!1,public:!1},{seed:1201,index:3,input:["!dA?cCccad"],expected:!0,public:!1},{seed:1201,index:4,input:[":E."],expected:!0,public:!1},{seed:1202,index:0,input:["2a0b11?b0a2"],expected:!0,public:!1},{seed:1202,index:1,input:["e 1a?00A1E "],expected:!0,public:!1},{seed:1202,index:2,input:[".1D0D A:"],expected:!1,public:!1},{seed:1202,index:3,input:[":DEddE?d "],expected:!0,public:!1},{seed:1202,index:4,input:["b:0211E0B"],expected:!1,public:!1},{seed:1203,index:0,input:["3e1eA"],expected:!1,public:!1},{seed:1203,index:1,input:["e"],expected:!0,public:!1},{seed:1203,index:2,input:["-"],expected:!0,public:!1},{seed:1203,index:3,input:["aAA2B!2B 2?aAe"],expected:!1,public:!1},{seed:1203,index:4,input:["1!0:B 1:E 1B01"],expected:!0,public:!1}],descriptionMarkdown:`# Valid Palindrome

You are given a string \`s\`. Discard every character that is not an ASCII
letter or digit, and treat uppercase and lowercase letters as the same
letter. Return \`true\` if the remaining sequence of characters is identical
when read from either end, and \`false\` otherwise.

A string that has no letters or digits at all counts as a palindrome.

## Examples

\`\`\`
Input: s = "Step on, no pets!"
Output: true
Explanation: after filtering and lowercasing, the sequence is "steponnopets".
\`\`\`

\`\`\`
Input: s = "Road 42, daor"
Output: false
Explanation: the filtered sequence "road42daor" differs from its reverse.
\`\`\`

## Constraints

- \`1 <= s.length <= 2 * 10^5\`
- \`s\` contains only printable ASCII characters.

## Notes

Walk one index forward from the start and one backward from the end,
skipping characters that are not letters or digits, and compare the
lowercased characters they land on.
`}];export{e as default};
