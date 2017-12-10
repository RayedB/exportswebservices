const { GraphQLString, GraphQLList,GraphQLObjectType,GraphQLNonNull, GraphQLSchema } = require('graphql');

const Companies = [{'id':0, 'name':'Google'},{'id':1,'name':'Algolia'}]

const CompanyType = new GraphQLObjectType({
  name: 'Company',
  description: '',
  fields: () => ({
    id: {type: new GraphQLNonNull(GraphQLString)},
    name: {type: new GraphQLNonNull(GraphQLString)},
  })
})

const QueryRootType = new GraphQLObjectType({
  name: 'Schema',
  description: '',
  fields: () => ({
    companies: {
      type: new GraphQLList(CompanyType),
      description: 'List of companies',
      resolve: () => Companies
    }
  })
});

// This is the schema declaration
const Schema = new GraphQLSchema({
  query: QueryRootType
})

module.exports = Schema
