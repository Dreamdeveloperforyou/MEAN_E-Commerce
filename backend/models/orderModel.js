const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.Mixed,
        ref: 'User',
        required: true,
    },
    products: [{ variant_id: { type: String, required: true }, quantity: { type: Number, required: true }, price: { type: Number, required: true } }],
    shippingAddress: { type: mongoose.Schema.Types.ObjectId, ref: 'ShippingAddress', required: true },
    total: { type: Number, required: true },
    status: { type: String, default: false, required: true }
});


module.exports = mongoose.model('Order', orderSchema);  