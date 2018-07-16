import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import gql from 'graphql-tag'
import { GET_CURRENT_USER } from '../../query'
import { Query, withApollo } from 'react-apollo'
import { graphql, compose } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import Menu from '../../components/Menu'
import Container from '../../components/Container'

const StyledHeader = styled.header`
  /* background: white; */
`

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

class Header extends Component {
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

  renderLoggedInMenu({ username }) {
    return (
      <Menu>
        <Menu.Item>
          <NavLink to="/submit">发布文章</NavLink>
        </Menu.Item>
        <Menu.Item>
          {/* TODO: redirect to user profile */}
          <NavLink to={`/user/${username}`}>{username}</NavLink>
        </Menu.Item>
        {/* <Menu.Item>
          <a href="" onClick={this.handleLogout}>
            登出
          </a>
        </Menu.Item> */}
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
      <Query query={GET_CURRENT_USER}>
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
      <StyledHeader>
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
      </StyledHeader>
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

export default withRouter(withApollo(HeaderWithMutation))
