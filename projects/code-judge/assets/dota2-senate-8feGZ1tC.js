const e=[{slug:"dota2-senate",title:"Dota2 Senate",difficulty:"Medium",tags:["string","queue","greedy"],function:{name:"predictPartyVictory",params:[{name:"senate",type:"string"}],returns:"string"},compare:{mode:"exact"},limits:{timeMs:1e3},tests:[{input:["ABB"],expected:"B",public:!0},{input:["ABAB"],expected:"A",public:!0},{input:["A"],expected:"A",public:!1},{input:["BBAAA"],expected:"B",public:!1},{input:["AABBB"],expected:"A",public:!1},{input:["BAABBA"],public:!1,expected:"B"}],generated:{seeds:[2301,2302,2303],perSeed:5},variantId:"default",key:"dota2-senate:default",generatedTests:[{seed:2301,index:0,input:["AAABBBBABBBAB"],expected:"B",public:!1},{seed:2301,index:1,input:["BBBBBAAAAABBAA"],expected:"B",public:!1},{seed:2301,index:2,input:["AAAAAAABB"],expected:"A",public:!1},{seed:2301,index:3,input:["BBBBAABBAABBBA"],expected:"B",public:!1},{seed:2301,index:4,input:["ABAAABBBBABA"],expected:"A",public:!1},{seed:2302,index:0,input:["AABABAAAAAAAA"],expected:"A",public:!1},{seed:2302,index:1,input:["BAAABA"],expected:"A",public:!1},{seed:2302,index:2,input:["AAAAAAB"],expected:"A",public:!1},{seed:2302,index:3,input:["A"],expected:"A",public:!1},{seed:2302,index:4,input:["AAA"],expected:"A",public:!1},{seed:2303,index:0,input:["AAAAAAA"],expected:"A",public:!1},{seed:2303,index:1,input:["B"],expected:"B",public:!1},{seed:2303,index:2,input:["A"],expected:"A",public:!1},{seed:2303,index:3,input:["AABBBBAABBBA"],expected:"B",public:!1},{seed:2303,index:4,input:["AAAAAAAAAAAAAABAA"],expected:"A",public:!1}],descriptionMarkdown:`# Dota2 Senate

A string \`senate\` describes a line of members, each belonging to one of two
factions: \`'A'\` or \`'B'\`. Members act in string order, left to right, and
after the last member the order wraps back to the first. Play proceeds as
follows:

- When it is a member's turn and that member is still active, they eliminate
  one active member of the opposing faction: the first such member found by
  moving forward from the current position in turn order (wrapping around).
  Eliminated members never act again.
- Inactive members are skipped.
- As soon as every remaining active member belongs to the same faction, that
  faction wins.

Return the winning faction as the one-character string \`"A"\` or \`"B"\`.

## Examples

\`\`\`
Input: senate = "ABB"
Output: "B"
Explanation: The A at index 0 eliminates the B at index 1. The B at index 2
then eliminates the A at index 0, leaving only B.
\`\`\`

\`\`\`
Input: senate = "ABAB"
Output: "A"
Explanation: Index 0 removes index 1, index 2 removes index 3. Only A members
remain.
\`\`\`

## Constraints

- \`1 <= senate.length <= 10^4\`
- Every character of \`senate\` is \`'A'\` or \`'B'\`.

## Notes

Keep two queues of turn positions, one per faction. Repeatedly compare the
fronts: the smaller position acts first, removes the other, and re-enters its
queue at position \`+ n\` for the next round.
`}];export{e as default};
