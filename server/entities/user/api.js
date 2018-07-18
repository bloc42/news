import bcrypt from 'bcrypt'
import User from './model'
import passport from 'koa-passport'
import mailsend from '../../mail'

const api = {
  async getUser(id) {
    return await User.findById(id).exec()
  },

  // Promisify passport's authentication method
  authenticate(strategy) {
    return ctx => {
      return new Promise((resolve, reject) => {
        passport.authenticate(strategy, function(err, user) {
          if (err) {
            reject(err)
          } else {
            ctx.login(user)
            resolve(user)
          }
        })(ctx)
      })
    }
  },

  signInViaLocal(username, password) {
    return new Promise(async (resolve, reject) => {
      let user = await User.findOne({
        $or: [{ email: username }, { username }]
      }).exec()

      const errorMsg = '用户名或密码不正确。'

      if (user) {
        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {
          resolve(user)
        } else {
          reject(errorMsg)
        }
      } else {
        reject(errorMsg)
      }
    })
  },

  async sendMail(user, mailtype) {
    return new Promise(async (resolve, reject) => {
      if (user && mailtype == 'activemail') {
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
        mailsend.send(user.email, 'test', template, (res, info) => {
          if (res == true) {
            resolve(user)
          } else {
            //todo change active_deadline to resend mail
            reject('发送邮件失败,请重新发送')
          }
        })
      } else {
        //todo
        reject('发送邮件失败,请重新发送')
      }
    })
  }
}

export default api
