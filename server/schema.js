import { makeExecutableSchema } from 'graphql-tools'
import resolvers from './resolvers'

// The GraphQL schema in string form
const typeDefs = `
  type Query { 
    posts: [Post] 
  }

  type Mutation {
    signup(username: String!, phone: String!, password: String!): User
  }

  type Post {
    id: ID!,
    title: String!, 
    author: String!, 
    source: String, 
    createtime: String, 
    comment_count: String
  }

  type User {
    id: ID!,
    username: String!,
    phone: String!,
    password: String!
  }
`

// Put together a schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

export default schema
