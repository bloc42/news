import postApi from '../entities/post/api'

export default {
  currentUser: (obj, args, context, info) => {
    const { ctx } = context
    return ctx.state.user
  },
  posts: (obj, args, context, info) => {
    return postApi.getPosts()
  }
}
