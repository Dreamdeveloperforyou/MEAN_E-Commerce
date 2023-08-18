const mongoose = require('mongoose');

const taxSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    tax:{
        type:Number,
        required:true
    }
});

module.exports = new mongoose.model('Tax',taxSchema);