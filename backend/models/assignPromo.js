const mongoose = require('mongoose');

const assignPromoSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    promocode: {
        type: Array
    }
});

module.exports = new mongoose.model('AssignPromocode', assignPromoSchema);