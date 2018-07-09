import { makeExecutableSchema } from 'graphql-tools'
import resolvers from './resolvers'

const typeDefs = `
  type Query {
    posts: [Post]
  }

  type Post {
    id: ID!,
    title: String!, 
    author: String!, 
    source: String, 
    createtime: String, 
    comment_count: String
  }
`

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

export default schema
