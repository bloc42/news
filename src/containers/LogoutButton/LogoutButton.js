import React, { Component } from 'react'
import gql from 'graphql-tag'
import { withApollo, graphql, compose } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import Button from '../../components/Button'

export class LogoutButton extends Component {
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
    return (
      <Button primary fullWidth onClick={this.handleLogout}>
        登出
      </Button>
    )
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

const LogoutButtonWithMutation = compose(
  graphql(LOGOUT_MUTATION, { name: 'logoutMutation' })
)(LogoutButton)

export default withRouter(withApollo(LogoutButtonWithMutation))
