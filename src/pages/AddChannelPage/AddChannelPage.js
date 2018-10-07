import React from 'react'
import Section from '../../components/Section'
import AddChannelForm from '../../containers/AddChannelForm'
import Container from '../../components/Container'

const AddChannelPage = () => {
  return (
    <Container>
      <Section padded>
        <h2>创建属于你的分论坛。</h2>
        <AddChannelForm />
      </Section>
    </Container>
  )
}

export default AddChannelPage
