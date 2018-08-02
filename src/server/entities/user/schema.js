import { makeExecutableSchema } from 'graphql-tools'
import resolvers from './resolvers'

const typeDefs = `
  type Query {
    currentUser: User
    user(username: String!): User
  }

  type Mutation {
    login(username: String!, password: String!): User
    signup(username: String!, email: String!, password: String!, code: String!): User
    logout: User
    activation(username: String!, activationCode: String!): User
    sendActivationMail(email: String!): User
  }

  type User {
    id: ID!,
    username: String!,
    email: String,
    createdAt: String,
    notificationCount: Int
  }
`

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

export default schema
