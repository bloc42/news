import React, { Component } from 'react'
import { Query, graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'
import Voteicon from '../../components/Voteicon'
import { withRouter } from 'react-router-dom'
const StyledLeft = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  margin-right: 1.2rem;
  flex-direction: column;
  justify-content: space-between;

  span {
    cursor: pointer;
  }
`
const StyledVoteNum = styled.span`
  font-size: 0.8rem;
  font-weight: blod;
  color: #777;
`
class SubmitVote extends Component {
  constructor(props) {
    super(props)
    this.state = {
      iconHasUpvote: false,
      iconHasDownvote: false
    }
  }

  upvote = async e => {
    e.preventDefault()
    const id = this.props.id
    let { upvotePost, downvotePost } = this.props.currentUser
    const nowUpStatus = this.state.iconHasUpvote
    const nowDownStatus = this.state.iconHasDownvote
    const query = gql`
      query GetCurrentUser {
        currentUser {
          id
          username
          notificationCount
          upvotePost
          downvotePost
        }
      }
    `
    const queryPost = gql`
      query GetPosts($cursor: String, $channel: String) {
        postFeed(cursor: $cursor, channel: $channel) {
          cursor
          posts {
            id
            title
            url
            author
            commentCount
            createdAt
            channel
            upvoteCount
          }
        }
      }
    `
    try {
      const { errors } = await this.props.upvoteMutation({
        variables: {
          postId: id
        },
        update: (cache, { data }) => {
          const { postFeed } = cache.readQuery({
            query: queryPost
          })
          postFeed.posts.forEach(post => {
            if (post.id === id) {
              if (data.upvote.upStatus && nowDownStatus) {
                post.upvoteCount = post.upvoteCount + 1
                post.downvoteCount = post.downvoteCount - 1
              } else if (data.upvote.upStatus) {
                post.upvoteCount = post.upvoteCount + 1
              } else {
                post.upvoteCount = post.upvoteCount - 1
              }
            }
          })
          cache.writeQuery({
            query: queryPost,
            data: {
              postFeed: {
                ...postFeed,
                post: postFeed.posts
              }
            }
          })
          const { currentUser } = cache.readQuery({ query })
          cache.writeQuery({
            query,
            data: {
              currentUser: {
                ...currentUser,
                upvotePost: nowUpStatus
                  ? upvotePost.filter(post => post !== id)
                  : upvotePost.concat(id),
                downvotePost: nowDownStatus
                  ? downvotePost.filter(post => post !== id)
                  : downvotePost
              }
            }
          })
        }
      })
      if (errors && errors.length > 0) {
        this.setState({ errors })
      } else {
        this.setState({ iconHasUpvote: !this.state.iconHasUpvote })
        if (this.state.iconHasDownvote === true) {
          this.setState({ iconHasDownvote: !this.state.iconHasDownvote })
        }
      }
    } catch (err) {
      console.error(err)
    }
  }
  downvote = async e => {
    e.preventDefault()
    const id = this.props.id
    let { upvotePost, downvotePost } = this.props.currentUser
    const nowUpStatus = this.state.iconHasUpvote
    const nowDownStatus = this.state.iconHasDownvote
    const query = gql`
      query GetCurrentUser {
        currentUser {
          id
          username
          notificationCount
          upvotePost
          downvotePost
        }
      }
    `
    const queryPost = gql`
      query GetPosts($cursor: String, $channel: String) {
        postFeed(cursor: $cursor, channel: $channel) {
          cursor
          posts {
            id
            title
            url
            author
            commentCount
            createdAt
            channel
            upvoteCount
          }
        }
      }
    `
    try {
      const { errors } = await this.props.downvoteMutation({
        variables: {
          postId: id
        },
        update: (cache, { data }) => {
          const { postFeed } = cache.readQuery({
            query: queryPost
          })
          postFeed.posts.forEach(post => {
            if (post.id === id) {
              if (data.downvote.downStatus && nowUpStatus) {
                post.upvoteCount = post.upvoteCount - 1
                post.downvoteCount = post.downvoteCount + 1
              } else if (data.downvote.downStatus) {
                post.downvoteCount = post.downvoteCount + 1
              } else {
                post.downvoteCount = post.downvoteCount - 1
              }
            }
          })
          cache.writeQuery({
            query: queryPost,
            data: {
              postFeed: {
                ...postFeed,
                post: postFeed.posts
              }
            }
          })

          const { currentUser } = cache.readQuery({ query })
          cache.writeQuery({
            query,
            data: {
              currentUser: {
                ...currentUser,
                downvotePost: nowDownStatus
                  ? downvotePost.filter(post => post !== id)
                  : downvotePost.concat(id),
                upvotePost: nowUpStatus
                  ? upvotePost.filter(post => post !== id)
                  : upvotePost
              }
            }
          })
        }
      })
      if (errors && errors.length > 0) {
        this.setState({ errors })
      } else {
        this.setState({ iconHasDownvote: !this.state.iconHasDownvote })
        if (this.state.iconHasUpvote === true) {
          this.setState({ iconHasUpvote: !this.state.iconHasUpvote })
        }
      }
    } catch (err) {
      console.error(err)
    }
  }
  jumptoLogin = e => {
    this.props.history.push('/login')
  }
  componentDidMount() {
    const { currentUser } = this.props
    if (currentUser) {
      const myUpVotePosts = currentUser.upvotePost
      const myDownVotePosts = currentUser.downvotePost
      const id = this.props.id
      if (myUpVotePosts.indexOf(id) !== -1) {
        this.setState({ iconHasUpvote: true })
      } else {
        this.setState({ iconHasUpvote: false })
      }
      if (myDownVotePosts.indexOf(id) !== -1) {
        this.setState({ iconHasDownvote: true })
      } else {
        this.setState({ iconHasDownvote: false })
      }
    }
  }
  render() {
    const { upvoteCount, currentUser } = this.props

    return currentUser ? (
      <StyledLeft>
        <Voteicon
          upvote={this.state.iconHasUpvote}
          upvotegray={!this.state.iconHasUpvote}
          onClick={this.upvote}
        />
        <StyledVoteNum>{upvoteCount}</StyledVoteNum>
        <Voteicon
          downvote={this.state.iconHasDownvote}
          downvotegray={!this.state.iconHasDownvote}
          onClick={this.downvote}
        />
      </StyledLeft>
    ) : (
      <StyledLeft>
        <Voteicon upvotegray onClick={this.jumptoLogin} />
        <StyledVoteNum>{upvoteCount}</StyledVoteNum>
        <Voteicon downvotegray onClick={this.jumptoLogin} />
      </StyledLeft>
    )
  }
}

const UPVOTE_MUTATION = gql`
  mutation upvote($postId: ID!) {
    upvote(postId: $postId) {
      id
      voterId
      postId
      upStatus
      downStatus
    }
  }
`
const DOWNVOTE_MUTATION = gql`
  mutation downvote($postId: ID!) {
    downvote(postId: $postId) {
      id
      voterId
      postId
      upStatus
      downStatus
    }
  }
`
const submitVoteWithMutation = compose(
  graphql(UPVOTE_MUTATION, { name: 'upvoteMutation' }),
  graphql(DOWNVOTE_MUTATION, { name: 'downvoteMutation' })
)(SubmitVote)

export default withRouter(submitVoteWithMutation)
