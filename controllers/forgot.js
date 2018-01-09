const sgMail = require('@sendgrid/mail')
const shortid = require('shortid')
const bcrypt = require('bcrypt')
const { sendGridAPIKey } = require('../conf')
const UserModel = require('../models/users')
const isProd = process.env.NODE_ENV === 'production'

exports.sendToken = async (req, res) => {
  try {
    const email = req.body.email
    const user = await UserModel.get(email)

    if (user) {
      const token = shortid.generate()
      const resetToken = await bcrypt.hash(token, 10)

      await UserModel.update(email, { resetToken })

      const url = isProd ? 'https://monarqapp.com/forgot' : 'http://localhost:8080/forgot'
      const mail = {
        to: email,
        from: 'hello@monarqapp.com',
        subject: 'Monarq - Reset your password',
        html: '<strong>Forgot your password?</strong> <br> Click on this link: '+url+'?token='+token+'&email='+email
      }
      sgMail.setApiKey(sendGridAPIKey)
      return sgMail.send(mail)
      .then(() => res.json({result: 'mail sent'}))

    } else {
      return res.json({error:'User does not exist'})
    }
  } catch(err) {
    console.log(err)
    return res.json({error:'Internal Error'})
  }
}

exports.update = async (req, res) => {
  try {
    const email = req.body.email
    const token = req.body.token
    const newPassword = req.body.password
    const user = await UserModel.get(email)

    if (user) {
      const same = await bcrypt.compare(token, user.resetToken)
      if (same) {
        const password = await bcrypt.hash(newPassword, 10)
        await UserModel.update(email, {password})
        return res.json({result: 'password updated'})
      } else {
        return res.json({error:'Invalid reset token'})
      }
    } else {
      return res.json({error:'User does not exist'})
    }
  } catch (err) {
    console.log(err)
    return res.json({error:'Internal Error'})
  }
}
