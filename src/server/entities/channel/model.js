import mongoose from 'mongoose'

const channelSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, '分论坛名称不能为空。'],
    index: true
  },
  logo: {
    type: String
  },
  info: {
    type: String,
    require: [true, '简介不能为空。']
  },
  creator: {
    type: String
  }
})

channelSchema.set('timestamps', true)

channelSchema.pre('save', async function(next) {
  try {
    next()
  } catch (err) {
    next(err)
  }
})
export default mongoose.model('channel', channelSchema)
