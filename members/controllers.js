const Member = require('./member')
module.exports = {
  async registerMember (req, res, next) {
    // please validate the following inputs
    try {
      const member = new Member(req.body)
      const user = await member.save()
      res.json({
        message: 'Successfully created user',
        user
      })
      
    } catch (x) {
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

    try {
      req.body.password = await Member.hashPassword(req.body.password)
      let updatedMember = await Member.updateOne({ _id: id }, req.body)
      res.json({
        message: 'Successfully set up your login details',
        member: updatedMember
      })
    } catch (error) {
      res.status(500).json({ message: 'An unexpected error occured '})
    }
  },

  async login (req, res, next) {
    if (await Member.login(req.body)) {
      res.json({
        message: 'successfully logged in'
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