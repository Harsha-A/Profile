const e=[{slug:"remove-element",title:"Remove Element",difficulty:"Easy",tags:["array","two-pointers","in-place"],function:{name:"removeElement",params:[{name:"nums",type:"number[]"},{name:"val",type:"number"}],returns:"number"},compare:{mode:"custom"},limits:{timeMs:1e3},tests:[{input:[[4,1,4,2,4,3],4],expected:3,public:!0},{input:[[5,6,7],9],expected:3,public:!0},{input:[[8,8,8],8],expected:0,public:!0},{input:[[],1],expected:0,public:!1},{input:[[2],2],expected:0,public:!1},{input:[[2],3],expected:1,public:!1},{input:[[1,2,3,4,5,1],1],expected:4,public:!1},{input:[[0,3,0,3,0,3,0,3],0],expected:4,public:!1}],generated:{seeds:[2701,2702,2703],perSeed:5},variantId:"default",key:"remove-element:default",generatedTests:[{seed:2701,index:0,input:[[2,3],0],expected:2,public:!1},{seed:2701,index:1,input:[[4,4,2,1,1,4,1,4,1,2,4],2],expected:9,public:!1},{seed:2701,index:2,input:[[2,0,0],4],expected:3,public:!1},{seed:2701,index:3,input:[[3,2,0],3],expected:2,public:!1},{seed:2701,index:4,input:[[0,1,3],4],expected:3,public:!1},{seed:2702,index:0,input:[[1,4,2,2,4,3,0,4,1,3,3],2],expected:9,public:!1},{seed:2702,index:1,input:[[1,4,4,3,1,1],5],expected:6,public:!1},{seed:2702,index:2,input:[[],0],expected:0,public:!1},{seed:2702,index:3,input:[[4,2,1,1,3,2,0,1],4],expected:7,public:!1},{seed:2702,index:4,input:[[3,0,4,1,4],3],expected:4,public:!1},{seed:2703,index:0,input:[[1,1,1,1,4,3,4,4,2],5],expected:9,public:!1},{seed:2703,index:1,input:[[2],2],expected:0,public:!1},{seed:2703,index:2,input:[[1,3,2,3,3,3,3,1,0],1],expected:7,public:!1},{seed:2703,index:3,input:[[4,3,3,3,0,0,2,4,1,4],2],expected:9,public:!1},{seed:2703,index:4,input:[[4,1],5],expected:2,public:!1}],descriptionMarkdown:`# Remove Element

You receive an integer array \`nums\` and an integer \`val\`. Delete every
occurrence of \`val\` from \`nums\` **in place** and return \`k\`, the number of
elements that remain.

After your function returns, the judge reads the first \`k\` positions of
\`nums\`. Those positions must hold exactly the elements of the original array
that are not equal to \`val\`, each appearing as many times as it did before.
Their **order does not matter** here: any arrangement of the kept values in
\`nums[0..k-1]\` is accepted. Elements at index \`k\` and beyond are ignored, so
you may leave anything there.

Work within the given array; do not rely on returning a new one.

## Examples

\`\`\`
Input: nums = [4, 1, 4, 2, 4, 3], val = 4
Output: 3
After the call: nums starts with 1, 2, 3 in some order,
for example [1, 2, 3, _, _, _] or [3, 1, 2, _, _, _]
\`\`\`

\`\`\`
Input: nums = [8, 8, 8], val = 8
Output: 0
After the call: the contents of nums are not inspected
\`\`\`

## Constraints

- \`0 <= nums.length <= 100\`
- \`0 <= nums[i] <= 50\`
- \`0 <= val <= 100\`

## Notes

Walk the array with a read index and a write index. Copy each element you
want to keep to the write position and advance it; the final write index is
\`k\`.
`,checkerSrc:`// Only the first k slots of the post-call array matter, and their order is free.
export function check(input, output, args) {
  const [nums, val] = input;
  const want = nums.filter((x) => x !== val).sort((a, b) => a - b);
  if (output !== want.length) {
    return { ok: false, message: \`expected k = \${want.length}, got \${JSON.stringify(output)}\` };
  }
  const after = args[0];
  if (!Array.isArray(after) || after.length < output) {
    return { ok: false, message: 'nums is shorter than k after the call' };
  }
  const got = after.slice(0, output).sort((a, b) => a - b);
  if (!got.every((x, i) => x === want[i])) {
    return { ok: false, message: \`first k elements of nums are \${JSON.stringify(after.slice(0, output))}; they must be the kept values in any order\` };
  }
  return { ok: true };
}
`,checkerExportName:"check"}];export{e as default};
