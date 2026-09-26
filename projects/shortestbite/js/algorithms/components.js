/**
 * Iterative Tarjan's strongly connected components. Written iteratively
 * (an explicit stack instead of recursion) because a recursive version
 * would overflow the call stack on graphs with tens of thousands of nodes.
 *
 * @param {import('../core/graph.js').Graph} graph
 * @returns {number[][]} array of components, each a list of node ids
 */
export function stronglyConnectedComponents(graph) {
  const n = graph.nodeCount;
  const index = new Int32Array(n).fill(-1);
  const lowlink = new Int32Array(n);
  const onStack = new Uint8Array(n);
  const sccStack = [];
  const components = [];
  let nextIndex = 0;

  for (let start = 0; start < n; start++) {
    if (index[start] !== -1) continue;
    // Explicit work-stack frame: [node, edgeCursor]. edgeCursor tracks how
    // far we've iterated through this node's outgoing edges so we can
    // resume after "recursing" into a child.
    const workStack = [[start, 0]];

    while (workStack.length) {
      const frame = workStack[workStack.length - 1];
      const [node, cursor] = frame;

      if (cursor === 0) {
        index[node] = nextIndex;
        lowlink[node] = nextIndex;
        nextIndex++;
        sccStack.push(node);
        onStack[node] = 1;
      }

      const outEdges = graph.outEdges(node);
      let advanced = false;
      for (let i = cursor; i < outEdges.length; i++) {
        const v = graph.edgeTo[outEdges[i]];
        if (index[v] === -1) {
          frame[1] = i + 1;
          workStack.push([v, 0]);
          advanced = true;
          break;
        } else if (onStack[v]) {
          lowlink[node] = Math.min(lowlink[node], index[v]);
        }
      }
      if (advanced) continue;

      // Finished all of `node`'s edges: pop and propagate lowlink to parent.
      workStack.pop();
      if (workStack.length) {
        const parent = workStack[workStack.length - 1][0];
        lowlink[parent] = Math.min(lowlink[parent], lowlink[node]);
      }

      if (lowlink[node] === index[node]) {
        const component = [];
        let w;
        do {
          w = sccStack.pop();
          onStack[w] = 0;
          component.push(w);
        } while (w !== node);
        components.push(component);
      }
    }
  }

  return components;
}

/** The largest strongly connected component's node ids, as a Set for O(1) membership tests. */
export function largestScc(graph) {
  const components = stronglyConnectedComponents(graph);
  let largest = components[0] ?? [];
  for (const c of components) if (c.length > largest.length) largest = c;
  return new Set(largest);
}
