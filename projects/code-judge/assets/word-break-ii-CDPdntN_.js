const b=[{slug:"word-break-ii",title:"Word Break II",difficulty:"Hard",tags:["array","string","hash-map","backtracking","dynamic-programming","memoization"],function:{name:"wordBreak",params:[{name:"s",type:"string"},{name:"wordDict",type:"string[]"}],returns:"string[]"},compare:{mode:"unordered"},limits:{timeMs:1e3},tests:[{input:["catdog",["cat","dog","ca","tdog"]],expected:["ca tdog","cat dog"],public:!0},{input:["abcd",["ab","bc"]],expected:[],public:!0},{input:["sunflowerseed",["sun","flower","sunflower","seed","s","eed"]],expected:["sun flower s eed","sun flower seed","sunflower s eed","sunflower seed"],public:!0},{input:["aaaa",["a","aa"]],expected:["a a a a","a a aa","a aa a","aa a a","aa aa"],public:!1},{input:["x",["x"]],expected:["x"],public:!1},{input:["redbluered",["red","blue","re","dblue","d"]],public:!1,expected:["re d blue re d","re d blue red","re dblue re d","re dblue red","red blue re d","red blue red"]},{input:["abababab",["a","b","ab","ba","aba"]],public:!1,expected:["a b a b a b a b","a b a b a b ab","a b a b a ba b","a b a b ab a b","a b a b ab ab","a b a b aba b","a b a ba b a b","a b a ba b ab","a b a ba ba b","a b ab a b a b","a b ab a b ab","a b ab a ba b","a b ab ab a b","a b ab ab ab","a b ab aba b","a b aba b a b","a b aba b ab","a b aba ba b","a ba b a b a b","a ba b a b ab","a ba b a ba b","a ba b ab a b","a ba b ab ab","a ba b aba b","a ba ba b a b","a ba ba b ab","a ba ba ba b","ab a b a b a b","ab a b a b ab","ab a b a ba b","ab a b ab a b","ab a b ab ab","ab a b aba b","ab a ba b a b","ab a ba b ab","ab a ba ba b","ab ab a b a b","ab ab a b ab","ab ab a ba b","ab ab ab a b","ab ab ab ab","ab ab aba b","ab aba b a b","ab aba b ab","ab aba ba b","aba b a b a b","aba b a b ab","aba b a ba b","aba b ab a b","aba b ab ab","aba b aba b","aba ba b a b","aba ba b ab","aba ba ba b"]}],generated:{seeds:[1401,1402,1403],perSeed:5},variantId:"default",key:"word-break-ii:default",generatedTests:[{seed:1401,index:0,input:["cccbcbb",["aaac","ac"]],expected:[],public:!1},{seed:1401,index:1,input:["babbcbcc",["caca","c","babb","b","cbc","ac","baa"]],expected:["babb c b c c","babb cbc c"],public:!1},{seed:1401,index:2,input:["aaccab",["cbcc","baac","caab","cca","aac"]],expected:[],public:!1},{seed:1401,index:3,input:["baaaba",["abaa","baba","bb","bab","bbbb","aba","a"]],expected:[],public:!1},{seed:1401,index:4,input:["bbbbba",["aab","b","baab","a","ab","aabb"]],expected:["b b b b b a"],public:!1},{seed:1402,index:0,input:["bbbabb",["aab","aaba","bb","bbb","ba","babb","b"]],expected:["b b ba b b","b b ba bb","b b babb","bb ba b b","bb ba bb","bb babb"],public:!1},{seed:1402,index:1,input:["bbbaaabb",["aabb","a","ab","bbba"]],expected:["bbba aabb"],public:!1},{seed:1402,index:2,input:["bbabbbaabbaa",["ba","bbaa","babb","b","bb","aaab","bbab"]],expected:["b ba b bbaa bbaa","bbab bbaa bbaa"],public:!1},{seed:1402,index:3,input:["ccbcbacc",["cc","ba","bbb","acb","bc"]],expected:["cc bc ba cc"],public:!1},{seed:1402,index:4,input:["babbbbbabbb",["abbb","bb","b","c"]],expected:["b abbb b b abbb","b abbb bb abbb"],public:!1},{seed:1403,index:0,input:["babbbbbabb",["b","ba","bb"]],expected:["ba b b b b ba b b","ba b b b b ba bb","ba b b bb ba b b","ba b b bb ba bb","ba b bb b ba b b","ba b bb b ba bb","ba bb b b ba b b","ba bb b b ba bb","ba bb bb ba b b","ba bb bb ba bb"],public:!1},{seed:1403,index:1,input:["abaabaabb",["b","aa","bbb","babb","aab"]],expected:[],public:!1},{seed:1403,index:2,input:["ababbbaaaa",["bbba","aa","bab","a","babb","b","aab"]],expected:["a b a b b b a a a a","a b a b b b a a aa","a b a b b b a aa a","a b a b b b aa a a","a b a b b b aa aa","a b a bbba a a a","a b a bbba a aa","a b a bbba aa a","a bab b b a a a a","a bab b b a a aa","a bab b b a aa a","a bab b b aa a a","a bab b b aa aa","a babb b a a a a","a babb b a a aa","a babb b a aa a","a babb b aa a a","a babb b aa aa"],public:!1},{seed:1403,index:3,input:["bccbcacc",["ccca","cba","cabb","c","bccb","cca","cac"]],expected:["bccb cac c"],public:!1},{seed:1403,index:4,input:["abaaabbbbaab",["bb","abbb","b","baab","baa","aab","a"]],expected:["a b a a a b b b b a a b","a b a a a b b b b aab","a b a a a b b b baa b","a b a a a b b b baab","a b a a a b b bb a a b","a b a a a b b bb aab","a b a a a b bb b a a b","a b a a a b bb b aab","a b a a a b bb baa b","a b a a a b bb baab","a b a a a bb b b a a b","a b a a a bb b b aab","a b a a a bb b baa b","a b a a a bb b baab","a b a a a bb bb a a b","a b a a a bb bb aab","a b a a abbb b a a b","a b a a abbb b aab","a b a a abbb baa b","a b a a abbb baab","a b a aab b b b a a b","a b a aab b b b aab","a b a aab b b baa b","a b a aab b b baab","a b a aab b bb a a b","a b a aab b bb aab","a b a aab bb b a a b","a b a aab bb b aab","a b a aab bb baa b","a b a aab bb baab","a baa a b b b b a a b","a baa a b b b b aab","a baa a b b b baa b","a baa a b b b baab","a baa a b b bb a a b","a baa a b b bb aab","a baa a b bb b a a b","a baa a b bb b aab","a baa a b bb baa b","a baa a b bb baab","a baa a bb b b a a b","a baa a bb b b aab","a baa a bb b baa b","a baa a bb b baab","a baa a bb bb a a b","a baa a bb bb aab","a baa abbb b a a b","a baa abbb b aab","a baa abbb baa b","a baa abbb baab"],public:!1}],descriptionMarkdown:`# Word Break II

You are given a lowercase string \`s\` and a list of distinct lowercase words
\`wordDict\`. Split \`s\` into a sequence of one or more consecutive pieces so
that every piece is a word from \`wordDict\`. A dictionary word may be used
any number of times, including zero.

Return every such split as a single string: the pieces in left-to-right
order joined by exactly one space, with no leading or trailing spaces.
Removing the spaces from any returned string must reproduce \`s\`.

The order of the returned strings does not matter, but each distinct split
must appear exactly once. If \`s\` cannot be split at all, return an empty
list.

## Examples

\`\`\`
Input: s = "catdog", wordDict = ["cat", "dog", "ca", "tdog"]
Output: ["cat dog", "ca tdog"]
\`\`\`

\`\`\`
Input: s = "abcd", wordDict = ["ab", "bc"]
Output: []
Explanation: after "ab", the remainder "cd" cannot be formed.
\`\`\`

## Constraints

- \`1 <= s.length <= 16\`
- \`1 <= wordDict.length <= 12\`
- \`1 <= wordDict[i].length <= 8\`
- All words in \`wordDict\` are distinct.
- \`s\` and every word contain only lowercase English letters.

## Notes

Recurse on the start index, trying every dictionary word that matches at
that position, and memoize the list of sentences for each suffix so shared
suffixes are expanded only once.
`}];export{b as default};
