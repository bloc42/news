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
          <NavLink to="/submit">发布文章</NavLink>
        </Menu.Item>
        <Menu.Item>
          {/* TODO: redirect to user profile */}
          <a href="">{username}</a>
        </Menu.Item>
        <Menu.Item>
          <a href="" onClick={this.handleLogout}>
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
      <Query query={GET_CURRENT_USER}>
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
