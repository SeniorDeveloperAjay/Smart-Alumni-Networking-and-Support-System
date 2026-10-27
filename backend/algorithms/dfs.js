function dfs(graph, start, target) {
  if (!graph.has(start) || !graph.has(target)) {
    return null;
  }

  const visited = new Set();
  const path = [];
  const result = [];

  function traverse(current) {
    visited.add(current);
    path.push(current);

    if (current === target) {
      result.push(...path);
      return true;
    }

    const neighbors = graph.get(current) || [];

    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        if (traverse(neighbor)) {
          return true;
        }
      }
    }

    path.pop();
    return false;
  }

  const found = traverse(start);

  return found ? result : null;
}

module.exports = dfs;