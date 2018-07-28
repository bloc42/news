import User from './model'
import userApi from './api'
import invitationCodeApi from '../invitationCode/api'
import mail from '../../mail'
import bcrypt from 'bcrypt'
import config from '../../../config'
import { GraphQLError } from 'graphql/error'
import activationMail from '../../maillayout/activationMail'

const DOMAIN = config.isLocal ? 'http://localhost:3000' : config.domain
const SALT_WORK_FACTOR = 1

const Query = {
  currentUser(obj, args, context, info) {
    const { ctx } = context
    return ctx.state.user
  },

  async user(obj, args) {
    const { username } = args
    const user = await User.findOne({ username }).exec()
    return user
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
    const { username, email, password, code } = args

    let user = await User.findOne({
      $or: [{ username }, { email }]
    }).exec()

    
    const invitation =  await invitationCodeApi.getInvitationCode(code)
    if(!invitation || invitation.isClaimed){
      throw '此邀请链接无效'
    }else{
      if (user) {
        throw '该用户名或邮箱已存在。'
      } else {
        user = new User({ username, email, password })
        const { ctx } = context

        // Add username and password to request body because
        // passport needs them for authentication
        ctx.request.body = args

        user = await user.save()
        //update invitationcode
        await invitationCodeApi.claimedCode(code, user.username)
        //save activeInfo
        const salt = await bcrypt.genSalt(SALT_WORK_FACTOR)
        const activationHashCode = await bcrypt.hash(
          user.username + Date.now().toString(),
          salt
        )
        const activationDeadline = new Date(Date.now() + 24 * 60 * 60 * 1000)
        await User.findOneAndUpdate(
          { username: user.username },
          {
            activationCode: activationHashCode,
            activationDeadline: activationDeadline
          },
          { new: true },
          function(err, doc) {
            if (err) {
              console.log('Error:' + err)
            } else {
              user = doc
            }
          }
        ).exec()
        const activationUrl = `${DOMAIN}/activation?username=${user.username}&activationcode=${user.activationCode}`
        await mail.send({
          to: user.email,
          subject: '帐号激活',
          html: activationMail(activationUrl)
        })
        return user
      }
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
