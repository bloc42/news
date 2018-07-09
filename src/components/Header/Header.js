import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import Container from '../Container'
import { CURRENT_USER_QUERY } from '../../apollo/query'
import { Query, withApollo } from 'react-apollo'
import { LOGOUT_MUTATION } from '../../apollo/mutation'
import { graphql, compose } from 'react-apollo'
import { withRouter } from 'react-router-dom'

const StyledHeader = styled.header`
  background: white;
`

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const StyledLogo = styled.div`
  display: flex;
`

const StyledNav = styled.nav`
  ul {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    list-style-type: none;
  }

  a {
    color: ${props => props.theme.fontColor};
    font-size: 1.2rem;
    font-weight: bold;
    margin: 1rem;
    text-decoration: none;

    &.active {
      color: ${props => props.theme.primaryColor};
    }
  }
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
              <StyledNav>
                <StyledContainer>
                  <StyledLogo>
                    <NavLink exact strict to="/">
                      Blockdog
                    </NavLink>
                  </StyledLogo>
                  {currentUser ? (
                    <ul>
                      <li>
                        {/* TODO: redirect to user profile */}
                        <a href="#">{currentUser.username}</a>
                      </li>
                      <li>
                        <a href="#" onClick={this.handleLogout}>
                          登出
                        </a>
                      </li>
                    </ul>
                  ) : (
                    <ul>
                      <li>
                        <NavLink to="/login">登录</NavLink>
                      </li>
                      <li>
                        <NavLink to="/signup">注册</NavLink>
                      </li>
                    </ul>
                  )}
                </StyledContainer>
              </StyledNav>
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
