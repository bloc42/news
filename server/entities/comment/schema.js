import { makeExecutableSchema } from 'graphql-tools'
import resolvers from './resolvers'

const typeDefs = `
  type Query {
    commentById(id: ID!): Comment
    commentsByPostId(postId: ID!): [Comment]
  }

  type Mutation {
    addComment(content: String!, postId: ID!, parentId: ID): Comment
  }

  type Comment {
    id: ID!,
    author: String!,
    content: String!,
    parentId: ID,
    fullSlug: String!,
    createdAt: String!,
    level: Int!
  }
`

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

export default schema
