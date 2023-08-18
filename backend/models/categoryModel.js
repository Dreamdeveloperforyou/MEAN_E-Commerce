const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        // unique: true
    },
    parent_id: {
        type: mongoose.Schema.Types.Mixed,
        ref: 'Category',
        default:null
    },
    category_image: { type: String, default:'no_image' }
});


module.exports = mongoose.model('Category', categorySchema); 