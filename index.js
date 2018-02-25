const express = require('express')
const graphqlHTTP = require('express-graphql')
const BodyParser = require('body-parser')
const cors = require('cors')
const { connectDb } = require('./db')
const schema = require('./schema')
const router = require('./router')

const port = 4000

  const app = express()

  app.use(BodyParser.json({ limit: '250mb' }))
  app.use(BodyParser.urlencoded({ limit: '250mb', extended: true }))
  app.use(cors())

  connectDb()
  .then(() => {
      app.use('/api/', router)

    // GraphQL API
    // app.use('/api', graphqlHTTP({
    //   schema,
    //   graphiql: false
    // }))

    app.listen(port)
    console.log('App running on port ',port)
  })
  .catch(err => console.log('failed to connect DB',err))
