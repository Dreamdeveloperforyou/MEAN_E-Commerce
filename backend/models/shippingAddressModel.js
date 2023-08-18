const mongoose = require('mongoose');

const shippingAddressSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.Mixed,
        ref: 'User',
    },
    country: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    pincode: {
        type: String,
        required: true
    },
    phone_number: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    default: {
        type: Boolean,
        required: true,
        default: false
    }
}); 



module.exports = mongoose.model('ShippingAddress', shippingAddressSchema);