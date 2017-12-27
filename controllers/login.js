const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { secret } = require('../conf')
const UserModel = require('../models/users')

function login(req, res) {
  const email = req.body.email
  const password = req.body.password

  UserModel.get({email})
  .then(user => {
    if (user) {
      return bcrypt.compare(password, user.password)
      .then(result => {
        if (result) {
          const token = jwt.sign({id:user._id}, secret, { expiresIn: '48h' })
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
