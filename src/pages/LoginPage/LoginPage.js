import React from 'react'
import Section from '../../components/Section'
import LoginForm from '../../containers/LoginForm'
import Container from '../../components/Container'
import Small from '../../components/Small'
import Link from '../../components/Link'

const LoginPage = () => {
  return (
    <Container small>
      <Section padded>
        <LoginForm />
        <Small>
          <span>没有账号？</span>
          <Link to="/signup">注册</Link>
        </Small>
      </Section>
    </Container>
  )
}

export default LoginPage
