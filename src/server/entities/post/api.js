import Post from './model'

const api = {
  async getPost(postId) {
    return await Post.findById(postId).exec()
  },
  async addupvoteCount(postId) {
    let post = await Post.findById(postId).exec()
    post = await Post.findOneAndUpdate(
      { _id: post.id },
      { upvoteCount: post.upvoteCount + 1 },
      { new: true }
    ).exec()
  },
  async removeupvoteCount(postId) {
    let post = await Post.findById(postId).exec()
    post = await Post.findOneAndUpdate(
      { _id: post.id },
      { upvoteCount: post.upvoteCount - 1 },
      { new: true }
    ).exec()
  },
  async adddownvoteCount(postId) {
    let post = await Post.findById(postId).exec()
    post = await Post.findOneAndUpdate(
      { _id: post.id },
      { downvoteCount: post.downvoteCount + 1 },
      { new: true }
    ).exec()
  },
  async removedownvoteCount(postId) {
    let post = await Post.findById(postId).exec()
    post = await Post.findOneAndUpdate(
      { _id: post.id },
      { downvoteCount: post.downvoteCount - 1 },
      { new: true }
    ).exec()
  }
}

export default api
