import User from './model'
import passport from 'koa-passport'

const Query = {
  currentUser: (obj, args, context, info) => {
    const { ctx } = context
    return ctx.state.user
  }
}

const Mutation = {
  login(obj, args, context, info) {
    return new Promise(async (resolve, reject) => {
      const { ctx } = context
      ctx.request.body = args

      passport.authenticate('local', function(err, user) {
        if (err) {
          reject(err)
        } else {
          if (user) {
            ctx.login(user)
            resolve(user)
          } else {
            reject('用户验证失败。')
          }
        }
      })(ctx)
    })
  },

  signup(obj, args, context, info) {
    return new Promise(async (resolve, reject) => {
      const { username, email, password } = args

      let user = await User.findOne({
        $or: [{ username }, { email }]
      }).exec()

      if (user) {
        reject('该用户名或邮箱已存在。')
      } else {
        user = new User({ username, email, password })
        const { ctx } = context

        // Add username and password to request body because
        // passport needs them for authentication
        ctx.request.body = args

        try {
          await user.save()

          // Authenticate the user and login
          passport.authenticate('local', function(err, user) {
            if (err) {
              reject(err)
            } else {
              if (user) {
                ctx.login(user)
                resolve(user)
              } else {
                reject('用户验证失败。')
              }
            }
          })(ctx)
        } catch (err) {
          reject(err)
        }
      }
    })
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
