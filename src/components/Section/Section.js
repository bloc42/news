import React from 'react'
import styled, { css } from 'styled-components'

const StyledSection = styled.section`
  background: white;

  ${props =>
    props.padded &&
    css`
      padding: 2rem;
    `};
`

const Section = props => {
  return <StyledSection {...props}>{props.children}</StyledSection>
}

export default Section
