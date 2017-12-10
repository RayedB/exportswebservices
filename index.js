const express = require('express')
const graphqlHTTP = require('express-graphql')
const { buildSchema } = require('graphql')
const { connectDb } = require('./db')
// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    register: String,
    login: String
  }
  `)

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
      graphiql: true,
    }))

    app.listen(4000)
    console.log('App running on port 4000')
  })
  .catch(err => console.log('failed to connect DB',err))
