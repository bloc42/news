import Post from './model'

const Query = {
  async postFeed(obj, { cursor }) {
    const limit = 15
    const sortCriteria = { createdAt: 'desc' }
    let posts = []
    let topcomment = []
    let topcomment_id = []
    //5posts sort by comments count
    topcomment = await Post.find()
      .sort({ commentCount: 'desc' })
      .limit(5)
      .exec()
    topcomment.forEach(element => {
      topcomment_id.push(element._id)
    })
    if (cursor) {
      // If cursor (ObjectID) is provided, find next set of older posts
      posts = await Post.find({ _id: { $lt: cursor, $nin: topcomment_id } })
        .sort(sortCriteria)
        .limit(limit)
        .exec()
    } else {
      // If cursor is not provided, find the first set of posts
      const lastposts = await Post.find({ _id: { $nin: topcomment_id } })
        .sort(sortCriteria)
        .limit(limit - 5)
        .exec()
      posts = topcomment.concat(lastposts)
    }

    // Cursor is set to the ID of the last item
    cursor = posts[posts.length - 1].id

    return {
      cursor,
      posts
    }
  },

  async postById(obj, { id }) {
    const post = await Post.findById(id).exec()
    return post
  }
}

const Mutation = {
  async submitPost(obj, args, context, info) {
    const { ctx } = context

    if (ctx.isUnauthenticated()) {
      throw new Error('发布帖子前请先登录。')
    }

    const { title, url, content } = args

    const author = ctx.state.user.username
    const post = new Post({ title, url, content, author })
    await post.save()
    return post
  }
}

export default {
  Query,
  Mutation
}
