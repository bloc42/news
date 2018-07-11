const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, '标题不能为空。']
  },
  url: {
    type: String
  },
  content: {
    type: String
  },
  author: {
    type: String,
    required: [true, '作者不能为空。']
  },
  comment_count: {
    type: Number,
    default: 0
  },
  upvote_count: {
    type: Number,
    default: 0
  },
  favorite_count: {
    type: Number,
    default: 0
  }
})

postSchema.set('timestamps', true)

postSchema.pre('validate', function(next) {
  if (this.url.trim() === '' && this.content.trim() === '') {
    next(new Error('链接和内容请至少填写一项。'))
  } else {
    next()
  }
})

module.exports = mongoose.model('post', postSchema)
