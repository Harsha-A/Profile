const e=[{slug:"two-sum-ii-input-array-is-sorted",title:"Two Sum II Input Array Is Sorted",difficulty:"Medium",tags:["array","two-pointers","binary-search"],function:{name:"twoSum",params:[{name:"numbers",type:"number[]"},{name:"target",type:"number"}],returns:"number[]"},compare:{mode:"exact"},limits:{timeMs:1e3},tests:[{input:[[1,3,8,12,20],15],expected:[2,4],public:!0},{input:[[-6,-1,4],-7],expected:[1,2],public:!0},{input:[[5,5],10],expected:[1,2],public:!1},{input:[[-10,-3,0,7,11],1],expected:[1,5],public:!1},{input:[[0,2,3,9],11],expected:[2,4],public:!1},{input:[[-4,1,6,8,15,30],21],public:!1,expected:[3,5]}],generated:{seeds:[1601,1602,1603],perSeed:5},variantId:"default",key:"two-sum-ii-input-array-is-sorted:default",generatedTests:[{seed:1601,index:0,input:[[-30,-19,-17,-2,3,8,23,25],-19],expected:[3,4],public:!1},{seed:1601,index:1,input:[[-30,-19,-14,-7,7,11,16,22,28],3],expected:[2,8],public:!1},{seed:1601,index:2,input:[[-24,1,9,18,27,30],6],expected:[1,6],public:!1},{seed:1601,index:3,input:[[-26,-4,6,8,24],2],expected:[2,3],public:!1},{seed:1601,index:4,input:[[-27,-8,-4,14,18],6],expected:[2,4],public:!1},{seed:1602,index:0,input:[[-29,-25,-23,-11,-2],-27],expected:[2,5],public:!1},{seed:1602,index:1,input:[[-16,-2],-18],expected:[1,2],public:!1},{seed:1602,index:2,input:[[-20,-16,-13,-9,-5,-5,-4,30],14],expected:[2,8],public:!1},{seed:1602,index:3,input:[[-16,-1,11,23,27],50],expected:[4,5],public:!1},{seed:1602,index:4,input:[[-30,-12,17,27,29],15],expected:[2,4],public:!1},{seed:1603,index:0,input:[[-6,-6,-4,4,15,24,28],20],expected:[3,6],public:!1},{seed:1603,index:1,input:[[-28,-24,-23,0,3,9,22,30],-1],expected:[3,7],public:!1},{seed:1603,index:2,input:[[-4,3,17,18,18,19,29],46],expected:[3,7],public:!1},{seed:1603,index:3,input:[[-4,-3,3,6,8,20],5],expected:[2,5],public:!1},{seed:1603,index:4,input:[[-14,-1,26,28],-15],expected:[1,2],public:!1}],descriptionMarkdown:`# Two Sum II Input Array Is Sorted

You are given an integer array \`numbers\` sorted in non-decreasing order and
an integer \`target\`. Exactly one pair of positions \`i < j\` satisfies
\`numbers[i] + numbers[j] == target\`. Return that pair as a two-element array
\`[i, j]\` using **1-based** positions, with the smaller position first.

A position may not be used twice, although two different positions may hold
equal values. Aim for constant extra space.

## Examples

\`\`\`
Input: numbers = [1, 3, 8, 12, 20], target = 15
Output: [2, 4]
Explanation: numbers at positions 2 and 4 are 3 and 12, which sum to 15.
\`\`\`

\`\`\`
Input: numbers = [-6, -1, 4], target = -7
Output: [1, 2]
\`\`\`

## Constraints

- \`2 <= numbers.length <= 3 * 10^4\`
- \`-1000 <= numbers[i] <= 1000\`
- \`numbers\` is sorted in non-decreasing order.
- Exactly one pair of positions sums to \`target\`.

## Notes

Start one pointer at each end. If their sum is too small, advance the left
pointer; if it is too large, retreat the right pointer. Sortedness guarantees
the matching pair is never skipped.
`}];export{e as default};
