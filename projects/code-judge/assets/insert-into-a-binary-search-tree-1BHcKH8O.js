const l=[{slug:"insert-into-a-binary-search-tree",title:"Insert into a Binary Search Tree",difficulty:"Medium",tags:["tree","binary-search-tree","binary-tree"],function:{name:"insertIntoBST",params:[{name:"root",type:"TreeNode"},{name:"val",type:"number"}],returns:"TreeNode"},compare:{mode:"custom"},limits:{timeMs:1e3},tests:[{input:[[8,4,12,2,6],10],expected:[8,4,12,2,6,10],public:!0},{input:[[],5],expected:[5],public:!0},{input:[[8,4,12,2,6],7],expected:[8,4,12,2,6,null,null,null,null,null,7],public:!1},{input:[[8,4,12,2,6],-3],public:!1,expected:[8,4,12,2,6,null,null,-3]},{input:[[1,null,2,null,3,null,4],5],public:!1,expected:[1,null,2,null,3,null,4,null,5]},{input:[[50,25,75,10,30,60,90],65],public:!1,expected:[50,25,75,10,30,60,90,null,null,null,null,null,65]}],generated:{seeds:[9201,9202,9203],perSeed:5},variantId:"default",key:"insert-into-a-binary-search-tree:default",generatedTests:[{seed:9201,index:0,input:[[25,-26,66,-79,14,null,null,-99,-54,null,null,null,-82,null,-47,null,null,-50],-17],expected:[25,-26,66,-79,14,null,null,-99,-54,-17,null,null,-82,null,-47,null,null,null,null,-50],public:!1},{seed:9201,index:1,input:[[59,-52,85,-95,12,78,null,-99,-74,-19,32,null,null,null,-97,null,null,null,null,18],77],expected:[59,-52,85,-95,12,78,null,-99,-74,-19,32,77,null,null,-97,null,null,null,null,18],public:!1},{seed:9201,index:2,input:[[97,-10,null,-20,36,-76,-15,33,56,-77,-24,null,null,null,null,50,94],-9],expected:[97,-10,null,-20,36,-76,-15,33,56,-77,-24,null,null,-9,null,50,94],public:!1},{seed:9201,index:3,input:[[-37,-56,8,null,null,null,60],-38],expected:[-37,-56,8,null,-38,null,60],public:!1},{seed:9201,index:4,input:[[59,2],-92],expected:[59,2,null,-92],public:!1},{seed:9202,index:0,input:[[-64,-65,-33,null,null,null,7,-29,40,null,null,null,56,45],-38],expected:[-64,-65,-33,null,null,-38,7,null,null,-29,40,null,null,null,56,45],public:!1},{seed:9202,index:1,input:[[-75],0],expected:[-75,null,0],public:!1},{seed:9202,index:2,input:[[61,0,99,-22,5,69,null,-67,null,null,58,null,null,-78,-41,36,null,null,null,-46,null,null,null,-52],-60],expected:[61,0,99,-22,5,69,null,-67,null,null,58,null,null,-78,-41,36,null,null,null,-46,null,null,null,-52,null,-60],public:!1},{seed:9202,index:3,input:[[-21,null,-13],9],expected:[-21,null,-13,null,9],public:!1},{seed:9202,index:4,input:[[],23],expected:[23],public:!1},{seed:9203,index:0,input:[[98,83,null,-38,97,null,27,null,null,-32,58,null,null,null,64],-11],expected:[98,83,null,-38,97,null,27,null,null,-32,58,null,-11,null,64],public:!1},{seed:9203,index:1,input:[[-52,-97],44],expected:[-52,-97,44],public:!1},{seed:9203,index:2,input:[[3,-21,33,-47,null,32,96,-82,-24,null,null,48,null,null,-61,null,null,null,55,null,null,null,82],-91],expected:[3,-21,33,-47,null,32,96,-82,-24,null,null,48,null,-91,-61,null,null,null,55,null,null,null,null,null,82],public:!1},{seed:9203,index:3,input:[[9,-56,72,-74,-13,46,null,null,null,-21,null,null,69,-28],-59],expected:[9,-56,72,-74,-13,46,null,null,-59,-21,null,null,69,null,null,-28],public:!1},{seed:9203,index:4,input:[[32,30,85,-76,null,71],98],expected:[32,30,85,-76,null,71,98],public:!1}],descriptionMarkdown:"# Insert into a Binary Search Tree\n\nYou are given the root of a binary search tree, `root`, and a number `val`.\nIn a binary search tree every value in a node's left subtree is smaller than\nthe node's value and every value in its right subtree is larger; all values\nare distinct, and `val` is not already present.\n\nAdd a node holding `val` so that the result is still a valid binary search\ntree, and return the root of the result. The input may be empty, in which case\nthe answer is a single node.\n\nMore than one valid result can exist. Any binary search tree that contains\nexactly the original values plus `val` is accepted. The simplest approach\nfollows the search path for `val` and attaches it as a new leaf where that\npath runs out; the examples show that result.\n\n## Tree format\n\nA tree is written as a level-order array. Nodes are listed breadth-first,\nleft to right; `null` stands for a missing child. A `null` has no children of\nits own, so nothing is listed for it in later levels. Trailing `null`s are\ndropped, and `[]` is the empty tree. For example, `[5, 3, null, null, 4, 8]`\nis the tree below: `5` has only a left child `3`, `3` has only a right child\n`4`, and `4` has only a left child `8`.\n\n```\n    5\n   /\n  3\n   \\\n    4\n   /\n  8\n```\n\n## Examples\n\n```\nInput: root = [8, 4, 12, 2, 6], val = 10\nOutput: [8, 4, 12, 2, 6, 10]\nExplanation: 10 > 8 goes right, 10 < 12 goes left, and 12 has no left\nchild, so 10 becomes it.\n```\n\n```\nInput: root = [], val = 5\nOutput: [5]\n```\n\n## Constraints\n\n- The tree has between `0` and `10^4` nodes.\n- `-10^8 <= node value, val <= 10^8`\n- All values in the tree are distinct and `val` does not occur in it.\n",checkerSrc:`// Any valid BST holding exactly the original values plus \`val\` is accepted,
// since the new value can legitimately be placed in more than one way.
function fromWire(arr) {
  if (!Array.isArray(arr) || arr.length === 0 || arr[0] === null) return null;
  const root = { val: arr[0], left: null, right: null };
  const queue = [root];
  let i = 1;
  while (queue.length > 0 && i < arr.length) {
    const node = queue.shift();
    for (const side of ['left', 'right']) {
      if (i >= arr.length) break;
      const v = arr[i++];
      if (v !== null && v !== undefined) {
        node[side] = { val: v, left: null, right: null };
        queue.push(node[side]);
      }
    }
  }
  return root;
}

function inorder(root) {
  const out = [];
  const stack = [];
  let node = root;
  while (node !== null || stack.length > 0) {
    while (node !== null) {
      stack.push(node);
      node = node.left;
    }
    node = stack.pop();
    out.push(node.val);
    node = node.right;
  }
  return out;
}

export function check(input, output) {
  const [rootWire, val] = input;
  if (!Array.isArray(output)) {
    return { ok: false, message: 'Expected a tree.' };
  }
  const want = inorder(fromWire(rootWire)).concat(val).sort((a, b) => a - b);
  const got = inorder(fromWire(output));
  if (got.length !== want.length) {
    return { ok: false, message: \`Tree has \${got.length} node(s), expected \${want.length}.\` };
  }
  for (let i = 1; i < got.length; i++) {
    if (!(got[i - 1] < got[i])) {
      return { ok: false, message: 'Result is not a valid binary search tree.' };
    }
  }
  for (let i = 0; i < want.length; i++) {
    if (got[i] !== want[i]) {
      return { ok: false, message: 'Result does not contain exactly the original values plus val.' };
    }
  }
  return { ok: true };
}
`,checkerExportName:"check"}];export{l as default};
