import Channel from './model'
import config from '../../../config'

const DOMAIN = config.isLocal ? 'http://localhost:3000' : config.domain

const Query = {
  async channels(obj, args, context) {
    let channels = []
    let namequery = []
    const { names, admin } = args
    const { ctx } = context
    const creator = ctx.state.user.username
    if (admin == true) {
      channels = await Channel.find({ creator }).exec()
    } else {
      names.map(name => namequery.push({ name: name }))
      channels = await Channel.find({ $or: namequery }).exec()
    }
    return channels
  },
  async channel(obj, args, context) {
    const { name } = args
    const channel = await Channel.findOne({ name }).exec()
    return channel
  },
  async allchannels(obj, args, context) {
    const channel = await Channel.find().exec()
    return channel
  }
}

const Mutation = {
  async addchannel(obj, args, context) {
    const { name, logo, info, code } = args
    const { ctx } = context
    if (ctx.isUnauthenticated()) {
      throw new Error('创建分论坛前请先登录。')
    }
    let channel = await Channel.findOne({ name }).exec()
    if (channel) {
      throw '该分论坛已存在。'
    } else if (code !== config.channelInvitationCode) {
      throw '邀请码填写错误。'
    } else {
      const { ctx } = context
      const creator = ctx.state.user.username
      channel = new Channel({ name, logo, info, creator })
      ctx.request.body = args
      channel = await channel.save()
      return channel
    }
  }
}

export default {
  Query,
  Mutation
}
