
const mongoose = require('mongoose');
const Connection = require('../models/Connection');
const User = require('../models/User');

const buildGraph = require('../algorithms/buildGraph');
const bfs = require('../algorithms/bfs');
const dfs = require('../algorithms/dfs');
const connectedComponents = require('../algorithms/connectedComponents');
const buildWeightedGraph = require('../algorithms/buildWeightedGraph');
const kruskal = require('../algorithms/kruskal');
const dijkstra = require('../algorithms/dijkstra');
const bellmanFord = require('../algorithms/bellmanFord');
const floydWarshall = require('../algorithms/floydWarshall');
const longestCommonSubsequence = require('../algorithms/longestCommonSubsequence');
const knapsack = require('../algorithms/knapsack');
const matrixChainMultiplication = require('../algorithms/matrixChainMultiplication');
const resourceAllocation = require('../algorithms/resourceAllocation');
const solveNQueen = require('../algorithms/nQueen');
const graphColoring = require('../algorithms/graphColoring');
const hamiltonianCycle = require('../algorithms/hamiltonianCycle');
const sumOfSubsets = require('../algorithms/sumOfSubsets');
const travellingSalesman = require('../algorithms/travellingSalesman');
const RedBlackTree = require('../algorithms/redBlackTree');

// BFS: Find the shortest connection path between two users
const findConnectionPath = async (req, res) => {
    try {
        const startUserId = req.user.userId;
        const targetUserId = req.params.targetUserId;

        if (!mongoose.Types.ObjectId.isValid(targetUserId)) {
            return res.status(400).json({ message: 'Invalid target user ID' });
        }

        const targetUser = await User.findById(targetUserId).select('-password');

        if (!targetUser) {
            return res.status(404).json({ message: 'Target user not found' });
        }

        const acceptedConnections = await Connection.find({
            status: 'accepted'
        }).select('user1 user2');

        const graph = buildGraph(acceptedConnections);

        if (!graph.has(startUserId)) graph.set(startUserId, []);
        if (!graph.has(targetUserId)) graph.set(targetUserId, []);

        const path = bfs(graph, startUserId, targetUserId);

        if (!path) {
            return res.status(404).json({
                message: 'No connection path found between these users',
                path: null
            });
        }

        const pathUsers = await User.find({
            _id: { $in: path }
        }).select('name email role department graduationYear company skills');

        const userMap = new Map(
            pathUsers.map((user) => [user._id.toString(), user])
        );

        return res.status(200).json({
            message: 'Shortest connection path found successfully',
            algorithm: 'Breadth-First Search (BFS)',
            connectionCount: path.length - 1,
            path: path.map((userId) => userMap.get(userId))
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Failed to find connection path',
            error: error.message
        });
    }
};

// DFS: Find a connection path using Depth-First Search
const findDFSConnectionPath = async (req, res) => {
    try {
        const startUserId = req.user.userId;
        const targetUserId = req.params.targetUserId;

        if (!mongoose.Types.ObjectId.isValid(targetUserId)) {
            return res.status(400).json({ message: 'Invalid target user ID' });
        }

        const targetUser = await User.findById(targetUserId).select('-password');

        if (!targetUser) {
            return res.status(404).json({ message: 'Target user not found' });
        }

        const acceptedConnections = await Connection.find({
            status: 'accepted'
        }).select('user1 user2');

        const graph = buildGraph(acceptedConnections);

        if (!graph.has(startUserId)) graph.set(startUserId, []);
        if (!graph.has(targetUserId)) graph.set(targetUserId, []);

        const path = dfs(graph, startUserId, targetUserId);

        if (!path) {
            return res.status(404).json({
                message: 'No connection path found between these users',
                path: null
            });
        }

        const pathUsers = await User.find({
            _id: { $in: path }
        }).select('name email role department graduationYear company skills');

        const userMap = new Map(
            pathUsers.map((user) => [user._id.toString(), user])
        );

        return res.status(200).json({
            message: 'DFS connection path found successfully',
            algorithm: 'Depth-First Search (DFS)',
            connectionCount: path.length - 1,
            path: path.map((userId) => userMap.get(userId))
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Failed to find DFS connection path',
            error: error.message
        });
    }
};

// Connected Components: Find separate groups in the alumni network
const getConnectedComponents = async (req, res) => {
    try {
        const acceptedConnections = await Connection.find({
            status: 'accepted'
        }).select('user1 user2');

        const graph = buildGraph(acceptedConnections);

        const allUsers = await User.find({})
            .select('_id name email role department graduationYear company skills');

        for (const user of allUsers) {
            const userId = user._id.toString();

            if (!graph.has(userId)) {
                graph.set(userId, []);
            }
        }

        const components = connectedComponents(graph);

        const userMap = new Map(
            allUsers.map((user) => [user._id.toString(), user])
        );

        const formattedComponents = components.map((component, index) => ({
            group: index + 1,
            memberCount: component.length,
            members: component
                .map((userId) => userMap.get(userId))
                .filter(Boolean)
        }));

        return res.status(200).json({
            message: 'Connected components retrieved successfully',
            algorithm: 'Connected Components using DFS',
            totalGroups: formattedComponents.length,
            totalUsers: allUsers.length,
            groups: formattedComponents
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Failed to retrieve connected components',
            error: error.message
        });
    }
};

// Kruskal: Generate a minimum-cost suggested network
const getRecommendationTree = async (req, res) => {
    try {
        const users = await User.find({})
            .select('_id name email role department graduationYear company skills');

        if (users.length === 0) {
            return res.status(200).json({
                message: 'No users available to build a suggested network',
                algorithm: "Kruskal's Minimum Spanning Tree",
                totalUsers: 0,
                totalCost: 0,
                isConnected: true,
                edges: []
            });
        }

        const { vertices, edges } = buildWeightedGraph(users);
        const result = kruskal(vertices, edges);

        const userMap = new Map(
            users.map((user) => [user._id.toString(), user])
        );

        const formattedEdges = result.edges.map((edge) => ({
            from: userMap.get(edge.from),
            to: userMap.get(edge.to),
            weight: edge.weight
        }));

        return res.status(200).json({
            message: 'Minimum-cost suggested network generated successfully',
            algorithm: "Kruskal's Minimum Spanning Tree",
            description:
                'Suggested links are calculated from shared skills and department similarity. These suggestions do not create actual connections.',
            totalUsers: users.length,
            totalSuggestedLinks: formattedEdges.length,
            totalCost: result.totalCost,
            isConnected: result.isConnected,
            edges: formattedEdges
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Failed to generate suggested network',
            error: error.message
        });
    }
};

// Helper: Build a weighted graph from user profiles
const getWeightedUserGraph = (users) => {
    const { vertices, edges } = buildWeightedGraph(users);

    return { vertices, edges };
};

// Dijkstra: Find the lowest-cost suggested networking path
const findLowestCostPath = async (req, res) => {
    try {
        const startUserId = req.user.userId;
        const targetUserId = req.params.targetUserId;

        if (!mongoose.Types.ObjectId.isValid(targetUserId)) {
            return res.status(400).json({ message: 'Invalid target user ID' });
        }

        if (startUserId === targetUserId) {
            const currentUser = await User.findById(startUserId)
                .select('name email role department graduationYear company skills');

            return res.status(200).json({
                message: 'You are already at the target user',
                algorithm: "Dijkstra's Shortest Path Algorithm",
                path: currentUser ? [currentUser] : [],
                totalCost: 0,
                connectionCount: 0
            });
        }

        const users = await User.find({})
            .select('_id name email role department graduationYear company skills');

        const userMap = new Map(
            users.map((user) => [user._id.toString(), user])
        );

        if (!userMap.has(targetUserId)) {
            return res.status(404).json({ message: 'Target user not found' });
        }

        const { vertices, edges } = getWeightedUserGraph(users);
        const graph = new Map(vertices.map((vertex) => [vertex, []]));

        for (const edge of edges) {
            graph.get(edge.from).push({
                to: edge.to,
                weight: edge.weight
            });

            graph.get(edge.to).push({
                to: edge.from,
                weight: edge.weight
            });
        }

        const result = dijkstra(graph, startUserId, targetUserId);

        if (!result) {
            return res.status(404).json({
                message: 'No suggested networking path found',
                path: null
            });
        }

        return res.status(200).json({
            message: 'Lowest-cost suggested networking path found successfully',
            algorithm: "Dijkstra's Shortest Path Algorithm",
            description:
                'Path costs are based on shared skills and department similarity. Suggested links do not create actual connections.',
            connectionCount: result.path.length - 1,
            totalCost: result.totalCost,
            path: result.path
                .map((userId) => userMap.get(userId))
                .filter(Boolean)
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Failed to find lowest-cost networking path',
            error: error.message
        });
    }
};

// Bellman-Ford: Find the lowest-cost suggested networking path
const findBellmanFordPath = async (req, res) => {
    try {
        const startUserId = req.user.userId;
        const targetUserId = req.params.targetUserId;

        if (!mongoose.Types.ObjectId.isValid(targetUserId)) {
            return res.status(400).json({ message: 'Invalid target user ID' });
        }

        const users = await User.find({})
            .select('_id name email role department graduationYear company skills');

        const userMap = new Map(
            users.map((user) => [user._id.toString(), user])
        );

        if (!userMap.has(startUserId)) {
            return res.status(404).json({ message: 'Logged-in user not found' });
        }

        if (!userMap.has(targetUserId)) {
            return res.status(404).json({ message: 'Target user not found' });
        }

        if (startUserId === targetUserId) {
            return res.status(200).json({
                message: 'You are already at the target user',
                algorithm: 'Bellman-Ford Algorithm',
                path: [userMap.get(startUserId)],
                totalCost: 0,
                connectionCount: 0
            });
        }

        const { vertices, edges } = getWeightedUserGraph(users);

        const result = bellmanFord(
            vertices,
            edges,
            startUserId,
            targetUserId
        );

        if (!result) {
            return res.status(404).json({
                message: 'No suggested networking path found',
                path: null
            });
        }

        return res.status(200).json({
            message: 'Lowest-cost suggested networking path found successfully',
            algorithm: 'Bellman-Ford Algorithm',
            description:
                'Path costs are based on shared skills and department similarity. Suggested links do not create actual connections.',
            connectionCount: result.path.length - 1,
            totalCost: result.totalCost,
            path: result.path
                .map((userId) => userMap.get(userId))
                .filter(Boolean)
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Failed to find Bellman-Ford networking path',
            error: error.message
        });
    }
};

// Floyd-Warshall: Calculate shortest paths between all pairs of users
const findFloydWarshallPath = async (req, res) => {
    try {
        const startUserId = req.user.userId;
        const targetUserId = req.params.targetUserId;

        if (!mongoose.Types.ObjectId.isValid(targetUserId)) {
            return res.status(400).json({
                message: 'Invalid target user ID'
            });
        }

        const users = await User.find({})
            .select('_id name email role department graduationYear company skills');

        const userMap = new Map(
            users.map((user) => [user._id.toString(), user])
        );

        if (!userMap.has(startUserId)) {
            return res.status(404).json({
                message: 'Logged-in user not found'
            });
        }

        if (!userMap.has(targetUserId)) {
            return res.status(404).json({
                message: 'Target user not found'
            });
        }

        if (startUserId === targetUserId) {
            return res.status(200).json({
                message: 'You are already at the target user',
                algorithm: 'Floyd-Warshall Algorithm',
                path: [userMap.get(startUserId)],
                totalCost: 0,
                connectionCount: 0
            });
        }

        const { vertices, edges } = getWeightedUserGraph(users);

        // The suggested networking graph is undirected.
        const undirectedEdges = [];

        for (const edge of edges) {
            undirectedEdges.push({
                from: edge.from,
                to: edge.to,
                weight: edge.weight
            });

            undirectedEdges.push({
                from: edge.to,
                to: edge.from,
                weight: edge.weight
            });
        }

        const result = floydWarshall(vertices, undirectedEdges);
        const shortestPath = result.getPath(startUserId, targetUserId);

        if (!shortestPath) {
            return res.status(404).json({
                message: 'No suggested networking path found',
                path: null
            });
        }

        return res.status(200).json({
            message: 'Lowest-cost suggested networking path found successfully',
            algorithm: 'Floyd-Warshall Algorithm',
            description:
                'Floyd-Warshall calculates shortest paths between all pairs of users. Path costs are based on shared skills and department similarity. Suggested links do not create actual connections.',
            connectionCount: shortestPath.path.length - 1,
            totalCost: shortestPath.totalCost,
            path: shortestPath.path
                .map((userId) => userMap.get(userId))
                .filter(Boolean)
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Failed to find Floyd-Warshall networking path',
            error: error.message
        });
    }
};
// LCS: Compare the skills of two users using Dynamic Programming
const compareUserSkills = async (req, res) => {
    try {
        const { targetUserId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(targetUserId)) {
            return res.status(400).json({
                message: 'Invalid target user ID'
            });
        }

        const users = await User.find({
            _id: { $in: [req.user.userId, targetUserId] }
        }).select('-password');

        const currentUser = users.find(
            user => user._id.toString() === req.user.userId
        );

        const targetUser = users.find(
            user => user._id.toString() === targetUserId
        );

        if (!currentUser || !targetUser) {
            return res.status(404).json({
                message: 'Current user or target user not found'
            });
        }

        const currentSkills = currentUser.skills || [];
        const targetSkills = targetUser.skills || [];

        const result = longestCommonSubsequence(
            currentSkills,
            targetSkills
        );

        return res.status(200).json({
            message: 'User skills compared successfully',
            algorithm: 'Longest Common Subsequence (Dynamic Programming)',
            currentUser: {
                id: currentUser._id,
                name: currentUser.name,
                skills: currentSkills
            },
            targetUser: {
                id: targetUser._id,
                name: targetUser.name,
                skills: targetSkills
            },
            commonSkills: result.sequence,
            commonSkillsCount: result.length
        });
    } catch (error) {
        console.error('Compare user skills error:', error);

        return res.status(500).json({
            message: 'Server error while comparing user skills'
        });
    }
};
// Knapsack: Select career activities within a time budget
const recommendCareerActivities = async (req, res) => {
    try {
        const capacity = Number(req.query.capacity);

        if (
            req.query.capacity === undefined ||
            req.query.capacity.trim() === '' ||
            !Number.isInteger(capacity) ||
            capacity < 0 ||
            capacity > 10000
        ) {
            return res.status(400).json({
                message: 'Capacity must be an integer between 0 and 10000'
            });
        }

        const activities = [
            { name: 'DSA Practice', weight: 3, value: 60 },
            { name: 'Resume Workshop', weight: 2, value: 40 },
            { name: 'Mock Interview', weight: 4, value: 70 },
            { name: 'Networking Event', weight: 1, value: 20 },
            { name: 'Project Development', weight: 5, value: 90 },
            { name: 'Alumni Mentoring', weight: 2, value: 50 }
        ];

        const result = knapsack(activities, capacity);

        return res.status(200).json({
            message: 'Career activities recommended successfully',
            algorithm: '0/1 Knapsack (Dynamic Programming)',
            availableTimeUnits: capacity,
            maximumValue: result.maximumValue,
            totalWeight: result.totalWeight,
            selectedActivities: result.selectedItems
        });
    } catch (error) {
        console.error('Career activity recommendation error:', error);

        return res.status(500).json({
            message: 'Server error while recommending career activities'
        });
    }
};
// Matrix Chain Multiplication: Find the optimal matrix multiplication order
const optimizeMatrixMultiplication = async (req, res) => {
    try {
        const { dimensions } = req.body;

        if (
            !Array.isArray(dimensions) ||
            dimensions.length < 2 ||
            !dimensions.every(
                dimension =>
                    Number.isInteger(dimension) && dimension > 0
            )
        ) {
            return res.status(400).json({
                message: 'Dimensions must be an array of at least two positive integers'
            });
        }

        const result = matrixChainMultiplication(dimensions);

        return res.status(200).json({
            message: 'Matrix multiplication order optimized successfully',
            algorithm: 'Matrix Chain Multiplication (Dynamic Programming)',
            matrixCount: dimensions.length - 1,
            dimensions,
            minimumMultiplications: result.minimumMultiplications,
            optimalOrder: result.optimalOrder
        });
    } catch (error) {
        console.error('Matrix chain multiplication error:', error);

        return res.status(500).json({
            message: 'Server error while optimizing matrix multiplication'
        });
    }
};
const allocateMentoringSessions = (req, res) => {
    try {
        const { benefits, totalSessions } = req.body;

        if (!Array.isArray(benefits)) {
            return res.status(400).json({
                message: 'Benefits must be an array'
            });
        }

        if (
            !Number.isInteger(totalSessions) ||
            totalSessions < 0
        ) {
            return res.status(400).json({
                message: 'Total sessions must be a non-negative integer'
            });
        }

        const result = resourceAllocation(
            benefits,
            totalSessions
        );

        return res.status(200).json({
            message: 'Mentoring sessions allocated successfully',
            algorithm: 'Resource Allocation (Dynamic Programming)',
            studentCount: benefits.length,
            ...result
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
};

const solveNQueenProblem = (req, res) => {
    try {
        const n = Number(req.query.n);

        if (
            req.query.n === undefined ||
            req.query.n.trim() === '' ||
            !Number.isInteger(n) ||
            n < 1 ||
            n > 15
        ) {
            return res.status(400).json({
                message: 'N must be an integer between 1 and 15'
            });
        }

        const result = solveNQueen(n);

        return res.status(200).json({
            message: 'N-Queen solutions generated successfully',
            algorithm: 'N-Queen (Backtracking)',
            ...result
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
};
// Graph Coloring: Assign conflict-free mentoring slots
const colorGraph = (req, res) => {
    try {
        const { graph } = req.body;

        if (
            !graph ||
            typeof graph !== 'object' ||
            Array.isArray(graph) ||
            Object.keys(graph).length === 0
        ) {
            return res.status(400).json({
                message: 'Please provide a valid graph object'
            });
        }

        const vertices = Object.keys(graph);

        for (const vertex of vertices) {
            if (
                !Array.isArray(graph[vertex]) ||
                graph[vertex].some(
                    neighbor => typeof neighbor !== 'string' ||
                        !Object.prototype.hasOwnProperty.call(graph, neighbor)
                )
            ) {
                return res.status(400).json({
                    message: `Invalid neighbors for vertex: ${vertex}`
                });
            }
        }

        const result = graphColoring(graph);

        if (!result) {
            return res.status(400).json({
                message: 'Unable to assign colors to the provided graph'
            });
        }

        return res.status(200).json({
            message: 'Graph coloring completed successfully',
            algorithm: 'Graph Coloring (Backtracking)',
            ...result
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};
// Hamiltonian Cycle: Find a cycle visiting every vertex exactly once
const findHamiltonianCycle = async (req, res) => {
    try {
        const connections = await Connection.find({
            status: 'accepted'
        });

        const graph = buildGraph(connections);

        const result = hamiltonianCycle(graph);

        if (!result) {
            return res.status(404).json({
                message: 'No Hamiltonian cycle exists in the current connection network'
            });
        }

        return res.status(200).json({
            message: 'Hamiltonian cycle found successfully',
            algorithm: 'Hamiltonian Cycle (Backtracking)',
            ...result
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};
// Sum of Subsets: Find subsets whose sum equals the target
const findSubsetsWithTargetSum = (req, res) => {
    try {
        const { numbers, target } = req.body;

        if (
            !Array.isArray(numbers) ||
            numbers.length === 0 ||
            !numbers.every(
                number => Number.isFinite(number) && number >= 0
            ) ||
            !Number.isFinite(target) ||
            target < 0
        ) {
            return res.status(400).json({
                message: 'Provide a non-empty array of non-negative numbers and a valid non-negative target'
            });
        }

        const result = sumOfSubsets(numbers, target);

        return res.status(200).json({
            message: 'Subset search completed successfully',
            algorithm: 'Sum of Subsets (Backtracking)',
            numbers,
            target,
            solutions: result,
            totalSolutions: result.length
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};
// Travelling Salesman Problem: Find the minimum-cost tour
const solveTravellingSalesman = (req, res) => {
    try {
        const { graph, start } = req.body;

        if (
            !graph ||
            typeof graph !== 'object' ||
            Array.isArray(graph) ||
            Object.keys(graph).length === 0 ||
            typeof start !== 'string' ||
            !Object.prototype.hasOwnProperty.call(graph, start)
        ) {
            return res.status(400).json({
                message: 'Provide a valid weighted graph and starting vertex'
            });
        }

        const vertices = Object.keys(graph);

        for (const vertex of vertices) {
            if (
                !graph[vertex] ||
                typeof graph[vertex] !== 'object' ||
                Array.isArray(graph[vertex])
            ) {
                return res.status(400).json({
                    message: `Invalid edges for vertex: ${vertex}`
                });
            }

            for (const [neighbor, cost] of Object.entries(graph[vertex])) {
                if (
                    !Object.prototype.hasOwnProperty.call(graph, neighbor) ||
                    !Number.isFinite(cost) ||
                    cost < 0
                ) {
                    return res.status(400).json({
                        message: `Invalid edge or cost for vertex: ${vertex}`
                    });
                }
            }
        }

        const result = travellingSalesman(graph, start);

        if (!result) {
            return res.status(404).json({
                message: 'No complete tour exists for the provided graph'
            });
        }

        return res.status(200).json({
            message: 'Travelling Salesman Problem solved successfully',
            algorithm: 'Travelling Salesman Problem (Backtracking)',
            ...result
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};
// Red-Black Tree: Organize alumni by graduation year
const getAlumniRedBlackTree = async (req, res) => {
    try {
        const alumni = await User.find({
            role: 'alumni',
            graduationYear: { $type: 'number' }
        })
            .select('name email department graduationYear company skills')
            .sort({ graduationYear: 1, name: 1 });

        const tree = new RedBlackTree();

        for (const alumnus of alumni) {
            const year = alumnus.graduationYear;
            const existing = tree.search(year);

            if (existing) {
                existing.push(alumnus);
            } else {
                tree.insert(year, [alumnus]);
            }
        }

        const entries = tree.inOrder().map((node) => ({
            graduationYear: node.key,
            color: node.color,
            alumniCount: node.value.length,
            alumni: node.value
        }));

        return res.status(200).json({
            message: 'Alumni organized by graduation year successfully',
            algorithm: 'Red-Black Tree',
            totalAlumni: alumni.length,
            totalGraduationYears: tree.getSize(),
            entries
        });
    } catch (error) {
        console.error('Alumni Red-Black Tree error:', error);

        return res.status(500).json({
            message: 'Failed to organize alumni records',
            error: error.message
        });
    }
};

module.exports = {
    findConnectionPath,
    findDFSConnectionPath,
    getConnectedComponents,
    getRecommendationTree,
    findLowestCostPath,
    findBellmanFordPath,
    findFloydWarshallPath,
    compareUserSkills,
    recommendCareerActivities,
    optimizeMatrixMultiplication,
    allocateMentoringSessions,
    solveNQueenProblem,
    colorGraph,
    findHamiltonianCycle,
    findSubsetsWithTargetSum,
    solveTravellingSalesman,
    getAlumniRedBlackTree
};

