const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { secret } = require('../conf')
const UserModel = require('../models/users')
const CompanyModel = require('../models/companies')

function login(req, res) {
  const email = req.body.email
  const password = req.body.password

  UserModel.get(email)
  .then(user => {
    if (user) {
      return bcrypt.compare(password, user.password)
      .then(async result => {
        if (result) {
          const company = await CompanyModel.getByUser(email)
          const userInfo = {
            id:user._id,
            admin: user.admin,
            company: company.name
          }
          const token = jwt.sign(userInfo, secret, { expiresIn: '7d' })
          return res.json({token})
        }
        return res.json({error:'Wrong password'})
      })
    } else {
      return res.json({error:'User does not exist'})
    }
  })
  .catch(err => {
    console.log(err)
    return res.json({error:'Internal Error'})
  })
}
module.exports = login
