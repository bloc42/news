import User from './model'
import userApi from './api'
import invitationCodeApi from '../invitationCode/api'
import mail from '../../mail'
import bcrypt from 'bcrypt'
import config from '../../../config'
import { GraphQLError } from 'graphql/error'
import activationMail from '../../maillayout/activationMail'
import NotificationAPI from '../notification/api'

const DOMAIN = config.isLocal ? 'http://localhost:3000' : config.domain
const SALT_WORK_FACTOR = 1

const Query = {
  async currentUser(obj, args, context) {
    const { ctx } = context
    const { user } = ctx.state

    if (user) {
      const notifications = await NotificationAPI.getNotificationsByUsername(
        user.username
      )
      user.notificationCount = notifications.length
      return user
    } else {
      return null
    }
  },

  async user(obj, args) {
    const { username } = args
    const user = await User.findOne({ username }).exec()
    return user
  }
}

const Mutation = {
  async login(obj, args, context) {
    const { ctx } = context
    ctx.request.body = args
    const { username } = args
    const email = username
    let user = await User.findOne({
      $or: [{ username }, { email }]
    })
    if (!user) {
      throw '未找到此用户'
    }
    if (user.isActivated == 0 && Date.now() > user.activationDeadline) {
      const error = new GraphQLError(
        '该用户未激活,激活邮件已失效,请重新发送',
        null,
        null,
        null,
        null,
        null,
        {
          code: '223'
        }
      )
      throw error
    } else if (user.isActivated == 0 && Date.now() < user.activationDeadline) {
      throw '该用户未激活,请在注册邮箱中查看激活邮件'
    } else if (user.isActivated == 1) {
      console.log(args)
      user = await userApi.authenticate('local')(ctx)
      const notifications = await NotificationAPI.getNotificationsByUsername(
        user.username
      )
      user.notificationCount = notifications.length
    }
    return user
  },
  async signup(obj, args, context) {
    const { username, email, password } = args

    let user = await User.findOne({
      $or: [{ username }, { email }]
    }).exec()

    const invitation = await invitationCodeApi.getInvitationCode(code)
    if (!invitation || invitation.isClaimed) {
      throw '此邀请链接无效'
    } else {
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
        user = await User.findOneAndUpdate(
          { username: user.username },
          {
            activationCode: activationHashCode,
            activationDeadline: activationDeadline
          },
          { new: true }
        ).exec()
        const activationUrl = `${DOMAIN}/activation?username=${
          user.username
        }&activationcode=${user.activationCode}`
        await mail.send({
          to: user.email,
          subject: '帐号激活',
          html: activationMail(activationUrl)
        })
        user.notificationCount = 0
        return user
      }
    }
  },

  logout(obj, args, context) {
    const { ctx } = context
    const user = ctx.state.user
    ctx.logout()
    return user
  },
  async sendActivationMail(obj, args, context, info) {
    const { email } = args
    let user = await User.findOne({ email }).exec()
    if (user.isActivated !== 0) {
      throw '此邮箱已经激活'
    } else {
      const salt = await bcrypt.genSalt(SALT_WORK_FACTOR)
      const activationHashCode = await bcrypt.hash(
        user.username + Date.now().toString(),
        salt
      )
      const activationDeadline = new Date(Date.now() + 24 * 60 * 60 * 1000)
      user = await User.findOneAndUpdate(
        { username: user.username },
        {
          activationCode: activationHashCode,
          activationDeadline: activationDeadline
        },
        { new: true }
      ).exec()
      const activationUrl = `${DOMAIN}/activation?username=${
        user.username
      }&activationcode=${user.activationCode}`
      await mail.send({
        to: user.email,
        subject: '帐号激活',
        html: activationMail(activationUrl)
      })
    }
    return user
  },

  async activation(obj, args, context, info) {
    const { username, activationCode } = args
    let user = await User.findOne({ username }).exec()
    if (
      user.activationCode == activationCode &&
      Date.now() < user.activationDeadline &&
      user.isActivated == 0
    ) {
      user = await User.findOneAndUpdate(
        { username: user.username },
        { isActivated: 1 },
        { new: true }
      ).exec()
      return user
    } else if (user.isActivated == 1) {
      throw '此账户为已激活账户,请登陆'
    } else if (
      user.activationCode == activationCode ||
      Date.now() > user.activationDeadline
    ) {
      const error = new GraphQLError(
        '该用户未激活,激活邮件已失效,请重新发送',
        null,
        null,
        null,
        null,
        null,
        {
          code: '223'
        }
      )
      throw error
    } else if (user.activationCode !== activationCode) {
      throw '此链接未通过验证,请检查链接地址是否正确'
    }
  }
}

export default {
  Query,
  Mutation
}
