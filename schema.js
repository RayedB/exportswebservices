const { GraphQLString, GraphQLList,GraphQLObjectType,
  GraphQLNonNull, GraphQLSchema } = require('graphql')
const CompanyModel = require('./models/companies')
const UserModel = require('./models/users')

const CompanyType = new GraphQLObjectType({
  name: 'Company',
  fields: () => ({
   name: {type: new GraphQLNonNull(GraphQLString)},
   users: {type: new GraphQLList(GraphQLString)}
  })
})

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
   email: {type: new GraphQLNonNull(GraphQLString)},
   password: {type: GraphQLString}
  })
})

const query = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    companies: {
      type: new GraphQLList(CompanyType),
      resolve: () => CompanyModel.getAll()
    },
    company: {
      type: CompanyType,
      args: {
        name: { type: GraphQLString }
      },
      resolve: (_, { name }) => {
        return CompanyModel.get({name})
        .then(res => {
          if (res) return res
          throw 'Company does not exists'
        })
        }
    }
  })
})

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addCompany: {
      type: CompanyType,
      args: {
        name: { type: GraphQLString },
        users: { type: new GraphQLList(GraphQLString) }
      },
      resolve(_, { name, users }) {
       // Route to be removed
      }
    },
    addUser: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(_, { email, password }) {
        // route to be removed
      }
    },
    logUser: {
      type: GraphQLString,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(_, { email, password }) {
        // route to be removed
      }
    }
  }
})
// This is the schema declaration
const Schema = new GraphQLSchema({
  query,
  mutation
})

module.exports = Schema
