
function connectedComponents(graph) {
    const visited = new Set();
    const components = [];

    for (const vertex of graph.keys()) {
        if (visited.has(vertex)) {
            continue;
        }

        const component = [];
        const stack = [vertex];

        visited.add(vertex);

        while (stack.length > 0) {
            const current = stack.pop();

            component.push(current);

            const neighbors = graph.get(current) || [];

            for (const neighbor of neighbors) {
                if (!visited.has(neighbor)) {
                    visited.add(neighbor);
                    stack.push(neighbor);
                }
            }
        }

        components.push(component);
    }

    return components;
}

module.exports = connectedComponents;

