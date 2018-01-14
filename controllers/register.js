const bcrypt = require('bcrypt')
const axios = require('axios')
const CompanyModel = require('../models/companies')
const UserModel = require('../models/users')
const { mailChimp } = require('../conf')
const { checkEmail } = require('../helper')

exports.company = async (req, res) => {
  if (!req.body.name) return res.json({error:'company name is required'})
  if (!req.body.user) return res.json({error:'User is required'})

  const user = req.body.user
  // verify that user is an email
  if (!checkEmail(user)) {
    return res.json({error:'email address invalid'})
  }

  try {

    const company = await CompanyModel.getByUser(user)
    if (!company) {

      const companyToAdd = {
        name: req.body.name,
        users: [user],
        isReviewed: false,
        telephone: req.body.telephone || null
      }

      await CompanyModel.add(companyToAdd)
      res.json({result: 'Company added'})

    } else {
      return res.json({error:'User already belong to a company'})
    }

  } catch(err) {
    if (err.code == 11000) {
      return res.json({error:'Company already exists'})
    } else {
      console.log(err)
      return res.json({error:'Internal Error'})
    }
  }
}

exports.user = async (req, res) => {
  const email = req.body.email
  const password = req.body.password

  try {
    const company = await CompanyModel.getByUser(email)

    if (company) {

    } else {
      return res.json({error: 'User does not belong to any company'})
    }
      } catch(err) {
    console.log(err)
    res.json({error: 'Internal Error'})
  }


  // CompanyModel.getUsers()
  // .then(users => {
  //   if (users.some(u => u === email)) {
  //     let role = 'basic'
  //     return bcrypt.hash(password, 10)
  //     .then(hash => UserModel.add({ email, password:hash, admin:false, role })
  //     .then(result => {
  //
  //       const mailChimpUrl = 'https://' + mailChimp.instance + '.api.mailchimp.com/3.0/lists/' + mailChimp.listId + '/members/'
  //       const headers = {'Authorization' : 'Basic '+mailChimp.apiKey}
  //
  //       axios.post(mailChimpUrl,
  //         {'email_address': email,'status': 'subscribed'},
  //         { headers })
  //       .catch(err => console.log('mailchimp error ',err))
  //
  //       delete result.password
  //       res.json({result})
  //     }))
  //     .catch(err => {
  //       if (err.code == 11000) {
  //         return res.json({error:'User already exists'})
  //       }
  //       throw err
  //     })
  //   } else {
  //     return res.json({error:'User does not belong to any company'})
  //   }
  // })
  // .catch(err => {
  //     console.log(err)
  //     return res.json({error:'Internal Error'})
  // })
}
