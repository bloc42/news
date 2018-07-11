import mockPosts from './mock'
import Post from './model'

const Query = {
  async posts(obj, args, context, info) {
    const posts = await Post.find()
      .sort({ createdAt: 'desc' })
      .exec()
    return [...posts, ...mockPosts]
  }
}

const Mutation = {
  async submitPost(obj, args, context, info) {
    const { ctx } = context

    if (ctx.isUnauthenticated()) {
      throw new Error('发布文章前请先登录。')
    }

    const { title, url, content } = args

    const author = ctx.state.user

    // TODO: save author details
    const post = new Post({ title, url, content, author: author.username })
    await post.save()
    return post
  }
}

export default {
  Query,
  Mutation
}
