const mongoose = require('mongoose');

const wishListSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.Mixed,
        ref:'User',
        required: true,
    },
    products: {
        type: Array,
        ref: 'Product'
    }
});


module.exports = mongoose.model('Wishlist', wishListSchema);  