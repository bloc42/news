import React from 'react'
import Section from '../../components/Section'
import Container from '../../components/Container'
import SubmitPostForm from '../../containers/SubmitPostForm'

const SubmitPostPage = () => {
  return (
    <Container>
      <Section padded>
        <SubmitPostForm />
      </Section>
    </Container>
  )
}

export default SubmitPostPage
