import { makeExecutableSchema } from 'graphql-tools'
import resolvers from './resolvers'

const typeDefs = `
  type Query {
    currentUser: User
    user(username: String!): User
    userGrowth(dateType: String!, createdAfter: String ,createdBefore: String): UserAnalysisResult
    hotUsers: [UserRank]
    totalUsersCount(dateTime: String,dayStart: String,dayEnd: String): UserCount
  }

  type Mutation {
    login(username: String!, password: String!): User
    signup(username: String!, email: String!, password: String!, code: String!): User
    logout: User
    activation(username: String!, activationCode: String!): User
    sendActivationMail(email: String!): User
  }

  type User {
    id: ID!,
    username: String!,
    email: String,
    createdAt: String,
    notificationCount: Int
  }
  
  type UserAnalysisResult {
    analysis: [UserAnalysis]
    beforeCount: Int
  }
  
  type UserAnalysis {
    _id: String,
    count: String
  }

  type UserRank {
    _id: String,
    postCount: Int,
    commentCount: Int,
    rank: String
  }

  type UserCount {
    total: Int,
    day: Int
  }
`

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

export default schema
