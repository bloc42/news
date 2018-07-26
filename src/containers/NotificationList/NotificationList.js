import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import Notification from '../../components/Notification'

export const GET_NOTIFICATIONS = gql`
  query GetNotifications {
    notifications {
      id
      from
      postId
      postTitle
      commentId
    }
  }
`

const NotificationList = () => (
  <Query query={GET_NOTIFICATIONS}>
    {({ loading, data }) => {
      if (loading) return null

      const { notifications } = data

      return (
        <div>
          {notifications.map(notification => (
            <Notification key={notification.id} {...notification} />
          ))}
        </div>
      )
    }}
  </Query>
)

export default NotificationList
