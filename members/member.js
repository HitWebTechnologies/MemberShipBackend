const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const schema = new mongoose.Schema({
  fullName: String,
  gender: String,
  emailAddress: String,
  regNumber: String,
  phoneNumber: String,
  level: String,
  degreeProgram: String,
  username: String,
  password: String,
  twitterHandle: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
})

schema.statics = {
  isIdValid (id) {
    return mongoose.Types.ObjectId.isValid(id)
  },

  async hashPassword (password) {
    return bcrypt.hash(password, 10)
  },

  login (credentials) {
    // do check the suplied credentials against those in the db
    return true
  }
}
module.exports = mongoose.model('Member', schema)