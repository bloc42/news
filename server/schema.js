import { makeExecutableSchema } from 'graphql-tools'
import postApi from './entities/post/api'

// The GraphQL schema in string form
const typeDefs = `
  type Query { posts: [Post] }
  type Post { title: String, author: String }
`

// The resolvers
const resolvers = {
  Query: { posts: postApi.getPosts }
}

// Put together a schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

export default schema
