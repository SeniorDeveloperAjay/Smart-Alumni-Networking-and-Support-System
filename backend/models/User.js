const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        password: {
            type: String,
            required: true
        },

        role: {
            type: String,
            enum: ['student', 'alumni', 'admin'],
            required: true
        },

        department: {
            type: String,
            default: ''
        },

        graduationYear: {
            type: Number,
            default: null
        },

        company: {
            type: String,
            default: ''
        },

        skills: {
            type: [String],
            default: []
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('User', userSchema);