import React, { Component } from 'react'
import { Query, graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import Muteicon from '../../components/Muteicon'

const StyledActionBoard = styled.span`
  display: flex;
  height: 20px;
`

class Mute extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isMute: props.isMute
    }
  }

  changeMute = async e => {
    const name = this.props.name
    const username = this.props.username
    try {
      const { errors } = await this.props.MuteMutation({
        variables: {
          username: username,
          name: name
        }
      })
      if (errors && errors.length > 0) {
      } else {
        this.setState({ isMute: !this.state.isMute })
      }
    } catch (err) {
      console.error(err)
    }
  }

  render() {
    return (
      <Muteicon
        mute={!this.state.isMute}
        allow={this.state.isMute}
        onClick={this.changeMute}
      />
    )
  }
}

const MUTE_MUTATION = gql`
  mutation changeMuteStatus($username: String!, $name: String!) {
    changeMuteStatus(username: $username, name: $name) {
      id
      name
      creator
      muteUser
    }
  }
`
const muteMutation = compose(graphql(MUTE_MUTATION, { name: 'MuteMutation' }))(
  Mute
)

export default withRouter(muteMutation)
