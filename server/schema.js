import { makeExecutableSchema } from 'graphql-tools'
import mockPosts from './mock/posts'

// The GraphQL schema in string form
const typeDefs = `
  type Query { posts: [Post] }
  type Post { title: String, author: String }
`

// The resolvers
const resolvers = {
  Query: { posts: () => mockPosts }
}

// Put together a schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

export default schema
