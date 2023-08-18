const mongoose = require('mongoose');

const variantAttributeSchema = new mongoose.Schema({
    variant_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product-Variant" },
    size: { type: String },
});



module.exports = mongoose.model('Variant-Attribute', variantAttributeSchema);