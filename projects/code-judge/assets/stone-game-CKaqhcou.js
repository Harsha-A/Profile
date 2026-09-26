const e=[{slug:"stone-game",title:"Stone Game",difficulty:"Medium",tags:["array","dynamic-programming","game-theory"],function:{name:"stoneGame",params:[{name:"piles",type:"number[]"}],returns:"boolean"},compare:{mode:"exact"},limits:{timeMs:1e3},tests:[{input:[[2,9,4,1]],expected:!0,public:!0},{input:[[1,2]],expected:!0,public:!0},{input:[[7,1,1,6]],expected:!0,public:!1},{input:[[3,100,2,4,5,1]],public:!1,expected:!0},{input:[[1,1,1,2]],public:!1,expected:!0}],generated:{seeds:[8771,8772,8773],perSeed:5},variantId:"default",key:"stone-game:default",generatedTests:[{seed:8771,index:0,input:[[1,12,1,14,15,7,12,17,10,6]],expected:!0,public:!1},{seed:8771,index:1,input:[[4,7]],expected:!0,public:!1},{seed:8771,index:2,input:[[6,11]],expected:!0,public:!1},{seed:8771,index:3,input:[[10,9,9,4,17,15,19,16,17,19]],expected:!0,public:!1},{seed:8771,index:4,input:[[5,3,12,15]],expected:!0,public:!1},{seed:8772,index:0,input:[[20,15,8,16]],expected:!0,public:!1},{seed:8772,index:1,input:[[19,18,11,16,6,3]],expected:!0,public:!1},{seed:8772,index:2,input:[[17,8,15,19]],expected:!0,public:!1},{seed:8772,index:3,input:[[16,12,9,1,8,4,21,6]],expected:!0,public:!1},{seed:8772,index:4,input:[[10,3,13,9,13,12,8,16,5,20]],expected:!0,public:!1},{seed:8773,index:0,input:[[15,8,11,7]],expected:!0,public:!1},{seed:8773,index:1,input:[[4,11,19,15,18,11,19,8]],expected:!0,public:!1},{seed:8773,index:2,input:[[3,16]],expected:!0,public:!1},{seed:8773,index:3,input:[[18,10,13,8,21,5]],expected:!0,public:!1},{seed:8773,index:4,input:[[3,20,18,8,9,8,18,15]],expected:!0,public:!1}],descriptionMarkdown:`# Stone Game

You are given an array \`piles\` of positive integers arranged in a row, where
\`piles[i]\` is the number of stones in pile \`i\`.

Two players, the first player and the second player, alternate turns, with the
first player moving first. On each turn the current player removes either the
leftmost remaining pile or the rightmost remaining pile and adds its stones to
their own score. The game ends when no piles remain.

Both players play optimally, each trying to maximize their own final score.
Return \`true\` if the first player finishes with a strictly larger score than
the second player, and \`false\` otherwise.

The number of piles is always even and the total number of stones is always
odd, so the game cannot end in a tie.

## Examples

\`\`\`
Input: piles = [2, 9, 4, 1]
Output: true
Explanation: the first player takes 1 (right end). Whatever the second player
takes next, the first player can then take 9, finishing with 10 against 6.
\`\`\`

\`\`\`
Input: piles = [1, 2]
Output: true
Explanation: the first player takes 2 and wins 2 to 1.
\`\`\`

## Constraints

- \`2 <= piles.length <= 500\`
- \`piles.length\` is even.
- \`1 <= piles[i] <= 500\`
- \`sum(piles)\` is odd.

## Notes

Let \`dp[i][j]\` be the best score difference (current player minus opponent)
achievable on the subarray \`piles[i..j]\`. Then
\`dp[i][j] = max(piles[i] - dp[i+1][j], piles[j] - dp[i][j-1])\`.
`}];export{e as default};
