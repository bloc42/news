import React from 'react'
import styled from 'styled-components'

const StyledSection = styled.section`
  background: white;
`

const Section = ({ children }) => {
  return <StyledSection>{children}</StyledSection>
}

export default Section
