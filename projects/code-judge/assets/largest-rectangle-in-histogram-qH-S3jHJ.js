const e=[{slug:"largest-rectangle-in-histogram",title:"Largest Rectangle In Histogram",difficulty:"Hard",tags:["array","stack","monotonic-stack"],function:{name:"largestRectangleArea",params:[{name:"heights",type:"number[]"}],returns:"number"},compare:{mode:"exact"},limits:{timeMs:1e3},tests:[{input:[[2,6,5,1,4]],expected:10,public:!0},{input:[[3,3,3]],expected:9,public:!0},{input:[[0]],expected:0,public:!1},{input:[[7]],expected:7,public:!1},{input:[[1,2,3,4,5]],expected:9,public:!1},{input:[[5,0,5]],expected:5,public:!1},{input:[[3,1,4,4,2,5]],expected:8,public:!1},{input:[[6,2,5,4,5,1,6]],public:!1,expected:12}],generated:{seeds:[841,842,843],perSeed:5},variantId:"default",key:"largest-rectangle-in-histogram:default",generatedTests:[{seed:841,index:0,input:[[5,63,37,81,14,81,84,55,47,54,56,77,78,34,46]],expected:376,public:!1},{seed:841,index:1,input:[[4,0,5,3,3,1,3,1,2,3,1,1,0,2,2,0]],expected:10,public:!1},{seed:841,index:2,input:[[3,0,3]],expected:3,public:!1},{seed:841,index:3,input:[[3,4,5,0,5,3,2,2,1,5,0,2,3]],expected:9,public:!1},{seed:841,index:4,input:[[77]],expected:77,public:!1},{seed:842,index:0,input:[[5,4,5]],expected:12,public:!1},{seed:842,index:1,input:[[25,100]],expected:100,public:!1},{seed:842,index:2,input:[[69,44,49,26,26,59,40,26,70,24,71,26,18,6,63,52,48,65,95,89]],expected:288,public:!1},{seed:842,index:3,input:[[3,3,1]],expected:6,public:!1},{seed:842,index:4,input:[[2,5,3,5,2,1,0,4,4,2,4,2,0,0,0,2,4,4]],expected:10,public:!1},{seed:843,index:0,input:[[3]],expected:3,public:!1},{seed:843,index:1,input:[[4,5]],expected:8,public:!1},{seed:843,index:2,input:[[5,1,4,3,1,2,2,4,2,1,3,0]],expected:11,public:!1},{seed:843,index:3,input:[[32,94,7,93,14,75,95,45,64,4,71,94,39,93,42,74,52,48]],expected:312,public:!1},{seed:843,index:4,input:[[1,3,5,4,3,4,0,4,5,4,4,1,0,0,3,0]],expected:16,public:!1}],descriptionMarkdown:`# Largest Rectangle In Histogram

You are given an array of non-negative integers \`heights\` describing a bar
chart: bar \`i\` has width \`1\` and height \`heights[i]\`, and adjacent bars touch.

Return the area of the largest axis-aligned rectangle that fits entirely
inside the chart. Equivalently, over every contiguous index range
\`[l, r]\`, compute \`(r - l + 1) * min(heights[l..r])\`, and return the maximum.

## Examples

\`\`\`
Input: heights = [2, 6, 5, 1, 4]
Output: 10
Explanation: the range [1, 2] has width 2 and minimum height 5. No other
range does better; for example [0, 2] gives 3 * 2 = 6.
\`\`\`

\`\`\`
Input: heights = [3, 3, 3]
Output: 9
\`\`\`

## Constraints

- \`1 <= heights.length <= 10^5\`
- \`0 <= heights[i] <= 10^4\`

## Notes

For each bar, the widest rectangle using that bar's height as its minimum
extends left and right until the first strictly shorter bar on each side. A
stack of indices with non-decreasing heights finds both boundaries for every
bar in a single \`O(n)\` pass.
`}];export{e as default};
