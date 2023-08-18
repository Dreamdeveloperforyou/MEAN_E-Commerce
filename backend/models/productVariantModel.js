const mongoose = require('mongoose');

const variantSchema = new mongoose.Schema({
    name: { type: String },
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', required: true
    },
    price: { type: Number },
    quantity: { type: Number },
    colour: { type: String },
    colour_image: { type: String },
    variant_image: { type: Array }
});

module.exports = mongoose.model('Product-Variant', variantSchema);