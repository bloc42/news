import Post from './model'

const Query = {
  async postFeed(obj, { cursor }) {
    const limit = 20
    const sortCriteria = { createdAt: 'desc' }
    let posts = []

    if (cursor) {
      // If cursor (ObjectID) is provided, find next set of older posts
      posts = await Post.find({ _id: { $lt: cursor } })
        .sort(sortCriteria)
        .limit(limit)
        .exec()
    } else {
      // If cursor is not provided, find the first set of posts
      posts = await Post.find()
        .sort(sortCriteria)
        .limit(limit)
        .exec()
    }

    // Cursor is set to the ID of the last item
    cursor = posts[posts.length - 1].id

    return {
      cursor,
      posts
    }
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
