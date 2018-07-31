import React from 'react'
import Section from '../../components/Section'
import SignupForm from '../../containers/SignupForm'
import Container from '../../components/Container'
import Small from '../../components/Small'
import Link from '../../components/Link'

const SignupPage = () => {
  return (
    <Container small>
      <Section padded>
        <h2>创建属于你的Bloc42账号。</h2>
        <SignupForm />
        <Small>
          <span>已经有账号？</span>
          <Link to="/login">登录</Link>
        </Small>
      </Section>
    </Container>
  )
}

export default SignupPage
