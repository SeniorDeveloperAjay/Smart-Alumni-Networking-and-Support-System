function graphColoring(graph) {
    const vertices = Object.keys(graph);
    const colors = {};

    function isSafe(vertex, color) {
        for (const neighbor of graph[vertex]) {
            if (colors[neighbor] === color) {
                return false;
            }
        }

        return true;
    }

    function assignColor(index) {
        if (index === vertices.length) {
            return true;
        }

        const vertex = vertices[index];

        for (let color = 1; color <= vertices.length; color++) {
            if (isSafe(vertex, color)) {
                colors[vertex] = color;

                if (assignColor(index + 1)) {
                    return true;
                }

                delete colors[vertex];
            }
        }

        return false;
    }

    if (!assignColor(0)) {
        return null;
    }

    const totalSlots = Math.max(0, ...Object.values(colors));

    return {
        assignments: colors,
        totalSlots
    };
}

module.exports = graphColoring;