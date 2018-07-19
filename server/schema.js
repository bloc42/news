import { mergeSchemas } from 'graphql-tools'
import userSchema from './entities/user/schema'
import postSchema from './entities/post/schema'
import mailSchema from './entities/mail/schema'

/**
 * Merge multiple schemas into one.
 * https://www.apollographql.com/docs/graphql-tools/schema-stitching.html
 */
export default mergeSchemas({
  schemas: [userSchema, postSchema, mailSchema]
})
