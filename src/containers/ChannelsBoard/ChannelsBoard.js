import React, { Component } from 'react'
import styled from 'styled-components'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import Link from '../../components/Link'
import { withRouter } from 'react-router-dom'

const StyledBoard = styled.ul`
  list-style: none;
  padding-left: 0rem;
`
const StyledBoardItem = styled.li`
  margin-bottom: 2rem;
`
const StyledTitle = styled.span`
  font-weight: bold;
`

const StyledLists = styled.ul`
  list-style: none;
  display: flex;
  margin-top: 0.5rem;
`

const StyledList = styled.li`
  list-style: none;
  margin: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const StyledName = styled.span`
  margin-top: 0.5rem;
  color: #777;
`
class ChannelsBoard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      followingChannels: [],
      adminChannels: [],
      errors: [],
      successes: []
    }
  }
  showChannels(channels) {
    if (channels && channels.length > 0) {
      return channels.map(channel => (
        <Link to={`/channel/${channel.name}`} key={channel.id}>
          <StyledList>
            {/* <Logo src={channel.logo} /> */}
            <StyledName>{channel.name}</StyledName>
          </StyledList>
        </Link>
      ))
    } else {
      return (
        <StyledList>
          <StyledName>暂无</StyledName>
        </StyledList>
      )
    }
  }
  renderAdminChannels() {
    const admin = true
    return (
      <Query
        query={gql`
          query GetAdminChannels($admin: Boolean) {
            channels(admin: $admin) {
              id
              name
              info
              logo
              creator
            }
          }
        `}
        variables={{ admin }}
      >
        {({ loading, data }) => {
          if (loading) {
            return null
          }
          const { channels } = data
          return (
            <StyledBoardItem>
              <StyledTitle>我创建的小唠嗑</StyledTitle>
              <StyledLists>{this.showChannels(channels)}</StyledLists>
            </StyledBoardItem>
          )
        }}
      </Query>
    )
  }

  renderFollowingChannels(currentUser) {
    const names = currentUser.following
    if (names && names.length > 0) {
      return (
        <Query
          query={gql`
            query GetFollowingChannels($names: [String!]) {
              channels(names: $names) {
                id
                name
                info
                logo
                creator
              }
            }
          `}
          variables={{ names }}
        >
          {({ loading, data }) => {
            if (loading) {
              return null
            }
            const { channels } = data
            return (
              <StyledBoardItem>
                <StyledTitle>我关注的小唠嗑</StyledTitle>
                <StyledLists>{this.showChannels(channels)}</StyledLists>
              </StyledBoardItem>
            )
          }}
        </Query>
      )
    } else {
      return (
        <StyledBoardItem>
          <StyledTitle>我关注的小唠嗑</StyledTitle>
          <StyledLists>{this.showChannels()}</StyledLists>
        </StyledBoardItem>
      )
    }
  }
  render() {
    return (
      <StyledBoard>
        {this.renderAdminChannels()}
        {this.renderFollowingChannels(this.props.currentUser)}
      </StyledBoard>
    )
  }
}

export default withRouter(ChannelsBoard)
