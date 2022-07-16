const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    imageURL: {
        type: String,
    },
    id: {
        type: String,
    }
}, {
    timestamps: true
})

module.exports = mongoose.models.User || mongoose.model('User', userSchema);