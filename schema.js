<<<<<<< HEAD
const { GraphQLString, GraphQLList,GraphQLObjectType,GraphQLNonNull, GraphQLSchema } = require('graphql')
const CompanyModel = require('./models/companies')
=======
const { GraphQLString, GraphQLList,GraphQLObjectType,GraphQLNonNull, GraphQLSchema } = require('graphql');
const CompanyModel = require('./models/companies')
const Companies = [{'name':'Google'},{'name':'Algolia'}]
>>>>>>> 1d7f607b8e59cf221a87312d6deeaeab8ca9c69c

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
<<<<<<< HEAD
      resolve: () => CompanyModel.getAll()
=======
      resolve: () => Companies
>>>>>>> 1d7f607b8e59cf221a87312d6deeaeab8ca9c69c
    },
    company: {
      type: CompanyType,
      args: {
        name: { type: GraphQLString }
      },
      resolve: (_, { name }) => {
<<<<<<< HEAD
        return CompanyModel.get({name})
        .then(res => {
          if (res) return res
          throw 'Company does not exists'
        })
=======
        const filter = Companies.filter(comp => comp.name == name)
        if (filter.length) return filter[0]
        else throw 'Company does not exist'
>>>>>>> 1d7f607b8e59cf221a87312d6deeaeab8ca9c69c
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
<<<<<<< HEAD
        return CompanyModel.addOne({name})
        .then(res => ({name}))
        .catch(err => {
           if (err.code == 11000) {
             throw 'Company already exists'
           } else {
             console.log(err)
             throw 'Internal Error'
           }
=======
        console.log(name)
        return CompanyModel.addOne(name)
        .then(() => {name})
        .catch(err => {
          console.log(err)
          throw 'Internal Error'
>>>>>>> 1d7f607b8e59cf221a87312d6deeaeab8ca9c69c
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
