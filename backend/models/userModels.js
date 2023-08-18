const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    address: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    phone_number: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: Number,
        default: 1
    }
});

module.exports = mongoose.model('User', userSchema);