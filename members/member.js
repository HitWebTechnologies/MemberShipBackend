const sgMail = require("@sendgrid/mail");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
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

  async comparePasswords (password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword)
  },

  isVerificationTokenValid (token) {
    return jwt.verify(token, process.env.JWT_SECRET)
  },

  signJWTtoken (emailAddress) {
    return jwt.sign({ emailAddress }, process.env.JWT_SECRET)
  },

  sendVerificationEmail (user) {
    const { fullName, emailAddress, _id } = user
    console.log('Receceived email', emailAddress)
    console.log('Receceived id', _id)
    const token = jwt.sign({ emailAddress, id: _id }, process.env.JWT_SECRET)
    const url = `http://app.hitwebtech.co.zw/register-login?verificationToken=${token}`
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: emailAddress,
      from: 'hitwebtechnologies@gmail.com',
      subject: 'Verify your HitWebTech account',
      html: `
        <div style="background-color: #f9fbff;border-top: 3px green solid; padding: 10px; font-size: 16px; line-height: 22.4px">
        <div style="padding: 10px; background-color: #fff; border-radius: 5px; margin: 10px 0; color:#fff; text-align: center">
        Please note that this account was created by a beta version of the registration system and will be deleted today. Make sure you create your real account when the stable version is released
        </div>
          <div style="padding: 10px; background-color: #fff; border-radius: 5px" >
            <h3>Hi ${fullName}</h3>
            <p>Thank you for joining HIT Web Technologies. </p>
            <p>You are just left with verifying your account.</p>
            <div style="margin-top: 40px; margin-bottom: 40px">
              <a style="padding: 16px 24px; border-radius: 4px; background-color:#38c172; color: #fff; text-decoration: none;" href="${url}">Click here and be verified :)</a>
            </div>
            <p>Or you can paste this link in the browser <br> <a href="${url}">${url}</a></p>
          </div>

          <div style="border-top: 2px grey solid; padding: 10px; padding-top: 10px; margin-top:10px">
            <a style="padding: 16px 24px; border-radius: 4px; background-color:#1da1f2; color: #fff; text-decoration: none; margin-right: 30px" href="https://twitter.com/HitWebTech">Follow @HitWebTech</a>
            <a href="https://hitwebtech.co.zw">www.hitwebtech.co.zw</a>
          </div>
        </div>
        `,
    };
    sgMail.send(msg);

    return token
  }
}

module.exports = mongoose.model('Member', schema)