import { makeExecutableSchema } from 'graphql-tools'
import resolvers from './resolvers'

const typeDefs = `
  type Query {
    postFeed(cursor: String,channel: String): PostFeed
    postById(id: ID!): Post
    postGrowth(dateType: String!, createdAfter: String ,createdBefore: String): PostAnalysisResult
    hotPosts(sort: String): [PostRank]
    totalPostsCount(dateTime: String,dayStart: String,dayEnd: String): PostCount
  }

  type Mutation {
    submitPost(title: String!, url: String, content: String, channel: String): Post
    upvote(id: ID!):Post
    downvote(id: ID!):Post
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
    createdAt: String!,
    channel: String,
    upvoteCount:Int,
    downvoteCount:Int,
    lastReader: String
  }

  type PostAnalysisResult {
    analysis: [PostAnalysis]
    beforeCount: Int
  }

  type PostAnalysis {
    _id: String,
    count: String
  }

  type PostRank {
    _id: ID!,
    title: String,
    commentCount: Int,
    clickCount: Int,
    author: String,
    createdAt: String,
    lastReader: String
  }

  type PostCount {
    total: Int,
    day: Int
  }
`

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

export default schema
