const e=[{slug:"reconstruct-itinerary",title:"Reconstruct Itinerary",difficulty:"Hard",tags:["graph","depth-first-search","eulerian-path","sorting"],function:{name:"findItinerary",params:[{name:"tickets",type:"string[][]"}],returns:"string[]"},compare:{mode:"exact"},limits:{timeMs:1e3},tests:[{input:[[["JFK","PDX"],["PDX","JFK"],["JFK","BOS"]]],expected:["JFK","PDX","JFK","BOS"],public:!0},{input:[[["JFK","AMS"],["JFK","CAI"],["CAI","JFK"]]],expected:["JFK","CAI","JFK","AMS"],public:!0},{input:[[["JFK","ZRH"]]],expected:["JFK","ZRH"],public:!0},{input:[[["JFK","LIM"],["LIM","JFK"],["JFK","LIM"],["LIM","JFK"]]],expected:["JFK","LIM","JFK","LIM","JFK"],public:!1},{input:[[["JFK","BCN"],["BCN","DEL"],["DEL","BCN"],["BCN","JFK"],["JFK","DEL"]]],public:!1,expected:["JFK","BCN","DEL","BCN","JFK","DEL"]},{input:[[["OSL","JFK"],["JFK","OSL"],["JFK","MEX"],["MEX","JFK"],["OSL","MEX"]]],public:!1,expected:["JFK","MEX","JFK","OSL","MEX","JFK"]}],generated:{seeds:[3321,3322,3323],perSeed:5},variantId:"default",key:"reconstruct-itinerary:default",generatedTests:[{seed:3321,index:0,input:[[["BOS","JFK"],["AMS","JFK"],["JFK","BOS"],["JFK","AMS"],["BOS","AMS"],["AMS","BOS"]]],expected:["JFK","AMS","BOS","AMS","JFK","BOS","JFK"],public:!1},{seed:3321,index:1,input:[[["AMS","CAI"],["JFK","AMS"]]],expected:["JFK","AMS","CAI"],public:!1},{seed:3321,index:2,input:[[["LIM","AMS"],["AMS","LIM"],["LIM","JFK"],["JFK","CAI"],["CAI","BOS"],["JFK","LIM"]]],expected:["JFK","LIM","AMS","LIM","JFK","CAI","BOS"],public:!1},{seed:3321,index:3,input:[[["DEL","AMS"],["CAI","BOS"],["AMS","CAI"],["LIM","DEL"],["JFK","AMS"],["AMS","CAI"],["AMS","DEL"],["JFK","LIM"],["CAI","AMS"],["DEL","JFK"]]],expected:["JFK","AMS","CAI","AMS","DEL","JFK","LIM","DEL","AMS","CAI","BOS"],public:!1},{seed:3321,index:4,input:[[["JFK","LIM"]]],expected:["JFK","LIM"],public:!1},{seed:3322,index:0,input:[[["BOS","JFK"],["JFK","AMS"],["AMS","JFK"],["AMS","BOS"],["JFK","AMS"]]],expected:["JFK","AMS","BOS","JFK","AMS","JFK"],public:!1},{seed:3322,index:1,input:[[["JFK","CAI"]]],expected:["JFK","CAI"],public:!1},{seed:3322,index:2,input:[[["JFK","BOS"],["AMS","BOS"],["BOS","JFK"],["BOS","JFK"],["JFK","BOS"],["JFK","AMS"]]],expected:["JFK","AMS","BOS","JFK","BOS","JFK","BOS"],public:!1},{seed:3322,index:3,input:[[["JFK","LIM"],["JFK","AMS"],["OSL","JFK"],["AMS","OSL"]]],expected:["JFK","AMS","OSL","JFK","LIM"],public:!1},{seed:3322,index:4,input:[[["JFK","SFO"],["SFO","LIM"],["LIM","DEL"],["BOS","LIM"],["LIM","BOS"]]],expected:["JFK","SFO","LIM","BOS","LIM","DEL"],public:!1},{seed:3323,index:0,input:[[["AMS","OSL"],["JFK","LIM"],["LIM","AMS"]]],expected:["JFK","LIM","AMS","OSL"],public:!1},{seed:3323,index:1,input:[[["CAI","AMS"],["JFK","CAI"]]],expected:["JFK","CAI","AMS"],public:!1},{seed:3323,index:2,input:[[["AMS","JFK"],["JFK","AMS"],["JFK","AMS"]]],expected:["JFK","AMS","JFK","AMS"],public:!1},{seed:3323,index:3,input:[[["JFK","AMS"],["AMS","BOS"],["BOS","CAI"]]],expected:["JFK","AMS","BOS","CAI"],public:!1},{seed:3323,index:4,input:[[["JFK","AMS"],["JFK","AMS"],["AMS","JFK"],["JFK","AMS"],["AMS","JFK"],["JFK","AMS"],["AMS","JFK"]]],expected:["JFK","AMS","JFK","AMS","JFK","AMS","JFK","AMS"],public:!1}],descriptionMarkdown:`# Reconstruct Itinerary

You are given a list of directed edges \`tickets\`, where each
\`tickets[i] = [from, to]\` is a pair of three-letter uppercase codes. Treat
the codes as graph vertices and each ticket as one edge; the same pair may
appear more than once, and each copy is a separate edge.

Return a walk that starts at vertex \`"JFK"\` and traverses every edge exactly
once, as the list of vertices visited in order (so its length is
\`tickets.length + 1\`). The input always admits at least one such walk.

When several walks are possible, return the one that is lexicographically
smallest when compared vertex by vertex from the start, using ordinary
string comparison. This rule makes the answer unique.

## Examples

\`\`\`
Input: tickets = [["JFK", "AMS"], ["JFK", "CAI"], ["CAI", "JFK"]]
Output: ["JFK", "CAI", "JFK", "AMS"]
Explanation: "AMS" is smaller than "CAI", but taking the edge to "AMS"
first leaves no way back, so the edges to "CAI" and back must be used first.
\`\`\`

\`\`\`
Input: tickets = [["JFK", "PDX"], ["PDX", "JFK"], ["JFK", "BOS"]]
Output: ["JFK", "PDX", "JFK", "BOS"]
\`\`\`

## Constraints

- \`1 <= tickets.length <= 300\`
- Every code consists of exactly three uppercase English letters.
- \`from != to\` for every ticket.
- At least one walk from \`"JFK"\` uses every ticket exactly once.

## Notes

This is an Eulerian path. Hierholzer's algorithm, visiting outgoing edges in
ascending order of destination and appending each vertex after its edges
are exhausted, produces the answer in reverse.
`}];export{e as default};
