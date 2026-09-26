const e=[{slug:"palindromic-substrings",title:"Palindromic Substrings",difficulty:"Medium",tags:["string","dynamic-programming","two-pointers"],function:{name:"countSubstrings",params:[{name:"s",type:"string"}],returns:"number"},compare:{mode:"exact"},limits:{timeMs:1e3},tests:[{input:["xyx"],expected:4,public:!0},{input:["bbb"],expected:6,public:!0},{input:["q"],expected:1,public:!1},{input:["abcd"],expected:4,public:!1},{input:["abba"],expected:6,public:!1},{input:["racecar"],public:!1,expected:10}],generated:{seeds:[1161,1162,1163],perSeed:5},variantId:"default",key:"palindromic-substrings:default",generatedTests:[{seed:1161,index:0,input:["aaabdcbaebdabdceeadeadeababbdecebdddbbeb"],expected:54,public:!1},{seed:1161,index:1,input:["babbbbbbbabbababbbababbabb"],expected:82,public:!1},{seed:1161,index:2,input:["aababaa"],expected:14,public:!1},{seed:1161,index:3,input:["abcccaaeaaacdedcaccccdcaebaedaebcecadd"],expected:60,public:!1},{seed:1161,index:4,input:["debacaaadeeaccaeebc"],expected:29,public:!1},{seed:1162,index:0,input:["edaeadceecdcdcdcabadadcbce"],expected:44,public:!1},{seed:1162,index:1,input:["ceacccbdbdeccbbbaabbabaee"],expected:42,public:!1},{seed:1162,index:2,input:["aababaaaaabbbabaababaaabaababbabbabbbaaaab"],expected:110,public:!1},{seed:1162,index:3,input:["abaaababb"],expected:18,public:!1},{seed:1162,index:4,input:["abaaababaababaabaabbaa"],expected:58,public:!1},{seed:1163,index:0,input:["cdcadbcdbaccbecabadcececeabdbaebccdde"],expected:51,public:!1},{seed:1163,index:1,input:["abbbabbaaaaaabbbabbaaaabaaabababaaaababaabbaabb"],expected:131,public:!1},{seed:1163,index:2,input:["dacadcaebaeeddecbdbeadedeededcdeddecdbad"],expected:60,public:!1},{seed:1163,index:3,input:["dedbccbcabbcedbcceddaaaddac"],expected:41,public:!1},{seed:1163,index:4,input:["eaacdacce"],expected:11,public:!1}],descriptionMarkdown:`# Palindromic Substrings

Given a string \`s\`, count how many of its contiguous substrings are
palindromes (read the same forwards and backwards).

Substrings are identified by their position, not their content: two equal
substrings taken from different start or end indices are counted separately.
Every single character is a palindrome of length 1.

## Examples

\`\`\`
Input: s = "xyx"
Output: 4
Explanation: "x" (index 0), "y", "x" (index 2), and "xyx".
\`\`\`

\`\`\`
Input: s = "bbb"
Output: 6
Explanation: three "b", two "bb", and one "bbb".
\`\`\`

## Constraints

- \`1 <= s.length <= 1000\`
- \`s\` consists of lowercase English letters.
`}];export{e as default};
