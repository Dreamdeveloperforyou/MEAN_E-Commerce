const mongoose = require('mongoose');

const assignTaxesSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    tax: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tax',
        required: true
    }
});

module.exports = new mongoose.model('AssignTax', assignTaxesSchema);