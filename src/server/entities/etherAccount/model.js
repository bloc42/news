import mongoose from 'mongoose'

const etherAccountSchema = mongoose.Schema({
  address: {
    type: String,
    required: [true, '账户地址不能为空。'],
    index: true
  },
  username: {
    type: String,
    required: [true, '用户不能为空。']
  },
  //0:已绑定 ,1:已认证
  status: {
    type: Number,
    default: 0
  }
})

etherAccountSchema.set('timestamps', true)

export default mongoose.model('etherAccount', etherAccountSchema)
