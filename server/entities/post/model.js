const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, '标题不能为空。']
  },
  author: {
    type: String,
    required: [true, '作者不能为空。']
  },
  url: {
    type: String
  },
  content: {
    type: String
  },
  upvote_count: {
    type: Number
  },
  favorite_count: {
    type: Number
  }
})

postSchema.set('timestamps', true)

module.exports = mongoose.model('post', postSchema)
