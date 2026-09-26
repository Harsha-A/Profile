const e=[{slug:"asteroid-collision",title:"Asteroid Collision",difficulty:"Medium",tags:["array","stack","simulation"],function:{name:"asteroidCollision",params:[{name:"asteroids",type:"number[]"}],returns:"number[]"},compare:{mode:"exact"},limits:{timeMs:1e3},tests:[{input:[[6,2,-4,1]],expected:[6,1],public:!0},{input:[[-3,3,-3,-8]],expected:[-3,-8],public:!0},{input:[[4,-4]],expected:[],public:!1},{input:[[1,2,3,-10]],expected:[-10],public:!1},{input:[[-2,-1,1,2]],expected:[-2,-1,1,2],public:!1},{input:[[5,5,-5,-5,-1]],public:!1,expected:[-1]}],generated:{seeds:[7351,7352,7353],perSeed:5},variantId:"default",key:"asteroid-collision:default",generatedTests:[{seed:7351,index:0,input:[[3,-4,7,6,3,5,-5,7,1,-8,10]],expected:[-4,-8,10],public:!1},{seed:7351,index:1,input:[[-1,5,7]],expected:[-1,5,7],public:!1},{seed:7351,index:2,input:[[2,-6,-3,10]],expected:[-6,-3,10],public:!1},{seed:7351,index:3,input:[[5,5,-10,5,-4]],expected:[-10,5],public:!1},{seed:7351,index:4,input:[[7,2,-2,-1,9,7,-10,2]],expected:[-10,2],public:!1},{seed:7352,index:0,input:[[-6,10,-8,-8,10,7,7,6,5,-10]],expected:[-6,10],public:!1},{seed:7352,index:1,input:[[-8,-6,-1,7]],expected:[-8,-6,-1,7],public:!1},{seed:7352,index:2,input:[[7,-3,-6,8,-2,1,2,2,5,-9,-9,-3,-9]],expected:[-9,-9,-3,-9],public:!1},{seed:7352,index:3,input:[[-10,-3,3,-6,8,10,-9,-3,-1,-1,-9,7,-2]],expected:[-10,-3,-6,8,10,7],public:!1},{seed:7352,index:4,input:[[2,-2,-7,4,-5,-2,-8]],expected:[-7,-5,-2,-8],public:!1},{seed:7353,index:0,input:[[-10,5,6,4,5,1,-1,6]],expected:[-10,5,6,4,5,6],public:!1},{seed:7353,index:1,input:[[-2,2,3,-2,3,-4,-2,-7,7,2,-9,8,3,-5,-5]],expected:[-2,-4,-2,-7,-9,8],public:!1},{seed:7353,index:2,input:[[7,3,7]],expected:[7,3,7],public:!1},{seed:7353,index:3,input:[[-4,7,1]],expected:[-4,7,1],public:!1},{seed:7353,index:4,input:[[-5,-3,-10,5,-1,4,1,4,9,-7,-2]],expected:[-5,-3,-10,5,4,1,4,9],public:!1}],descriptionMarkdown:`# Asteroid Collision

You are given an array of non-zero integers \`asteroids\`. The sign of each
value is a direction (positive means moving toward higher indices, negative
means moving toward lower indices) and its absolute value is a size.

Apply the following rule until it no longer applies: whenever a positive
value is immediately followed, among the values still present, by a negative
value, the two collide.

- If their absolute values differ, the one with the smaller absolute value is
  removed.
- If their absolute values are equal, both are removed.

Two values moving in the same direction never collide, nor does a negative
value that appears before a positive one. Return the values that remain, in
their original relative order. The final result does not depend on the order
in which collisions are resolved.

## Examples

\`\`\`
Input: asteroids = [6, 2, -4, 1]
Output: [6, 1]
Explanation: -4 removes 2, then 6 removes -4. The 1 has nothing after it.
\`\`\`

\`\`\`
Input: asteroids = [-3, 3, -3, -8]
Output: [-3, -8]
Explanation: 3 and -3 remove each other. The leading -3 never collides,
and -8 has no positive value left before it.
\`\`\`

## Constraints

- \`2 <= asteroids.length <= 10^4\`
- \`-1000 <= asteroids[i] <= 1000\`
- \`asteroids[i] != 0\`
`}];export{e as default};
