import bcrypt from 'bcrypt'
import User from './model'

const api = {
  async getUser(id) {
    return await User.findById(id).exec()
  },

  signInViaLocal(username, password) {
    return new Promise(async (resolve, reject) => {
      let user = await User.findOne({
        $or: [{ phone: username }, { email: username }, { username }]
      }).exec()

      const errorMsg = '用户名或密码错误。'

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
  }
}

export default api
