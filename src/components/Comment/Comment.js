import React, { Component } from 'react'
import PropTypes from 'prop-types'
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'
import styled from 'styled-components'
import RelativeTime from '../RelativeTime'
import Divider from '../Divider'
import { withRouter } from 'react-router-dom'

import SubmitCommentForm from '../../containers/SubmitCommentForm'
import Anchor from '../Anchor'
import Link from '../Link'

const StyledComment = styled.div`
  margin: 2rem 0;
  margin-left: ${props => props.level * 2}rem;

  footer {
    font-size: ${props => props.theme.fontSizeSmall};
    display: flex;
    flex-direction: row;
    margin-top: 0.4rem;
    color: ${props => props.theme.fontColorLight};
  }

  footer a {
    color: ${props => props.theme.fontColorLight};
  }
`
const Styledflexdiv = styled.div`
  display: flex;
`

class rawComment extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    fullSlug: PropTypes.string.isRequired,
    level: PropTypes.number.isRequired,
    postId: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      showReply: false,
      errors: []
    }
  }
  toggleReply = e => {
    this.setState({
      showReply: !this.state.showReply
    })
  }
  delComment = async e => {
    e.preventDefault()
    let { id } = this.props
    try {
      const { errors } = await this.props.delCommentMutation({
        variables: {
          id
        },
        update: (cache, { data }) => {
          this.forceUpdate()
          this.setState({ errors })
        }
      })
      if (errors && errors.length > 0) {
        this.setState({ errors })
      } else {
        this.setState({ errors: [] })
      }
    } catch (err) {
      console.error(err)
    }
  }
  showdel(author, currentUser) {
    if (author == currentUser.username) {
      return (
        <Styledflexdiv>
          <Divider />
          <Anchor onClick={this.delComment}>删除</Anchor>
        </Styledflexdiv>
      )
    }
  }
  render() {
    const {
      id,
      author,
      content,
      createdAt,
      postId,
      level,
      currentUser
    } = this.props
    return (
      <StyledComment level={level} id={`comment-${id}`}>
        <section>
          {content.split('\n').map((paragraph, key) => {
            return <p key={key}>{paragraph}</p>
          })}
        </section>
        <footer>
          <div>
            <Link to={`/user/${author}`}>{author}</Link>
          </div>
          <Divider />
          <div>
            <Link smooth to={`/post/${postId}#comment-${id}`}>
              <RelativeTime timestamp={createdAt} />
            </Link>
          </div>
          <Divider />
          <div>
            <Anchor onClick={this.toggleReply}>
              {this.state.showReply ? '取消' : '回复'}
            </Anchor>
          </div>
          {this.showdel(author, currentUser)}
        </footer>
        {this.state.showReply && (
          <SubmitCommentForm
            toggleReply={() => this.toggleReply()}
            postId={postId}
            parentId={id}
            parentAuthor={author}
          />
        )}
      </StyledComment>
    )
  }
}
const DEL_COMMENT_MUTATION = gql`
  mutation delComment($id: ID!) {
    delComment(id: $id) {
      id
    }
  }
`

const Comment = compose(
  graphql(DEL_COMMENT_MUTATION, { name: 'delCommentMutation' })
)(rawComment)
export default withRouter(Comment)
