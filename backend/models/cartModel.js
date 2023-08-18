const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true,
    },
    variant_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product-Variant'
    },
    quantity: { type: Number, default: 1 },
    total : {type : Number}
});


module.exports = mongoose.model('Cart', cartSchema); 
