
function floydWarshall(vertices, edges) {
    const distances = new Map();
    const next = new Map();

    // Initialize distances between every pair of vertices.
    for (const from of vertices) {
        distances.set(from, new Map());
        next.set(from, new Map());

        for (const to of vertices) {
            distances.get(from).set(
                to,
                from === to ? 0 : Infinity
            );

            next.get(from).set(to, null);
        }
    }

    // Add edge weights to the distance table.
    for (const edge of edges) {
        const { from, to, weight } = edge;

        if (
            distances.has(from) &&
            distances.has(to) &&
            weight < distances.get(from).get(to)
        ) {
            distances.get(from).set(to, weight);
            next.get(from).set(to, to);
        }
    }

    // Calculate shortest paths through intermediate vertices.
    for (const intermediate of vertices) {
        for (const from of vertices) {
            for (const to of vertices) {
                const firstDistance = distances.get(from).get(intermediate);
                const secondDistance = distances.get(intermediate).get(to);

                if (
                    firstDistance !== Infinity &&
                    secondDistance !== Infinity &&
                    firstDistance + secondDistance < distances.get(from).get(to)
                ) {
                    distances.get(from).set(
                        to,
                        firstDistance + secondDistance
                    );

                    next.get(from).set(
                        to,
                        next.get(from).get(intermediate)
                    );
                }
            }
        }
    }

    // Detect negative-weight cycles.
    for (const vertex of vertices) {
        if (distances.get(vertex).get(vertex) < 0) {
            throw new Error('Graph contains a negative-weight cycle');
        }
    }

    // Return the shortest distance and path between any two vertices.
    function getPath(start, target) {
        if (!distances.has(start) || !distances.has(target)) {
            return null;
        }

        if (distances.get(start).get(target) === Infinity) {
            return null;
        }

        const path = [start];
        let current = start;

        while (current !== target) {
            current = next.get(current).get(target);

            if (current === null || current === undefined) {
                return null;
            }

            path.push(current);
        }

        return {
            path,
            totalCost: distances.get(start).get(target)
        };
    }

    return {
        distances,
        getPath
    };
}

module.exports = floydWarshall;

