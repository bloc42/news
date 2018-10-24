import { makeExecutableSchema } from 'graphql-tools'
import resolvers from './resolvers'

const typeDefs = `
  type Query {
    vote: Vote
  }

  type Mutation {
    upvote(postId: ID!): Vote
    downvote(postId: ID!): Vote
  }

  type Vote {
    id:ID!,
    voterId: ID!,
    postId: ID!,
    upStatus: Boolean!,
    downStatus: Boolean!,
    author: String!
  }
`

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

export default schema
