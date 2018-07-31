import InvitationCode from './model'

const api = {
  async getInvitationCode(code) {
    return await InvitationCode.findOne({ code }).exec()
  },
  async claimedCode(code, name) {
    return await InvitationCode.findOneAndUpdate(
      { code: code },
      {
        isClaimed: true,
        claimer: name
      },
      { new: true }
    ).exec()
  }
}

export default api
