const e=[{slug:"gas-station",title:"Gas Station",difficulty:"Medium",tags:["array","greedy"],function:{name:"canCompleteCircuit",params:[{name:"gas",type:"number[]"},{name:"cost",type:"number[]"}],returns:"number"},compare:{mode:"exact"},limits:{timeMs:1e3},tests:[{input:[[2,5,1,4],[3,2,4,2]],expected:1,public:!0},{input:[[1,2,3],[2,3,2]],expected:-1,public:!0},{input:[[7],[7]],expected:0,public:!1},{input:[[0,0,9],[3,3,3]],expected:2,public:!1},{input:[[4,1,1,6],[1,5,3,2]],public:!1,expected:3}],generated:{seeds:[2101,2102,2103],perSeed:5},variantId:"default",key:"gas-station:default",generatedTests:[{seed:2101,index:0,input:[[6,6,6,0,2,2,9,7,1,7,4],[1,5,9,1,6,7,4,1,5,9,7]],expected:-1,public:!1},{seed:2101,index:1,input:[[8],[4]],expected:0,public:!1},{seed:2101,index:2,input:[[8],[7]],expected:0,public:!1},{seed:2101,index:3,input:[[6,1,5,0,2,4,3,4,8,6,1,6],[9,6,8,0,5,6,1,2,0,1,1,6]],expected:6,public:!1},{seed:2101,index:4,input:[[7,7,8,8,5,6,5,0,0,4],[2,5,2,6,6,8,5,6,7,1]],expected:9,public:!1},{seed:2102,index:0,input:[[1,9,6,0,1,2,6,3],[7,8,4,9,5,5,0,2]],expected:-1,public:!1},{seed:2102,index:1,input:[[4,9,4,7,3,8,6,4,3,7,4,1],[4,1,9,2,9,4,4,9,8,7,0,6]],expected:-1,public:!1},{seed:2102,index:2,input:[[3],[7]],expected:-1,public:!1},{seed:2102,index:3,input:[[7,7,3,2,2,1,9,5,8,8,1],[7,3,5,0,9,6,6,2,8,4,1]],expected:6,public:!1},{seed:2102,index:4,input:[[2,0],[0,1]],expected:0,public:!1},{seed:2103,index:0,input:[[6],[4]],expected:0,public:!1},{seed:2103,index:1,input:[[5,3,3,2,8,0,9,3,4,6,6],[0,3,5,6,7,5,0,0,7,1,9]],expected:6,public:!1},{seed:2103,index:2,input:[[8,0],[0,5]],expected:0,public:!1},{seed:2103,index:3,input:[[7,4,3,4,5,2,7,4,1,0,0],[6,0,9,1,0,6,5,2,2,3,2]],expected:3,public:!1},{seed:2103,index:4,input:[[0,2,5],[1,5,0]],expected:2,public:!1}],descriptionMarkdown:`# Gas Station

There are \`n\` stops arranged in a loop, numbered \`0\` to \`n - 1\`. At stop \`i\`
you receive \`gas[i]\` units of fuel, and travelling from stop \`i\` to the next
stop \`(i + 1) % n\` consumes \`cost[i]\` units. You begin at a stop of your
choice with an empty tank, collect that stop's fuel, and move forward one stop
at a time. The tank has no capacity limit, and its level must never drop below
zero during a move.

Return the index of the starting stop from which you can travel all the way
around the loop and arrive back at the start. If no such stop exists, return
\`-1\`. Inputs are chosen so that when a valid starting stop exists, it is
unique.

## Examples

\`\`\`
Input: gas = [2, 5, 1, 4], cost = [3, 2, 4, 2]
Output: 1
Explanation: Starting at stop 1 the tank reads 5-2=3, 3+1-4=0, 0+4-2=2,
2+2-3=1 after each move, never going negative.
\`\`\`

\`\`\`
Input: gas = [1, 2, 3], cost = [2, 3, 2]
Output: -1
Explanation: Total fuel 6 is less than total cost 7, so no start works.
\`\`\`

## Constraints

- \`1 <= n <= 10^5\`, where \`n == gas.length == cost.length\`
- \`0 <= gas[i], cost[i] <= 10^4\`
- If a valid start exists, it is unique.

## Notes

If total fuel is at least total cost, a solution exists. Scan once, keeping a
running tank; whenever it goes negative, no stop up to the current one can be
the start, so reset the candidate to the next stop.
`}];export{e as default};
