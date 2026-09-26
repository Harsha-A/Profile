export function routeOverlayFor(mover) {
  const route = mover?.route;
  if (!route) return null;
  return { nodes: route.nodes, edges: route.edges };
}

export function routeProgressFor(mover) {
  const route = mover?.route;
  if (!route) return null;
  return {
    edgeIndex: Math.max(0, Math.min(route.edgeIndex ?? 0, route.edges.length)),
    edgeProgress: Math.max(0, route.edgeProgress ?? 0),
  };
}

export function routeKey(route) {
  if (!route?.edges?.length) return route?.nodes?.length ? `nodes:${route.nodes.join(',')}` : '';
  return `${route.nodes?.[0] ?? ''}>${route.nodes?.[route.nodes.length - 1] ?? ''}|${route.edges.join(',')}`;
}

export function moverRouteKey(mover) {
  return routeKey(routeOverlayFor(mover));
}

export function routeContainsMoverEdge(mover, path) {
  const route = mover?.route;
  if (!route?.edges?.length || !path?.edges?.length) return Boolean(mover?.arrived && route?.edges?.length === 0);
  const index = mover.arrived
    ? route.edges.length - 1
    : Math.max(0, Math.min(route.edgeIndex ?? 0, route.edges.length - 1));
  return path.edges.includes(route.edges[index]);
}

export function validateRouteContiguous(graph, route, targetNode = null) {
  if (!graph || !route) return false;
  if ((route.nodes?.length ?? 0) !== (route.edges?.length ?? 0) + 1) return false;
  for (let i = 0; i < route.edges.length; i++) {
    const edge = route.edges[i];
    if (route.nodes[i] !== graph.edgeFrom[edge]) return false;
    if (route.nodes[i + 1] !== graph.edgeTo[edge]) return false;
    if (i + 1 < route.edges.length && graph.edgeTo[edge] !== graph.edgeFrom[route.edges[i + 1]]) return false;
  }
  return targetNode == null || route.nodes[route.nodes.length - 1] === targetNode;
}
