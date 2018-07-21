import { makeExecutableSchema } from 'graphql-tools'
import resolvers from './resolvers'

const typeDefs = `
  type Query {
    postFeed(cursor: String): PostFeed
    post(id: ID!): Post
  }

  type Mutation {
    submitPost(title: String!, url: String, content: String): Post
  }

  type PostFeed {
    cursor: String!,
    posts: [Post]!
  }

  type Post {
    id: ID!,
    title: String!, 
    url: String, 
    content: String,
    author: String!, 
    commentCount: Int!,
    createdAt: String!
  }
`

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

export default schema
