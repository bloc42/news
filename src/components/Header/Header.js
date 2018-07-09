import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import Container from '../Container'
import { CURRENT_USER_QUERY } from '../../apollo/query'
import { Query, withApollo } from 'react-apollo'
import { LOGOUT_MUTATION } from '../../apollo/mutation'
import { graphql, compose } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import Menu from '../Menu'

const StyledHeader = styled.header`
  background: white;
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
          {/* TODO: redirect to user profile */}
          <a href="#">{username}</a>
        </Menu.Item>
        <Menu.Item>
          <a href="#" onClick={this.handleLogout}>
            登出
          </a>
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

  render() {
    return (
      <Query query={CURRENT_USER_QUERY}>
        {({ loading, error, data }) => {
          if (error) {
            console.log(error)
            return null
          }

          if (loading) {
            return null
          }

          const { currentUser } = data

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
                  {currentUser
                    ? this.renderLoggedInMenu(currentUser)
                    : this.renderLoggedOutMenu()}
                </StyledContainer>
              </nav>
            </StyledHeader>
          )
        }}
      </Query>
    )
  }
}

const HeaderWithMutation = compose(
  graphql(LOGOUT_MUTATION, { name: 'logoutMutation' })
)(Header)

export default withRouter(withApollo(HeaderWithMutation))
