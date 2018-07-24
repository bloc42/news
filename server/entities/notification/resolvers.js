import Notification from './model'

const Query = {
  async notifications(obj, args, context) {
    const { ctx } = context

    if (ctx.isUnauthenticated()) {
      throw '用户尚未登录。'
    }

    const user = ctx.state.user
    const notifications = await Notification.find({
      isRead: false,
      userId: user.id
    })
      .sort({ createdAt: -1 })
      .exec()
    return notifications
  }
}
