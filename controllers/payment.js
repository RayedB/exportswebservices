const UserModel = require('../models/users')
const { stripeAPIKey } = require('../conf')
const stripe = require("stripe")(stripeAPIKey)


exports.createCustomer = async(req, res) => {
  try {
  if (!req.body.token) throw 'No token'
    const customer = await stripeCreateCustomer(req.user.email, req.body.token)
    await UserModel.update(req.user.email, {
      paymentMethod: req.body.token,
      stripeId: customer.id
    })
    res.json({result: customer})
  } catch (error) {
    console.log(error)
    return res.json({error})
  }
}

async function stripeCreateCustomer(email, token) {
  try {
    const customer = await stripe.customers.create({
      description: 'Customer for '+ email,
      source: token
    })
    return customer
  } catch (err) {
    return err
  }
}
