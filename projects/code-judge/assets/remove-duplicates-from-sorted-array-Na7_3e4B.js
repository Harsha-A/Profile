const e=[{slug:"remove-duplicates-from-sorted-array",title:"Remove Duplicates From Sorted Array",difficulty:"Easy",tags:["array","two-pointers","in-place"],function:{name:"removeDuplicates",params:[{name:"nums",type:"number[]"}],returns:"number"},compare:{mode:"custom"},limits:{timeMs:1e3},tests:[{input:[[3,3,5,6,6,6,9]],expected:4,public:!0},{input:[[-2,-1,0,7]],expected:4,public:!0},{input:[[4,4,4,4]],expected:1,public:!0},{input:[[1]],expected:1,public:!1},{input:[[0,0]],expected:1,public:!1},{input:[[-5,-5,-3,-3,-3,0,2,2,8]],expected:5,public:!1},{input:[[1,2,2,3,3,3,4,4,4,4]],expected:4,public:!1}],generated:{seeds:[2601,2602,2603],perSeed:5},variantId:"default",key:"remove-duplicates-from-sorted-array:default",generatedTests:[{seed:2601,index:0,input:[[-7,-7,-6,-3,-3]],expected:3,public:!1},{seed:2601,index:1,input:[[9,10,10,12,12,12,13]],expected:4,public:!1},{seed:2601,index:2,input:[[-9]],expected:1,public:!1},{seed:2601,index:3,input:[[-4,-2,-2,-2]],expected:2,public:!1},{seed:2601,index:4,input:[[-1,-1,-1,-1,-1,0,3,5,5]],expected:4,public:!1},{seed:2602,index:0,input:[[4,4,5,7,9,9,12,15,18,18,20,22,24]],expected:10,public:!1},{seed:2602,index:1,input:[[9,10,11,11,12,12,14,14,14,14]],expected:5,public:!1},{seed:2602,index:2,input:[[-5,-4,-4,-3]],expected:3,public:!1},{seed:2602,index:3,input:[[6,9,9,9,9,9,9,12]],expected:3,public:!1},{seed:2602,index:4,input:[[1,3,3,6,9,12,14,14,15,15,15,15,15,15]],expected:7,public:!1},{seed:2603,index:0,input:[[-7,-4,-3,-3,-3,-1,1,4,5,7,7]],expected:8,public:!1},{seed:2603,index:1,input:[[10,10,10,12,14,14,17,18,19,20,21,24,27,29]],expected:11,public:!1},{seed:2603,index:2,input:[[0,0,0,0,0]],expected:1,public:!1},{seed:2603,index:3,input:[[1,3,4,5,8,9]],expected:6,public:!1},{seed:2603,index:4,input:[[7,9,12,12]],expected:3,public:!1}],descriptionMarkdown:`# Remove Duplicates From Sorted Array

You receive an integer array \`nums\` sorted in non-decreasing order. Rewrite
it **in place** so that each distinct value appears only once, and return
\`k\`, the number of distinct values.

After your function returns, the judge reads the first \`k\` positions of
\`nums\`. They must contain every distinct value exactly once, **in ascending
order** — the same relative order the values had originally. Unlike Remove
Element, order is part of the answer here: \`[1, 3, 2]\` is rejected where
\`[1, 2, 3]\` is expected. Elements at index \`k\` and beyond are ignored, so
you may leave anything there.

Work within the given array; do not rely on returning a new one.

## Examples

\`\`\`
Input: nums = [3, 3, 5, 6, 6, 6, 9]
Output: 4
After the call: nums = [3, 5, 6, 9, _, _, _]
\`\`\`

\`\`\`
Input: nums = [4, 4, 4, 4]
Output: 1
After the call: nums = [4, _, _, _]
\`\`\`

## Constraints

- \`1 <= nums.length <= 3 * 10^4\`
- \`-100 <= nums[i] <= 100\`
- \`nums\` is sorted in non-decreasing order.

## Notes

Because equal values sit next to each other, a value is new exactly when it
differs from the last value you kept. Keep a write index that marks the end
of the deduplicated prefix.
`,checkerSrc:`// The first k slots of the post-call array must equal the distinct values in
// ascending order; order is part of the answer, so nothing is re-sorted.
export function check(input, output, args) {
  const [nums] = input;
  const want = nums.filter((x, i) => i === 0 || x !== nums[i - 1]);
  if (output !== want.length) {
    return { ok: false, message: \`expected k = \${want.length}, got \${JSON.stringify(output)}\` };
  }
  const after = args[0];
  if (!Array.isArray(after) || after.length < output) {
    return { ok: false, message: 'nums is shorter than k after the call' };
  }
  const got = after.slice(0, output);
  if (!got.every((x, i) => x === want[i])) {
    return { ok: false, message: \`first k elements of nums are \${JSON.stringify(got)}, expected \${JSON.stringify(want)}\` };
  }
  return { ok: true };
}
`,checkerExportName:"check"}];export{e as default};
