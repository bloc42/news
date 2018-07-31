import Notification from './model'

export default {
  async getNotificationsByUsername(username) {
    const notifications = await Notification.find({
      isRead: false,
      to: username
    })
      .sort({ createdAt: -1 })
      .exec()

    return notifications
  }
}
