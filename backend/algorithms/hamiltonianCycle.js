function hamiltonianCycle(graph) {
    const vertices = Object.keys(graph);

    if (vertices.length === 0) {
        return null;
    }

    const path = [vertices[0]];
    const visited = new Set(path);

    function findCycle(current) {
        if (path.length === vertices.length) {
            return graph[current].includes(path[0]);
        }

        for (const neighbor of graph[current] || []) {
            if (!Object.prototype.hasOwnProperty.call(graph, neighbor)) {
                continue;
            }

            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                path.push(neighbor);

                if (findCycle(neighbor)) {
                    return true;
                }

                path.pop();
                visited.delete(neighbor);
            }
        }

        return false;
    }

    if (findCycle(vertices[0])) {
        return {
            cycle: [...path, path[0]],
            verticesVisited: vertices.length
        };
    }

    return null;
}

module.exports = hamiltonianCycle;