import mockPosts from './mock'
import Post from './model'

const Query = {
  posts: (obj, args, context, info) => {
    return mockPosts
  }
}

const Mutation = {
  submitPost: async (obj, args, context, info) => {
    const { ctx } = context

    if (ctx.isUnauthenticated()) {
      throw new Error('发布文章前请先登录。')
    }

    const { title, url, content } = args
    const author = ctx.state.user

    const post = new Post({ title, url, content, author: author.username })
    await post.save()
  }
}

export default {
  Query,
  Mutation
}
