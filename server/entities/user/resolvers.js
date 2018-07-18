import User from './model'
import userApi from './api'
import mailsend from '../../mail'

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

    //validate is_active
    const { username } = args
    const email = username
    let user = await User.findOne({
      $or: [{ username }, { email }]
    })
    if (user.is_active == 0 && Date.now() > user.active_deadline) {
      throw '该用户未激活,激活邮件已过期,请重新发送'
    } else if (user.is_active == 0 && Date.now() < user.active_deadline) {
      throw '该用户未激活,请在注册邮箱中查看激活邮件'
    } else if (user.is_active == 1) {
      console.log(args)
      user = await userApi.authenticate('local')(ctx)
    }
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
      //send mail for active
      const template =
        '<div><h2>感谢您注册Block-dog</h2><p>请点击以下连接激活用户</p><p><a href="localhost:3000/active?username=' +
        user.username +
        '&active=' +
        user.active_code +
        '">立即激活</a></p><p>如果点击没有反应,请将以下连接复制到浏览器</p><p>localhost:3000/active?username=' +
        user.username +
        '&active=' +
        user.active_code +
        '</p></div>'
      mailsend.send(email, 'test', template)
      //await userApi.authenticate('local')(ctx)
      return user
    }
  },

  logout(obj, args, context, info) {
    const { ctx } = context
    const user = ctx.state.user
    ctx.logout()
    console.log(user)
    return user
  },

  async active(obj, args, context, info) {
    //active mail
    const { username, active_code } = args
    let user = await User.findOne({ username }).exec()
    if (
      user.active_code == active_code &&
      Date.now() < user.active_deadline &&
      user.is_active == 0
    ) {
      //active success
      await User.findOneAndUpdate(
        { username: user.username },
        { is_active: 1 },
        { new: true },
        function(err, doc) {
          if (err) {
            console.log('Error:' + err)
          } else {
            user = doc
          }
        }
      ).exec()
      return user
    } else if (user.is_active == 1) {
      throw '此账户为已激活账户,请登陆'
    } else if (
      user.active_code == active_code ||
      Date.now() > user.active_deadline
    ) {
      //active fail
      throw '激活邮件已过期,请重新发送'
    }
  }
}

export default {
  Query,
  Mutation
}
