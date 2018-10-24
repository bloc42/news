import bcrypt from 'bcrypt'
import User from './model'
import passport from 'koa-passport'

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

  async addupvotePost(userid, postid) {
    let user = await User.findById(userid).exec()
    if (user.upvotePost.indexOf(postid) == -1) {
      user = await User.findOneAndUpdate(
        { _id: user.id },
        { $push: { upvotePost: postid } },
        { new: true }
      ).exec()
    }
  },
  async removeupvotePost(userid, postid) {
    let user = await User.findById(userid).exec()
    user = await User.findOneAndUpdate(
      { _id: user.id },
      { $pull: { upvotePost: postid } },
      { new: true }
    ).exec()
  },
  async adddownvotePost(userid, postid) {
    let user = await User.findById(userid).exec()
    if (user.upvotePost.indexOf(postid) == -1) {
      user = await User.findOneAndUpdate(
        { _id: user.id },
        { $push: { downvotePost: postid } },
        { new: true }
      ).exec()
    }
  },
  async removedownvotePost(userid, postid) {
    let user = await User.findById(userid).exec()
    user = await User.findOneAndUpdate(
      { _id: user.id },
      { $pull: { downvotePost: postid } },
      { new: true }
    ).exec()
  }
}

export default api
