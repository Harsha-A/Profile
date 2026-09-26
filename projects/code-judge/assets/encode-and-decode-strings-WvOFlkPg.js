const e=[{slug:"encode-and-decode-strings",title:"Encode and Decode Strings",difficulty:"Medium",tags:["array","string","design","serialization"],function:{name:"roundTrip",params:[{name:"strs",type:"string[]"}],returns:"string[]",deepCopyOf:"arg:0"},compare:{mode:"exact"},limits:{timeMs:1e3},tests:[{input:[["red","","b#l,ue"]],expected:["red","","b#l,ue"],public:!0},{input:[[]],expected:[],public:!0},{input:[[""]],expected:[""],public:!0},{input:[["",""]],expected:["",""],public:!1},{input:[["3#abc","12#","#","##"]],expected:["3#abc","12#","#","##"],public:!1},{input:[["4:abcd",":","::","0:","7:x"]],expected:["4:abcd",":","::","0:","7:x"],public:!1},{input:[["2#ab3#cde","","1#","10#0123456789"]],public:!1,expected:["2#ab3#cde","","1#","10#0123456789"]},{input:[[`line one
line two`,"tab	here",'quote"s',"back\\slash"]],public:!1,expected:[`line one
line two`,"tab	here",'quote"s',"back\\slash"]},{input:[["café","naïve","§ 7"]],public:!1,expected:["café","naïve","§ 7"]},{input:[["0","00","10","1","-1","007"]],public:!1,expected:["0","00","10","1","-1","007"]}],generated:{seeds:[271,272,273,274],perSeed:5},variantId:"default",key:"encode-and-decode-strings:default",generatedTests:[{seed:271,index:0,input:[["#0,1,",';"',`4#
:"\\
`]],expected:["#0,1,",';"',`4#
:"\\
`],public:!1},{seed:271,index:1,input:[["0:","5:\\#:9,5:"]],expected:["0:","5:\\#:9,5:"],public:!1},{seed:271,index:2,input:[[]],expected:[],public:!1},{seed:271,index:3,input:[['";0;1,a',`\\
#a11`,`8:2a:1
`,"",";é#a "]],expected:['";0;1,a',`\\
#a11`,`8:2a:1
`,"",";é#a "],public:!1},{seed:271,index:4,input:[['7:"  9:','z#",, aa','azé:," |',`5#\\
aa"8#`]],expected:['7:"  9:','z#",, aa','azé:," |',`5#\\
aa"8#`],public:!1},{seed:272,index:0,input:[[]],expected:[],public:!1},{seed:272,index:1,input:[["4:01",`0# :
a,;,a`,"4#,","",` 0|021
\\0\\`,':z#1 a1"',`:
;\\
"z:1
`]],expected:["4:01",`0# :
a,;,a`,"4#,","",` 0|021
\\0\\`,':z#1 a1"',`:
;\\
"z:1
`],public:!1},{seed:272,index:2,input:[[""]],expected:[""],public:!1},{seed:272,index:3,input:[[`5:z 
:9`,"2:a;",'92"20é2, :',"aa"]],expected:[`5:z 
:9`,"2:a;",'92"20é2, :',"aa"],public:!1},{seed:272,index:4,input:[["8#\\,#8#","0#0#","|",""]],expected:["8#\\,#8#","0#0#","|",""],public:!1},{seed:273,index:0,input:[["2:3:",`z9
;`,`5#\\;
,
`,`3#
\\00#`,"14#\\ é104#"]],expected:["2:3:",`z9
;`,`5#\\;
,
`,`3#
\\00#`,"14#\\ é104#"],public:!1},{seed:273,index:1,input:[['3#"91',`# 2
  é,9;`,";;;1\\éa,","","","","2:1a3:"]],expected:['3#"91',`# 2
  é,9;`,";;;1\\éa,","","","","2:1a3:"],public:!1},{seed:273,index:2,input:[['#"é#0:1|;',"0#7#","01z:a0#;#\\","9é2#92","5# z:,9","",";;9z|z | 9"]],expected:['#"é#0:1|;',"0#7#","01z:a0#;#\\","9é2#92","5# z:,9","",";;9z|z | 9"],public:!1},{seed:273,index:3,input:[["8#|1","é12","1:#","9:7:"]],expected:["8#|1","é12","1:#","9:7:"],public:!1},{seed:273,index:4,input:[[`a
9:
; |\\"`]],expected:[`a
9:
; |\\"`],public:!1},{seed:274,index:0,input:[["9:2a000|:é","4:;90a","",`4:é
21`]],expected:["9:2a000|:é","4:;90a","",`4:é
21`],public:!1},{seed:274,index:1,input:[[` |ézé|é|
"`,`
`," |é|:2",'" 1z','3#;"1',""]],expected:[` |ézé|é|
"`,`
`," |é|:2",'" 1z','3#;"1',""],public:!1},{seed:274,index:2,input:[["16: \\\\08:",`
1191#aé,`,"a","|",",,,|2zaa","",'0#",2,a6#']],expected:["16: \\\\08:",`
1191#aé,`,"a","|",",,,|2zaa","",'0#",2,a6#'],public:!1},{seed:274,index:3,input:[[]],expected:[],public:!1},{seed:274,index:4,input:[[`6#
`,"2:a0"]],expected:[`6#
`,"2:a0"],public:!1}],descriptionMarkdown:`# Encode and Decode Strings

Design a way to pack a list of strings into a **single string** and to
unpack that single string back into the original list.

This judge calls exactly one function, so the problem is expressed as a
round trip. Implement \`roundTrip(strs)\` as two halves:

1. **Encode:** turn the array \`strs\` into one string, which must carry all
   the information needed to recover the list.
2. **Decode:** turn that one string back into a new array of strings.

Return the decoded array. It must equal \`strs\` exactly: same length, same
order, same contents, with empty strings preserved. It must also be a new
array; returning the input array itself is rejected.

The strings may contain **any character**: digits, \`#\`, \`:\`, commas,
quotes, backslashes, spaces, newlines, non-ASCII letters, and in particular
whatever delimiter you choose. Test strings are deliberately built to look
like length prefixes (for example \`"3#abc"\`, \`"12:"\`, \`"2#ab3#cde"\`), so a
decoder that searches the payload for a marker, or that splits on a
separator, will fail. Your format must survive all of these.

Write the two halves as separate helper functions and have \`roundTrip\`
return \`decode(encode(strs))\`. Do not build the result from \`strs\`
directly, and do not use \`JSON.stringify\` / \`JSON.parse\` or another
built-in serializer; designing the format is the exercise. The judge only
sees the final array, so it cannot fully enforce these rules.

## Examples

\`\`\`
Input: strs = ["red", "", "b#l,ue"]
Output: ["red", "", "b#l,ue"]
Explanation: one possible encoding is "3#red0#6#b#l,ue": each string is
preceded by its length and a "#" marker.
\`\`\`

\`\`\`
Input: strs = ["4:abcd", ":", ""]
Output: ["4:abcd", ":", ""]
Explanation: the first string already looks like a length-prefixed record;
it must come back unchanged.
\`\`\`

\`\`\`
Input: strs = []
Output: []
Explanation: the empty list must encode to something that decodes to an
empty list, which differs from the encoding of [""].
\`\`\`

## Constraints

- \`0 <= strs.length <= 200\`
- \`0 <= strs[i].length <= 200\`
- \`strs[i]\` may contain any Unicode character.

## Notes

Prefix each string with its length and a fixed marker, for example
\`<length>#<string>\`. The decoder reads digits up to the next marker, then
takes exactly that many characters without inspecting them, so a marker or
digit inside a string is never mistaken for structure.
`}];export{e as default};
