import { makeExecutableSchema } from 'graphql-tools'
import resolvers from './resolvers'

// The GraphQL schema in string form
const typeDefs = `
  type Query { 
    currentUser: User,
    posts: [Post] 
  }

  type Mutation {
    login(username: String!, password: String!): User
    signup(username: String!, email: String!, password: String!): User
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
    email: String!
  }
`

// Put together a schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

export default schema
