const User = require('../models/User');

// Get the alumni directory
const getAlumniDirectory = async (req, res) => {
    try {
        // Read filters from the query string
        const {
            department,
            graduationYear,
            company,
            skills
        } = req.query;

        // Build the search criteria
        const filter = {
            role: 'alumni'
        };

        // Apply the department filter if provided
        if (department) {
            filter.department = {
                $regex: department,
                $options: 'i'
            };
        }

        // Apply the graduation year filter if provided
        if (graduationYear !== undefined) {
            const year = Number(graduationYear);

            if (!Number.isInteger(year) || year < 1900) {
                return res.status(400).json({
                    message: 'Graduation year must be a valid year'
                });
            }

            filter.graduationYear = year;
        }

        // Apply the company filter if provided
        if (company) {
            filter.company = {
                $regex: company,
                $options: 'i'
            };
        }

        // Apply the skills filter if provided
        if (skills) {
            filter.skills = {
                $regex: skills,
                $options: 'i'
            };
        }

        // Retrieve matching alumni
        const alumni = await User.find(filter)
            .select('-password')
            .sort({ name: 1 });

        return res.status(200).json({
            message: 'Alumni directory retrieved successfully',
            count: alumni.length,
            alumni
        });
    } catch (error) {
        console.error('Get alumni directory error:', error.message);

        return res.status(500).json({
            message: 'Failed to retrieve alumni directory'
        });
    }
};

module.exports = { getAlumniDirectory };