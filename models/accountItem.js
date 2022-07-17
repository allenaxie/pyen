const mongoose = require('mongoose');

const accountItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    value: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
}, {
    timestamps: true
})

module.exports = mongoose.models.AccountItem || mongoose.model('AccountItem', accountItemSchema);