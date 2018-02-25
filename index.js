const express = require('express')
const graphqlHTTP = require('express-graphql')
const BodyParser = require('body-parser')
const Cors = require('cors')
const { connectDb } = require('./db')
const schema = require('./schema')
const register = require('./controllers/register')
const login = require('./controllers/login')
const auth = require('./controllers/auth')
const forgotPassword = require('./controllers/forgot')
const payment = require('./controllers/payment')
const port = 4000

  const app = express()

  app.use(BodyParser.json({ limit: '250mb' }))
  app.use(BodyParser.urlencoded({ limit: '250mb', extended: true }))
  app.use(Cors())

  connectDb()
  .then(() => {
    // REST Routes
    // register & login
    app.post('/api/register/company',register.company)
    app.post('/api/register/user',register.user)
    app.post('/api/login',login)
    // reset password
    app.post('/api/forgot/send', forgotPassword.sendToken)
    app.post('/api/forgot/update', forgotPassword.update)

    // Auth middleware
    app.use(auth)

    app.post('/api/payment/customer', payment.createCustomer)
    app.post('/api/payment/subscribe', payment.subscribeCustomer)


    // GraphQL API
    app.use('/api', graphqlHTTP({
      schema,
      graphiql: false
    }))

    app.listen(port)
    console.log('App running on port ',port)
  })
  .catch(err => console.log('failed to connect DB',err))
