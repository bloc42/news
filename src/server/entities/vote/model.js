import mongoose from 'mongoose'
import is from 'is_js'
import { Number } from 'core-js'

const voteSchema = mongoose.Schema({
  voterId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  upStatus: {
    type: Boolean,
    default: false
  },
  downStatus: {
    type: Boolean,
    default: false
  }
})

voteSchema.set('timestamps', true)

export default mongoose.model('vote', voteSchema)
