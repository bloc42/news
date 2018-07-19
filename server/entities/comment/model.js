import { Schema, model } from 'mongoose'

// https://docs.mongodb.com/ecosystem/use-cases/storing-comments/#one-document-per-comment
const commentSchema = Schema({
  author: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  discussionId: {
    // References the root comment id
    type: Schema.Types.ObjectId,
    required: true
  },
  parentId: {
    // Stores the contents of the _id field of the parent comment
    type: Schema.Types.ObjectId
  },
  slug: {
    // Holds a path composed of the parent or parent’s slug and this comment’s unique slug
    type: String,
    required: true
  },
  fullSlug: {
    // Combines the slugs and time information to make it easier to sort documents in a threaded discussion by date.
    type: String,
    required: true
  }
})

commentSchema.set('timestamps', true)

export default model('comment', commentSchema)
