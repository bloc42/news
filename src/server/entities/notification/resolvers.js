import NotificationAPI from './api'

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

export default {
  Query
}
