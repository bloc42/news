import React from 'react'
import Section from '../../components/Section'
import ChannelPostList from '../../containers/ChannelPostList'
import ChannelInfo from '../../containers/ChannelInfo'
import Container from '../../components/Container'

const ChannelPage = props => {
  const { channel } = props.match.params
  return (
    <Container>
      <Section>
        <ChannelInfo name={channel} />
      </Section>
      <Section>
        <ChannelPostList channel={channel} />
      </Section>
    </Container>
  )
}

export default ChannelPage
