const { GraphQLString, GraphQLList,GraphQLObjectType,
  GraphQLNonNull, GraphQLSchema } = require('graphql')
const sgMail = require('@sendgrid/mail')
const { sendGridAPIKey } = require('./conf')
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
      resolve: (_, args, context) => {
        checkAdmin(context.user)
        return CompanyModel.getAll()
      }
    },
    company: {
      type: CompanyType,
      args: {
        name: { type: GraphQLString }
      },
      resolve: (_, { name }, context) => {
        checkAccess(context.user,name)
        return CompanyModel.get(name)
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
    inviteUser: {
      type: GraphQLString,
      args: {
        email: { type: GraphQLString }
      },
      resolve: async (_, { email }, context) => {
        checkAccessRoleAdmin(context.user)
        if (!checkEmail(email)) throw 'invalid email'
        await CompanyModel.addUser(email)
        // TODO MAYBE BETTER WITH MAILCHIMP
        const mail = {
          to: email,
          from: 'hello@monarqapp.com',
          subject: 'You\'ve been invited to work on Monarq',
          html: '<strong>'+context.user.email+' invited you to work on Monarq.</strong> <br> Register now!'
        }
        sgMail.setApiKey(sendGridAPIKey)
        await sgMail.send(mail)
        return 'invite successful'
      }
    }
  }
})
// const mutation = new GraphQLObjectType({
//   name: 'Mutation',
//   fields: {
//     addCompany: {
//       type: CompanyType,
//       args: {
//         name: { type: GraphQLString },
//         users: { type: new GraphQLList(GraphQLString) }
//       },
//       resolve(_, { name, users }) {
//        // Route to be removed
//       }
//     },
//     addUser: {
//       type: UserType,
//       args: {
//         email: { type: GraphQLString },
//         password: { type: GraphQLString }
//       },
//       resolve(_, { email, password }) {
//         // route to be removed
//       }
//     },
//     logUser: {
//       type: GraphQLString,
//       args: {
//         email: { type: GraphQLString },
//         password: { type: GraphQLString }
//       },
//       resolve(_, { email, password }) {
//         // route to be removed
//       }
//     }
//   }
// })

function checkAdmin(user) {
  if (!user || !user.superAdmin) throw 'Unauthorized'
}

function checkAccess(user, company) {
  if (!user) throw 'Unauthorized'
  if (user.company !== company && !user.superAdmin) throw 'Unauthorized'
}

function checkAccessRoleAdmin(user) {
  if (!user) throw 'Unauthorized'
  if (!user.admin) throw 'Unauthorized'
}
// This is the schema declaration
const Schema = new GraphQLSchema({
  query
//  mutation
})

module.exports = Schema
