import { makeExecutableSchema } from 'graphql-tools'
import resolvers from './resolvers'

const typeDefs = `
  type Query {
    mail(email: String!):Mail
  }

  type Mutation {
    sendMail(email: String!, type:String!):Mail
  }

  type Mail {
      email:String!,
      type:String!
  }
`

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

export default schema
