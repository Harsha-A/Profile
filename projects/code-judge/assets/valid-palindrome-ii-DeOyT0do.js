const e=[{slug:"valid-palindrome-ii",title:"Valid Palindrome II",difficulty:"Easy",tags:["string","two-pointers","greedy"],function:{name:"validPalindrome",params:[{name:"s",type:"string"}],returns:"boolean"},compare:{mode:"exact"},limits:{timeMs:1e3},tests:[{input:["rotator"],expected:!0,public:!0},{input:["kayyak"],expected:!0,public:!0},{input:["kayxak"],expected:!0,public:!1},{input:["abcxa"],expected:!1,public:!0},{input:["q"],expected:!0,public:!1},{input:["pq"],expected:!0,public:!1},{input:["cuppucu"],expected:!0,public:!1},{input:["abxcyba"],expected:!1,public:!1},{input:["abccbxa"],public:!1,expected:!0}],generated:{seeds:[1301,1302,1303],perSeed:5},variantId:"default",key:"valid-palindrome-ii:default",generatedTests:[{seed:1301,index:0,input:["bccbbbbccab"],expected:!0,public:!1},{seed:1301,index:1,input:["adddda"],expected:!0,public:!1},{seed:1301,index:2,input:["d"],expected:!0,public:!1},{seed:1301,index:3,input:["ddbddbdd"],expected:!0,public:!1},{seed:1301,index:4,input:["ccadddacc"],expected:!0,public:!1},{seed:1302,index:0,input:["acdab"],expected:!1,public:!1},{seed:1302,index:1,input:["aaa"],expected:!0,public:!1},{seed:1302,index:2,input:["ddaaadaaadd"],expected:!0,public:!1},{seed:1302,index:3,input:["dbacbbcabcd"],expected:!0,public:!1},{seed:1302,index:4,input:["bdaab"],expected:!0,public:!1},{seed:1303,index:0,input:["bcbdbbbbbcb"],expected:!0,public:!1},{seed:1303,index:1,input:["a"],expected:!0,public:!1},{seed:1303,index:2,input:["dbdadbbd"],expected:!0,public:!1},{seed:1303,index:3,input:["dbdcdadcdbdd"],expected:!0,public:!1},{seed:1303,index:4,input:["aadaad"],expected:!0,public:!1}],descriptionMarkdown:`# Valid Palindrome II

You are given a string \`s\` of lowercase English letters. Return \`true\` if
\`s\` is already a palindrome, or can be turned into one by deleting exactly
one character. Otherwise return \`false\`.

## Examples

\`\`\`
Input: s = "kayxak"
Output: true
Explanation: deleting the "x" leaves "kayak".
\`\`\`

\`\`\`
Input: s = "abcxa"
Output: false
Explanation: no single deletion yields a string that reads the same in both
directions.
\`\`\`

## Constraints

- \`1 <= s.length <= 10^5\`
- \`s\` contains only lowercase English letters.

## Notes

Compare characters from both ends. At the first mismatch there are only two
candidate deletions: the left character or the right one. Check whether
either remaining inner range is a palindrome. This runs in linear time.
`}];export{e as default};
