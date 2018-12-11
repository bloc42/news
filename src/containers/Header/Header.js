import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import gql from 'graphql-tag'
import { Query, graphql, compose } from 'react-apollo'
import Menu from '../../components/Menu'
import Container from '../../components/Container'
import Avatar from '../../components/Avatar'
import LogoutLink from '../../containers/LogoutLink'

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const StyledNotificationContainer = styled.div`
  position: relative;
`

const StyledItem = styled(Menu.Item)`
  position: relative;
`
const StyledUserProfile = styled.div`
  position: absolute;
  top: 3rem;
  border-radius: 4px;
  background-color: white;
  right: -0.8rem;
  padding: 0.8rem;
  width: 8rem;
  box-shadow: 0 15px 35px rgba(50, 50, 93, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07);
  display: flex;
  flex-direction: column;
  a {
    text-align: center;
  }
`
const StyledNavLink = styled(NavLink)`
  margin-bottom: 1rem;
`

const StyledCounter = styled.span`
  position: absolute;
  top: -4px;
  left: 24px;
  background-color: rgba(212, 19, 13, 1);
  color: #fff;
  border-radius: 3px;
  padding: 1px 3px;
  font-size: 8px;
`

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalIsOpen: 'hidden'
    }
  }

  renderLoggedInMenu({ username, notificationCount }) {
    if (
      window.location.pathname === '/submit' ||
      /\/channel\//.test(window.location.pathname)
    ) {
      return (
        <Menu>
          <StyledItem>
            <StyledNotificationContainer
              onMouseOver={this.handleMouseOver}
              onMouseLeave={this.handleMouseOut}
            >
              <Avatar />
              {notificationCount > 0 && (
                <StyledCounter>{notificationCount}</StyledCounter>
              )}
            </StyledNotificationContainer>
            <StyledUserProfile
              style={{
                visibility: this.state.modalIsOpen,
                transition: 'all 0.2s'
              }}
              onMouseOver={this.handleMouseUserOver}
              onMouseLeave={this.handleMouseOut}
              onClick={this.leavePage}
            >
              <StyledNavLink to={`/user/${username}`}>用户中心</StyledNavLink>
              <LogoutLink />
            </StyledUserProfile>
          </StyledItem>
        </Menu>
      )
    } else {
      return (
        <Menu>
          {/* todo 已创建用户不能继续创建？ */}
          <StyledItem>
            <NavLink to="/submit">唠一唠</NavLink>
          </StyledItem>
          <StyledItem>
            <StyledNotificationContainer
              onMouseOver={this.handleMouseOver}
              onMouseLeave={this.handleMouseOut}
            >
              <Avatar />
              {notificationCount > 0 && (
                <StyledCounter>{notificationCount}</StyledCounter>
              )}
            </StyledNotificationContainer>

            <StyledUserProfile
              style={{
                visibility: this.state.modalIsOpen,
                transition: 'all 0.2s'
              }}
              onMouseOver={this.handleMouseUserOver}
              onMouseLeave={this.handleMouseOut}
              onClick={this.leavePage}
            >
              <StyledNavLink to={`/user/${username}`}>用户中心</StyledNavLink>
              <StyledNavLink to={`/faq`}>FAQ</StyledNavLink>
              <LogoutLink />
            </StyledUserProfile>
          </StyledItem>
        </Menu>
      )
    }
  }

  renderLoggedOutMenu() {
    return (
      <Menu>
        <Menu.Item>
          <NavLink to="/faq">FAQ</NavLink>
        </Menu.Item>
        <Menu.Item>
          <NavLink to="/login">登录</NavLink>
        </Menu.Item>
        <Menu.Item>
          <NavLink to="/signup">注册</NavLink>
        </Menu.Item>
      </Menu>
    )
  }

  renderRightMenu() {
    return (
      <Query
        query={gql`
          query GetCurrentUser {
            currentUser {
              id
              username
              notificationCount
              upvotePost
              downvotePost
            }
          }
        `}
      >
        {({ loading, data, client }) => {
          if (loading) {
            return null
          }

          const { currentUser } = data
          if (currentUser) {
            client.cache.writeQuery({
              query: gql`
                query GetCurrentUser {
                  currentUser {
                    id
                    username
                    notificationCount
                    upvotePost
                    downvotePost
                  }
                }
              `,
              data: {
                currentUser: {
                  ...currentUser
                }
              }
            })
          }
          return currentUser
            ? this.renderLoggedInMenu(currentUser)
            : this.renderLoggedOutMenu()
        }}
      </Query>
    )
  }

  handleMouseOut = e => {
    this.setState({
      modalIsOpen: 'hidden'
    })
  }
  handleMouseOver = e => {
    this.setState({
      modalIsOpen: 'visible'
    })
  }
  handleMouseUserOver = e => {
    this.setState({
      modalIsOpen: 'visible'
    })
  }
  leavePage = e => {
    this.setState({
      modalIsOpen: 'hidden'
    })
  }
  render() {
    return (
      <header>
        <nav>
          <StyledContainer>
            <Menu>
              <Menu.Item>
                <NavLink exact strict to="/">
                  Bloc42
                </NavLink>
              </Menu.Item>
            </Menu>
            {this.renderRightMenu()}
          </StyledContainer>
        </nav>
      </header>
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

const HeaderWithMutation = compose(
  graphql(LOGOUT_MUTATION, { name: 'logoutMutation' })
)(Header)

export default HeaderWithMutation
