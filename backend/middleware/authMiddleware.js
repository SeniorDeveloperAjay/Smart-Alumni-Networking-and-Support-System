const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    try {
        // Get the authorization header
        const authHeader = req.headers.authorization;

        // Check whether a token was provided
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                message: 'Authentication token is required'
            });
        }

        // Extract the token
        const token = authHeader.split(' ')[1];

        // Verify the token
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // Store authenticated user information in the request
        req.user = {
            userId: decoded.userId,
            role: decoded.role
        };

        // Continue to the protected route
        next();

    } catch (error) {
        return res.status(401).json({
            message: 'Invalid or expired authentication token'
        });
    }
};

module.exports = authMiddleware;