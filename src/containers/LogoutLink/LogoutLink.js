import React, { Component } from 'react'
import gql from 'graphql-tag'
import { withApollo, graphql, compose } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import Anchor from '../../components/Anchor'

export class LogoutLink extends Component {
  handleLogout = async e => {
    e.preventDefault()

    try {
      await this.props.logoutMutation()
      this.props.client.resetStore()
      this.props.history.push('/')
    } catch (err) {
      // TODO: show error message
      console.log(err)
    }
  }

  render() {
    return <Anchor onClick={this.handleLogout}>登出</Anchor>
  }
}

const LOGOUT_MUTATION = gql`
  mutation Logout {
    logout {
      id
      username
    }
  }
`

const LogoutLinkWithMutation = compose(
  graphql(LOGOUT_MUTATION, { name: 'logoutMutation' })
)(LogoutLink)

export default withRouter(withApollo(LogoutLinkWithMutation))
