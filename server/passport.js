import passport from 'koa-passport'
import { Strategy as LocalStrategy } from 'passport-local'
import userApi from './entities/user/api'

passport.serializeUser(function(user, done) {
  done(null, user.id)
})

passport.deserializeUser(async function(id, done) {
  try {
    const user = await userApi.getUser(id)
    done(null, user)
  } catch (err) {
    done(err)
  }
})

passport.use(
  new LocalStrategy(
    {
      usernameField: 'username'
    },
    async function(username, password, done) {
      try {
        const user = await userApi.signInViaLocal(username, password)
        done(null, user)
      } catch (err) {
        done(err)
      }
    }
  )
)
