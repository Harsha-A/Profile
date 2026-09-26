const e=[{slug:"longest-happy-string",title:"Longest Happy String",difficulty:"Medium",tags:["string","greedy","heap"],function:{name:"longestDiverseString",params:[{name:"a",type:"number"},{name:"b",type:"number"},{name:"c",type:"number"}],returns:"string"},compare:{mode:"custom"},limits:{timeMs:1e3},tests:[{input:[2,2,1],public:!0,expected:"ababc"},{input:[0,7,1],public:!0,expected:"bbcbb"},{input:[0,0,0],public:!0,expected:""},{input:[0,0,5],public:!1,expected:"cc"},{input:[1,1,7],public:!1,expected:"ccaccbcc"},{input:[6,2,0],public:!1,expected:"aabaabaa"},{input:[4,4,4],public:!1,expected:"abcabcabcabc"},{input:[10,1,1],public:!1,expected:"aabaacaa"}],generated:{seeds:[1405,1406,1407],perSeed:6},variantId:"default",key:"longest-happy-string:default",generatedTests:[{seed:1405,index:0,input:[8,4,4],expected:"aabaacaabcabcabc",public:!1},{seed:1405,index:1,input:[9,0,5],expected:"aacaacaacaacac",public:!1},{seed:1405,index:2,input:[2,2,3],expected:"cabcabc",public:!1},{seed:1405,index:3,input:[14,1,3],expected:"aacaacaabaacaa",public:!1},{seed:1405,index:4,input:[0,0,0],expected:"",public:!1},{seed:1405,index:5,input:[5,1,3],expected:"aacaacabc",public:!1},{seed:1406,index:0,input:[3,1,15],expected:"ccaccaccaccbcc",public:!1},{seed:1406,index:1,input:[9,3,2],expected:"aabaabaacaabac",public:!1},{seed:1406,index:2,input:[2,3,5],expected:"ccbcabcabc",public:!1},{seed:1406,index:3,input:[0,2,4],expected:"ccbcbc",public:!1},{seed:1406,index:4,input:[0,5,0],expected:"bb",public:!1},{seed:1406,index:5,input:[1,5,9],expected:"ccbccbccbcbcabc",public:!1},{seed:1407,index:0,input:[2,0,2],expected:"acac",public:!1},{seed:1407,index:1,input:[10,4,1],expected:"aabaabaabaabaac",public:!1},{seed:1407,index:2,input:[5,3,2],expected:"aabaabcabc",public:!1},{seed:1407,index:3,input:[4,2,10],expected:"ccaccaccaccbcabc",public:!1},{seed:1407,index:4,input:[4,5,3],expected:"bababcabcabc",public:!1},{seed:1407,index:5,input:[2,5,10],expected:"ccbccbccbccabcabc",public:!1}],descriptionMarkdown:'# Longest Happy String\n\nYou are given three non-negative integers `a`, `b`, and `c`. They are\nbudgets: you may use the letter `"a"` at most `a` times, `"b"` at most `b`\ntimes, and `"c"` at most `c` times.\n\nBuild a string from these letters that never contains the same letter three\ntimes in a row (so `"aa"` is fine but `"aaa"` is not), and that is as long\nas possible. Return that string. You do not have to spend every budget in\nfull; leftover letters are simply not used. If no letter can be placed (all\nbudgets are `0`), return `""`.\n\nSeveral strings usually reach the maximum length; any of them is accepted.\nThe judge checks that the returned string respects the budgets, has no run\nof three equal letters, and has the maximum possible length.\n\n## Examples\n\n```\nInput: a = 2, b = 2, c = 1\nOutput: "aabbc"\nExplanation: all five letters fit. "abcab" and "babac" are also accepted.\n```\n\n```\nInput: a = 0, b = 7, c = 1\nOutput: "bbcbb"\nExplanation: a single "c" can separate at most two pairs of "b", so two\n"b" letters stay unused.\n```\n\n## Constraints\n\n- `0 <= a, b, c <= 100`\n\n## Notes\n\nGreedily append the letter with the most budget left, unless the last two\ncharacters already are that letter, in which case append the letter with the\nnext-largest budget. A max-heap of `(remaining, letter)` pairs makes the\nchoice cheap; with only three letters a direct comparison works too.\n',checkerSrc:`// Many strings reach the maximum length, so the output is validated
// structurally. With counts sorted x >= y >= z, every letter can be used when
// x <= 2 * (y + z + 1); otherwise the largest letter is capped at
// 2 * (y + z + 1), since each of the y + z other letters plus the two ends
// can border at most one run of two.
function maxLength(a, b, c) {
  const [x, y, z] = [a, b, c].sort((p, q) => q - p);
  return x <= 2 * (y + z + 1) ? x + y + z : 2 * (y + z + 1) + y + z;
}

export function check(input, output) {
  const [a, b, c] = input;
  if (typeof output !== 'string') {
    return { ok: false, message: 'Expected a string.' };
  }
  const used = { a: 0, b: 0, c: 0 };
  for (const ch of output) {
    if (!(ch in used)) {
      return { ok: false, message: \`Only "a", "b", and "c" are allowed; found "\${ch}".\` };
    }
    used[ch]++;
  }
  if (used.a > a || used.b > b || used.c > c) {
    return { ok: false, message: \`Letter budget exceeded: used a=\${used.a}, b=\${used.b}, c=\${used.c}.\` };
  }
  const run = /aaa|bbb|ccc/.exec(output);
  if (run) {
    return { ok: false, message: \`Three equal letters in a row at position \${run.index}.\` };
  }
  const best = maxLength(a, b, c);
  if (output.length !== best) {
    return { ok: false, message: \`Expected a string of the maximum length \${best}, got length \${output.length}.\` };
  }
  return { ok: true };
}
`,checkerExportName:"check"}];export{e as default};
