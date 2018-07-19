import { mergeSchemas } from 'graphql-tools'
import userSchema from './entities/user/schema'
import postSchema from './entities/post/schema'
import commentSchema from './entities/comment/schema'

/**
 * Merge multiple schemas into one.
 * https://www.apollographql.com/docs/graphql-tools/schema-stitching.html
 */
export default mergeSchemas({
  schemas: [userSchema, postSchema, commentSchema]
})
