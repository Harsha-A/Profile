const e=[{slug:"reorganize-string",title:"Reorganize String",difficulty:"Medium",tags:["string","hash-map","greedy","heap","counting"],function:{name:"reorganizeString",params:[{name:"s",type:"string"}],returns:"string"},compare:{mode:"custom"},limits:{timeMs:1e3},tests:[{input:["mmnp"],public:!0,expected:"mnmp"},{input:["qqqr"],public:!0,expected:""},{input:["z"],public:!0,expected:"z"},{input:["aab"],public:!1,expected:"aba"},{input:["aaab"],public:!1,expected:""},{input:["abcabc"],public:!1,expected:"abacbc"},{input:["aaabbbccc"],public:!1,expected:"abacacbcb"},{input:["vvvvwwwxx"],public:!1,expected:"vwvwvxvxw"},{input:["tttttuuuu"],public:!1,expected:"tutututut"},{input:["ttttttuuuu"],public:!1,expected:""}],generated:{seeds:[767,768,769],perSeed:6},variantId:"default",key:"reorganize-string:default",generatedTests:[{seed:767,index:0,input:["e"],expected:"e",public:!1},{seed:767,index:1,input:["aaaaaaaaaaaaaaa"],expected:"",public:!1},{seed:767,index:2,input:["aaaaaaa"],expected:"",public:!1},{seed:767,index:3,input:["aabacbcbccc"],expected:"cacacbcbcba",public:!1},{seed:767,index:4,input:["bcecadddca"],expected:"cbcdcdadae",public:!1},{seed:767,index:5,input:["baacaacaa"],expected:"",public:!1},{seed:768,index:0,input:["dabbaac"],expected:"abacadb",public:!1},{seed:768,index:1,input:["ddbdbbbcab"],expected:"babcbdbdbd",public:!1},{seed:768,index:2,input:["cdcccde"],expected:"cdcdcec",public:!1},{seed:768,index:3,input:["bbaaaaabaa"],expected:"",public:!1},{seed:768,index:4,input:["aaaaaaaaaaaaaaa"],expected:"",public:!1},{seed:768,index:5,input:["a"],expected:"a",public:!1},{seed:769,index:0,input:["baaaaaa"],expected:"",public:!1},{seed:769,index:1,input:["aa"],expected:"",public:!1},{seed:769,index:2,input:["c"],expected:"c",public:!1},{seed:769,index:3,input:["adcbac"],expected:"acacbd",public:!1},{seed:769,index:4,input:["dcacdb"],expected:"cbcdad",public:!1},{seed:769,index:5,input:["ebdebcaa"],expected:"acadbebe",public:!1}],descriptionMarkdown:`# Reorganize String

You are given a string \`s\` of lowercase English letters. Rearrange its
letters so that no two neighbouring characters are equal, and return the
rearranged string. The result must use every letter of \`s\` exactly as many
times as it occurs in \`s\`, and no others.

If no such rearrangement exists, return the empty string \`""\`. A
rearrangement exists exactly when no letter occurs more than
\`ceil(s.length / 2)\` times.

When several rearrangements are valid, any one of them is accepted. The
judge checks the returned string rather than comparing it with a fixed
answer.

## Examples

\`\`\`
Input: s = "mmnp"
Output: "mnmp"
Explanation: "mpmn" and "nmpm" are also accepted.
\`\`\`

\`\`\`
Input: s = "qqqr"
Output: ""
Explanation: "q" occurs 3 times, more than ceil(4 / 2) = 2.
\`\`\`

## Constraints

- \`1 <= s.length <= 500\`
- \`s\` contains only lowercase English letters.

## Notes

A greedy that always emits the most frequent remaining letter that differs
from the previous one works with a max-heap. Alternatively, write the most
frequent letter into positions \`0, 2, 4, ...\` and then fill the remaining
even and odd positions with the other letters.
`,checkerSrc:`// Many rearrangements are valid, so the output is validated structurally.
// An arrangement exists exactly when no letter occurs more than
// ceil(length / 2) times; otherwise the only accepted answer is "".
export function check(input, output) {
  const [s] = input;
  if (typeof output !== 'string') {
    return { ok: false, message: 'Expected a string.' };
  }
  const counts = new Map();
  for (const ch of s) counts.set(ch, (counts.get(ch) ?? 0) + 1);
  let maxCount = 0;
  for (const c of counts.values()) maxCount = Math.max(maxCount, c);
  const possible = maxCount <= Math.ceil(s.length / 2);

  if (!possible) {
    return output === ''
      ? { ok: true }
      : { ok: false, message: 'No valid arrangement exists; expected "".' };
  }
  if (output.length !== s.length) {
    return { ok: false, message: \`Expected length \${s.length}, got \${output.length}.\` };
  }
  const outCounts = new Map();
  for (const ch of output) outCounts.set(ch, (outCounts.get(ch) ?? 0) + 1);
  for (const [ch, c] of counts) {
    if (outCounts.get(ch) !== c) {
      return { ok: false, message: \`Output is not a rearrangement of s (letter "\${ch}").\` };
    }
  }
  if (outCounts.size !== counts.size) {
    return { ok: false, message: 'Output contains letters that are not in s.' };
  }
  for (let i = 1; i < output.length; i++) {
    if (output[i] === output[i - 1]) {
      return { ok: false, message: \`Equal letters are adjacent at positions \${i - 1} and \${i}.\` };
    }
  }
  return { ok: true };
}
`,checkerExportName:"check"}];export{e as default};
