import mongoose from 'mongoose'
import mail from '../../mail'
import replyMail from '../../maillayout/replyMail'
import config from '../../../config'
import User from '../user/model'
import Post from '../post/model'

const DOMAIN = config.isLocal ? 'http://localhost:3000' : config.domain
const notificationSchema = mongoose.Schema({
  from: {
    type: String,
    required: true
  },
  to: {
    type: String,
    index: true,
    required: true
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  commentId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  isRead: {
    type: Boolean,
    default: false
  }
})
notificationSchema.set('timestamps', true)
notificationSchema.pre('save', async function(next) {
  try {
    const username = this.to
    const postId = this.postId
    const usernameFrom = this.from
    const postUrl = `${DOMAIN}/post/${postId}`
    const user = await User.findOne({ username }).exec()
    const post = await Post.findOne({ _id: postId }).exec()
    const userfrom = await User.findOne({ username: usernameFrom }).exec()
    //发送邮件提醒收到评论
    mail.send({
      to: user.email,
      subject: 'bloc42回复提醒',
      html: replyMail(postUrl, post.title, userfrom.username)
    })
    next()
  } catch (err) {
    next(err)
  }
})

export default mongoose.model('notification', notificationSchema)
