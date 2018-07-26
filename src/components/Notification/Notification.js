import React from 'react'
import Link from '../Link'

const Notification = ({ from, postId, postTitle, commentId }) => {
  return (
    <div>
      <Link to={`/user/${from}`}>{from} </Link>
      在文章
      <Link to={`/post/${postId}#comment-${commentId}`}>《{postTitle}》</Link>
      中回复了你。
    </div>
  )
}

export default Notification
