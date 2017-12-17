const { GraphQLString, GraphQLList,GraphQLObjectType,GraphQLNonNull, GraphQLSchema } = require('graphql')
const CompanyModel = require('./models/companies')

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
   password: {type: new GraphQLNonNull(GraphQLString)}
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
        if (!users.length) throw 'At least one user is required'
        return CompanyModel.addOne({name, users})
        .then(res => (res))
        .catch(err => {
           if (err.code == 11000) {
             throw 'Company already exists'
           } else {
             console.log(err)
             throw 'Internal Error'
           }
        })
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
