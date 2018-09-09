const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const schema = new mongoose.Schema({
  fullName: String,
  gender: String,
  role: {
    type: String,
    default: 'member'
  },
  emailAddress: String,
  regNumber: {
    type: String,
    unique: true
  },
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
  },
  isVerified: {
    type: Boolean,
    default: false
  }
})

schema.statics = {
  isIdValid (id) {
    return mongoose.Types.ObjectId.isValid(id)
  },

  async hashPassword (password) {
    return bcrypt.hash(password, 10)
  },

  async login ({ regNumber, password}) {
    // do check the suplied credentials against those in the db
    try {
      const member = await this.find({ regNumber })
      // member exists
      if (member) {
        return (await bcrypt.compare(password, member.password))
      }
      return false
    } catch (error) {
      return false
    }
  }
}

module.exports = mongoose.model('Member', schema)