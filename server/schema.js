import { mergeSchemas } from 'graphql-tools'
import userSchema from './entities/user/schema'
import postSchema from './entities/post/schema'

export default mergeSchemas({
  schemas: [userSchema, postSchema]
})
