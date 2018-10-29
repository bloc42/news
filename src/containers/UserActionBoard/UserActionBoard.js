import React, { Component } from 'react'
import { Query, graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import Mute from '../Mute'

const StyledActionBoard = styled.span`
  display: flex;
  height: 20px;
`

class UserActionBoard extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const name = this.props.name
    const username = this.props.username
    return (
      <Query
        query={gql`
          query UserInMute($name: String!, $username: String!) {
            userInMute(name: $name, username: $username) {
              isMute
              muteUser
            }
          }
        `}
        variables={{ name, username }}
      >
        {({ loading, data }) => {
          if (loading) {
            return null
          }
          const { isMute } = data.userInMute
          return (
            <StyledActionBoard>
              <Mute isMute={isMute} name={name} username={username} />
            </StyledActionBoard>
          )
        }}
      </Query>
    )
  }
}

export default withRouter(UserActionBoard)
