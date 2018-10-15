import React, { Component } from 'react'
import { Switch, Route, NavLink } from 'react-router-dom'
import Container from '../../components/Container'
import NotificationList from '../../containers/NotificationList'
import Section from '../../components/Section'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import RelativeTime from '../../components/RelativeTime'
import Small from '../../components/Small'
import Menu from '../../components/Menu'
import InvitationForm from '../../containers/InvitationForm'
import ChannelsBoard from '../../containers/ChannelsBoard'
import styled from 'styled-components'

const StyledMenu = styled(Menu)`
  justify-content: space-between;
  flex-direction: column;
`
const StyledMenuItem = styled(Menu.Item)`
  margin-bottom: 2rem;
`
const StyledSection = styled.section`
  flex: 1;
  padding-left: 2rem;
  padding-right: 2rem;
`
const StyledBoard = styled.div`
  display: flex;
  justify-content: space-between;
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
      following
    }
  }
`

class UserProfilePage extends Component {
  renderUserActions(currentUser) {
    const { url } = this.props.match

    return (
      <StyledBoard>
        <StyledMenu underline>
          <StyledMenuItem compact>
            <NavLink
              to={`${url}/channels`}
              isActive={(_, { pathname }) =>
                pathname === url || pathname === `${url}/channels`
              }
            >
              论坛
            </NavLink>
          </StyledMenuItem>
          <StyledMenuItem compact>
            <NavLink to={`${url}/notifications`}>通知</NavLink>
          </StyledMenuItem>
          <StyledMenuItem compact>
            <NavLink to={`${url}/invite`}>邀请</NavLink>
          </StyledMenuItem>
        </StyledMenu>

        <StyledSection>
          <Switch>
            <Route
              exact
              path={`${url}`}
              render={props => (
                <ChannelsBoard currentUser={currentUser} {...props} />
              )}
            />
            )}/>
            <Route
              exact
              path={`${url}/channels`}
              render={props => (
                <ChannelsBoard currentUser={currentUser} {...props} />
              )}
            />
            )}/>
            <Route
              exact
              path={`${url}/notifications`}
              component={NotificationList}
            />
            <Route exact path={`${url}/invite`} component={InvitationForm} />
          </Switch>
        </StyledSection>
      </StyledBoard>
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
              if (loading) return '加载中...'

              const { user, currentUser } = data
              const { username, createdAt } = user
              const isCurrentUser =
                currentUser && currentUser.username === username
              return (
                <div>
                  <h1>{username}</h1>
                  <Small>
                    <RelativeTime timestamp={createdAt} />
                    加入
                  </Small>

                  {isCurrentUser && this.renderUserActions(currentUser)}
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
