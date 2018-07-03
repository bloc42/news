import React from 'react'
import styled, { css } from 'styled-components'

const StyledContainer = styled.div`
  margin: 0 auto;
  max-width: 800px;

  ${props =>
    props.small &&
    css`
      max-width: 300px;
    `};
`

const Container = props => {
  return <StyledContainer {...props}>{props.children}</StyledContainer>
}

export default Container
