import InvitationCode from './model'

const api = {
  async getInvitationCode(code) {
    const invitation = await InvitationCode.findOne({ code }).exec()
    if (!invitation || invitation.isClaimed) {
      throw '此邀请链接无效'
    } else {
      return true
    }
  },
  async claimedCode(code, name) {
    return await InvitationCode.findOneAndUpdate(
      { code: code },
      {
        isClaimed: true,
        claimer: name
      },
      { new: true },
      function(err, res) {
        if (err) {
          console.log('Error:' + err)
        }
      }
    ).exec()
  }
}

export default api
