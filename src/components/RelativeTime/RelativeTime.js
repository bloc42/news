import React from 'react'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'

dayjs.extend(relativeTime)

const RelativeTime = ({ timestamp }) => {
  const relativeTime = dayjs()
    .locale('zh-cn')
    .to(dayjs(timestamp))
  return <span>{relativeTime}</span>
}

RelativeTime.propTypes = {
  timestamp: PropTypes.string.isRequired
}

export default RelativeTime
