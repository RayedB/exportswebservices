const UserModel = require('../models/users')

exports.saveMethod = async(req, res) => {
  try {
  if (!req.body.token) throw 'No token'
    await UserModel.update(req.user.email, {paymentMethod: req.body.token})
    res.json({result: 'Payment method added'})
  } catch (error) {
    console.log(error)
    return res.json({error})
  }
}
