import mockPosts from './mock'

const Query = {
  posts: (obj, args, context, info) => {
    return mockPosts
  }
}

export default {
  Query
}
