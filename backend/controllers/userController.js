const User = require('../models/User');

// Get the logged-in user's profile
const getUserProfile = async (req, res) => {
    try {
        // Get the user ID from the verified JWT
        const user = await User.findById(req.user.userId)
            .select('-password');

        // Check whether the user exists
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        // Return the user's profile
        return res.status(200).json({
            message: 'Profile retrieved successfully',
            user
        });

    } catch (error) {
        console.error('Get profile error:', error.message);

        return res.status(500).json({
            message: 'Failed to retrieve user profile'
        });
    }
};
// Update the logged-in user's profile
const updateUserProfile = async (req, res) => {
    try {
        const { name, department, graduationYear, company, skills } = req.body;

        // Allow only these fields to be updated
        const allowedFields = {
            name,
            department,
            graduationYear,
            company,
            skills
        };

        // Remove fields that were not provided
        Object.keys(allowedFields).forEach((key) => {
            if (allowedFields[key] === undefined) {
                delete allowedFields[key];
            }
        });

        // Prevent empty update requests
        if (Object.keys(allowedFields).length === 0) {
            return res.status(400).json({
                message: 'Provide at least one field to update'
            });
        }

        // Validate the name if provided
        if (name !== undefined && (typeof name !== 'string' || !name.trim())) {
            return res.status(400).json({
                message: 'Name must be a non-empty string'
            });
        }

        // Validate skills if provided
        if (skills !== undefined &&
            (!Array.isArray(skills) ||
             !skills.every((skill) => typeof skill === 'string'))) {
            return res.status(400).json({
                message: 'Skills must be an array of strings'
            });
        }

        // Validate graduation year if provided
        if (graduationYear !== undefined &&
            graduationYear !== null &&
            (!Number.isInteger(graduationYear) || graduationYear < 1900)) {
            return res.status(400).json({
                message: 'Graduation year must be a valid year'
            });
        }

        // Trim text fields
        if (allowedFields.name !== undefined) {
            allowedFields.name = allowedFields.name.trim();
        }

        if (allowedFields.department !== undefined &&
            typeof allowedFields.department === 'string') {
            allowedFields.department = allowedFields.department.trim();
        }

        if (allowedFields.company !== undefined &&
            typeof allowedFields.company === 'string') {
            allowedFields.company = allowedFields.company.trim();
        }

        if (allowedFields.skills !== undefined) {
            allowedFields.skills = allowedFields.skills.map((skill) => skill.trim());
        }

        // Update only the logged-in user's profile
        const user = await User.findByIdAndUpdate(
            req.user.userId,
            { $set: allowedFields },
            { new: true, runValidators: true }
        ).select('-password');

        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        return res.status(200).json({
            message: 'Profile updated successfully',
            user
        });
    } catch (error) {
        console.error('Update profile error:', error.message);

        return res.status(500).json({
            message: 'Failed to update user profile'
        });
    }
};

module.exports = { getUserProfile, updateUserProfile };