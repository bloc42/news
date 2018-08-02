import NotificationAPI from './api'
import Notification from './model'

const Query = {
  async notifications(obj, args, context) {
    const { ctx } = context

    if (ctx.isUnauthenticated()) {
      return []
    }

    const { user } = ctx.state
    const { username } = user
    return await NotificationAPI.getNotificationsByUsername(username)
  }
}

const Mutation = {
  async readNotification(obj, args) {
    const { id } = args
    const notification = await Notification.findByIdAndUpdate(id, {
      isRead: true
    }).exec()
    return notification
  }
}

export default {
  Query,
  Mutation
}
