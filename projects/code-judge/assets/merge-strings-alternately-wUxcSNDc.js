const e=[{slug:"merge-strings-alternately",title:"Merge Strings Alternately",difficulty:"Easy",tags:["string","two-pointers"],function:{name:"mergeAlternately",params:[{name:"word1",type:"string"},{name:"word2",type:"string"}],returns:"string"},compare:{mode:"exact"},limits:{timeMs:1e3},tests:[{input:["ace","bdf"],expected:"abcdef",public:!0},{input:["hi","WORLD"],expected:"hWiORLD",public:!0},{input:["mnop","x"],expected:"mxnop",public:!1},{input:["a","b"],expected:"ab",public:!1},{input:["zz","yyyy"],public:!1,expected:"zyzyyy"}],generated:{seeds:[1401,1402,1403],perSeed:5},variantId:"default",key:"merge-strings-alternately:default",generatedTests:[{seed:1401,index:0,input:["blecameam","UWWXRYRSU"],expected:"bUlWeWcXaRmYeRaSmU",public:!1},{seed:1401,index:1,input:["mlblcajaml","QTSPVNX"],expected:"mQlTbSlPcVaNjXaml",public:!1},{seed:1401,index:2,input:["lfldelak","UNPTXQ"],expected:"lUfNlPdTeXlQak",public:!1},{seed:1401,index:3,input:["hldchi","WRWYZUOPZ"],expected:"hWlRdWcYhZiUOPZ",public:!1},{seed:1401,index:4,input:["kaaiijmch","QYX"],expected:"kQaYaXiijmch",public:!1},{seed:1402,index:0,input:["mha","UYSS"],expected:"mUhYaSS",public:!1},{seed:1402,index:1,input:["ddmmjkjleg","WX"],expected:"dWdXmmjkjleg",public:!1},{seed:1402,index:2,input:["kjhbmlciad","NXNO"],expected:"kNjXhNbOmlciad",public:!1},{seed:1402,index:3,input:["lfbgj","N"],expected:"lNfbgj",public:!1},{seed:1402,index:4,input:["ajmm","VPUUYQN"],expected:"aVjPmUmUYQN",public:!1},{seed:1403,index:0,input:["d","XNZ"],expected:"dXNZ",public:!1},{seed:1403,index:1,input:["if","RSUUOW"],expected:"iRfSUUOW",public:!1},{seed:1403,index:2,input:["edgkh","RU"],expected:"eRdUgkh",public:!1},{seed:1403,index:3,input:["jfbibia","PVSORT"],expected:"jPfVbSiObRiTa",public:!1},{seed:1403,index:4,input:["himiakj","PTZYYQ"],expected:"hPiTmZiYaYkQj",public:!1}],descriptionMarkdown:`# Merge Strings Alternately

You are given two non-empty strings \`word1\` and \`word2\`. Build a new string
by taking characters one at a time, alternating between the two inputs and
starting with \`word1\`. When one input runs out of characters, append the
rest of the other input unchanged. Return the resulting string.

## Examples

\`\`\`
Input: word1 = "ace", word2 = "bdf"
Output: "abcdef"
\`\`\`

\`\`\`
Input: word1 = "hi", word2 = "WORLD"
Output: "hWiORLD"
Explanation: after "h", "W", "i", "O" the first string is exhausted, so
"RLD" is appended.
\`\`\`

## Constraints

- \`1 <= word1.length, word2.length <= 100\`
- Both strings contain only English letters.
`}];export{e as default};
