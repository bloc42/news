import React from 'react'
import Section from '../../components/Section'
import SignupForm from '../../containers/SignupForm'
import Container from '../../components/Container'
import { Link } from 'react-router-dom'
import Small from '../../components/Small'

const Signup = () => {
  return (
    <Container small>
      <Section padded>
        <SignupForm />
        <Small>
          <span>已经有账号？</span>
          <Link to="/login">登录</Link>
        </Small>
      </Section>
    </Container>
  )
}

export default Signup
