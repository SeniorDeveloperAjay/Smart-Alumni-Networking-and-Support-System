
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const { registerUser, loginUser } = require('./controllers/authController');
const authMiddleware = require('./middleware/authMiddleware');

const {
    getUserProfile,
    updateUserProfile
} = require('./controllers/userController');

const { getAlumniDirectory } = require('./controllers/alumniController');

const {
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
} = require('./controllers/graphController');

const {
    sendConnectionRequest,
    acceptConnectionRequest,
    cancelConnectionRequest,
    getMyPendingRequests,
    getIncomingConnectionRequests,
    getMyConnections
} = require('./controllers/connectionController');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/sancss')
    .then(() => {
        console.log('MongoDB connected successfully');
    })
    .catch((error) => {
        console.error('MongoDB connection failed:', error.message);
    });

// Test route
app.get('/', (req, res) => {
    res.send('Smart Alumni Networking and Career Support System Backend is Running!');
});

// Authentication routes
app.post('/api/auth/register', registerUser);
app.post('/api/auth/login', loginUser);

// Protected test route
app.get('/api/auth/protected', authMiddleware, (req, res) => {
    res.status(200).json({
        message: 'Protected route accessed successfully',
        user: req.user
    });
});

// User profile routes
app.get('/api/users/profile', authMiddleware, getUserProfile);
app.put('/api/users/profile', authMiddleware, updateUserProfile);

// Alumni directory
app.get('/api/alumni', authMiddleware, getAlumniDirectory);

// BFS: Find the shortest connection path
app.get(
    '/api/connections/path/:targetUserId',
    authMiddleware,
    findConnectionPath
);

// DFS: Find a connection path using Depth-First Search
app.get(
    '/api/connections/dfs/:targetUserId',
    authMiddleware,
    findDFSConnectionPath
);

// Dijkstra: Find the lowest-cost suggested networking path
app.get(
    '/api/connections/dijkstra/:targetUserId',
    authMiddleware,
    findLowestCostPath
);

// Bellman-Ford: Find the lowest-cost suggested networking path
app.get(
    '/api/connections/bellman-ford/:targetUserId',
    authMiddleware,
    findBellmanFordPath
);
// Floyd-Warshall: Find the lowest-cost suggested networking path
app.get(
    '/api/connections/floyd-warshall/:targetUserId',
    authMiddleware,
    findFloydWarshallPath
);
// LCS: Compare skills between the logged-in user and another user
app.get(
    '/api/connections/compare-skills/:targetUserId',
    authMiddleware,
    compareUserSkills
);
// Knapsack: Recommend career activities within a time budget
app.get(
    '/api/career/recommendations',
    authMiddleware,
    recommendCareerActivities
);
// Matrix Chain Multiplication: Optimize matrix multiplication order
app.post(
    '/api/career/optimize-matrices',
    authMiddleware,
    optimizeMatrixMultiplication
);
app.post(
    '/api/career/allocate-sessions',
    authMiddleware,
    allocateMentoringSessions
);
app.get(
    '/api/algorithms/n-queen',
    authMiddleware,
    solveNQueenProblem
);
// Graph Coloring: Assign conflict-free mentoring slots
app.post(
    '/api/algorithms/graph-coloring',
    authMiddleware,
    colorGraph
);
app.get(
    '/api/algorithms/hamiltonian-cycle',
    authMiddleware,
    findHamiltonianCycle
);
// Connected Components: Find separate groups
app.get(
    '/api/connections/components',
    authMiddleware,
    getConnectedComponents
);

// Kruskal: Generate a minimum-cost suggested network
app.get(
    '/api/connections/recommendation-tree',
    authMiddleware,
    getRecommendationTree
);
app.post(
    '/api/algorithms/sum-of-subsets',
    authMiddleware,
    findSubsetsWithTargetSum
);
app.post(
    '/api/algorithms/travelling-salesman',
    authMiddleware,
    solveTravellingSalesman
);
// Red-Black Tree: Organize alumni by graduation year
app.get(
    '/api/algorithms/alumni-red-black-tree',
    authMiddleware,
    getAlumniRedBlackTree
);

// Connection management
app.post('/api/connections/request', authMiddleware, sendConnectionRequest);

app.put(
    '/api/connections/:connectionId/accept',
    authMiddleware,
    acceptConnectionRequest
);

app.delete(
    '/api/connections/:connectionId/cancel',
    authMiddleware,
    cancelConnectionRequest
);

// Get pending requests sent by the logged-in user
app.get(
    '/api/connections/pending',
    authMiddleware,
    getMyPendingRequests
);

// Get pending requests received by the logged-in user
app.get(
    '/api/connections/incoming',
    authMiddleware,
    getIncomingConnectionRequests
);

// Get accepted connections
app.get('/api/connections', authMiddleware, getMyConnections);

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

