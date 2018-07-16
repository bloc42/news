import React from 'react'
import Container from '../../components/Container'
import LogoutButton from '../../containers/LogoutButton'
import Section from '../../components/Section'

const UserProfile = () => {
  return (
    <Container small>
      <Section padded>
        <LogoutButton />
      </Section>
    </Container>
  )
}

export default UserProfile
