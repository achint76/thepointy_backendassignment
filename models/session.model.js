
const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    loginTime: {
        type: Date,
        default: Date.now
    },
    logoutTime: {
        type: Date,
        default: null
    },
    ipAddress: {
        type: String,
        required: true
    }
},
    { timestamps: true });

module.exports = mongoose.model('Session', sessionSchema);

