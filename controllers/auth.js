const jwt = require('jsonwebtoken')
const { secret } = require('../conf')

function auth(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send({error:'Unauthorized'})
  }
  const token = req.headers.authorization.replace('Bearer ','')
  try {
    const decoded = jwt.verify(token, secret)
    console.log(decoded)
    next()
  } catch (err) {
    console.log(err)
    return res.status(401).send({error:'Unauthorized'})
  }
}
module.exports = auth
