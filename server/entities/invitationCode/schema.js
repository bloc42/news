import { makeExecutableSchema } from 'graphql-tools'
import resolvers from './resolvers'

const typeDefs = `
  type Query {
  }

  type Mutation {
    sendInvitationMail(email: String!, invitor:String!): InvitationCode
  }

  type InvitationCode {
    id: ID!
    invitor: String!
  }
`

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

export default schema
