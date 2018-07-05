import User from '../entities/user/model'
// import passport from 'koa-passport'

export default {
  async signup(obj, args, context, info) {
    const { username, phone, password } = args

    let user = await User.findOne({
      $or: [{ username }, { phone }]
    }).exec()

    if (user) {
      // return error
    } else {
      user = new User({ username, phone, password })

      try {
        await user.save()
        return {
          id: user.id,
          username
        }

        // passport.authenticate('local', (err, user, info, status) => {
        //   if (err) {
        //     console.log(err)
        //   } else {
        //     console.log(user)
        //   }
        // })
      } catch (err) {
        console.log(err)
      }
    }
  }
}
