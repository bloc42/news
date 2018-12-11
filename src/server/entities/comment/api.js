import Comment from './model'
import dayjs from 'dayjs'

export default {
  async saveComment(author, content, postId, parentId) {
    const timestamp = dayjs().format('YYYY.MM.DD.hh:mm:ss')
    const slugPart = Math.random()
      .toString(36)
      .substr(2, 4)
    const fullSlugPart = `${timestamp}:${slugPart}`
    let slug
    let fullSlug
    let level

    if (parentId) {
      const parentComment = await Comment.findById(parentId).exec()
      slug = `${parentComment.slug}/${slugPart}`
      fullSlug = `${parentComment.fullSlug}/${fullSlugPart}`
      level = parentComment.level + 1
    } else {
      slug = slugPart
      fullSlug = fullSlugPart
      level = 0
    }

    const comment = new Comment({
      author,
      content,
      postId,
      parentId,
      slug,
      fullSlug,
      level
    })

    await comment.save()
    return comment
  },
  async delByPostId(id) {
    await Comment.remove({ postId: id })
    return true
  }
}
