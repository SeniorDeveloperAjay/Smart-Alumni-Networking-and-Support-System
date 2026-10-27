const buildGraph = (connections) => {
const graph = new Map();
// Add each accepted connection to the graph
for (const connection of connections) {
    const user1 = connection.user1.toString();
    const user2 = connection.user2.toString();

    // Initialize each user if not already present
    if (!graph.has(user1)) {
        graph.set(user1, []);
    }

    if (!graph.has(user2)) {
        graph.set(user2, []);
    }

    // Add an edge in both directions
    graph.get(user1).push(user2);
    graph.get(user2).push(user1);
}

return graph;


};

module.exports = buildGraph;
