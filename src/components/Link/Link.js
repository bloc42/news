import React from 'react'
import { HashLink } from 'react-router-hash-link'
import styled from 'styled-components'

const StyledLink = styled(HashLink)`
  color: ${props => props.theme.fontColor};
  text-decoration: none;

  :hover {
    color: ${props => props.theme.primaryColor};
  }
`

const Link = props => {
  return <StyledLink {...props}>{props.children}</StyledLink>
}

export default Link
