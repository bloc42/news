import Channel from './model'
import config from '../../../config'

const DOMAIN = config.isLocal ? 'http://localhost:3000' : config.domain

const Query = {
  async channels(obj, args, context) {
    let channels = []
    let namequery = []
    const { names, admin } = args
    const { ctx } = context

    if (admin == true) {
      const creator = ctx.state.user.username
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
  },
  async userInMute(obj, args, context) {
    let isMute = false
    let muteUser = []
    const { username, name } = args
    const channel = await Channel.findOne({ name }).exec()
    muteUser = channel.muteUser
    if (channel.muteUser.indexOf(username) !== -1) {
      isMute = true
    } else {
      isMute = false
    }
    return {
      isMute: isMute,
      muteUser: muteUser
    }
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
  },
  async changeMuteStatus(obj, args, context) {
    const { username, name } = args
    let channel = await Channel.findOne({ name }).exec()
    const { ctx } = context
    const creator = ctx.state.user.username
    if (creator == channel.creator) {
      if (channel.muteUser.indexOf(username) !== -1) {
        //已在mute列表中
        channel = await Channel.findOneAndUpdate(
          { name },
          { $pull: { muteUser: username } },
          { new: true }
        ).exec()
      } else {
        //不在mute列表中
        channel = await Channel.findOneAndUpdate(
          { name },
          { $push: { muteUser: username } },
          { new: true }
        ).exec()
      }
      return channel
    } else {
      throw '无权限'
    }
  }
}

export default {
  Query,
  Mutation
}
