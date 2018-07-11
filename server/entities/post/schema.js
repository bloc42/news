import { makeExecutableSchema } from 'graphql-tools'
import resolvers from './resolvers'

const typeDefs = `
  type Query {
    posts: [Post]
  }

  type Mutation {
    submitPost(title: String!, url: String, content: String): Post
  }

  type Post {
    id: ID!,
    title: String!, 
    url: String, 
    content: String,
    author: String!, 
    commentCount: Int,
    createdAt: String
  }
`

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

export default schema
