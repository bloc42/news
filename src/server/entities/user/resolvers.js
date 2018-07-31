import User from './model'
import userApi from './api'
import NotificationAPI from '../notification/api'

const Query = {
  async currentUser(obj, args, context) {
    const { ctx } = context
    const { user } = ctx.state

    if (user) {
      const notifications = await NotificationAPI.getNotificationsByUsername(
        user.username
      )
      user.notificationCount = notifications.length
      return user
    } else {
      return null
    }
  },

  async user(obj, args) {
    const { username } = args
    const user = await User.findOne({ username }).exec()
    return user
  }
}

const Mutation = {
  async login(obj, args, context) {
    const { ctx } = context
    ctx.request.body = args

    const user = await userApi.authenticate('local')(ctx)
    const notifications = await NotificationAPI.getNotificationsByUsername(
      user.username
    )
    user.notificationCount = notifications.length
    return user
  },

  async signup(obj, args, context) {
    const { username, email, password } = args

    let user = await User.findOne({
      $or: [{ username }, { email }]
    }).exec()

    if (user) {
      throw '该用户名或邮箱已存在。'
    } else {
      user = new User({ username, email, password })
      const { ctx } = context

      // Add username and password to request body because
      // passport needs them for authentication
      ctx.request.body = args

      await user.save()
      await userApi.authenticate('local')(ctx)
      user.notificationCount = 0
      return user
    }
  },

  logout(obj, args, context) {
    const { ctx } = context
    const user = ctx.state.user
    ctx.logout()
    return user
  }
}

export default {
  Query,
  Mutation
}
