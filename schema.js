const { GraphQLString, GraphQLList,GraphQLObjectType,GraphQLNonNull, GraphQLSchema } = require('graphql');
const CompanyModel = require('./models/companies')
const Companies = [{'name':'Google'},{'name':'Algolia'}]

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
      resolve: () => Companies
    },
    company: {
      type: CompanyType,
      args: {
        name: { type: GraphQLString }
      },
      resolve: (_, { name }) => {
        const filter = Companies.filter(comp => comp.name == name)
        if (filter.length) return filter[0]
        else throw 'Company does not exist'
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
        console.log(name)
        return CompanyModel.addOne(name)
        .then(() => {name})
        .catch(err => {
          console.log(err)
          throw 'Internal Error'
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
