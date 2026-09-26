const e=[{slug:"greatest-common-divisor-traversal",title:"Greatest Common Divisor Traversal",difficulty:"Hard",tags:["graph","union-find","number-theory","math"],function:{name:"canTraverseAllPairs",params:[{name:"nums",type:"number[]"}],returns:"boolean"},compare:{mode:"exact"},limits:{timeMs:1e3},tests:[{input:[[6,10,15]],expected:!0,public:!0},{input:[[4,9,8]],expected:!1,public:!0},{input:[[1]],expected:!0,public:!0},{input:[[1,1]],expected:!1,public:!1},{input:[[7,7,7]],expected:!0,public:!1},{input:[[14,35,22,33]],expected:!0,public:!1},{input:[[2,3,5,30,1]],expected:!1,public:!1},{input:[[12,25,49,77,60]],public:!1,expected:!1}],generated:{seeds:[27091,27092,27093],perSeed:6},variantId:"default",key:"greatest-common-divisor-traversal:default",generatedTests:[{seed:27091,index:0,input:[[1,1,25,57,21]],expected:!1,public:!1},{seed:27091,index:1,input:[[38,36,19,1,15]],expected:!1,public:!1},{seed:27091,index:2,input:[[39,17,40,18,24,42,11]],expected:!1,public:!1},{seed:27091,index:3,input:[[17,31,5,3,51]],expected:!1,public:!1},{seed:27091,index:4,input:[[17,46,53,39,3]],expected:!1,public:!1},{seed:27091,index:5,input:[[58,29,55,57,36,59,26,30]],expected:!1,public:!1},{seed:27092,index:0,input:[[54,10,34,29,1,50,30,39]],expected:!1,public:!1},{seed:27092,index:1,input:[[47,18,55,11,44,39,5,11]],expected:!1,public:!1},{seed:27092,index:2,input:[[3,55,40,20,39]],expected:!1,public:!1},{seed:27092,index:3,input:[[1,18,34,21,60]],expected:!1,public:!1},{seed:27092,index:4,input:[[22,47,53,29,53,54,57]],expected:!1,public:!1},{seed:27092,index:5,input:[[10,7,55]],expected:!1,public:!1},{seed:27093,index:0,input:[[5,10,41,43,40,40,16,49]],expected:!1,public:!1},{seed:27093,index:1,input:[[54,1]],expected:!1,public:!1},{seed:27093,index:2,input:[[4]],expected:!0,public:!1},{seed:27093,index:3,input:[[20,25,16,25,36,60]],expected:!0,public:!1},{seed:27093,index:4,input:[[50]],expected:!0,public:!1},{seed:27093,index:5,input:[[36,34,19,31,40,41]],expected:!1,public:!1}],descriptionMarkdown:`# Greatest Common Divisor Traversal

You are given an array of positive integers \`nums\`. Build an undirected
graph whose vertices are the indices \`0 .. nums.length - 1\`, with an edge
between two different indices \`i\` and \`j\` exactly when
\`gcd(nums[i], nums[j]) > 1\`.

Return \`true\` if this graph is connected, meaning every pair of distinct
indices is joined by some path, and \`false\` otherwise. An array with a
single element is trivially connected.

## Examples

\`\`\`
Input: nums = [6, 10, 15]
Output: true
Explanation: 6 and 10 share the factor 2, 10 and 15 share 5, and 6 and 15
share 3, so every index can reach every other.
\`\`\`

\`\`\`
Input: nums = [4, 9, 8]
Output: false
Explanation: 4 and 8 are joined through the factor 2, but 9 shares no
factor with either of them.
\`\`\`

## Constraints

- \`1 <= nums.length <= 10^5\`
- \`1 <= nums[i] <= 10^5\`

## Notes

Checking every pair is quadratic. Instead, factor each value and use a
union-find over indices and primes: join each index with every prime that
divides its value. The graph is connected exactly when all indices end up
in one set. The value \`1\` has no prime factors, so it isolates its index
whenever the array has more than one element.
`}];export{e as default};
