import React from 'react'
import PropTypes from 'prop-types'
import Link from '../Link'
import RelativeTime from '../RelativeTime'
import Blockquote from '../Blockquote'
import styled from 'styled-components'

const StyledNotification = styled.div`
  margin: 3rem 0;
`

const Notification = ({ from, post, comment }) => {
  return (
    <StyledNotification>
      <header>
        {/* TODO: use bold instead of bold='true'. We use the latter for now
            to avoid the warning produced by react router. */}
        <Link bold="true" to={`/user/${from}`}>
          {from}
        </Link>
        <span> </span>
        <RelativeTime timestamp={comment.createdAt} />
        <span>在 </span>
        <Link bold="true" to={`/post/${post.id}#comment-${comment.id}`}>
          {post.title}
        </Link>
        <span> 中回复了你：</span>
      </header>
      <Blockquote>
        {comment.content.split('\n').map((paragraph, key) => {
          return <p key={key}>{paragraph}</p>
        })}
      </Blockquote>
    </StyledNotification>
  )
}

Notification.propTypes = {
  from: PropTypes.string.isRequired,
  post: PropTypes.object.isRequired,
  comment: PropTypes.object.isRequired
}

export default Notification
