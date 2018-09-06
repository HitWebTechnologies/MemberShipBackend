const mongoose = require('mongoose')
const schema = new mongoose.Schema({
  fullName: String,
  emailAddress: String,
  regNumber: String,
  phoneNumber: String,
  level: String,
  degreeProgram: String,
  username: String,
  password: String
})

schema.statics = {
  isIdValid (id) {
    return mongoose.Types.ObjectId.isValid(id)
  }
}

module.exports = mongoose.model('Member', schema)