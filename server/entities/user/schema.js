import { makeExecutableSchema } from 'graphql-tools'
import resolvers from './resolvers'

const typeDefs = `
  type Query {
    currentUser: User
    user(username: String!): User
  }

  type Mutation {
    login(username: String!, password: String!): User
    signup(username: String!, email: String!, password: String!): User
    logout: User
    active(username: String!, active_code: String!): User
    sendmail(email: String!): User
  }

  type User {
    id: ID!,
    username: String!,
    email: String,
    createdAt: String
  }
`

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

export default schema
