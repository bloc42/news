import React from 'react'
import Section from '../../components/Section'
import SignupForm from '../../containers/SignupForm'
import Container from '../../components/Container'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Small from '../../components/Small'

const StyledWrapper = styled.div`
  padding: 2rem;
`

const Signup = () => {
  return (
    <Container small>
      <Section>
        <StyledWrapper>
          <SignupForm />
          <Small>
            <span>已经有账号？</span>
            <Link to="/login">登录</Link>
          </Small>
        </StyledWrapper>
      </Section>
    </Container>
  )
}

export default Signup
