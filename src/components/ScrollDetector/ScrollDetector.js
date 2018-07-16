import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ScrollDetector extends Component {
  static propTypes = {
    onReachBottom: PropTypes.func.isRequired
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll = e => {
    const windowHeight =
      'innerHeight' in window
        ? window.innerHeight
        : document.documentElement.offsetHeight
    const body = document.body
    const html = document.documentElement
    const docHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    )
    const windowBottom = windowHeight + window.pageYOffset

    const { onReachBottom } = this.props

    if (windowBottom >= docHeight) {
      onReachBottom()
    }
  }

  render() {
    return <div />
  }
}

export default ScrollDetector
