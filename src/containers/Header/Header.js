import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import gql from 'graphql-tag'
import { Query, graphql, compose } from 'react-apollo'
import Menu from '../../components/Menu'
import Container from '../../components/Container'
import Avatar from '../../components/Avatar'

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const StyledNotificationContainer = styled.div`
  position: relative;
`

const StyledCounter = styled.span`
  position: absolute;
  top: -4px;
  left: 24px;
  background-color: rgba(212, 19, 13, 1);
  color: #fff;
  border-radius: 3px;
  padding: 1px 3px;
  font-size: 10px;
`

class Header extends Component {
  renderLoggedInMenu(username, notificationCount) {
    return (
      <Menu>
        <Menu.Item>
          <NavLink to="/submit">发布文章</NavLink>
        </Menu.Item>
        <Menu.Item>
          <NavLink to={`/user/${username}`}>
            <StyledNotificationContainer>
              <Avatar />
              {notificationCount > 0 && (
                <StyledCounter>{notificationCount}</StyledCounter>
              )}
            </StyledNotificationContainer>
          </NavLink>
        </Menu.Item>
      </Menu>
    )
  }

  renderLoggedOutMenu() {
    return (
      <Menu>
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
          query GetCurrentUserAndNotifications {
            currentUser {
              id
              username
            }

            notifications {
              id
            }
          }
        `}
      >
        {({ loading, data }) => {
          if (loading) {
            return null
          }

          const { currentUser, notifications } = data

          return currentUser
            ? this.renderLoggedInMenu(
                currentUser.username,
                notifications.length
              )
            : this.renderLoggedOutMenu()
        }}
      </Query>
    )
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
