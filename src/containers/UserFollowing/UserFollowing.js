import React, { Component } from 'react'
import styled from 'styled-components'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import Link from '../../components/Link'
import { withRouter } from 'react-router-dom'
import UserActionBoard from '../UserActionBoard'

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
  flex-direction: column;
`

const StyledList = styled.li`
  list-style: none;
  margin-top: 0.5rem;
  heigt: 20px;
  display: flex;
  justify-content: space-between;
`

const StyledName = styled.span`
  margin-top: 0.5rem;
  color: #777;
`

class UserFollowing extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  showActionBtn(name) {
    const { params } = this.props.match
    const { username } = params
    return <UserActionBoard name={name} username={username} />
  }
  showChannels(channels, currentUser) {
    if (channels && channels.length > 0) {
      return channels.map(channel => (
        <StyledList key={channel.id}>
          <Link to={`/channel/${channel.name}`}>
            {/* <Logo src={channel.logo} /> */}
            <StyledName>{channel.name}</StyledName>
          </Link>
          {currentUser && channel.creator == currentUser.username
            ? this.showActionBtn(channel.name)
            : ''}
        </StyledList>
      ))
    } else {
      return (
        <StyledList>
          <StyledName>暂无</StyledName>
        </StyledList>
      )
    }
  }
  renderFollowingChannels(following) {
    const names = following

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
          {({ loading, data, client }) => {
            if (loading) {
              return null
            }
            const query = gql`
              query {
                currentUser {
                  id
                  username
                }
              }
            `
            const { channels } = data
            const { currentUser } = client.cache.readQuery({ query })
            return (
              <StyledBoardItem>
                <StyledTitle>他/她关注的分论坛</StyledTitle>
                <StyledLists>
                  {this.showChannels(channels, currentUser)}
                </StyledLists>
              </StyledBoardItem>
            )
          }}
        </Query>
      )
    } else {
      return (
        <StyledBoardItem>
          <StyledTitle>他/她关注的分论坛</StyledTitle>
          <StyledLists>{this.showChannels()}</StyledLists>
        </StyledBoardItem>
      )
    }
  }
  queryUserFollowing() {
    const { params } = this.props.match
    const { username } = params
    return (
      <Query
        query={gql`
          query GetUserFollowing($username: String!) {
            user(username: $username) {
              id
              username
              following
            }
          }
        `}
        variables={{ username }}
      >
        {({ loading, data }) => {
          if (loading) {
            return null
          }
          const { following } = data.user
          return <div>{this.renderFollowingChannels(following)}</div>
        }}
      </Query>
    )
  }
  render() {
    return <StyledBoard>{this.queryUserFollowing()}</StyledBoard>
  }
}

export default withRouter(UserFollowing)
