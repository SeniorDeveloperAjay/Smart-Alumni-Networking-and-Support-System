const mongoose = require('mongoose');

const connectionSchema = new mongoose.Schema(
{
user1: {
type: mongoose.Schema.Types.ObjectId,
ref: 'User',
required: true
},


    user2: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending'
    }
},
{
    timestamps: true
}


);

module.exports = mongoose.model('Connection', connectionSchema);
