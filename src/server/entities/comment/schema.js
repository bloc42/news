import { makeExecutableSchema } from 'graphql-tools'
import resolvers from './resolvers'

const typeDefs = `
  type Query {
    commentById(id: ID!): Comment
    commentsByPostId(postId: ID!): [Comment]
    commentGrowth(dateType: String!, createdAfter: String ,createdBefore: String): CommentAnalysisResult
    totalCommentsCount(dateTime: String,dayStart: String,dayEnd: String): CommentCount
  }

  type Mutation {
    addComment(content: String!, postId: ID!, parentId: ID): Comment
  }

  type Comment {
    id: ID!,
    author: String!,
    content: String!,
    parentId: ID,
    postId: ID,
    fullSlug: String!,
    createdAt: String!,
    level: Int!
  }

  type CommentAnalysisResult {
    analysis: [CommentAnalysis]
    beforeCount: Int
  }

  type CommentAnalysis {
    _id: String,
    count: String
  }

  type CommentCount {
    total: Int,
    day: Int
  }
`

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

export default schema
