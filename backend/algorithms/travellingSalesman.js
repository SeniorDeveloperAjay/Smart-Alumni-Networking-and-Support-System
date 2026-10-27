function travellingSalesman(graph, start) {
    const vertices = Object.keys(graph);

    if (
        vertices.length === 0 ||
        !Object.prototype.hasOwnProperty.call(graph, start)
    ) {
        return null;
    }

    const visited = new Set([start]);
    const path = [start];
    let minimumCost = Infinity;
    let bestPath = [];

    function backtrack(current, currentCost) {
        if (path.length === vertices.length) {
            const returnCost = graph[current][start];

            if (Number.isFinite(returnCost)) {
                const totalCost = currentCost + returnCost;

                if (totalCost < minimumCost) {
                    minimumCost = totalCost;
                    bestPath = [...path, start];
                }
            }

            return;
        }

        for (const neighbor of vertices) {
            const edgeCost = graph[current][neighbor];

            if (
                !visited.has(neighbor) &&
                Number.isFinite(edgeCost) &&
                edgeCost >= 0
            ) {
                visited.add(neighbor);
                path.push(neighbor);

                backtrack(neighbor, currentCost + edgeCost);

                path.pop();
                visited.delete(neighbor);
            }
        }
    }

    backtrack(start, 0);

    if (bestPath.length === 0) {
        return null;
    }

    return {
        path: bestPath,
        minimumCost
    };
}

module.exports = travellingSalesman;