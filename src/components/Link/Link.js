import React from 'react'
import { Link as ReactRouterLink } from 'react-router-dom'
import styled from 'styled-components'

const StyledLink = styled(ReactRouterLink)`
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
