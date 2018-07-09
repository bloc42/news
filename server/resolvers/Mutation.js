import User from '../entities/user/model'
import passport from 'koa-passport'

export default {
  login(obj, args, context, info) {
    return new Promise(async (resolve, reject) => {
      const { username, password } = args
      const { ctx } = context
      ctx.request.body = args

      passport.authenticate('local', function(err, user) {
        if (err) {
          reject(err)
        } else {
          if (user) {
            ctx.login(user)
            resolve({
              id: user.id,
              username
            })
          } else {
            reject('用户验证失败。')
          }
        }
      })(ctx)
    })
  },

  signup(obj, args, context, info) {
    return new Promise(async (resolve, reject) => {
      const { username, phone, password } = args

      let user = await User.findOne({
        $or: [{ username }, { phone }]
      }).exec()

      if (user) {
        reject('该用户名或手机号已存在。')
      } else {
        user = new User({ username, phone, password })
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
                resolve({
                  id: user.id,
                  username
                })
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
  }
}
