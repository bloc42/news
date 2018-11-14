import EtherAccount from './model'

const Query = {
  async etherAccount(obj, args, context) {
    const { address } = args
    const { ctx } = context
    ctx.request.body = args
    let etherAccount = await EtherAccount.find({ address: address }).exec()
    if (etherAccount.length !== 0) {
      return etherAccount[0]
    } else {
      throw '无此账户记录'
    }
  }
}

const Mutation = {
  async addEtherAccount(obj, args, context) {
    const { address, username } = args
    const { ctx } = context
    ctx.request.body = args
    let etherAccount = await EtherAccount.find({ address: address }).exec()
    if (etherAccount.length == 0) {
      etherAccount = new EtherAccount({ address, username })
      etherAccount = await etherAccount.save()
    } else {
      throw '该账户地址已被使用,请解绑或使用新地址'
    }
    return etherAccount
  },
  async removeEtherAccount(obj, args, context) {
    const { address } = args
    const { ctx } = context
    ctx.request.body = args
    let etherAccount = await EtherAccount.find({ address: address }).exec()
    if (etherAccount.length !== 0) {
      await EtherAccount.remove({ address: address })
      return true
    } else {
      throw '无此账户记录'
    }
  },
  async changeEtherAccountStatus(obj, args, context) {
    const { address, status } = args
    const { ctx } = context
    ctx.request.body = args
    let etherAccount = await EtherAccount.find({ address: address }).exec()
    if (etherAccount.length !== 0) {
      etherAccount = await EtherAccount.findOneAndUpdate(
        { address: address },
        { status: status },
        { new: true }
      ).exec()
      return etherAccount
    } else {
      throw '无此账户记录'
    }
  }
}

export default {
  Query,
  Mutation
}
