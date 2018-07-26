import { makeExecutableSchema } from 'graphql-tools'
import resolvers from './resolvers'

const typeDefs = `
  type Query {
    notifications: [Notification]
  }

  type Notification {
    id: ID!,
    from: String!,
    to: String!,
    postId: ID!,
    postTitle: String!,
    commentId: ID!
  }
`

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

export default schema
