import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import styled, { css } from 'styled-components'
import gql from 'graphql-tag'
import { Query, graphql, compose } from 'react-apollo'
import Arrow from '../../components/Arrow'
import Menu from '../../components/Menu'

const StyledChannelInfo = styled.div`
  padding: 1.2rem 1.2rem 1.2rem 1.2rem;
  margin-bottom: 2rem;

  ${props =>
    props.hide &&
    css`
      height: 3.5rem;
      overflow: hidden;
    `};
`
const StyledBoard = styled.div`
  display: flex;
  justify-content: space-between;
`
const StyledMenu = styled(Menu)`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
`
const StyledButton = styled.a`
  cursor: pointer;
`
const StyledTitle = styled.a`
  font-weight: bold;
`

const StyledArrow = styled(Arrow)`
  float: right;
  cursor: pointer;
`
class ChannelInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: props.name,
      username: props.currentUser.username,
      following: props.currentUser.following,
      hide: false
    }
  }
  joinChannel = async e => {
    const name = this.props.name
    try {
      const { errors } = await this.props.followingMutation({
        variables: {
          channel: name
        }
      })
      if (errors && errors.length > 0) {
      } else {
      }
    } catch (err) {
      console.error(err)
    }
  }
  quitChannel = async e => {
    const name = this.props.name
    try {
      const { errors } = await this.props.unfollowMutation({
        variables: {
          channel: name
        }
      })
      if (errors && errors.length > 0) {
      } else {
      }
    } catch (err) {
      console.error(err)
    }
  }
  toggleInfoShow = e => {
    this.setState({
      hide: !this.state.hide
    })
  }
  renderInfo() {
    const { name, currentUser } = this.props
    return (
      <Query
        query={gql`
          query GetChannelInfo($name: String!) {
            channel(name: $name) {
              id
              name
              info
              logo
              creator
            }
          }
        `}
        variables={{ name }}
      >
        {({ loading, data }) => {
          if (loading) {
            return null
          }
          const { channel } = data
          const { name, creator } = channel
          const names = currentUser.following

          //creator
          if (currentUser.username === creator) {
            return (
              <div>
                <StyledTitle>{name}</StyledTitle>
                <StyledArrow
                  onClick={this.toggleInfoShow}
                  up={!this.state.hide}
                  down={this.state.hide}
                />
                <StyledBoard>
                  <StyledMenu>
                    <Menu.Item small>
                      <NavLink
                        to={`/user/${
                          currentUser.username
                        }/invite?channel=${name}`}
                      >
                        邀请加入
                      </NavLink>
                    </Menu.Item>
                    <Menu.Item small>
                      <NavLink to={`/submit?channel=${name}`}>发布新帖</NavLink>
                    </Menu.Item>
                  </StyledMenu>
                </StyledBoard>
              </div>
            )
          }

          if (names.indexOf(name) !== -1) {
            //followed
            return (
              <div>
                <StyledTitle>{name}</StyledTitle>
                <StyledArrow
                  onClick={this.toggleInfoShow}
                  up={!this.state.hide}
                  down={this.state.hide}
                />
                <StyledBoard>
                  <StyledMenu>
                    <Menu.Item small>
                      <NavLink
                        to={`/user/${
                          currentUser.username
                        }/invite?channel=${name}`}
                      >
                        邀请加入
                      </NavLink>
                    </Menu.Item>
                    <Menu.Item small>
                      <NavLink to={`/submit?channel=${name}`}>发布新帖</NavLink>
                    </Menu.Item>
                    <Menu.Item small>
                      <StyledButton onClick={this.quitChannel}>
                        退出论坛
                      </StyledButton>
                    </Menu.Item>
                  </StyledMenu>
                </StyledBoard>
              </div>
            )
          } else {
            //unfollow
            return (
              <div>
                <StyledTitle>{name}</StyledTitle>
                <StyledArrow
                  onClick={this.toggleInfoShow}
                  up={!this.state.hide}
                  down={this.state.hide}
                />
                <StyledBoard>
                  <StyledMenu>
                    <Menu.Item small>
                      <NavLink
                        to={`/user/${
                          currentUser.username
                        }/invite?channel=${name}`}
                      >
                        邀请加入
                      </NavLink>
                    </Menu.Item>
                    <Menu.Item small>
                      <StyledButton onClick={this.joinChannel}>
                        加入论坛
                      </StyledButton>
                    </Menu.Item>
                  </StyledMenu>
                </StyledBoard>
              </div>
            )
          }
        }}
      </Query>
    )
  }
  render() {
    return (
      <StyledChannelInfo hide={this.state.hide}>
        {this.renderInfo()}
      </StyledChannelInfo>
    )
  }
}

const FOLLOWING_MUTATION = gql`
  mutation following($channel: String!) {
    following(channel: $channel) {
      id
      username
      email
      following
    }
  }
`
const UNFOLLOW_MUTATION = gql`
  mutation unfollow($channel: String!) {
    unfollow(channel: $channel) {
      id
      username
      email
      following
    }
  }
`

const isFollowChannelInfo = compose(
  graphql(FOLLOWING_MUTATION, {
    name: 'followingMutation'
  }),
  graphql(UNFOLLOW_MUTATION, {
    name: 'unfollowMutation'
  })
)(ChannelInfo)
export default isFollowChannelInfo
