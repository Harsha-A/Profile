const e=[{slug:"car-fleet",title:"Car Fleet",difficulty:"Medium",tags:["array","stack","sorting","monotonic-stack"],function:{name:"carFleet",params:[{name:"target",type:"number"},{name:"position",type:"number[]"},{name:"speed",type:"number[]"}],returns:"number"},compare:{mode:"exact"},limits:{timeMs:1e3},tests:[{input:[20,[0,4,10,15],[4,2,5,1]],expected:2,public:!0},{input:[12,[6,9],[2,1]],expected:1,public:!0},{input:[5,[2],[3]],expected:1,public:!1},{input:[10,[0,2,4],[1,1,1]],expected:3,public:!1},{input:[10,[7,1,4],[1,9,3]],expected:1,public:!1},{input:[100,[0,10,20,30,40],[5,4,3,2,1]],public:!1,expected:1}],generated:{seeds:[8531,8532,8533],perSeed:5},variantId:"default",key:"car-fleet:default",generatedTests:[{seed:8531,index:0,input:[44,[26,4,22,24,28,11,19,15,42,30],[1,3,5,6,1,6,3,6,2,3]],expected:4,public:!1},{seed:8531,index:1,input:[43,[40,15],[3,4]],expected:2,public:!1},{seed:8531,index:2,input:[43,[11,0,10,21,18,26,17,16,40,12],[3,6,6,3,2,6,2,3,3,6]],expected:5,public:!1},{seed:8531,index:3,input:[30,[14,28,7],[6,4,1]],expected:3,public:!1},{seed:8531,index:4,input:[39,[33,1,9,29],[4,2,3,2]],expected:4,public:!1},{seed:8532,index:0,input:[7,[4],[2]],expected:1,public:!1},{seed:8532,index:1,input:[42,[34,21,11,4,3,28,17,30,20,22],[6,4,1,3,4,4,3,6,1,3]],expected:6,public:!1},{seed:8532,index:2,input:[33,[5,27,12,3],[5,4,2,2]],expected:3,public:!1},{seed:8532,index:3,input:[25,[8,22,11,10,19,20,5,14,16,4],[5,5,1,5,3,2,4,5,5,4]],expected:3,public:!1},{seed:8532,index:4,input:[33,[30],[1]],expected:1,public:!1},{seed:8533,index:0,input:[6,[2,4,0,3,1,5],[3,2,5,4,4,1]],expected:2,public:!1},{seed:8533,index:1,input:[7,[1,4,3],[5,4,6]],expected:2,public:!1},{seed:8533,index:2,input:[34,[27,10,15,2,21],[1,2,4,1,4]],expected:3,public:!1},{seed:8533,index:3,input:[22,[21,1,15,18,0,20,5,2,7,8],[5,6,3,2,4,3,1,6,6,5]],expected:6,public:!1},{seed:8533,index:4,input:[21,[18,13,0,8,5,1,6,7,17],[2,1,1,2,2,4,4,2,6]],expected:3,public:!1}],descriptionMarkdown:`# Car Fleet

There are \`n\` objects on a one-dimensional track, all moving in the positive
direction toward the point \`target\`. Object \`i\` starts at \`position[i]\` and,
when unobstructed, moves at the constant rate \`speed[i]\`. All starting
positions are distinct and lie strictly before \`target\`.

No object may pass another. When a faster object reaches a slower one ahead
of it, the two stay together from that moment on and continue at the slower
rate. A set of objects that travels together in this way is a group; a lone
object that is never caught is a group by itself. Objects that meet exactly
at \`target\` count as the same group.

Return the number of distinct groups that reach \`target\`.

## Examples

\`\`\`
Input: target = 20, position = [0, 4, 10, 15], speed = [4, 2, 5, 1]
Output: 2
Explanation: unobstructed arrival times are 5, 8, 2 and 5 respectively.
The object at 10 would arrive at time 2, earlier than the object at 15
(time 5), so it catches up and joins it. The object at 4 would arrive at
time 8, later than that group, so it starts a second group. The object at
0 (time 5) catches up with it.
\`\`\`

\`\`\`
Input: target = 12, position = [6, 9], speed = [2, 1]
Output: 1
Explanation: both would arrive at time 3, so they meet exactly at 12.
\`\`\`

## Constraints

- \`n == position.length == speed.length\`
- \`1 <= n <= 10^5\`
- \`0 < target <= 10^6\`
- \`0 <= position[i] < target\`, and all positions are distinct.
- \`1 <= speed[i] <= 10^6\`
- The answer is an integer; results are compared exactly.

## Notes

Process objects from nearest to farthest from \`target\`. An object forms a
new group only if its unobstructed arrival time is strictly later than that
of the group directly ahead. Comparing times by cross-multiplication avoids
any floating-point concerns.
`}];export{e as default};
