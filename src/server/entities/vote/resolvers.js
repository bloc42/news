import Vote from './model'
import postApi from '../post/api'
import userApi from '../user/api'
import { __await } from 'tslib'

const Query = {
  async vote(obj, args, context, info) {
    const { ctx } = context
    const { postId } = args
    const voterId = ctx.state.user.id
    let vote = await Vote.find({ voterId: voterId, post: postId }).exec()
    return vote
  },
  async point(obj, args, context, info) {
    const { ctx } = context
    const author = ctx.state.user.username
    const upResult = await Vote.aggregate([
      {
        $match: {
          author: 'admin',
          upStatus: true
        }
      },
      {
        $group: {
          _id: '$author',
          upcount: { $sum: 1 }
        }
      }
    ])
    const downResult = await Vote.aggregate([
      {
        $match: {
          author: 'admin',
          downStatus: true
        }
      },
      {
        $group: {
          _id: '$author',
          downcount: { $sum: 1 }
        }
      }
    ])
    const uppoint = upResult[0] ? upResult[0].upcount : 0
    const downpoint = downResult[0] ? downResult[0].downcount : 0
    return {
      author: author,
      userpoint: Number(uppoint - downpoint)
    }
  }
}

const Mutation = {
  async upvote(obj, args, context, info) {
    const { ctx } = context
    const { postId } = args
    if (ctx.isUnauthenticated()) {
      throw new Error('请先登录。')
    }
    const voterId = ctx.state.user.id
    //查询此用户关于此频道记录
    let vote = await Vote.findOne({ voterId: voterId, postId: postId }).exec()

    //无记录,新建一条记录
    if (!vote || vote.length == 0) {
      const { author } = await postApi.getPost(postId)
      vote = new Vote({ voterId, postId, author })
      await vote.save()

      vote = await Vote.findOneAndUpdate(
        { voterId: voterId, postId: postId },
        { upStatus: !vote.upStatus },
        { new: true }
      ).exec()
      await userApi.addupvotePost(voterId, postId)
      await postApi.addupvoteCount(postId)
    } else {
      if (!vote.upStatus && !vote.downStatus) {
        //有记录,downStatus为false,up频道
        vote = await Vote.findOneAndUpdate(
          { voterId: voterId, postId: postId },
          { upStatus: !vote.upStatus },
          { new: true }
        ).exec()
        await userApi.addupvotePost(voterId, postId)
        await postApi.addupvoteCount(postId)
      } else if (!vote.upStatus && vote.downStatus) {
        //有记录,downStatus为true,up频道
        vote = await Vote.findOneAndUpdate(
          { voterId: voterId, postId: postId },
          { upStatus: !vote.upStatus, downStatus: !vote.downStatus },
          { new: true }
        ).exec()
        await userApi.addupvotePost(voterId, postId)
        await postApi.addupvoteCount(postId)
        await userApi.removedownvotePost(voterId, postId)
        await postApi.removedownvoteCount(postId)
      } else if (vote.upStatus) {
        //有记录,取消频道
        vote = await Vote.findOneAndUpdate(
          { voterId: voterId, postId: postId },
          { upStatus: !vote.upStatus },
          { new: true }
        ).exec()
        await userApi.removeupvotePost(voterId, postId)
        await postApi.removeupvoteCount(postId)
      }
    }
    return vote
  },
  async downvote(obj, args, context, info) {
    const { ctx } = context
    const { postId } = args
    if (ctx.isUnauthenticated()) {
      throw new Error('请先登录。')
    }
    const voterId = ctx.state.user.id
    //查询此用户关于此频道记录
    let vote = await Vote.findOne({ voterId: voterId, postId: postId }).exec()
    //无记录,新建一条记录
    if (!vote) {
      const { author } = await postApi.getPost(postId)
      vote = new Vote({ voterId, postId, author })
      vote = await Vote.findOneAndUpdate(
        { voterId: voterId, postId: postId },
        { downStatus: !vote.downStatus },
        { new: true }
      ).exec()
      await userApi.addupvotePost(voterId, postId)
      await postApi.addupvoteCount(postId)
    } else {
      if (!vote.downStatus && !vote.upStatus) {
        //有记录,upStatus为false,down频道
        vote = await Vote.findOneAndUpdate(
          { voterId: voterId, postId: postId },
          { downStatus: !vote.downStatus },
          { new: true }
        ).exec()
        await userApi.adddownvotePost(voterId, postId)
        await postApi.adddownvoteCount(postId)
      } else if (!vote.downStatus && vote.upStatus) {
        //有记录,upStatus为true,up频道
        vote = await Vote.findOneAndUpdate(
          { voterId: voterId, postId: postId },
          { downStatus: !vote.downStatus, upStatus: !vote.upStatus },
          { new: true }
        ).exec()
        await userApi.adddownvotePost(voterId, postId)
        await postApi.adddownvoteCount(postId)
        await userApi.removeupvotePost(voterId, postId)
        await postApi.removeupvoteCount(postId)
      } else if (vote.downStatus) {
        //有记录,取消频道
        vote = await Vote.findOneAndUpdate(
          { voterId: voterId, postId: postId },
          { downStatus: !vote.downStatus },
          { new: true }
        ).exec()
        await userApi.removedownvotePost(voterId, postId)
        await postApi.removedownvoteCount(postId)
      }
    }
    return vote
  }
}

export default {
  Query,
  Mutation
}
