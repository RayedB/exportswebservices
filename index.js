const express = require('express')
const graphqlHTTP = require('express-graphql')
const { connectDb } = require('./db')
const schema = require('./schema')
const port = 4000

  const app = express()
  connectDb()
  .then(() => {
    app.use('/api', graphqlHTTP({
      schema,
      graphiql: false
    }))

    app.listen(port)
    console.log('App running on port ',port)
  })
  .catch(err => console.log('failed to connect DB',err))
