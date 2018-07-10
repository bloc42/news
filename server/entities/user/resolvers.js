import User from './model'
import userApi from './api'

const Query = {
  currentUser: (obj, args, context, info) => {
    const { ctx } = context
    return ctx.state.user
  }
}

const Mutation = {
  async login(obj, args, context, info) {
    const { ctx } = context
    ctx.request.body = args

    const user = await userApi.authenticate('local')(ctx)
    return user
  },

  async signup(obj, args, context, info) {
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
      return user
    }
  },

  logout(obj, args, context, info) {
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
