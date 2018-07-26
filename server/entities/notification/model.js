import mongoose from 'mongoose'

const notificationSchema = mongoose.Schema({
  from: {
    type: String,
    required: true
  },
  to: {
    type: String,
    required: true
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  postTitle: {
    type: String,
    required: true
  },
  commentId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  content: {
    type: String
  },
  isRead: {
    type: Boolean,
    default: false
  }
})

notificationSchema.set('timestamps', true)

export default mongoose.model('notification', notificationSchema)
