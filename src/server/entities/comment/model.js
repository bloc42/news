import mongoose from 'mongoose'

// https://docs.mongodb.com/ecosystem/use-cases/storing-comments/#one-document-per-comment
const commentSchema = mongoose.Schema({
  author: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  parentId: {
    // Stores the contents of the _id field of the parent comment
    type: mongoose.Schema.Types.ObjectId
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
  },
  level: {
    // The nesting level for the purpose of comment threads indentation
    type: Number,
    default: 0
  }
})

commentSchema.set('timestamps', true)
commentSchema.index({ postId: 1, fullSlug: 1 })

export default mongoose.model('comment', commentSchema)
