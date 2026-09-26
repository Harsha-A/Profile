const a=[{slug:"longest-palindromic-substring",title:"Longest Palindromic Substring",difficulty:"Medium",tags:["string","dynamic-programming","two-pointers"],function:{name:"longestPalindrome",params:[{name:"s",type:"string"}],returns:"string"},compare:{mode:"exact"},limits:{timeMs:1e3},tests:[{input:["xabacdcz"],expected:"aba",public:!0},{input:["pqqr"],expected:"qq",public:!0},{input:["m"],expected:"m",public:!1},{input:["abcd"],expected:"a",public:!1},{input:["abbaxyzzyx"],expected:"xyzzyx",public:!1},{input:["kayakracecar"],expected:"racecar",public:!1},{input:["aaaa"],expected:"aaaa",public:!1},{input:["noonmoon"],public:!1,expected:"noon"}],generated:{seeds:[1151,1152,1153],perSeed:5},variantId:"default",key:"longest-palindromic-substring:default",generatedTests:[{seed:1151,index:0,input:["acbcaabbabababcabbabcbabab"],expected:"bababab",public:!1},{seed:1151,index:1,input:["caabbabcaaacc"],expected:"caaac",public:!1},{seed:1151,index:2,input:["accbcaabbbaaaccabcbacbacac"],expected:"aabbbaa",public:!1},{seed:1151,index:3,input:["abcccabcbabbbbcbccbcabcbabcaab"],expected:"cbccbc",public:!1},{seed:1151,index:4,input:["ccaabbbccacabbccbcaaaaaaccbcacbcb"],expected:"caaaaaac",public:!1},{seed:1152,index:0,input:["aaaacbcbcbcbcbcccaab"],expected:"cbcbcbcbcbc",public:!1},{seed:1152,index:1,input:["bcbcbbbbcabbaabacbacacaccacabbabacbbaaa"],expected:"acaccaca",public:!1},{seed:1152,index:2,input:["cbaaabcbaabbaa"],expected:"cbaaabc",public:!1},{seed:1152,index:3,input:["cbcacbbcbabbcaa"],expected:"bcacb",public:!1},{seed:1152,index:4,input:["abaabaacbacaa"],expected:"abaaba",public:!1},{seed:1153,index:0,input:["aaacccbbbccacbbbcabbaacccaaaabcccacabb"],expected:"ccbbbcc",public:!1},{seed:1153,index:1,input:["bbaaaaaaacabccccbbaa"],expected:"aaaaaaa",public:!1},{seed:1153,index:2,input:["bccacbbbaccacbbaca"],expected:"acca",public:!1},{seed:1153,index:3,input:["ccabacccaacababcccaccbaaacaacb"],expected:"ccabacc",public:!1},{seed:1153,index:4,input:["bcbacbcbbaabbbcacbccaacbbabccac"],expected:"bbaabb",public:!1}],descriptionMarkdown:`# Longest Palindromic Substring

Given a string \`s\`, return its longest contiguous substring that reads the
same forwards and backwards.

**Tie-break:** if several palindromic substrings share the maximum length,
return the one that **starts earliest** (smallest starting index) in \`s\`.
The output is compared exactly, so this rule matters.

## Examples

\`\`\`
Input: s = "xabacdcz"
Output: "aba"
Explanation: "aba" (start 1) and "cdc" (start 4) both have length 3;
the earlier one is returned.
\`\`\`

\`\`\`
Input: s = "pqqr"
Output: "qq"
\`\`\`

## Constraints

- \`1 <= s.length <= 1000\`
- \`s\` consists of lowercase English letters and digits.
`}];export{a as default};
