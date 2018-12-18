import { makeExecutableSchema } from 'graphql-tools'
import resolvers from './resolvers'

const typeDefs = `
  type Query {
    channel(name: String!):Channel,
    channels(names:[String!],admin:Boolean):[Channel],
    allchannels:[Channel],
    ownChannels(creator: String!):[Channel],
    userInMute(username: String!,name:String!):Result
  }

  type Mutation {
    addchannel(name: String!,logo: String,info: String!,code: String!): Channel 
    changeMuteStatus(username: String!,name:String!):Channel
  }

  type Channel {
    id: ID!,
    name: String!,
    createdAt: String,
    logo: String,
    info: String!,
    creator: String,
    muteUser: [String]
  }

  type Result {
    isMute: Boolean,
    muteUser: [String]
  }
`

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

export default schema
