import React from 'react'
import Section from '../../components/Section'
import LoginForm from '../../containers/LoginForm'
import Container from '../../components/Container'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Small from '../../components/Small'

const StyledWrapper = styled.div`
  padding: 2rem;
`

const Login = () => {
  return (
    <Container small>
      <Section>
        <StyledWrapper>
          <LoginForm />
          <Small>
            <span>没有账号？</span>
            <Link to="/signup">注册</Link>
          </Small>
        </StyledWrapper>
      </Section>
    </Container>
  )
}

export default Login
