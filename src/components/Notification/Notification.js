import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Link from '../Link'
import RelativeTime from '../RelativeTime'
import Blockquote from '../Blockquote'
import styled from 'styled-components'
import Anchor from '../Anchor/Anchor'
import { withRouter } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

const StyledNotification = styled.div`
  margin: 3rem 0;
`

class Notification extends Component {
  handleRead = async e => {
    const { id, post, comment } = this.props
    const query = gql`
      query {
        notifications {
          id
          from
          post {
            id
            title
          }
          comment {
            id
            content
            createdAt
          }
        }

        currentUser {
          id
          username
          notificationCount
        }
      }
    `

    try {
      await this.props.readNotificationMutation({
        variables: {
          id
        },
        update: (cache, { data }) => {
          const { notifications, currentUser } = cache.readQuery({ query })
          const { readNotification } = data

          cache.writeQuery({
            query,
            data: {
              notifications: notifications.filter(
                ({ id }) => id !== readNotification.id
              ),
              currentUser: {
                ...currentUser,
                notificationCount: currentUser.notificationCount - 1
              }
            }
          })
        }
      })

      this.props.history.push(`/post/${post.id}#comment-${comment.id}`)
    } catch (err) {
      console.error(err)
    }
  }

  render() {
    const { from, post, comment } = this.props

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
          <Anchor bold onClick={this.handleRead}>
            {post.title}
          </Anchor>
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
}

Notification.propTypes = {
  from: PropTypes.string.isRequired,
  post: PropTypes.object.isRequired,
  comment: PropTypes.object.isRequired
}

const READ_NOTIFICATION_MUTATION = gql`
  mutation ReadNotification($id: ID!) {
    readNotification(id: $id) {
      id
    }
  }
`

const NotificationWithMutation = compose(
  graphql(READ_NOTIFICATION_MUTATION, { name: 'readNotificationMutation' })
)(Notification)

export default withRouter(NotificationWithMutation)
