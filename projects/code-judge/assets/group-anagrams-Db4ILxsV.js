const e=[{slug:"group-anagrams",title:"Group Anagrams",difficulty:"Medium",tags:["array","string","hash-map","sorting"],function:{name:"groupAnagrams",params:[{name:"strs",type:"string[]"}],returns:"string[][]"},compare:{mode:"unordered",deep:!0},limits:{timeMs:1e3},tests:[{input:[["lead","deal","lade","tone","note","cab"]],expected:[["lead","deal","lade"],["tone","note"],["cab"]],public:!0},{input:[["x"]],expected:[["x"]],public:!0},{input:[["",""]],expected:[["",""]],public:!0},{input:[["ab","ba","ab"]],public:!1,expected:[["ab","ba","ab"]]},{input:[["abc","def","ghi"]],public:!1,expected:[["abc"],["def"],["ghi"]]},{input:[["","a","aa","a"]],public:!1,expected:[[""],["a","a"],["aa"]]}],generated:{seeds:[401,402,403],perSeed:4},variantId:"default",key:"group-anagrams:default",generatedTests:[{seed:401,index:0,input:[["df","fac","afc","fca"]],expected:[["df"],["fac","afc","fca"]],public:!1},{seed:401,index:1,input:[["f","b","b","b"]],expected:[["f"],["b","b","b"]],public:!1},{seed:401,index:2,input:[["fbfd","fbdf","ffdb"]],expected:[["fbfd","fbdf","ffdb"]],public:!1},{seed:401,index:3,input:[["f","","caab","f","ad","f","baac"]],expected:[["f","f","f"],[""],["caab","baac"],["ad"]],public:!1},{seed:402,index:0,input:[["","","fcfa","cffa","","fcaf"]],expected:[["","",""],["fcfa","cffa","fcaf"]],public:!1},{seed:402,index:1,input:[["","","","bdbd"]],expected:[["","",""],["bdbd"]],public:!1},{seed:402,index:2,input:[["ae","fe","ef"]],expected:[["ae"],["fe","ef"]],public:!1},{seed:402,index:3,input:[["abde","dabe","e","e","","","e"]],expected:[["abde","dabe"],["e","e","e"],["",""]],public:!1},{seed:403,index:0,input:[["","",""]],expected:[["","",""]],public:!1},{seed:403,index:1,input:[["abbc","dbdb","dbbd","abbc","bacb","bdbd"]],expected:[["abbc","abbc","bacb"],["dbdb","dbbd","bdbd"]],public:!1},{seed:403,index:2,input:[["acff","ce","fcfa","affc","ec","ce"]],expected:[["acff","fcfa","affc"],["ce","ec","ce"]],public:!1},{seed:403,index:3,input:[["f","f"]],expected:[["f","f"]],public:!1}],descriptionMarkdown:`# Group Anagrams

You are given an array of lowercase strings \`strs\`. Partition the strings
into groups so that two strings end up in the same group exactly when one is
a rearrangement of the other's letters (they contain the same letters with
the same counts). Return the list of groups.

Every input string must appear in exactly one group, including repeated
strings, which each keep their own entry. The order of the groups, and the
order of strings inside a group, do not matter.

## Examples

\`\`\`
Input: strs = ["lead", "deal", "lade", "tone", "note", "cab"]
Output: [["lead", "deal", "lade"], ["tone", "note"], ["cab"]]
\`\`\`

\`\`\`
Input: strs = ["", ""]
Output: [["", ""]]
Explanation: the two empty strings share the same (empty) letter counts.
\`\`\`

## Constraints

- \`1 <= strs.length <= 10^4\`
- \`0 <= strs[i].length <= 100\`
- Each string contains only lowercase English letters.

## Notes

A canonical key per string, such as its sorted letters or a 26-slot count
signature, lets a hash map collect each group in one pass.
`}];export{e as default};
