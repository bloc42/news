import Post from './model'

const Query = {
  async postFeed(obj, { cursor }) {
    const limit = 15
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
  },

  async postById(obj, { id }) {
    const post = await Post.findById(id).exec()
    //add click
    const newpost = await Post.findOneAndUpdate(
      { _id: post._id },
      { clickCount: post.clickCount + 1 },
      { new: true }
    ).exec()

    return newpost
  },

  async postGrowth(obj, args, context) {
    const { dateType, createdAfter, createdBefore } = args
    const beforeAll = await Post.aggregate([
      { $match: { createdAt: { $lt: new Date(createdAfter) } } },
      {
        $group: {
          _id: null,
          count: { $sum: 1 }
        }
      }
    ])
    let beforeCount = 0
    if (beforeAll && beforeAll[0]) {
      beforeCount = beforeAll[0].count
    }
    let analysis = []
    if (dateType == 'today') {
      analysis = await Post.aggregate([
        {
          $match: {
            createdAt: {
              $gte: new Date(createdAfter),
              $lte: new Date(createdBefore)
            }
          }
        },
        {
          $group: {
            _id: {
              $hour: '$createdAt'
            },
            count: { $sum: 1 }
          }
        },
        { $sort: { _id: 1 } }
      ])
    } else if (dateType == 'week') {
      analysis = await Post.aggregate([
        {
          $match: {
            createdAt: {
              $gte: new Date(createdAfter),
              $lte: new Date(createdBefore)
            }
          }
        },
        {
          $group: {
            _id: {
              $dayOfWeek: '$createdAt'
            },
            count: { $sum: 1 }
          }
        },
        { $sort: { _id: 1 } }
      ])
    } else if (dateType == 'month') {
      analysis = await Post.aggregate([
        {
          $match: {
            createdAt: {
              $gte: new Date(createdAfter),
              $lte: new Date(createdBefore)
            }
          }
        },
        {
          $group: {
            _id: {
              $dayOfMonth: '$createdAt'
            },
            count: { $sum: 1 }
          }
        },
        { $sort: { _id: 1 } }
      ])
    } else if (dateType == 'year') {
      analysis = await Post.aggregate([
        {
          $match: {
            createdAt: {
              $gte: new Date(createdAfter),
              $lte: new Date(createdBefore)
            }
          }
        },
        {
          $group: {
            _id: {
              $month: '$createdAt'
            },
            count: { $sum: 1 }
          }
        },
        { $sort: { _id: 1 } }
      ])
    }
    return {
      analysis: analysis,
      beforeCount: beforeCount
    }
  },

  async hotPosts(obj, args, context) {
    const { sort } = args
    let postByAll = await Post.aggregate([
      {
        $project: {
          _id: '$_id',
          title: 1,
          commentCount: 1,
          author: 1,
          clickCount: 1
        }
      }
    ])
    let result = []
    if (sort == 'comment') {
      result = postByAll.sort((a, b) => {
        return b.commentCount - a.commentCount
      })
    } else if (sort == 'click') {
      result = postByAll.sort((a, b) => {
        return b.clickCount - a.clickCount
      })
    }
    return result
  },

  async totalPostsCount(obj, args, context) {
    const { dateTime, dayStart, dayEnd } = args
    const postCount = await Post.aggregate([
      { $match: { createdAt: { $lt: new Date(dateTime) } } },
      {
        $group: {
          _id: null,
          count: { $sum: 1 }
        }
      }
    ])
    let result = {
      total: postCount[0].count
    }
    if (dayStart && dayEnd) {
      const daycount = await Post.aggregate([
        {
          $match: {
            createdAt: { $gte: new Date(dayStart), $lte: new Date(dayEnd) }
          }
        },
        {
          $group: {
            _id: null,
            count: { $sum: 1 }
          }
        }
      ])
      let daycountnum = 0
      if (daycount[0] && daycount[0].count) {
        daycountnum = daycount[0].count
      }
      Object.assign(result, { day: daycountnum })
    }
    return result
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
