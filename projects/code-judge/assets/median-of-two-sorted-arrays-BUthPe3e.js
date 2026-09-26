const e=[{slug:"median-of-two-sorted-arrays",title:"Median of Two Sorted Arrays",difficulty:"Hard",tags:["array","binary-search","divide-and-conquer"],function:{name:"findMedianSortedArrays",params:[{name:"nums1",type:"number[]"},{name:"nums2",type:"number[]"}],returns:"number"},compare:{mode:"float",eps:1e-6},limits:{timeMs:1e3},tests:[{input:[[1,4,9],[2,6]],expected:4,public:!0},{input:[[3,8],[5,10]],expected:6.5,public:!0},{input:[[],[7]],expected:7,public:!1},{input:[[2,3],[]],expected:2.5,public:!1},{input:[[1,1,1],[1,1]],expected:1,public:!1},{input:[[-5,-3],[10,20,30,40]],expected:15,public:!1},{input:[[1,2,3,4,5,6],[100]],expected:4,public:!1},{input:[[-9,0,4,4,12],[-2,3,7,7,8,15]],public:!1,expected:4}],generated:{seeds:[41,42,43],perSeed:5},variantId:"default",key:"median-of-two-sorted-arrays:default",generatedTests:[{seed:41,index:0,input:[[-89,-34,-11,-2,8,27,42,67,71,83],[-58,-48,-32,-19,43,92]],expected:3,public:!1},{seed:41,index:1,input:[[-93,-70,-57,-47,-40,-24,-4,8,71],[-94,-64,33]],expected:-43.5,public:!1},{seed:41,index:2,input:[[-57,-9,11,44,52],[-65,-62,-47,9,44]],expected:0,public:!1},{seed:41,index:3,input:[[-100,-93,-75,-64,-54,-53,-21,-4,13,76],[-81,-60,-22,13,54,66,82,83]],expected:-21.5,public:!1},{seed:41,index:4,input:[[-48,-43,-43,-42,20,22,85],[-71,-59,-45,-43,-29,-23,23,26,46,65,93]],expected:-26,public:!1},{seed:42,index:0,input:[[-65,-46,5,25,34,71,73],[-50,-39,-6,49,77]],expected:15,public:!1},{seed:42,index:1,input:[[22,38],[-100,-94,-90,-6,19,68]],expected:6.5,public:!1},{seed:42,index:2,input:[[-63,6,57],[]],expected:6,public:!1},{seed:42,index:3,input:[[],[-2,69]],expected:33.5,public:!1},{seed:42,index:4,input:[[-93,-90,-58,-51,-39,-10,11,19,29],[2,48,72]],expected:-4,public:!1},{seed:43,index:0,input:[[-92,-89,-88,-88,-62,-48,6,49,71,76,87],[-89,-46,-9]],expected:-47,public:!1},{seed:43,index:1,input:[[-89,-53,40,88],[-22,-15,24,26,35,64,87,99]],expected:30.5,public:!1},{seed:43,index:2,input:[[-98,-54,66],[3,9,52,59,71,82,100]],expected:55.5,public:!1},{seed:43,index:3,input:[[-89,-62,-48,-36,2,50,60,61],[-80,51,91]],expected:2,public:!1},{seed:43,index:4,input:[[-89,-34,-18,-16,27,65,81,84,92,95],[]],expected:46,public:!1}],descriptionMarkdown:`# Median of Two Sorted Arrays

You are given two arrays \`nums1\` and \`nums2\`, each sorted in non-decreasing
order. Either one may be empty, but not both. Return the median of the
combined multiset of all their values.

If the combined count is odd, the median is the middle value in sorted
order. If it is even, the median is the average of the two middle values,
which may be a non-integer. Answers are compared with an absolute or
relative tolerance of \`1e-6\`.

Your solution should run in \`O(log(m + n))\` time, where \`m\` and \`n\` are the
two lengths.

## Examples

\`\`\`
Input: nums1 = [1, 4, 9], nums2 = [2, 6]
Output: 4
Explanation: the combined values in order are [1, 2, 4, 6, 9].
\`\`\`

\`\`\`
Input: nums1 = [3, 8], nums2 = [5, 10]
Output: 6.5
Explanation: the combined values in order are [3, 5, 8, 10]; (5 + 8) / 2 = 6.5.
\`\`\`

## Constraints

- \`0 <= nums1.length, nums2.length <= 1000\`
- \`1 <= nums1.length + nums2.length <= 2000\`
- \`-10^6 <= nums1[i], nums2[i] <= 10^6\`
- Each array is sorted in non-decreasing order.

## Notes

Binary search over how many elements of the shorter array fall in the lower
half of the combined order. A split is correct when the largest value on the
left side of each array is no greater than the smallest value on the right
side of the other.
`}];export{e as default};
