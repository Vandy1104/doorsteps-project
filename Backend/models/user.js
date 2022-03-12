const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  _id : mongoose.Schema.Types.ObjectId,
  radioInput:String,
  firstName : String,
  lastName : String,
  address: String,
  email : String,
  phone : Number
});

module.exports = mongoose.model('User', userSchema);
