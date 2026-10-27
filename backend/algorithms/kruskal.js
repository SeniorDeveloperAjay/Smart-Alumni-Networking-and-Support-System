
function kruskal(vertices, edges) {
    const parent = new Map();
    const rank = new Map();

    // Initialize each vertex as a separate component
    for (const vertex of vertices) {
        parent.set(vertex, vertex);
        rank.set(vertex, 0);
    }

    // Find the representative of a component
    function find(vertex) {
        if (!parent.has(vertex)) {
            throw new Error(`Unknown vertex: ${vertex}`);
        }

        if (parent.get(vertex) !== vertex) {
            parent.set(vertex, find(parent.get(vertex)));
        }

        return parent.get(vertex);
    }

    // Merge two components using union by rank
    function union(vertexA, vertexB) {
        let rootA = find(vertexA);
        let rootB = find(vertexB);

        if (rootA === rootB) {
            return false;
        }

        if (rank.get(rootA) < rank.get(rootB)) {
            parent.set(rootA, rootB);
        } else if (rank.get(rootA) > rank.get(rootB)) {
            parent.set(rootB, rootA);
        } else {
            parent.set(rootB, rootA);
            rank.set(rootA, rank.get(rootA) + 1);
        }

        return true;
    }

    // Sort edges by increasing cost
    const sortedEdges = [...edges].sort(
        (a, b) => a.weight - b.weight
    );

    const minimumSpanningTree = [];
    let totalCost = 0;

    // Select the lowest-cost edges without creating cycles
    for (const edge of sortedEdges) {
        if (union(edge.from, edge.to)) {
            minimumSpanningTree.push(edge);
            totalCost += edge.weight;
        }

        if (minimumSpanningTree.length === vertices.length - 1) {
            break;
        }
    }

    // A spanning tree must connect every vertex
    const isConnected =
        vertices.length === 0 ||
        minimumSpanningTree.length === vertices.length - 1;

    return {
        edges: minimumSpanningTree,
        totalCost,
        isConnected
    };
}

module.exports = kruskal;

