import InvitationCode from './model'
import mail from '../../mail'
import invitationMail from '../../maillayout/invitationMail'
import generate from 'nanoid/generate'
import config from '../../../config'


const DOMAIN = config.isLocal ? 'http://localhost:3000' : config.domain
const alphabet = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

const Query = {
    async InvitationCodeByCode(obj, args, context) {

    }
}

const Mutation = {
    async sendInvitationMail(obj, args, context) {
        const { ctx } = context
        const { email } = args
        if (ctx.isUnauthenticated()) {
          throw '邀请前请先登录。'
        }
        const invitor = ctx.state.user.username
        //generate invitation code
        const randomcode = generate(alphabet, 5)
        const code = randomcode
        let invitationCode = new InvitationCode({code, invitor}) 
        invitationCode = await invitationCode.save()
        
        const invitationUrl = `${DOMAIN}/signup?code=${invitationCode.code}`
        await mail.send({
            to: email,
            subject: '欢迎加入Bloc42',
            html: invitationMail(invitationUrl)
        })
        return invitationCode
    }
}

export default {
    Query,
    Mutation
  }