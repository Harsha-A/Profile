const e=[{slug:"find-minimum-in-rotated-sorted-array",title:"Find Minimum In Rotated Sorted Array",difficulty:"Medium",tags:["array","binary-search"],function:{name:"findMin",params:[{name:"nums",type:"number[]"}],returns:"number"},compare:{mode:"exact"},limits:{timeMs:1e3},tests:[{input:[[6,8,11,2,4]],expected:2,public:!0},{input:[[10,20,30]],expected:10,public:!0},{input:[[7]],expected:7,public:!1},{input:[[5,-3]],expected:-3,public:!1},{input:[[1,2,3,4,5,6,0]],expected:0,public:!1},{input:[[9,-8,-5,-1,0,3]],public:!1,expected:-8}],generated:{seeds:[1531,1532,1533],perSeed:5},variantId:"default",key:"find-minimum-in-rotated-sorted-array:default",generatedTests:[{seed:1531,index:0,input:[[70,-98,-63,-6]],expected:-98,public:!1},{seed:1531,index:1,input:[[-33,-4,9,14,20,31,50,69,84,89,-95,-92,-90,-66,-51]],expected:-95,public:!1},{seed:1531,index:2,input:[[-58,-27,-100,-87]],expected:-100,public:!1},{seed:1531,index:3,input:[[-99,-4,56,78]],expected:-99,public:!1},{seed:1531,index:4,input:[[67,71,86,-69,-58,-54,-1]],expected:-69,public:!1},{seed:1532,index:0,input:[[62,68,70,76,83,-79,-78,-61,-58,-13,19,40]],expected:-79,public:!1},{seed:1532,index:1,input:[[49,63,-5]],expected:-5,public:!1},{seed:1532,index:2,input:[[-98,-86,-77,-76,-69,-60,-47,-44,-39,-12,-2,7,16,20,66,74,84,97]],expected:-98,public:!1},{seed:1532,index:3,input:[[-65,-48,-19,54,56,80,-74,-69]],expected:-74,public:!1},{seed:1532,index:4,input:[[16,23,29,48,59,72,80,90,-95,-51,-37,-7,-6,-1,3]],expected:-95,public:!1},{seed:1533,index:0,input:[[-47,2,16,26,28,29,63,65,-81,-66]],expected:-81,public:!1},{seed:1533,index:1,input:[[24,34,61,82,91,94,97,98,100,-96,-85,-79,-60,-50,-34,0,18]],expected:-96,public:!1},{seed:1533,index:2,input:[[65,73,87,-95,-73,-71,-64,-62,-34,-23,-22,28,51,63]],expected:-95,public:!1},{seed:1533,index:3,input:[[-10,44,86,-55,-16]],expected:-55,public:!1},{seed:1533,index:4,input:[[-7,-5,16,31,35,50,62,76,86,-100,-96,-79,-74,-61,-58,-47]],expected:-100,public:!1}],descriptionMarkdown:`# Find Minimum In Rotated Sorted Array

You are given an array \`nums\` of distinct integers. It was produced by taking
an array sorted in strictly increasing order and rotating it: some number of
elements (possibly zero) were moved, in order, from the front of the array to
the back. Return the smallest value in \`nums\`.

Your solution should run in \`O(log n)\` time.

## Examples

\`\`\`
Input: nums = [6, 8, 11, 2, 4]
Output: 2
Explanation: the sorted array [2, 4, 6, 8, 11] was rotated so that 6 comes first.
\`\`\`

\`\`\`
Input: nums = [10, 20, 30]
Output: 10
Explanation: a rotation by zero leaves the array sorted.
\`\`\`

## Constraints

- \`1 <= nums.length <= 5000\`
- \`-5000 <= nums[i] <= 5000\`
- All values in \`nums\` are distinct.
- \`nums\` is a rotation of a strictly increasing array.

## Notes

Compare the middle element with the last element. If it is larger, the
minimum lies strictly to the right of the middle; otherwise it lies at or to
the left of the middle.
`}];export{e as default};
