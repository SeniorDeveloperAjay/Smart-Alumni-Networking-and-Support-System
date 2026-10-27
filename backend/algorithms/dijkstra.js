function dijkstra(graph, start, target) {
    if (!graph.has(start) || !graph.has(target)) {
        return null;
    }

    const distances = new Map();
    const previous = new Map();
    const unvisited = new Set(graph.keys());

    for (const vertex of graph.keys()) {
        distances.set(vertex, Infinity);
    }

    distances.set(start, 0);

    while (unvisited.size > 0) {
        let current = null;
        let minimumDistance = Infinity;

        for (const vertex of unvisited) {
            if (distances.get(vertex) < minimumDistance) {
                minimumDistance = distances.get(vertex);
                current = vertex;
            }
        }

        if (current === null) {
            break;
        }

        if (current === target) {
            break;
        }

        unvisited.delete(current);

        for (const edge of graph.get(current) || []) {
            const neighbor = edge.to;
            const weight = edge.weight;

            if (!unvisited.has(neighbor)) {
                continue;
            }

            if (weight < 0) {
                throw new Error('Dijkstra requires non-negative edge weights');
            }

            const newDistance = distances.get(current) + weight;

            if (newDistance < distances.get(neighbor)) {
                distances.set(neighbor, newDistance);
                previous.set(neighbor, current);
            }
        }
    }

    if (distances.get(target) === Infinity) {
        return null;
    }

    const path = [];
    let current = target;

    while (current !== undefined) {
        path.unshift(current);

        if (current === start) {
            break;
        }

        current = previous.get(current);
    }

    if (path[0] !== start) {
        return null;
    }

    return {
        path,
        totalCost: distances.get(target)
    };
}

module.exports = dijkstra;