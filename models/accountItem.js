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
    timestamps: true,
    // enable virtual properties
    toJSON: {virtuals: true}
})

accountItemSchema.virtual('month').get(function () {
    const month = this.date.getMonth() + 1;
    return month;
})

accountItemSchema.virtual('year').get(function () {
    const year = this.date.getFullYear();
    return year;
})

module.exports = mongoose.models.AccountItem || mongoose.model('AccountItem', accountItemSchema);