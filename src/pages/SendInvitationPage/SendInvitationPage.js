import React from 'react'
import Section from '../../components/Section'
import SendInvitationForm from '../../containers/SendInvitationForm'
import Container from '../../components/Container'

const SendInvitationPage = () => {
  return (
    <Container small>
      <Section padded>
        <SendInvitationForm />
      </Section>
    </Container>
  )
}

export default SendInvitationPage
