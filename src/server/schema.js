/**
 * Merge multiple schemas into one.
 * https://www.apollographql.com/docs/graphql-tools/schema-stitching.html
 */

import { mergeSchemas } from 'graphql-tools'
import userSchema from './entities/user/schema'
import postSchema from './entities/post/schema'
import commentSchema from './entities/comment/schema'
import invitationCodeSchema from './entities/invitationCode/schema'
import notificationSchema from './entities/notification/schema'
import channelSchema from './entities/channel/schema'

const linkTypeDefs = `
  extend type Post {
    comments: [Comment]
  }

  extend type Notification {
    post: Post
    comment: Comment
  }
`

const schemas = [
  userSchema,
  postSchema,
  commentSchema,
  invitationCodeSchema,
  notificationSchema,
  linkTypeDefs,
  channelSchema
]

// https://www.apollographql.com/docs/graphql-tools/schema-stitching.html#adding-resolvers
const resolvers = {
  Post: {
    comments: {
      fragment: `... on Post { id }`,
      resolve(post, args, context, info) {
        return info.mergeInfo.delegateToSchema({
          schema: commentSchema,
          operation: 'query',
          fieldName: 'commentsByPostId',
          args: {
            postId: post.id
          },
          context,
          info
        })
      }
    }
  },
  Notification: {
    post: {
      fragment: `... on Notification { postId }`,
      resolve(notification, args, context, info) {
        return info.mergeInfo.delegateToSchema({
          schema: postSchema,
          operation: 'query',
          fieldName: 'postById',
          args: {
            id: notification.postId
          },
          context,
          info
        })
      }
    },
    comment: {
      fragment: `... on Notification { commentId }`,
      resolve(notification, args, context, info) {
        return info.mergeInfo.delegateToSchema({
          schema: commentSchema,
          operation: 'query',
          fieldName: 'commentById',
          args: {
            id: notification.commentId
          },
          context,
          info
        })
      }
    }
  }
}

export default mergeSchemas({
  schemas,
  resolvers
})
