import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { throttle } from 'throttle-debounce'

class ScrollDetector extends Component {
  static propTypes = {
    onReachBottom: PropTypes.func.isRequired
  }

  componentDidMount() {
    window.addEventListener('scroll', throttle(300, this.handleScroll))
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
    const detectZoom = function() {
      let ratio = 0,
        screen = window.screen,
        ua = navigator.userAgent.toLowerCase()
      if (~ua.indexOf('firefox')) {
        if (window.devicePixelRatio !== undefined) {
          ratio = window.devicePixelRatio
        }
      } else if (~ua.indexOf('msie')) {
        if (screen.deviceXDPI && screen.logicalXDPI) {
          ratio = screen.deviceXDPI / screen.logicalXDPI
        }
      } else if (
        window.outerWidth !== undefined &&
        window.innerWidth !== undefined
      ) {
        ratio = window.outerWidth / window.innerWidth
      }
      if (ratio) {
        ratio = Math.round(ratio * 100)
      }
      if (ratio === 99 || ratio === 101) {
        ratio = 100
      }
      return ratio
    }
    const zoom = detectZoom() / 100
    const windowBottom = windowHeight + window.pageYOffset / zoom
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
