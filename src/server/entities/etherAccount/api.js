import EtherAccount from './model'

const api = {
  async addEtherAccountRecord(address, username) {
    let etherAccount = await EtherAccount.find({ address: address }).exec()
    if (etherAccount.length == 0) {
      etherAccount = new EtherAccount({ address, username })
      etherAccount = await etherAccount.save()
      return true
    } else {
      throw '该账户地址已被使用,请解绑或使用新地址'
    }
  },
  async removeEtherAccountRecord(address) {
    let etherAccount = await EtherAccount.find({ address: address }).exec()
    if (etherAccount.length !== 0) {
      await EtherAccount.remove({ address: address })
      return true
    } else {
      throw '无此账户记录'
    }
  },
  async changeEtherAccountStatusRecord(address, status) {
    let etherAccount = await EtherAccount.find({ address: address }).exec()
    if (etherAccount.length !== 0) {
      etherAccount = await EtherAccount.findOneAndUpdate(
        { address: address },
        { status: status },
        { new: true }
      ).exec()
      return true
    } else {
      throw '无此账户记录'
    }
  }
}

export default api
