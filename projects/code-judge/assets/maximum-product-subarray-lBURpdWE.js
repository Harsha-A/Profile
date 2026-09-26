const e=[{slug:"maximum-product-subarray",title:"Maximum Product Subarray",difficulty:"Medium",tags:["array","dynamic-programming"],function:{name:"maxProduct",params:[{name:"nums",type:"number[]"}],returns:"number"},compare:{mode:"exact"},limits:{timeMs:1e3},tests:[{input:[[3,-1,4]],expected:4,public:!0},{input:[[-2,3,-4]],expected:24,public:!0},{input:[[0,-3,-1,0]],expected:3,public:!1},{input:[[-5]],expected:-5,public:!1},{input:[[2,-5,-2,-4,3]],expected:24,public:!1},{input:[[-1,0]],expected:0,public:!1},{input:[[-3,-3,-3,0,2,2]],public:!1,expected:9}],generated:{seeds:[1521,1522,1523],perSeed:5},variantId:"default",key:"maximum-product-subarray:default",generatedTests:[{seed:1521,index:0,input:[[-1,-1,-5,1,4,0,-5,5,3,-3,-1]],expected:225,public:!1},{seed:1521,index:1,input:[[-5,-4,3,1,-2,4,5,5,-1,1,-2,2,5,-4,-2,1]],expected:96e4,public:!1},{seed:1521,index:2,input:[[-3,-4,5,3,3,0,1,3,0,2,-5,2,-5,4,-2,-2,3,-3,-4,-2]],expected:57600,public:!1},{seed:1521,index:3,input:[[-5,0,-5,-3,5,0]],expected:75,public:!1},{seed:1521,index:4,input:[[-3,-2,-2,-2,-1]],expected:24,public:!1},{seed:1522,index:0,input:[[-2,4,3,0]],expected:12,public:!1},{seed:1522,index:1,input:[[-3,-5,4,5,-2]],expected:300,public:!1},{seed:1522,index:2,input:[[-4,-3,4,5,-3,-2,-5,-2,-2,-1,3,4,4,2,-4,-2,-5]],expected:27648e3,public:!1},{seed:1522,index:3,input:[[0,2,5,0,4,-1,3,2,0,3,-2,-1,-5,1,-2,2]],expected:120,public:!1},{seed:1522,index:4,input:[[-4,3,5,-2,5,-1,0]],expected:600,public:!1},{seed:1523,index:0,input:[[-3,-5,-5,4,-5,-2,4]],expected:4e3,public:!1},{seed:1523,index:1,input:[[-3,-3,-2,3,4,-1,4,-3,4,5,2,0,-2,-2,-4]],expected:34560,public:!1},{seed:1523,index:2,input:[[-3,1,-3,5]],expected:45,public:!1},{seed:1523,index:3,input:[[0,-3,-5,5,-1,3,-4,-4,-4,5,-5,1,-3,2,-3,-2,1,1]],expected:1296e4,public:!1},{seed:1523,index:4,input:[[-3,0,-4,1,-4]],expected:16,public:!1}],descriptionMarkdown:`# Maximum Product Subarray

You are given a non-empty integer array \`nums\`. A subarray is a contiguous,
non-empty run of elements. Return the largest value obtainable by
multiplying together all elements of a single subarray.

Negative values matter: two negatives multiply to a positive, so the best
subarray may pass through negative numbers, and a zero splits the array into
independent pieces.

## Examples

\`\`\`
Input: nums = [3, -1, 4]
Output: 4
Explanation: the subarray [4] alone beats every subarray that includes -1.
\`\`\`

\`\`\`
Input: nums = [-2, 3, -4]
Output: 24
Explanation: the whole array multiplies to (-2) * 3 * (-4) = 24.
\`\`\`

## Constraints

- \`1 <= nums.length <= 20\`
- \`-5 <= nums[i] <= 5\`
- These bounds keep every subarray product well inside the range of exactly
  representable integers, so no overflow handling is needed.

## Notes

Track both the largest and the smallest product of a subarray ending at the
current index. A negative element swaps their roles. This gives a single
\`O(n)\` pass with constant extra space.
`}];export{e as default};
