const e=[{slug:"longest-substring-without-repeating-characters",title:"Longest Substring Without Repeating Characters",difficulty:"Medium",tags:["string","hash-map","sliding-window"],function:{name:"lengthOfLongestSubstring",params:[{name:"s",type:"string"}],returns:"number"},compare:{mode:"exact"},limits:{timeMs:1e3},tests:[{input:["xyzxyyq"],expected:3,public:!0},{input:["mmmm"],expected:1,public:!0},{input:[""],expected:0,public:!1},{input:["a b a"],expected:3,public:!1},{input:["tmmzuxt"],expected:5,public:!1},{input:["abcdefg"],expected:7,public:!1},{input:["abba"],expected:2,public:!1},{input:["q1!q2@3"],public:!1,expected:6}],generated:{seeds:[1301,1302,1303],perSeed:5},variantId:"default",key:"longest-substring-without-repeating-characters:default",generatedTests:[{seed:1301,index:0,input:["fgdce haccfb"],expected:8,public:!1},{seed:1301,index:1,input:["fbb1dchh1hd1gagfgb1e "],expected:6,public:!1},{seed:1301,index:2,input:["cdca"],expected:3,public:!1},{seed:1301,index:3,input:[""],expected:0,public:!1},{seed:1301,index:4,input:["ca"],expected:2,public:!1},{seed:1302,index:0,input:["acccb"],expected:2,public:!1},{seed:1302,index:1,input:["cbecbbggfbbacgaffdbddedg"],expected:4,public:!1},{seed:1302,index:2,input:["cbgechdhdfb"],expected:6,public:!1},{seed:1302,index:3,input:["hacd1bc"],expected:6,public:!1},{seed:1302,index:4,input:["b"],expected:1,public:!1},{seed:1303,index:0,input:["fefc1fd!bh"],expected:7,public:!1},{seed:1303,index:1,input:["aehcgcadfchgdgfgbaegg"],expected:6,public:!1},{seed:1303,index:2,input:["a"],expected:1,public:!1},{seed:1303,index:3,input:["bbbbbbaabbbbbbababaabbba"],expected:2,public:!1},{seed:1303,index:4,input:["aafeedce"],expected:3,public:!1}],descriptionMarkdown:`# Longest Substring Without Repeating Characters

You are given a string \`s\`. Return the length of the longest contiguous
substring of \`s\` in which no character appears more than once. The empty
string has answer \`0\`.

## Examples

\`\`\`
Input: s = "xyzxyyq"
Output: 3
Explanation: "xyz" (and also "zxy", "yzx") has three distinct characters;
no longer run avoids a repeat.
\`\`\`

\`\`\`
Input: s = "mmmm"
Output: 1
\`\`\`

## Constraints

- \`0 <= s.length <= 5 * 10^4\`
- \`s\` may contain letters, digits, spaces and printable symbols.

## Notes

Slide a window \`[left, right]\`. Remember the last index of each character;
when \`s[right]\` was last seen inside the window, move \`left\` just past that
index.
`}];export{e as default};
