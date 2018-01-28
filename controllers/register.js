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
        telephone: req.body.telephone || null,
        shipments: []
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
      let admin = false
      if (company.users.length === 1) admin = true
      const hash = await bcrypt.hash(password,10)
      const user = {
        email,
        password:hash,
        admin,
        company: company.name
      }
      await UserModel.add(user)
      // TODO send email via SendGrid
      res.json({result: 'User added'})

    } else {
      return res.json({error: 'User does not belong to any company'})
    }
  } catch(err) {
    if (err.code == 11000) {
      return res.json({error:'User already exists'})
    }
    console.log(err)
    res.json({error: 'Internal Error'})
  }
}
