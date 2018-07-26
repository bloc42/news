import React, { Component } from 'react'
import Container from '../../components/Container'
import NotificationList from '../../containers/NotificationList'
import LogoutButton from '../../containers/LogoutButton'
import Section from '../../components/Section'
import { Query } from 'react-apollo'
import { GET_USER, GET_CURRENT_USER } from '../../query'
import RelativeTime from '../../components/RelativeTime'
import Small from '../../components/Small'

class UserProfilePage extends Component {
  render() {
    const { username } = this.props.match.params

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

              const { user } = data
              const { username, createdAt } = user
              return (
                <div>
                  <h1>{username}</h1>
                  <Small>
                    <RelativeTime timestamp={createdAt} />加入
                  </Small>
                  <br />
                  <br />

                  {/* TODO: Refactor to one query */}
                  <Query query={GET_CURRENT_USER}>
                    {({ loading, data }) => {
                      if (loading) return null

                      const { currentUser } = data

                      if (currentUser && currentUser.username === username) {
                        return (
                          <div>
                            <LogoutButton />
                            <br />
                            <br />
                            <NotificationList />
                          </div>
                        )
                      } else {
                        return null
                      }
                    }}
                  </Query>
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
