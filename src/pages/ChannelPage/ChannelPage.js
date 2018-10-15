import React from 'react'
import Section from '../../components/Section'
import ChannelPostList from '../../containers/ChannelPostList'
import ChannelInfo from '../../containers/ChannelInfo'
import Container from '../../components/Container'
import gql from 'graphql-tag'
import { Query, graphql, compose } from 'react-apollo'

const ChannelPage = props => {
  const { channel } = props.match.params
  return (
    <Query
      query={gql`
        query GetCurrentUser {
          currentUser {
            id
            username
            following
          }
        }
      `}
    >
      {({ loading, data }) => {
        if (loading) {
          return null
        }

        const { currentUser } = data
        return currentUser ? (
          <Container>
            <Section>
              <ChannelInfo name={channel} currentUser={currentUser} />
            </Section>
            <Section>
              <ChannelPostList channel={channel} />
            </Section>
          </Container>
        ) : (
          <Container>
            <Section>
              <ChannelPostList channel={channel} />
            </Section>
          </Container>
        )
      }}
    </Query>
  )
}

export default ChannelPage
