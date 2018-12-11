import Comment from './model'
import Post from '../post/model'
import Notification from '../notification/model'
import CommentAPI from './api'

const Query = {
  async commentById(obj, args) {
    const { id } = args
    return await Comment.findById(id).exec()
  },

  async commentsByPostId(obj, args) {
    const { postId } = args
    return await Comment.find({ postId })
      .sort({ fullSlug: 1 })
      .exec()
  },

  async commentGrowth(obj, args, context) {
    const { dateType, createdAfter, createdBefore } = args
    const beforeAll = await Comment.aggregate([
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
      analysis = await Comment.aggregate([
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
      analysis = await Comment.aggregate([
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
      analysis = await Comment.aggregate([
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
      analysis = await Comment.aggregate([
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

  async totalCommentsCount(obj, args, context) {
    const { dateTime, dayStart, dayEnd } = args
    const commentCount = await Comment.aggregate([
      { $match: { createdAt: { $lt: new Date(dateTime) } } },
      {
        $group: {
          _id: null,
          count: { $sum: 1 }
        }
      }
    ])
    let result = {
      total: commentCount[0].count
    }
    if (dayStart && dayEnd) {
      const daycount = await Comment.aggregate([
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
  async addComment(obj, args, context) {
    const { ctx } = context

    if (ctx.isUnauthenticated()) {
      throw '发布评论前请先登录。'
    }

    const { content, postId, parentId } = args

    const post = await Post.findById(postId).exec()

    if (!post) {
      throw '无法找到该帖子。'
    }

    const author = ctx.state.user.username
    const comment = await CommentAPI.saveComment(
      author,
      content,
      postId,
      parentId
    )
    post.commentCount = post.commentCount + 1
    await post.save()

    if (parentId) {
      // Notify parent comment author
      const parentComment = await Comment.findById(parentId).exec()

      if (parentComment.author !== author) {
        const notification = new Notification({
          from: author,
          to: parentComment.author,
          postId: post.id,
          postTitle: post.title,
          commentId: comment.id
        })

        await notification.save()
      }
    } else if (post.author !== author) {
      // Notify post author
      const notification = new Notification({
        from: author,
        to: post.author,
        postId: post.id,
        postTitle: post.title,
        commentId: comment.id
      })

      await notification.save()
    }

    return comment
  },
  async delComment(obj, args, context) {
    const { ctx } = context
    if (ctx.isUnauthenticated()) {
      throw '发布评论前请先登录。'
    }
    const { id } = args
    const comment = await Comment.findOneAndUpdate(
      {
        _id: id
      },
      {
        content: '该用户已删除此评论'
      },
      { new: true }
    ).exec()
    await comment.save()
    return comment
  }
}

export default {
  Query,
  Mutation
}
