import React from 'react'
import Section from '../../components/Section'
import SendMailForm from '../../containers/SendMailForm'
import Container from '../../components/Container'

const SendActivationPage = () => {
  return (
    <Container small>
      <Section padded>
        <SendMailForm />
      </Section>
    </Container>
  )
}

export default SendActivationPage
