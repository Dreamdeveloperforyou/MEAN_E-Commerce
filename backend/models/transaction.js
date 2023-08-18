const moogoose = require('mongoose');

const transactionSchema = new moogoose.Schema({
  transaction_id: { type:String },
  name:           { type:String },
  email:          { type:String },
  total_amount:   { type:Number },
  currency:       { type:String },
  createdAt:      { type:Date   },
  status:         { type:String },
});

module.exports = moogoose.model('transaction',transactionSchema);
