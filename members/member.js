const mongoose = require('mongoose')
const schema = new mongoose.Schema({
  fullName: String,
  emailAddress: String,
  regNumber: String,
  phoneNumber: String,
  level: String,
  degree: String,
  username: String,
  password: String
})

schema.statics.isIdValid = mongoose.Types.ObjectId.isValid
module.exports = mongoose.model('Member', schema)