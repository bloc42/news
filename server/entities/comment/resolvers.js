import Comment from './model'
import dayjs from 'dayjs'

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

    const timestamp = dayjs().format('YYYY.MM.DD.hh:mm:ss')
    const slugPart = Math.random()
      .toString(36)
      .substr(2, 4)
    const fullSlugPart = `${timestamp}:${slugPart}`
    let slug
    let fullSlug

    if (parentId) {
      const parentComment = await Comment.findById(parentId).exec()
      slug = `${parentComment.slug}/${slugPart}`
      fullSlug = `${parentComment.fullSlug}/${fullSlugPart}`
    } else {
      slug = slugPart
      fullSlug = fullSlugPart
    }

    const comment = new Comment({
      author: ctx.state.user.username,
      content,
      postId,
      parentId,
      slug,
      fullSlug
    })

    await comment.save()

    return comment
  }
}

export default {
  Query,
  Mutation
}
