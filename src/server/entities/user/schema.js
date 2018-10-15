import { makeExecutableSchema } from 'graphql-tools'
import resolvers from './resolvers'

const typeDefs = `
  type Query {
    currentUser: User
    user(username: String!): User
    userGrowth(dateType: String!, createdAfter: String ,createdBefore: String): UserAnalysisResult
    hotUsers: [UserRank]
    totalUsersCount(dateTime: String,dayStart: String,dayEnd: String): UserCount
    userList(cursor: String,limit: Int): UserList
  }

  type Mutation {
    login(username: String!, password: String!): User
    signup(username: String!, email: String!, password: String!, code: String!,channel: String): User
    logout: User
    following(channel:String!):User
    unfollow(channel:String!):User
    activation(username: String!, activationCode: String!): User
    sendActivationMail(email: String!): User
  }

  type User {
    id: ID!,
    username: String!,
    email: String,
    createdAt: String,
    notificationCount: Int,
    following:[String]
  }

  type UserList {
    cursor: String!,
    userlist: [UserRank]!
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
    user: String,
    email: String,
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
