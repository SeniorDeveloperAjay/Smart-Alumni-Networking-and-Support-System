
function bellmanFord(vertices, edges, start, target) {
    if (!vertices.includes(start) || !vertices.includes(target)) {
        return null;
    }

    const distances = new Map();
    const previous = new Map();

    for (const vertex of vertices) {
        distances.set(vertex, Infinity);
    }

    distances.set(start, 0);

    // Relax all edges up to V - 1 times.
    for (let i = 0; i < vertices.length - 1; i++) {
        let updated = false;

        for (const edge of edges) {
            const { from, to, weight } = edge;

            if (weight < 0) {
                // Negative weights are supported by Bellman-Ford.
                // Negative cycles are checked below.
            }

            if (
                distances.get(from) !== Infinity &&
                distances.get(from) + weight < distances.get(to)
            ) {
                distances.set(to, distances.get(from) + weight);
                previous.set(to, from);
                updated = true;
            }
        }

        if (!updated) {
            break;
        }
    }

    // Detect a reachable negative-weight cycle.
    for (const edge of edges) {
        const { from, to, weight } = edge;

        if (
            distances.get(from) !== Infinity &&
            distances.get(from) + weight < distances.get(to)
        ) {
            throw new Error('Graph contains a reachable negative-weight cycle');
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

module.exports = bellmanFord;

