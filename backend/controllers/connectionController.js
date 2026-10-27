
const Connection = require('../models/Connection');
const User = require('../models/User');

// Send a connection request
const sendConnectionRequest = async (req, res) => {
    try {
        const { userId } = req.body;
        const currentUserId = req.user.userId;

        if (!userId) {
            return res.status(400).json({
                message: 'User ID is required',
            });
        }

        if (currentUserId.toString() === userId.toString()) {
            return res.status(400).json({
                message: 'You cannot send a connection request to yourself',
            });
        }

        const targetUser = await User.findById(userId);

        if (!targetUser) {
            return res.status(404).json({
                message: 'User not found',
            });
        }

        const existingConnection = await Connection.findOne({
            $or: [
                { user1: currentUserId, user2: userId },
                { user1: userId, user2: currentUserId },
            ],
        });

        if (existingConnection) {
            return res.status(400).json({
                message: 'A connection request already exists between these users',
            });
        }

        const connection = await Connection.create({
            user1: currentUserId,
            user2: userId,
            status: 'pending',
        });

        return res.status(201).json({
            message: 'Connection request sent successfully',
            connection,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error sending connection request',
            error: error.message,
        });
    }
};

// Accept a connection request received by the logged-in user
const acceptConnectionRequest = async (req, res) => {
    try {
        const { connectionId } = req.params;
        const currentUserId = req.user.userId;

        const connection = await Connection.findById(connectionId);

        if (!connection) {
            return res.status(404).json({
                message: 'Connection request not found',
            });
        }

        if (connection.user2.toString() !== currentUserId.toString()) {
            return res.status(403).json({
                message: 'You are not authorized to accept this request',
            });
        }

        if (connection.status !== 'pending') {
            return res.status(400).json({
                message: 'This connection request is no longer pending',
            });
        }

        connection.status = 'accepted';
        await connection.save();

        return res.status(200).json({
            message: 'Connection request accepted successfully',
            connection,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error accepting connection request',
            error: error.message,
        });
    }
};

// Cancel a connection request sent by the logged-in user
const cancelConnectionRequest = async (req, res) => {
    try {
        const { connectionId } = req.params;
        const currentUserId = req.user.userId;

        const connection = await Connection.findById(connectionId);

        if (!connection) {
            return res.status(404).json({
                message: 'Connection request not found',
            });
        }

        if (connection.user1.toString() !== currentUserId.toString()) {
            return res.status(403).json({
                message: 'You can only cancel requests you have sent',
            });
        }

        if (connection.status !== 'pending') {
            return res.status(400).json({
                message: 'Only pending connection requests can be cancelled',
            });
        }

        await Connection.findByIdAndDelete(connectionId);

        return res.status(200).json({
            message: 'Connection request cancelled successfully',
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error cancelling connection request',
            error: error.message,
        });
    }
};

// Get pending requests sent by the logged-in user
const getMyPendingRequests = async (req, res) => {
    try {
        const currentUserId = req.user.userId;

        const requests = await Connection.find({
            user1: currentUserId,
            status: 'pending',
        })
            .populate(
                'user2',
                'name email role department graduationYear company skills'
            )
            .sort({ createdAt: -1 });

        return res.status(200).json({
            message: 'Pending connection requests retrieved successfully',
            count: requests.length,
            requests,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error retrieving pending connection requests',
            error: error.message,
        });
    }
};

// Get pending requests received by the logged-in user
const getIncomingConnectionRequests = async (req, res) => {
    try {
        const currentUserId = req.user.userId;

        const requests = await Connection.find({
            user2: currentUserId,
            status: 'pending',
        })
            .populate(
                'user1',
                'name email role department graduationYear company skills'
            )
            .sort({ createdAt: -1 });

        return res.status(200).json({
            message: 'Incoming connection requests retrieved successfully',
            count: requests.length,
            requests,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error retrieving incoming connection requests',
            error: error.message,
        });
    }
};

// Get accepted connections of the logged-in user
const getMyConnections = async (req, res) => {
    try {
        const currentUserId = req.user.userId;

        const connections = await Connection.find({
            $or: [
                { user1: currentUserId, status: 'accepted' },
                { user2: currentUserId, status: 'accepted' },
            ],
        })
            .populate(
                'user1',
                'name email role department graduationYear company skills'
            )
            .populate(
                'user2',
                'name email role department graduationYear company skills'
            )
            .sort({ updatedAt: -1 });

        const formattedConnections = connections.map((connection) => {
            const isUser1 =
                connection.user1._id.toString() === currentUserId.toString();

            return {
                _id: connection._id,
                status: connection.status,
                createdAt: connection.createdAt,
                updatedAt: connection.updatedAt,
                user: isUser1 ? connection.user2 : connection.user1,
            };
        });

        return res.status(200).json({
            message: 'Connections retrieved successfully',
            count: formattedConnections.length,
            connections: formattedConnections,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error retrieving connections',
            error: error.message,
        });
    }
};

module.exports = {
    sendConnectionRequest,
    acceptConnectionRequest,
    cancelConnectionRequest,
    getMyPendingRequests,
    getIncomingConnectionRequests,
    getMyConnections,
};

