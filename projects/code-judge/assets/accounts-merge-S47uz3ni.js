const i=[{slug:"accounts-merge",title:"Accounts Merge",difficulty:"Medium",tags:["graph","union-find","depth-first-search","hash-map","sorting"],function:{name:"accountsMerge",params:[{name:"accounts",type:"string[][]"}],returns:"string[][]"},compare:{mode:"unordered"},limits:{timeMs:1e3},tests:[{input:[[["Ada","ada@x.io","lovelace@x.io"],["Ada","ada@y.io"],["Ada","lovelace@x.io","countess@x.io"],["Bo","bo@x.io"]]],expected:[["Ada","ada@x.io","countess@x.io","lovelace@x.io"],["Ada","ada@y.io"],["Bo","bo@x.io"]],public:!0},{input:[[["Kim","k2@m.net","k1@m.net"]]],expected:[["Kim","k1@m.net","k2@m.net"]],public:!0},{input:[[["Lu","a@p.org","b@p.org"],["Lu","c@p.org"],["Lu","c@p.org","b@p.org"],["Lu","a@p.org","a@p.org"]]],expected:[["Lu","a@p.org","b@p.org","c@p.org"]],public:!1},{input:[[["Mo","z@q.com"],["Ny","y@q.com"],["Mo","x@q.com"]]],public:!1,expected:[["Mo","z@q.com"],["Ny","y@q.com"],["Mo","x@q.com"]]}],generated:{seeds:[1701,1702,1703],perSeed:5},variantId:"default",key:"accounts-merge:default",generatedTests:[{seed:1701,index:0,input:[[["Bo","bo5@m1.io","bo4@m1.io"],["Bo","bo6@m2.io"],["Bo","bo4@m1.io","bo4@m1.io"],["Di","di0@m0.io"],["Di","di3@m0.io"],["Ada","ada8@m3.io","ada9@m3.io"]]],expected:[["Bo","bo4@m1.io","bo5@m1.io"],["Bo","bo6@m2.io"],["Di","di0@m0.io"],["Di","di3@m0.io"],["Ada","ada8@m3.io","ada9@m3.io"]],public:!1},{seed:1701,index:1,input:[[["Cy","cy2@m1.io","cy4@m1.io"],["Cy","cy4@m1.io","cy3@m1.io"],["Ada","ada0@m0.io"],["Di","di5@m2.io"],["Di","di7@m3.io"],["Ada","ada0@m0.io"],["Di","di7@m3.io"],["Ada","ada0@m0.io"],["Di","di7@m3.io"]]],expected:[["Cy","cy2@m1.io","cy3@m1.io","cy4@m1.io"],["Ada","ada0@m0.io"],["Di","di5@m2.io"],["Di","di7@m3.io"]],public:!1},{seed:1701,index:2,input:[[["Bo","bo2@m1.io","bo3@m1.io","bo2@m1.io"],["Ada","ada0@m0.io","ada1@m0.io"],["Bo","bo3@m1.io","bo5@m1.io","bo4@m1.io"],["Ada","ada0@m0.io"],["Bo","bo2@m1.io","bo4@m1.io","bo2@m1.io"]]],expected:[["Bo","bo2@m1.io","bo3@m1.io","bo4@m1.io","bo5@m1.io"],["Ada","ada0@m0.io","ada1@m0.io"]],public:!1},{seed:1701,index:3,input:[[["Bo","bo1@m0.io"],["Di","di6@m3.io"],["Ada","ada3@m2.io"],["Ada","ada4@m2.io","ada3@m2.io"],["Ada","ada3@m2.io"],["Ada","ada2@m1.io"]]],expected:[["Bo","bo1@m0.io"],["Di","di6@m3.io"],["Ada","ada3@m2.io","ada4@m2.io"],["Ada","ada2@m1.io"]],public:!1},{seed:1701,index:4,input:[[["Cy","cy0@m0.io"],["Ada","ada4@m1.io","ada3@m1.io","ada4@m1.io"],["Cy","cy1@m0.io"],["Ada","ada4@m1.io","ada5@m1.io","ada5@m1.io"],["Ada","ada7@m2.io","ada6@m2.io","ada7@m2.io"],["Ada","ada4@m1.io","ada3@m1.io"],["Ada","ada9@m2.io","ada9@m2.io"],["Cy","cy0@m0.io"]]],expected:[["Cy","cy0@m0.io"],["Ada","ada3@m1.io","ada4@m1.io","ada5@m1.io"],["Cy","cy1@m0.io"],["Ada","ada6@m2.io","ada7@m2.io"],["Ada","ada9@m2.io"]],public:!1},{seed:1702,index:0,input:[[["Bo","bo4@m1.io"],["Bo","bo4@m1.io"],["Di","di1@m0.io","di1@m0.io"],["Cy","cy7@m2.io"],["Di","di1@m0.io"],["Di","di0@m0.io","di1@m0.io","di1@m0.io"]]],expected:[["Bo","bo4@m1.io"],["Di","di0@m0.io","di1@m0.io"],["Cy","cy7@m2.io"]],public:!1},{seed:1702,index:1,input:[[["Cy","cy4@m1.io","cy4@m1.io","cy4@m1.io"],["Di","di9@m2.io"],["Di","di1@m0.io","di2@m0.io","di1@m0.io"],["Di","di8@m2.io","di10@m2.io","di10@m2.io"],["Di","di10@m2.io","di10@m2.io","di10@m2.io"],["Cy","cy4@m1.io"],["Cy","cy5@m1.io","cy6@m1.io","cy4@m1.io"]]],expected:[["Cy","cy4@m1.io","cy5@m1.io","cy6@m1.io"],["Di","di9@m2.io"],["Di","di1@m0.io","di2@m0.io"],["Di","di10@m2.io","di8@m2.io"]],public:!1},{seed:1702,index:2,input:[[["Bo","bo0@m0.io","bo1@m0.io"],["Bo","bo2@m0.io","bo1@m0.io"],["Ada","ada3@m1.io","ada3@m1.io"]]],expected:[["Bo","bo0@m0.io","bo1@m0.io","bo2@m0.io"],["Ada","ada3@m1.io"]],public:!1},{seed:1702,index:3,input:[[["Di","di0@m0.io"],["Di","di0@m0.io"],["Di","di0@m0.io"]]],expected:[["Di","di0@m0.io"]],public:!1},{seed:1702,index:4,input:[[["Di","di2@m0.io"],["Ada","ada3@m1.io"],["Di","di4@m2.io"],["Di","di1@m0.io"],["Ada","ada3@m1.io"],["Di","di4@m2.io"],["Di","di1@m0.io"],["Di","di4@m2.io"],["Ada","ada3@m1.io"]]],expected:[["Di","di2@m0.io"],["Ada","ada3@m1.io"],["Di","di4@m2.io"],["Di","di1@m0.io"]],public:!1},{seed:1703,index:0,input:[[["Cy","cy0@m0.io"],["Cy","cy0@m0.io"],["Di","di1@m1.io","di1@m1.io","di4@m1.io"]]],expected:[["Cy","cy0@m0.io"],["Di","di1@m1.io","di4@m1.io"]],public:!1},{seed:1703,index:1,input:[[["Bo","bo2@m0.io"],["Cy","cy7@m2.io"],["Cy","cy7@m2.io"],["Cy","cy7@m2.io"],["Bo","bo0@m0.io","bo2@m0.io","bo0@m0.io"],["Bo","bo0@m0.io","bo0@m0.io"],["Bo","bo5@m1.io","bo5@m1.io","bo5@m1.io"]]],expected:[["Bo","bo0@m0.io","bo2@m0.io"],["Cy","cy7@m2.io"],["Bo","bo5@m1.io"]],public:!1},{seed:1703,index:2,input:[[["Ada","ada6@m2.io"],["Cy","cy1@m0.io"],["Ada","ada4@m1.io"],["Ada","ada5@m1.io","ada5@m1.io"],["Ada","ada5@m1.io","ada5@m1.io"]]],expected:[["Ada","ada6@m2.io"],["Cy","cy1@m0.io"],["Ada","ada4@m1.io"],["Ada","ada5@m1.io"]],public:!1},{seed:1703,index:3,input:[[["Bo","bo1@m0.io","bo1@m0.io"],["Bo","bo0@m0.io","bo0@m0.io"],["Bo","bo0@m0.io"]]],expected:[["Bo","bo1@m0.io"],["Bo","bo0@m0.io"]],public:!1},{seed:1703,index:4,input:[[["Di","di11@m3.io"],["Ada","ada3@m0.io","ada3@m0.io","ada0@m0.io"],["Ada","ada4@m1.io","ada6@m1.io","ada6@m1.io"],["Di","di11@m3.io"],["Di","di9@m2.io","di9@m2.io"],["Ada","ada1@m0.io","ada0@m0.io","ada1@m0.io"],["Di","di11@m3.io"],["Ada","ada5@m1.io"]]],expected:[["Di","di11@m3.io"],["Ada","ada0@m0.io","ada1@m0.io","ada3@m0.io"],["Ada","ada4@m1.io","ada6@m1.io"],["Di","di9@m2.io"],["Ada","ada5@m1.io"]],public:!1}],descriptionMarkdown:`# Accounts Merge

Each entry of \`accounts\` is a list of strings. Its first element is a name,
and the remaining elements (at least one) are email addresses.

Treat every email address as a node, and every entry as a set of edges
joining all of its emails together. Two entries belong to the same group
exactly when their emails are connected in this graph, directly or through
a chain of other entries. Entries in the same group are guaranteed to share
the same name. Entries with the same name but no connecting chain are
**separate** groups.

Return one list per group, formatted as the name followed by every distinct
email of the group.

## Output format

- Within a group, the name comes first and the emails follow in ascending
  order by plain string comparison (character code order, as produced by
  JavaScript's default \`Array.prototype.sort\`). Each email appears once.
- The groups themselves may be returned in any order.

## Examples

\`\`\`
Input: accounts = [["Ada", "ada@x.io", "lovelace@x.io"],
                   ["Ada", "ada@y.io"],
                   ["Ada", "lovelace@x.io", "countess@x.io"],
                   ["Bo", "bo@x.io"]]
Output: [["Ada", "ada@x.io", "countess@x.io", "lovelace@x.io"],
         ["Ada", "ada@y.io"],
         ["Bo", "bo@x.io"]]
Explanation: the first and third entries share lovelace@x.io. The second
entry shares nothing, so it stays separate despite the matching name.
\`\`\`

## Constraints

- \`1 <= accounts.length <= 1000\`
- \`2 <= accounts[i].length <= 10\`
- \`1 <= accounts[i][j].length <= 30\`
- Names consist of letters; emails consist of lowercase letters, digits,
  \`@\` and \`.\`.
`}];export{i as default};
