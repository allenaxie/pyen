const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    value: {
        type: Number,
        required: true,
    }
}, {
    timestamps: true
})

module.exports = mongoose.models.Account || mongoose.model('Account', accountSchema);