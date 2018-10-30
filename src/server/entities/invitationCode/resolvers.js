import InvitationCode from './model'
import mail from '../../mail'
import invitationMail from '../../maillayout/invitationMail'
import generate from 'nanoid/generate'
import config from '../../../config'

const DOMAIN = config.isLocal ? 'http://localhost:3000' : config.domain
const alphabet =
  '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

const Query = {}

const Mutation = {
  async sendInvitationMail(obj, args, context) {
    const { ctx } = context
    const { emails, channel } = args
    if (ctx.isUnauthenticated()) {
      throw '邀请前请先登录。'
    }
    const invitor = ctx.state.user.username
    const codes = []
    for (var email of emails) {
      //generate invitation code
      const randomcode = generate(alphabet, 5)
      const code = randomcode
      let invitationCode = new InvitationCode({ code, invitor })
      invitationCode = await invitationCode.save()
      let invitationUrl = ''
      if (channel !== '') {
        invitationUrl = `${DOMAIN}/signup?channel=${channel}&code=${
          invitationCode.code
        }`
      } else {
        invitationUrl = `${DOMAIN}/signup?code=${invitationCode.code}`
      }
      await mail.send({
        to: email,
        subject: '欢迎加入唠嗑',
        html: invitationMail(invitor, invitationUrl)
      })
      codes.push(invitationCode)
    }
    return { invitationCodes: codes }
  }
}

export default {
  Query,
  Mutation
}
