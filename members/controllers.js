const Member = require('./member')
module.exports = {
  async registerMember (req, res, next) {
    // please validate the following inputs
    try {
      req.body.regNumber = req.body.regNumber ? req.body.regNumber.toLowerCase() : ''
      const member = new Member(req.body)
      const user = await member.save()
      Member.sendVerificationEmail(user)
      res.json({
        message: 'Successfully created user',
        user
      })
      
    } catch (x) {
      if (x.code === 11000) {
        res.status(409).json({
          message: `Account with regnumber ${req.body.regNumber} already exists`
        })
      }
      res.status(500).json({
        message: 'An error occured and we could not create user'
      })
    }

  },

  async registerMemberLogin (req, res, next) {
    const { id = '' } = req.params
    if (!Member.isIdValid(id)) {
      return res.status(400).json({ message: 'Invalid id' })
    }

    if (!Member.isVerificationTokenValid(req.body.verificationToken)) {
      return res.status(401).json({ message: 'Invalid Verification Token' })
    }

    try {
      req.body.password = await Member.hashPassword(req.body.password)
      let updatedMember = await Member.updateOne({ _id: id }, {
        ...req.body,
        isVerified: true
      })
      res.json({
        message: 'Successfully set up your login details',
        member: updatedMember
      })
    } catch (error) {
      res.status(500).json({ message: 'An unexpected error occured '})
    }
  },

  async login (req, res, next) {
    try {
      const { regNumber = '', password } = req.body
      const member = await Member.findOne({ regNumber: regNumber.toLowerCase() })
      // member exists
      if (member) {
        if (await Member.comparePasswords(password, member.password)) {
          delete member.password
          res.json({
            message: 'successfully logged in',
            member,
            token: Member.signJWTtoken(member.emailAddress)
          })
        } else {
          res.status(401).json({
            message: 'Invalid login details. Try again'
          })
        }
      } else {
        res.status(401).json({
          message: 'Invalid login details. Try again'
        })
      }
    } catch (error) {
      res.status(500).json({
        message: 'Something nasty happened.'
      })
    }
  },


  async getAllMembers (req, res, next) {
    try {
      const members = await Member.find({})
      res.json({
        members
      })
    } catch (err) {
      res.status(500).json({ message: 'An unexpected error occured '})
    }
  }
}