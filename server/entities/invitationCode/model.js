import { Schema, model } from 'mongoose'

const invitationCodeSchema = Schema({
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

export default model('invitationCode', invitationCodeSchema)
