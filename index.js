const express = require('express')
const graphqlHTTP = require('express-graphql')
const { buildSchema } = require('graphql')
const { connectDb } = require('./db')
const schema = require('./schema')

  // The root provides a resolver function for each API endpoint
  const rootValue = {
    register: () => 'TODO',
    login: () => 'TODO'
  };

  const app = express()
  connectDb()
  .then(() => {
    app.use('/api', graphqlHTTP({
      schema,
      rootValue,
      graphiql: false,
    }))

    app.listen(4000)
    console.log('App running on port 4000')
  })
  .catch(err => console.log('failed to connect DB',err))
