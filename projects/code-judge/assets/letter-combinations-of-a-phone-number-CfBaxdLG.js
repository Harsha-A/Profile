const e=[{slug:"letter-combinations-of-a-phone-number",title:"Letter Combinations of a Phone Number",difficulty:"Medium",tags:["string","hash-map","backtracking"],function:{name:"letterCombinations",params:[{name:"digits",type:"string"}],returns:"string[]"},compare:{mode:"unordered"},limits:{timeMs:1e3},tests:[{input:["37"],expected:["dp","dq","dr","ds","ep","eq","er","es","fp","fq","fr","fs"],public:!0},{input:[""],expected:[],public:!0},{input:["9"],expected:["w","x","y","z"],public:!0},{input:["22"],expected:["aa","ab","ac","ba","bb","bc","ca","cb","cc"],public:!1},{input:["2345"],public:!1,expected:["adgj","adgk","adgl","adhj","adhk","adhl","adij","adik","adil","aegj","aegk","aegl","aehj","aehk","aehl","aeij","aeik","aeil","afgj","afgk","afgl","afhj","afhk","afhl","afij","afik","afil","bdgj","bdgk","bdgl","bdhj","bdhk","bdhl","bdij","bdik","bdil","begj","begk","begl","behj","behk","behl","beij","beik","beil","bfgj","bfgk","bfgl","bfhj","bfhk","bfhl","bfij","bfik","bfil","cdgj","cdgk","cdgl","cdhj","cdhk","cdhl","cdij","cdik","cdil","cegj","cegk","cegl","cehj","cehk","cehl","ceij","ceik","ceil","cfgj","cfgk","cfgl","cfhj","cfhk","cfhl","cfij","cfik","cfil"]},{input:["79"],public:!1,expected:["pw","px","py","pz","qw","qx","qy","qz","rw","rx","ry","rz","sw","sx","sy","sz"]}],generated:{seeds:[171,172,173],perSeed:5},variantId:"default",key:"letter-combinations-of-a-phone-number:default",generatedTests:[{seed:171,index:0,input:["626"],expected:["mam","man","mao","mbm","mbn","mbo","mcm","mcn","mco","nam","nan","nao","nbm","nbn","nbo","ncm","ncn","nco","oam","oan","oao","obm","obn","obo","ocm","ocn","oco"],public:!1},{seed:171,index:1,input:["5469"],expected:["jgmw","jgmx","jgmy","jgmz","jgnw","jgnx","jgny","jgnz","jgow","jgox","jgoy","jgoz","jhmw","jhmx","jhmy","jhmz","jhnw","jhnx","jhny","jhnz","jhow","jhox","jhoy","jhoz","jimw","jimx","jimy","jimz","jinw","jinx","jiny","jinz","jiow","jiox","jioy","jioz","kgmw","kgmx","kgmy","kgmz","kgnw","kgnx","kgny","kgnz","kgow","kgox","kgoy","kgoz","khmw","khmx","khmy","khmz","khnw","khnx","khny","khnz","khow","khox","khoy","khoz","kimw","kimx","kimy","kimz","kinw","kinx","kiny","kinz","kiow","kiox","kioy","kioz","lgmw","lgmx","lgmy","lgmz","lgnw","lgnx","lgny","lgnz","lgow","lgox","lgoy","lgoz","lhmw","lhmx","lhmy","lhmz","lhnw","lhnx","lhny","lhnz","lhow","lhox","lhoy","lhoz","limw","limx","limy","limz","linw","linx","liny","linz","liow","liox","lioy","lioz"],public:!1},{seed:171,index:2,input:["2884"],expected:["attg","atth","atti","atug","atuh","atui","atvg","atvh","atvi","autg","auth","auti","auug","auuh","auui","auvg","auvh","auvi","avtg","avth","avti","avug","avuh","avui","avvg","avvh","avvi","bttg","btth","btti","btug","btuh","btui","btvg","btvh","btvi","butg","buth","buti","buug","buuh","buui","buvg","buvh","buvi","bvtg","bvth","bvti","bvug","bvuh","bvui","bvvg","bvvh","bvvi","cttg","ctth","ctti","ctug","ctuh","ctui","ctvg","ctvh","ctvi","cutg","cuth","cuti","cuug","cuuh","cuui","cuvg","cuvh","cuvi","cvtg","cvth","cvti","cvug","cvuh","cvui","cvvg","cvvh","cvvi"],public:!1},{seed:171,index:3,input:["95"],expected:["wj","wk","wl","xj","xk","xl","yj","yk","yl","zj","zk","zl"],public:!1},{seed:171,index:4,input:["232"],expected:["ada","adb","adc","aea","aeb","aec","afa","afb","afc","bda","bdb","bdc","bea","beb","bec","bfa","bfb","bfc","cda","cdb","cdc","cea","ceb","cec","cfa","cfb","cfc"],public:!1},{seed:172,index:0,input:[""],expected:[],public:!1},{seed:172,index:1,input:[""],expected:[],public:!1},{seed:172,index:2,input:["5354"],expected:["jdjg","jdjh","jdji","jdkg","jdkh","jdki","jdlg","jdlh","jdli","jejg","jejh","jeji","jekg","jekh","jeki","jelg","jelh","jeli","jfjg","jfjh","jfji","jfkg","jfkh","jfki","jflg","jflh","jfli","kdjg","kdjh","kdji","kdkg","kdkh","kdki","kdlg","kdlh","kdli","kejg","kejh","keji","kekg","kekh","keki","kelg","kelh","keli","kfjg","kfjh","kfji","kfkg","kfkh","kfki","kflg","kflh","kfli","ldjg","ldjh","ldji","ldkg","ldkh","ldki","ldlg","ldlh","ldli","lejg","lejh","leji","lekg","lekh","leki","lelg","lelh","leli","lfjg","lfjh","lfji","lfkg","lfkh","lfki","lflg","lflh","lfli"],public:!1},{seed:172,index:3,input:[""],expected:[],public:!1},{seed:172,index:4,input:["8"],expected:["t","u","v"],public:!1},{seed:173,index:0,input:[""],expected:[],public:!1},{seed:173,index:1,input:["3728"],expected:["dpat","dpau","dpav","dpbt","dpbu","dpbv","dpct","dpcu","dpcv","dqat","dqau","dqav","dqbt","dqbu","dqbv","dqct","dqcu","dqcv","drat","drau","drav","drbt","drbu","drbv","drct","drcu","drcv","dsat","dsau","dsav","dsbt","dsbu","dsbv","dsct","dscu","dscv","epat","epau","epav","epbt","epbu","epbv","epct","epcu","epcv","eqat","eqau","eqav","eqbt","eqbu","eqbv","eqct","eqcu","eqcv","erat","erau","erav","erbt","erbu","erbv","erct","ercu","ercv","esat","esau","esav","esbt","esbu","esbv","esct","escu","escv","fpat","fpau","fpav","fpbt","fpbu","fpbv","fpct","fpcu","fpcv","fqat","fqau","fqav","fqbt","fqbu","fqbv","fqct","fqcu","fqcv","frat","frau","frav","frbt","frbu","frbv","frct","frcu","frcv","fsat","fsau","fsav","fsbt","fsbu","fsbv","fsct","fscu","fscv"],public:!1},{seed:173,index:2,input:[""],expected:[],public:!1},{seed:173,index:3,input:["8785"],expected:["tptj","tptk","tptl","tpuj","tpuk","tpul","tpvj","tpvk","tpvl","tqtj","tqtk","tqtl","tquj","tquk","tqul","tqvj","tqvk","tqvl","trtj","trtk","trtl","truj","truk","trul","trvj","trvk","trvl","tstj","tstk","tstl","tsuj","tsuk","tsul","tsvj","tsvk","tsvl","uptj","uptk","uptl","upuj","upuk","upul","upvj","upvk","upvl","uqtj","uqtk","uqtl","uquj","uquk","uqul","uqvj","uqvk","uqvl","urtj","urtk","urtl","uruj","uruk","urul","urvj","urvk","urvl","ustj","ustk","ustl","usuj","usuk","usul","usvj","usvk","usvl","vptj","vptk","vptl","vpuj","vpuk","vpul","vpvj","vpvk","vpvl","vqtj","vqtk","vqtl","vquj","vquk","vqul","vqvj","vqvk","vqvl","vrtj","vrtk","vrtl","vruj","vruk","vrul","vrvj","vrvk","vrvl","vstj","vstk","vstl","vsuj","vsuk","vsul","vsvj","vsvk","vsvl"],public:!1},{seed:173,index:4,input:["738"],expected:["pdt","pdu","pdv","pet","peu","pev","pft","pfu","pfv","qdt","qdu","qdv","qet","qeu","qev","qft","qfu","qfv","rdt","rdu","rdv","ret","reu","rev","rft","rfu","rfv","sdt","sdu","sdv","set","seu","sev","sft","sfu","sfv"],public:!1}],descriptionMarkdown:`# Letter Combinations of a Phone Number

Each digit from \`2\` to \`9\` stands for a fixed set of letters:

| Digit | Letters |
| ----- | ------- |
| 2 | a b c |
| 3 | d e f |
| 4 | g h i |
| 5 | j k l |
| 6 | m n o |
| 7 | p q r s |
| 8 | t u v |
| 9 | w x y z |

You are given a string \`digits\` made of these digits. Build every string
that has the same length as \`digits\` and whose \`i\`-th letter is one of the
letters assigned to \`digits[i]\`. Return all such strings.

If \`digits\` is empty, return an empty list. The order of the returned
strings does not matter, but each string must appear exactly once.

## Examples

\`\`\`
Input: digits = "37"
Output: ["dp","dq","dr","ds","ep","eq","er","es","fp","fq","fr","fs"]
\`\`\`

\`\`\`
Input: digits = ""
Output: []
\`\`\`

## Constraints

- \`0 <= digits.length <= 4\`
- Every character of \`digits\` is between \`'2'\` and \`'9'\`.

## Notes

Choose one letter per position recursively, or grow the result list one
digit at a time; the output size is the product of the per-digit counts.
`}];export{e as default};
