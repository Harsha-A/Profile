const e=[{slug:"verifying-an-alien-dictionary",title:"Verifying An Alien Dictionary",difficulty:"Easy",tags:["array","string","hash-map"],function:{name:"isAlienSorted",params:[{name:"words",type:"string[]"},{name:"order",type:"string"}],returns:"boolean"},compare:{mode:"exact"},limits:{timeMs:1e3},tests:[{input:[["cab","cba","ba"],"cbadefghijklmnopqrstuvwxyz"],expected:!1,public:!0},{input:[["zoo","zap","apple"],"zoapbcdefghijklmnqrstuvwxy"],expected:!0,public:!0},{input:[["tree","tr"],"abcdefghijklmnopqrstuvwxyz"],expected:!1,public:!0},{input:[["tr","tree"],"abcdefghijklmnopqrstuvwxyz"],expected:!0,public:!1},{input:[["same"],"zyxwvutsrqponmlkjihgfedcba"],expected:!0,public:!1},{input:[["b","b","a"],"bacdefghijklmnopqrstuvwxyz"],expected:!0,public:!1},{input:[["ab","aa"],"abcdefghijklmnopqrstuvwxyz"],public:!1,expected:!1}],generated:{seeds:[1201,1202,1203],perSeed:5},variantId:"default",key:"verifying-an-alien-dictionary:default",generatedTests:[{seed:1201,index:0,input:[["ll","lltt","c","ctt","tccc"],"lctqzgjknusyhwivpbarexfmod"],expected:!0,public:!1},{seed:1201,index:1,input:[["wwoy"],"woynasecfpiurjhvmlzxtqkgbd"],expected:!0,public:!1},{seed:1201,index:2,input:[["kkr"],"rklfqoiejhzagwcdmvybntxusp"],expected:!0,public:!1},{seed:1201,index:3,input:[["e","y"],"cyewvomahnpilftugjsrbxqzkd"],expected:!1,public:!1},{seed:1201,index:4,input:[["sss","ssdd","sdi","ii","d"],"sidrwuqbxlnfmkghvjteoaczpy"],expected:!0,public:!1},{seed:1202,index:0,input:[["k","ff","xkf","xkxx","xff"],"kfxuqbmldjieghszvrynpcoatw"],expected:!0,public:!1},{seed:1202,index:1,input:[["ww","uw","p","www","pupu","up"],"uwpdvzthanefjqbygxrikolmcs"],expected:!1,public:!1},{seed:1202,index:2,input:[["qeee","yq","q","eee","eye"],"eyqmlbushzpkjgixncfrodavwt"],expected:!1,public:!1},{seed:1202,index:3,input:[["wwc","wckc"],"wcktmzsagpdulonferhjxqvbiy"],expected:!0,public:!1},{seed:1202,index:4,input:[["mhh","hmhm","hcc"],"mhczjktdreupxgvwlfsiqoanby"],expected:!0,public:!1},{seed:1203,index:0,input:[["uqu","jqqq","qqju"],"qujhvyantkrefmxigpscwodzbl"],expected:!1,public:!1},{seed:1203,index:1,input:[["zzzz","znzz","zjn","nj","j","jj"],"znjwfdimkbvspqertchgyauxol"],expected:!0,public:!1},{seed:1203,index:2,input:[["w"],"lvwysperjbmcifxnozqkudthag"],expected:!0,public:!1},{seed:1203,index:3,input:[["do","uu","oo","uod","uud","o"],"udoqkispjgabvcxtwrmelzfyhn"],expected:!1,public:!1},{seed:1203,index:4,input:[["lqf","qlql"],"lfqawmpxoujgydvshkecrbiztn"],expected:!0,public:!1}],descriptionMarkdown:`# Verifying An Alien Dictionary

You are given a list of lowercase words \`words\` and a string \`order\`.
\`order\` is a permutation of the 26 lowercase English letters and defines a
custom alphabet: a letter that appears earlier in \`order\` ranks lower.

Words are compared lexicographically under this alphabet. Scan both words
from the left; at the first position where they differ, the word whose
letter ranks lower comes first. If one word is a prefix of the other, the
shorter word comes first. Identical words are equal.

Return \`true\` if every word is less than or equal to the word after it
under this rule, and \`false\` otherwise.

## Examples

\`\`\`
Input: words = ["zoo", "zap", "apple"], order = "zoapbcdefghijklmnqrstuvwxy"
Output: true
Explanation: "zoo" < "zap" because 'o' ranks before 'a' at index 1,
and "zap" < "apple" because 'z' ranks before 'a'.
\`\`\`

\`\`\`
Input: words = ["tree", "tr"], order = "abcdefghijklmnopqrstuvwxyz"
Output: false
Explanation: "tr" is a prefix of "tree", so it must come first.
\`\`\`

## Constraints

- \`1 <= words.length <= 100\`
- \`1 <= words[i].length <= 20\`
- \`order.length == 26\`, and \`order\` contains each lowercase letter once.
- Every word contains only lowercase English letters.
`}];export{e as default};
