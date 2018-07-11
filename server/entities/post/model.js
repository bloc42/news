import mongoose from 'mongoose'
import is from 'is_js'

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
  const url = this.url.trim()
  const content = this.content.trim()

  if (is.empty(url) && is.empty(content)) {
    next(new Error('链接和内容请至少填写一项。'))
  } else if (is.not.empty(url) && is.not.url(url)) {
    next(new Error('链接（URL）格式不正确。'))
  } else {
    next()
  }
})

export default mongoose.model('post', postSchema)
