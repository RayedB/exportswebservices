const { GraphQLString, GraphQLList,GraphQLObjectType,GraphQLNonNull, GraphQLSchema } = require('graphql')
const CompanyModel = require('./models/companies')

const CompanyType = new GraphQLObjectType({
  name: 'Company',
  fields: () => ({
   name: {type: new GraphQLNonNull(GraphQLString)},
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
        name: { type: GraphQLString }
      },
      resolve(_, { name }) {
        return CompanyModel.addOne({name})
        .then(res => ({name}))
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
