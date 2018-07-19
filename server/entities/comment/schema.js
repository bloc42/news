import { makeExecutableSchema } from 'graphql-tools'
import resolvers from './resolvers'

const typeDefs = `
  type Query {
    comment(id: ID!): Comment
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
    createdAt: String!
  }
`

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

export default schema
