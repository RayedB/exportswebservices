const { GraphQLString, GraphQLList,GraphQLObjectType,
  GraphQLNonNull, GraphQLSchema } = require('graphql')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { secret } = require('./conf')
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
        if (!users.length) throw 'At least one user is required'
        return CompanyModel.add({name, users})
        .then(res => res)
        .catch(err => {
           if (err.code == 11000) {
             throw 'Company already exists'
           } else {
             console.log(err)
             throw 'Internal Error'
           }
        })
      }
    },
    addUser: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(_, { email, password }) {
        return CompanyModel.getUsers()
        .then(users => {
          if (users.filter(u => u === email).length) {
            return bcrypt.hash(password, 10)
            .then(hash => UserModel.add({ email, password:hash })
            .then(res => {
              delete res.password
              return res
            }))
          } else {
            throw 'User does not belong to any company'
          }
        })
        .catch(err => {
          if (err.code == 11000) {
            throw 'User already exists'
          } else {
            throw err
          }
        })
      }
    },
    logUser: {
      type: GraphQLString,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(_, { email, password }) {
        return UserModel.get({email})
        .then(user => {
          if (user) {
            return bcrypt.compare(password, user.password)
            .then(res => {
              var toto = 'tot'
              if (res) return jwt.sign({id:user._id}, secret, { expiresIn: '6h' })
              throw 'Wrong password'
            })
          } else {
            throw 'User does not exists'
          }
        })
        .catch(err => { throw err })
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
