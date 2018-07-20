import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import RelativeTime from '../RelativeTime'
import Divider from '../Divider'
import SubmitCommentForm from '../../containers/SubmitCommentForm'
import Anchor from '../Anchor'

const StyledComment = styled.div`
  margin: 2rem 0;
  margin-left: ${props => props.level * 2}rem;

  footer {
    display: flex;
    flex-direction: row;
    margin-top: 1rem;
    color: ${props => props.theme.fontColorLight};
  }

  footer a {
    color: ${props => props.theme.fontColorLight};
  }
`

class Comment extends Component {
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
      showReply: false
    }
  }

  toggleReply = e => {
    this.setState({
      showReply: !this.state.showReply
    })
  }

  render() {
    const { id, author, content, createdAt, postId, level } = this.props
    return (
      <StyledComment level={level}>
        <section>{content}</section>
        <footer>
          <div>{author}</div>
          <Divider />
          <div>
            <RelativeTime timestamp={createdAt} />
          </div>
          <Divider />
          <div>
            <Anchor onClick={this.toggleReply}>
              {this.state.showReply ? '取消' : '回复'}
            </Anchor>
          </div>
        </footer>
        {this.state.showReply && (
          <SubmitCommentForm
            postId={postId}
            parentId={id}
            parentAuthor={author}
          />
        )}
      </StyledComment>
    )
  }
}

export default Comment
