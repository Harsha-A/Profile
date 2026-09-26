const e=[{slug:"two-sum",title:"Two Sum",difficulty:"Easy",tags:["array","hash-map"],function:{name:"twoSum",params:[{name:"nums",type:"number[]"},{name:"target",type:"number"}],returns:"number[]"},compare:{mode:"custom"},limits:{timeMs:1e3},tests:[{input:[[2,7,11,15],9],public:!0,expected:[0,1]},{input:[[3,2,4],6],public:!0,expected:[1,2]},{input:[[3,3],6],public:!0,expected:[0,1]},{input:[[-3,4,3,90],0],public:!1,expected:[0,2]}],generated:{seeds:[1,2,3],perSeed:5},variantId:"default",key:"two-sum:default",generatedTests:[{seed:1,index:0,input:[[-100,5,96,93,-44,22,44],140],expected:[2,6],public:!1},{seed:1,index:1,input:[[-3,-73,-20,-51,-70,-3],-23],expected:[0,2],public:!1},{seed:1,index:2,input:[[-43,-62,-92,-15,18,59,-42,-59],77],expected:[4,5],public:!1},{seed:1,index:3,input:[[-62,44,-10,54,98,-53,51,-70],44],expected:[2,3],public:!1},{seed:1,index:4,input:[[-70,45,15,-75,-48],-145],expected:[0,3],public:!1},{seed:2,index:0,input:[[-36,-43,7,75,26,-1,-29,56],-65],expected:[0,6],public:!1},{seed:2,index:1,input:[[-16,66,16,-72,34],100],expected:[1,4],public:!1},{seed:2,index:2,input:[[83,-88,-75,-62],21],expected:[0,3],public:!1},{seed:2,index:3,input:[[26,97,-54,-7,-31,-90],19],expected:[0,3],public:!1},{seed:2,index:4,input:[[92,61,-100,96],188],expected:[0,3],public:!1},{seed:3,index:0,input:[[-93,-9,-86,52,-4,-3,-68,-48],-13],expected:[1,4],public:!1},{seed:3,index:1,input:[[42,-5,58,75],53],expected:[1,2],public:!1},{seed:3,index:2,input:[[34,5,66,7,-98],-93],expected:[1,4],public:!1},{seed:3,index:3,input:[[53,-16,42,-70,-27,44,-100,-99,-5],-55],expected:[5,7],public:!1},{seed:3,index:4,input:[[57,16,16,-86,-26,6,67,-18],-112],expected:[3,4],public:!1}],descriptionMarkdown:`# Two Sum

Given an array of integers \`nums\` and an integer \`target\`, return the
indices of the two numbers that add up to \`target\`.

You may assume each input has exactly one valid answer set (though several
distinct index pairs may satisfy it), and you may not use the same element
twice. Return the answer in any order.

## Example

\`\`\`
Input: nums = [2, 7, 11, 15], target = 9
Output: [0, 1]
Explanation: nums[0] + nums[1] == 9
\`\`\`

## Constraints

- \`2 <= nums.length <= 10^4\`
- \`-10^9 <= nums[i] <= 10^9\`
- \`-10^9 <= target <= 10^9\`
- Exactly one valid pair of indices exists for each input.
`,checkerSrc:`// Accepts any valid index pair, not just the reference solution's pair,
// since multiple pairs may sum to the target.
export function check(input, output) {
  const [nums, target] = input;
  if (!Array.isArray(output) || output.length !== 2) {
    return { ok: false, message: 'Expected an array of exactly two indices.' };
  }
  const [i, j] = output;
  if (!Number.isInteger(i) || !Number.isInteger(j) || i === j) {
    return { ok: false, message: 'Indices must be two distinct integers.' };
  }
  if (nums[i] === undefined || nums[j] === undefined) {
    return { ok: false, message: 'Index out of range.' };
  }
  if (nums[i] + nums[j] !== target) {
    return { ok: false, message: \`nums[\${i}] + nums[\${j}] !== target\` };
  }
  return { ok: true };
}
`,checkerExportName:"check"}];export{e as default};
