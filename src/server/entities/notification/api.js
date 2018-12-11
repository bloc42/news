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
  },
  async delByPostId(id) {
    await Notification.remove({ postId: id })
    return true
  }
}
