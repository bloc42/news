import { makeExecutableSchema } from 'graphql-tools'
import resolvers from './resolvers'

const typeDefs = `
  type Query {
    InvitationCodeByCode(code: String!): InvitationCode
  }

  type Mutation {
    sendInvitationMail(emails: [String!]): Codes
  }
  
  type Codes {
    invitationCodes: [InvitationCode]!
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
