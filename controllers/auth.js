
function auth(req, res, next) {
  console.log('Im the middleware!')
  next()
}
module.exports = auth
