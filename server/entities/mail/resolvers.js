import mailApi from './api'

const Query = {
  async mail() {}
}

const Mutation = {
  async sendMail(obj, args, context, info) {
    const { ctx } = context
    const { email, type } = args
    // mailApi.sendMail(email,type,'test','<h2>test</h2>')
    await mailApi.sendMail(email, 'activemail', activeurl)
    return true
  }
}

export default {
  Query,
  Mutation
}
