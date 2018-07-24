import React from 'react'
import styled, { css } from 'styled-components'

const StyledContainer = styled.div`
  margin: 0 auto;
  max-width: 50rem;

  ${props =>
    props.small &&
    css`
      max-width: 25rem;
    `};
`

const Container = props => {
  return <StyledContainer {...props}>{props.children}</StyledContainer>
}

export default Container
