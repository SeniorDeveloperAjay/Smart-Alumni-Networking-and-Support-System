const bfs = (graph, start, target) => {
// Check whether both users exist in the graph
if (!graph.has(start) || !graph.has(target)) {
return null;
}

// If the starting user is the target
if (start === target) {
    return [start];
}

// Initialize the queue and visited set
const queue = [[start]];
const visited = new Set([start]);

while (queue.length > 0) {
    const path = queue.shift();
    const currentUser = path[path.length - 1];

    // Explore the current user's neighbors
    for (const neighbor of graph.get(currentUser) || []) {
        if (visited.has(neighbor)) {
            continue;
        }

        const newPath = [...path, neighbor];

        // Return the shortest path when the target is found
        if (neighbor === target) {
            return newPath;
        }

        visited.add(neighbor);
        queue.push(newPath);
    }
}

// No path exists
return null;


};

module.exports = bfs;
