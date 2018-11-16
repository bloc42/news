import { makeExecutableSchema } from 'graphql-tools'
import resolvers from './resolvers'

const typeDefs = `
  type Query {
    etherAccount(address: String!): EtherAccount
  }

  type Mutation {
    addEtherAccount(address: String!, username: String!): EtherAccount
    removeEtherAccount(address: String!): Boolean
    changeEtherAccountStatus(address:String!, status:Int!): EtherAccount
  }

  type EtherAccount {
    id: ID!,
    address: String!,
    username: String!,
    status: Int,
    createdAt: String,
    updatedAt: String
  }
`

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

export default schema
