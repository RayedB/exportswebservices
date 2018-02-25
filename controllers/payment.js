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


exports.subscribeCustomer = async (req, res) => {
  try {
    if (!req.body.plan) throw 'no plan'
    const user = await UserModel.get(req.user.email)
    if (!user.stripeId) throw 'user is not a stripe customer'
    const { data: plans } = await stripe.plans.list()
    const plansNames = plans.map(plan => plan.nickname)
    const filterPlans = plans.filter(plan => plan.nickname === req.body.plan)
    if (!filterPlans.length) throw 'Plan does not exist'

    const subscription = await stripe.subscriptions.create({
      customer: user.stripeId,
      items: [{plan: filterPlans[0].id}],
    })
    return res.json({result: subscription})

  } catch (err) {
    console.log(err)
    return res.json({ err })
  }
}

exports.webhook = (req, res) => {
  console.log(req.body)

  res.json('ok')
}
