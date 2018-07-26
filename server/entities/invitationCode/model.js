import mongoose from 'mongoose'

const invitationCodeSchema = mongoose.Schema({
  code: {
    type: String,
    required: true
  },
  invitor: {
    type: String,
    required: true
  },
  isClaimed: {
    type: Boolean,
    default: false
  },
  claimer: {
    type: String
  }
})

invitationCodeSchema.set('timstamps', true)


export default mongoose.model('invitationCode', invitationCodeSchema)
