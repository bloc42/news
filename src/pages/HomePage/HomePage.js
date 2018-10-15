import React from 'react'
import Section from '../../components/Section'
import PostList from '../../containers/PostList'
import ChannelList from '../../containers/ChannelList'
import Container from '../../components/Container'

const HomePage = () => {
  return (
    <Container>
      <Section>
        <ChannelList />
      </Section>
      <Section>
        <PostList />
      </Section>
    </Container>
  )
}

export default HomePage
