const e=[{slug:"longest-repeating-character-replacement",title:"Longest Repeating Character Replacement",difficulty:"Medium",tags:["string","hash-map","sliding-window"],function:{name:"characterReplacement",params:[{name:"s",type:"string"},{name:"k",type:"number"}],returns:"number"},compare:{mode:"exact"},limits:{timeMs:1e3},tests:[{input:["XYYXYZ",1],expected:4,public:!0},{input:["PQRS",2],expected:3,public:!0},{input:["A",0],expected:1,public:!1},{input:["ABCD",0],expected:1,public:!1},{input:["AAAB",5],expected:4,public:!1},{input:["ABAB",2],expected:4,public:!1},{input:["AABABBA",1],expected:4,public:!1},{input:["ZZXZXXZZYZ",2],public:!1,expected:5}],generated:{seeds:[1401,1402,1403],perSeed:5},variantId:"default",key:"longest-repeating-character-replacement:default",generatedTests:[{seed:1401,index:0,input:["DBA",0],expected:1,public:!1},{seed:1401,index:1,input:["ADDCCCDB",7],expected:8,public:!1},{seed:1401,index:2,input:["BBBBABAA",6],expected:8,public:!1},{seed:1401,index:3,input:["AAAAAAAAAAAAAAAAAAAA",1],expected:20,public:!1},{seed:1401,index:4,input:["AAAAAAAAAAA",4],expected:11,public:!1},{seed:1402,index:0,input:["AAAAAAAAAAAAAAAAAAA",14],expected:19,public:!1},{seed:1402,index:1,input:["DDCADDACABBADAABDBA",10],expected:17,public:!1},{seed:1402,index:2,input:["A",0],expected:1,public:!1},{seed:1402,index:3,input:["AAAAAAAAAAAAAAA",5],expected:15,public:!1},{seed:1402,index:4,input:["CABDDBDCADBDCACDB",0],expected:2,public:!1},{seed:1403,index:0,input:["AAAAAA",2],expected:6,public:!1},{seed:1403,index:1,input:["BBBACBB",2],expected:7,public:!1},{seed:1403,index:2,input:["BAABBCBABABABABB",2],expected:6,public:!1},{seed:1403,index:3,input:["BBBBBABBBAA",11],expected:11,public:!1},{seed:1403,index:4,input:["BDAADABDDADDDDDBBB",0],expected:5,public:!1}],descriptionMarkdown:`# Longest Repeating Character Replacement

You are given a string \`s\` of uppercase English letters and a non-negative
integer \`k\`. You may pick at most \`k\` positions of \`s\` and change the letter
at each of them to any uppercase letter. Return the length of the longest
contiguous substring that can be made to consist of a single repeated letter.

## Examples

\`\`\`
Input: s = "XYYXYZ", k = 1
Output: 4
Explanation: changing index 3 to 'Y' gives "XYYYYZ", which contains "YYYY".
\`\`\`

\`\`\`
Input: s = "PQRS", k = 2
Output: 3
Explanation: any three consecutive letters can be unified with two changes.
\`\`\`

## Constraints

- \`1 <= s.length <= 10^5\`
- \`s\` contains only the letters \`A\`-\`Z\`.
- \`0 <= k <= s.length\`

## Notes

A window is feasible when its length minus the count of its most common
letter is at most \`k\`. Grow the window on the right and shrink it from the
left whenever it becomes infeasible.
`}];export{e as default};
