const e=[{slug:"best-time-to-buy-and-sell-stock-ii",title:"Best Time to Buy And Sell Stock II",difficulty:"Medium",tags:["array","greedy","dynamic-programming"],function:{name:"maxProfit",params:[{name:"prices",type:"number[]"}],returns:"number"},compare:{mode:"exact"},limits:{timeMs:1e3},tests:[{input:[[3,8,2,6,5,9]],expected:13,public:!0},{input:[[9,7,4,1]],expected:0,public:!0},{input:[[2,4,6,8]],expected:6,public:!1},{input:[[5]],expected:0,public:!1},{input:[[1,1,1,1]],expected:0,public:!1},{input:[[4,1,7,3,3,10,0]],public:!1,expected:13}],generated:{seeds:[1221,1222,1223],perSeed:5},variantId:"default",key:"best-time-to-buy-and-sell-stock-ii:default",generatedTests:[{seed:1221,index:0,input:[[72,9,75,4]],expected:66,public:!1},{seed:1221,index:1,input:[[100,70,67,30,96,54,35,27,65,88,62,85,80,35,58,75,94,98]],expected:213,public:!1},{seed:1221,index:2,input:[[35,25,5,81,55,10,98,20,7,51,83,6,75,77,43,44,100,63,34,37,67,37,26,32,73,61,73]],expected:460,public:!1},{seed:1221,index:3,input:[[44,77,80,83]],expected:39,public:!1},{seed:1221,index:4,input:[[91,75,11,3,71,15,68,55,74,64,11,1,73,50,30,55,8,8,62,92,4,7,49,23,65,7,6,60]],expected:462,public:!1},{seed:1222,index:0,input:[[10,17,38,25,23,47,54,24,3,68,19,41,18,26]],expected:154,public:!1},{seed:1222,index:1,input:[[42,35,81,25,30]],expected:51,public:!1},{seed:1222,index:2,input:[[23,53,20,7,39,2,88,38,42,98,35,69,89,38,45,26]],expected:269,public:!1},{seed:1222,index:3,input:[[93,20,9,37,5]],expected:28,public:!1},{seed:1222,index:4,input:[[20,84]],expected:64,public:!1},{seed:1223,index:0,input:[[38,66,10,74,13,40]],expected:119,public:!1},{seed:1223,index:1,input:[[66,33,2,12,15,30,100,29,83,32,60,63,2]],expected:183,public:!1},{seed:1223,index:2,input:[[41,16,99,51,56,83,38,37,20,6,13,95,35,74,20,42,6,59,61,16,36,29,75,41,15,73,93,38,32]],expected:464,public:!1},{seed:1223,index:3,input:[[44,5,52,66,33,54,100,50,1,7,78,21,86,66,87]],expected:291,public:!1},{seed:1223,index:4,input:[[68,95,60,88,74,30,40,22,70,52,83,3,70,35,65,84,59,45]],expected:260,public:!1}],descriptionMarkdown:`# Best Time to Buy And Sell Stock II

You are given an array \`prices\` where \`prices[i]\` is the price of a single
asset on day \`i\`. You may perform any number of trades. A trade consists of
buying one unit on some day and selling it on a later day. You may hold at
most one unit at any moment, so you must sell before buying again; selling
and buying on the same day is allowed.

Return the largest total profit that can be achieved. If no trade is
profitable, return \`0\`.

## Examples

\`\`\`
Input: prices = [3, 8, 2, 6, 5, 9]
Output: 13
Explanation: buy at 3 and sell at 8 (+5), buy at 2 and sell at 6 (+4),
buy at 5 and sell at 9 (+4).
\`\`\`

\`\`\`
Input: prices = [9, 7, 4, 1]
Output: 0
Explanation: the price only falls, so no trade makes money.
\`\`\`

## Constraints

- \`1 <= prices.length <= 3 * 10^4\`
- \`0 <= prices[i] <= 10^4\`

## Notes

Any rising stretch can be split into consecutive one-day gains without
changing its total, so summing every positive day-to-day increase gives the
optimum in a single pass.
`}];export{e as default};
