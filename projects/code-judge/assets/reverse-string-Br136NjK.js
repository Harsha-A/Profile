const e=[{slug:"reverse-string",title:"Reverse String",difficulty:"Easy",tags:["string","two-pointers","in-place"],function:{name:"reverseString",params:[{name:"s",type:"string[]"}],returns:"void",resultFrom:"arg:0"},compare:{mode:"exact"},limits:{timeMs:1e3},tests:[{input:[["c","o","d","e"]],expected:["e","d","o","c"],public:!0},{input:[["x","y","z"]],expected:["z","y","x"],public:!0},{input:[["q"]],expected:["q"],public:!1},{input:[["A","b"]],expected:["b","A"],public:!1},{input:[["1"," ","!","a","a"]],public:!1,expected:["a","a","!"," ","1"]}],generated:{seeds:[1101,1102,1103],perSeed:5},variantId:"default",key:"reverse-string:default",generatedTests:[{seed:1101,index:0,input:[["Z","Z","?","V","!","B"]],expected:["B","!","V","?","Z","Z"],public:!1},{seed:1101,index:1,input:[["T",",","I","b","7","y","G","W","K","W","T","P"]],expected:["P","T","W","K","W","G","y","7","b","I",",","T"],public:!1},{seed:1101,index:2,input:[["w","n","o","h","I","1","i","X"]],expected:["X","i","1","I","h","o","n","w"],public:!1},{seed:1101,index:3,input:[["i","u"," ","u","m","I","Q","H","0"]],expected:["0","H","Q","I","m","u"," ","u","i"],public:!1},{seed:1101,index:4,input:[["?","O","N","U","q","!","g","Q","z","m","g","t","S","p","1","w",",","f","h"]],expected:["h","f",",","w","1","p","S","t","g","m","z","Q","g","!","q","U","N","O","?"],public:!1},{seed:1102,index:0,input:[["5","V","U","V","R",".","H"]],expected:["H",".","R","V","U","V","5"],public:!1},{seed:1102,index:1,input:[[".","g","Q","J","E","9","3","K","W","A","G","4","m","?","L","t","i","M","7"]],expected:["7","M","i","t","L","?","m","4","G","A","W","K","3","9","E","J","Q","g","."],public:!1},{seed:1102,index:2,input:[["X","k","a","l","X","G","e","7","s","V","t","W","U","a","5","n"]],expected:["n","5","a","U","W","t","V","s","7","e","G","X","l","a","k","X"],public:!1},{seed:1102,index:3,input:[["D","M","g","3","x","4","s","T","E","A","o","2","C","W"]],expected:["W","C","2","o","A","E","T","s","4","x","3","g","M","D"],public:!1},{seed:1102,index:4,input:[["g","k","R","g","8","C","j","T","V"]],expected:["V","T","j","C","8","g","R","k","g"],public:!1},{seed:1103,index:0,input:[["l","j","b","m","x","j","w","n","B","s","z","G","m","u"]],expected:["u","m","G","z","s","B","n","w","j","x","m","b","j","l"],public:!1},{seed:1103,index:1,input:[["4","x","M","x","1","j","w","R","O","!","C","W","L","o"," ","2","g"]],expected:["g","2"," ","o","L","W","C","!","O","R","w","j","1","x","M","x","4"],public:!1},{seed:1103,index:2,input:[["D","e","T","V","b","Q","o"]],expected:["o","Q","b","V","T","e","D"],public:!1},{seed:1103,index:3,input:[["F","K","x","y","K","P","y","c","b","Y","E","5"]],expected:["5","E","Y","b","c","y","P","K","y","x","K","F"],public:!1},{seed:1103,index:4,input:[["A","5","K","t","p","l","u","Z","A","O"]],expected:["O","A","Z","u","l","p","t","K","5","A"],public:!1}],descriptionMarkdown:`# Reverse String

The input \`s\` is an array of single-character strings. Reverse the order of
its elements **in place**. The function returns nothing; the judge inspects
\`s\` after your function finishes.

Use only a constant amount of extra memory: do not build a second array and
do not call \`Array.prototype.reverse\`.

## Examples

\`\`\`
Input: s = ["c", "o", "d", "e"]
After the call: s = ["e", "d", "o", "c"]
\`\`\`

\`\`\`
Input: s = ["x", "y", "z"]
After the call: s = ["z", "y", "x"]
\`\`\`

## Constraints

- \`1 <= s.length <= 10^5\`
- Each \`s[i]\` is a single printable ASCII character.

## Notes

Place one index at each end, swap the two elements, and move both indices
toward the middle until they meet.
`}];export{e as default};
