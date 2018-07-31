import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import Notification from '../../components/Notification'

export const GET_NOTIFICATIONS = gql`
  query GetNotifications {
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
  }
`

const NotificationList = () => (
  <Query query={GET_NOTIFICATIONS}>
    {({ loading, data }) => {
      if (loading) return '加载中。。。'

      const { notifications } = data

      if (notifications.length > 0) {
        return (
          <div>
            <p>你有{notifications.length}条未读通知。</p>
            {notifications.map(notification => (
              <Notification key={notification.id} {...notification} />
            ))}
          </div>
        )
      } else {
        return <p>没有未读通知。</p>
      }
    }}
  </Query>
)

export default NotificationList
