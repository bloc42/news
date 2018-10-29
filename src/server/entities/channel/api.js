import Channel from './model'

const api = {
  async isMute(name, username) {
    let channel = await Channel.findOne({ name }).exec()
    if (channel.muteUser.indexOf(username) !== -1) {
      return true
    } else {
      return false
    }
  }
}

export default api
