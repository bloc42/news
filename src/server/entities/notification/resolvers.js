import Notification from './model'

const Query = {
  async notifications(obj, args, context) {
    const { ctx } = context

    if (ctx.isUnauthenticated()) {
      return []
    }

    const user = ctx.state.user
    const notifications = await Notification.find({
      isRead: false,
      to: user.username
    })
      .sort({ createdAt: -1 })
      .exec()
    return notifications
  }
}

export default {
  Query
}
