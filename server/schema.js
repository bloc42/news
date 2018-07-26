/**
 * Merge multiple schemas into one.
 * https://www.apollographql.com/docs/graphql-tools/schema-stitching.html
 */

import { mergeSchemas } from 'graphql-tools'
import userSchema from './entities/user/schema'
import postSchema from './entities/post/schema'
import commentSchema from './entities/comment/schema'
import notificationSchema from './entities/notification/schema'

const linkTypeDefs = `
  extend type Post {
    comments: [Comment]
  }
`

const schemas = [
  userSchema,
  postSchema,
  commentSchema,
  notificationSchema,
  linkTypeDefs
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
  }
}

export default mergeSchemas({
  schemas,
  resolvers
})
