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
    type: mongoose.Schema.Types.ObjectId
  },
  commentId: {
    type: mongoose.Schema.Types.ObjectId
  },
  isRead: {
    type: Boolean,
    default: false
  }
})

notificationSchema.set('timestamps', true)

export default mongoose.model('notification', notificationSchema)
