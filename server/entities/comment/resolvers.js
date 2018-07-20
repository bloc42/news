import Comment from './model'
import Post from '../post/model'
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
      throw '无法找到该文章。'
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

    return comment
  }
}

export default {
  Query,
  Mutation
}
