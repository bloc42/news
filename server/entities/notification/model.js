import mongoose from 'mongoose'

// https://docs.mongodb.com/ecosystem/use-cases/storing-comments/#one-document-per-comment
const notificationSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId
  },
  commentId: {
    type: mongoose.Schema.Types.ObjectId
  },
  isViewed: {
    type: Boolean,
    default: false
  }
})

notificationSchema.set('timestamps', true)

export default mongoose.model('notification', notificationSchema)
