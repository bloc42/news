import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import gql from 'graphql-tag'
import { GET_CURRENT_USER } from '../../query'
import { Query, graphql, compose } from 'react-apollo'
import Menu from '../../components/Menu'
import Container from '../../components/Container'
import Avatar from '../../components/Avatar'

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

class Header extends Component {
  renderLoggedInMenu({ username }) {
    return (
      <Menu>
        <Menu.Item>
          <NavLink to="/submit">发布文章</NavLink>
        </Menu.Item>
        <Menu.Item>
          <NavLink to={`/user/${username}`}>
            <Avatar />
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
      <Query query={GET_CURRENT_USER} fetchPolicy="cache-first">
        {({ loading, data }) => {
          if (loading) {
            return null
          }

          const { currentUser } = data

          return currentUser
            ? this.renderLoggedInMenu(currentUser)
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
                  Blockdog
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
