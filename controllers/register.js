const CompanyModel = require('../models/companies')
const UserModel = require('../models/users')
const bcrypt = require('bcrypt')

exports.company = (req, res) => {
  if (!req.body.name) return res.json({error:'company name is required'})
  if (!req.body.user) return res.json({error:'User is required'})

  const user = req.body.user
  // verify that user is an email
  if (!user.match(/^[a-zA-Z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/)) {
    return res.json({error:'user email address invalid'})
  }
  const company = {
    name: req.body.name,
    users: [user],
    isReviewed: false,
    telephone: req.body.telephone || null
  }
   CompanyModel.add(company)
  .then(() => res.json({result: 'Company added'}))
  .catch(err => {
     if (err.code == 11000) {
       return res.json({error:'Company already exists'})
     } else {
       console.log(err)
       return res.json({error:'Internal Error'})
     }
  })
}

exports.user = (req, res) => {
  const email = req.body.email
  const password = req.body.password

  CompanyModel.getUsers()
  .then(users => {
    if (users.some(u => u === email)) {
      return bcrypt.hash(password, 10)
      .then(hash => UserModel.add({ email, password:hash })
      .then(result => {
        // TODO send email !
        delete result.password
        res.json({result})
      }))
      .catch(err => {
        if (err.code == 11000) {
          return res.json({error:'User already exists'})
        }
        throw err
      })
    } else {
      return res.json({error:'User does not belong to any company'})
    }
  })
  .catch(err => {
      console.log(err)
      return res.json({error:'Internal Error'})
  })
}
