import mongoose from 'mongoose'

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
  isRead: {
    type: Boolean,
    default: false
  }
})

notificationSchema.set('timestamps', true)

export default mongoose.model('notification', notificationSchema)
