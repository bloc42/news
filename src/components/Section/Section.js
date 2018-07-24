import React from 'react'
import styled, { css } from 'styled-components'

const StyledSection = styled.section`
  background: white;
  border-radius: ${props => props.theme.borderRadius};
  box-shadow: 0 15px 35px rgba(50, 50, 93, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07);

  ${props =>
    props.padded &&
    css`
      padding: 2rem;
    `};

  ${props =>
    props.centered &&
    css`
      text-align: center;
    `};
`

const Section = props => {
  return <StyledSection {...props}>{props.children}</StyledSection>
}

export default Section
