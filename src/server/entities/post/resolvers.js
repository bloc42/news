import Post from './model'
import channelApi from '../../entities/channel/api'
import commentApi from '../../entities/comment/api'
import notificationApi from '../../entities/notification/api'
const Query = {
  async postFeed(obj, args) {
    let { cursor, channel } = args
    const limit = 15
    const sortCriteria = { createdAt: 'desc' }
    let posts = []
    if (cursor) {
      // If cursor (ObjectID) is provided, find next set of older posts
      if (channel) {
        posts = await Post.find({ _id: { $lt: cursor }, channel: channel })
          .sort(sortCriteria)
          .limit(limit)
          .exec()
      } else {
        posts = await Post.find({ _id: { $lt: cursor } })
          .sort(sortCriteria)
          .limit(limit)
          .exec()
      }
    } else {
      if (channel) {
        posts = await Post.find({ channel: channel })
          .sort(sortCriteria)
          .limit(limit)
          .exec()
      } else {
        posts = await Post.find()
          .sort(sortCriteria)
          .limit(limit)
          .exec()
      }
    }

    // Cursor is set to the ID of the last item
    cursor = posts[posts.length - 1].id

    return {
      cursor,
      posts
    }
  },

  async postById(obj, { id }, context) {
    const { ctx } = context
    const user = ctx.state.user
    const post = await Post.findById(id).exec()
    //add click
    const newpost = await Post.findOneAndUpdate(
      { _id: post._id },
      {
        clickCount: post.clickCount + 1,
        lastReader: user ? user.username : ''
      },
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
    const { sort, channel } = args
    let postByAll = []
    if (channel) {
      postByAll = await Post.aggregate([
        {
          $match: { channel: channel }
        },
        {
          $project: {
            _id: '$_id',
            title: 1,
            commentCount: 1,
            author: 1,
            clickCount: 1,
            createdAt: 1,
            lastReader: 1
          }
        }
      ])
    } else {
      postByAll = await Post.aggregate([
        {
          $project: {
            _id: '$_id',
            title: 1,
            commentCount: 1,
            author: 1,
            clickCount: 1,
            createdAt: 1,
            lastReader: 1
          }
        }
      ])
    }
    let result = []
    if (sort == 'comment') {
      result = postByAll.sort((a, b) => {
        return b.commentCount - a.commentCount
      })
    } else if (sort == 'click') {
      result = postByAll.sort((a, b) => {
        return b.clickCount - a.clickCount
      })
    } else {
      result = postByAll.sort((a, b) => {
        return b.createdAt - a.createdAt
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

    const { title, url, content, channel } = args

    const author = ctx.state.user.username
    //发帖权限
    if (channel) {
      const result = await channelApi.isMute(channel, author)
      if (result) {
        throw new Error('在此频道被禁言。')
      }
    }

    const post = new Post({ title, url, content, author, channel })
    await post.save()
    return post
  },
  async editPost(obj, args, context, info) {
    const { ctx } = context

    if (ctx.isUnauthenticated()) {
      throw new Error('修改帖子前请先登录。')
    }

    const { id, title, url, content, channel } = args

    const author = ctx.state.user.username
    const post = await Post.findById(id).exec()
    //发帖权限
    if (channel) {
      const result = await channelApi.isMute(channel, author)
      if (result) {
        throw new Error('在此频道被禁言。')
      }
    }
    if (post.author !== author) {
      throw new Error('无此操作权限')
    }
    const newpost = await Post.findOneAndUpdate(
      { _id: post._id },
      {
        title: title,
        url: url,
        content: content,
        channel: channel ? channel : ''
      },
      { new: true }
    ).exec()
    await newpost.save()
    return newpost
  },
  async delPost(obj, args, context, info) {
    const { ctx } = context

    if (ctx.isUnauthenticated()) {
      throw new Error('删除帖子前请先登录。')
    }
    const { id } = args
    const post = await Post.findById(id).exec()
    const creator = await channelApi.creatorByChannel(post.channel)
    const currentuser = ctx.state.user.username
    if (post.author == currentuser || creator == currentuser) {
      //删除评论
      await commentApi.delByPostId(id)
      //删除notification
      await notificationApi.delByPostId(id)
      //删除文章
      await Post.remove({ _id: id })
      return true
    } else {
      throw new Error('无权限删除此帖。')
    }
  }
}

export default {
  Query,
  Mutation
}
