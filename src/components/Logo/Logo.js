import React from 'react'
import styled, { css } from 'styled-components'

const StyledLogo = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;

  ${props =>
    props.large &&
    css`
      width: 5rem;
      height: 5rem;
    `};
`

const Logo = props => {
  return <StyledLogo src={props.src} {...props} />
}

export default Logo
