import React, { Component } from 'react'
import { Switch, Route, NavLink } from 'react-router-dom'
import Container from '../../components/Container'
import NotificationList from '../../containers/NotificationList'
import LogoutLink from '../../containers/LogoutLink'
import Section from '../../components/Section'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import RelativeTime from '../../components/RelativeTime'
import Small from '../../components/Small'
import Menu from '../../components/Menu'
import InvitationForm from '../../containers/InvitationForm'
import styled from 'styled-components'

const StyledMenu = styled(Menu)`
  justify-content: space-between;
`

const StyledSection = styled.section`
  margin-top: 2rem;
`

const GET_USER = gql`
  query GetUserAndCurrentUser($username: String!) {
    user(username: $username) {
      id
      username
      email
      createdAt
    }
    currentUser {
      id
      username
    }
  }
`

class UserProfilePage extends Component {
  renderUserActions() {
    const { url } = this.props.match

    return (
      <div>
        <StyledMenu underline>
          <Menu.Item compact>
            <NavLink
              to={`${url}/notifications`}
              isActive={(_, { pathname }) =>
                pathname === url || pathname === `${url}/notifications`
              }
            >
              通知
            </NavLink>
          </Menu.Item>
          <Menu.Item compact>
            <NavLink to={`${url}/invite`}>邀请</NavLink>
          </Menu.Item>
          <Menu.Item compact>
            <LogoutLink />
          </Menu.Item>
        </StyledMenu>

        <StyledSection>
          <Switch>
            <Route exact path={`${url}`} component={NotificationList} />
            <Route
              exact
              path={`${url}/notifications`}
              component={NotificationList}
            />
            <Route exact path={`${url}/invite`} component={InvitationForm} />
          </Switch>
        </StyledSection>
      </div>
    )
  }

  render() {
    const { params } = this.props.match
    const { username } = params

    return (
      <Container>
        <Section padded>
          <Query
            query={GET_USER}
            variables={{
              username
            }}
          >
            {({ loading, data }) => {
              if (loading) return '加载中。。。'

              const { user, currentUser } = data
              const { username, createdAt } = user
              const isCurrentUser =
                currentUser && currentUser.username === username
              return (
                <div>
                  <h1>{username}</h1>
                  <Small>
                    <RelativeTime timestamp={createdAt} />加入
                  </Small>

                  {isCurrentUser && this.renderUserActions()}
                </div>
              )
            }}
          </Query>
        </Section>
      </Container>
    )
  }
}

export default UserProfilePage