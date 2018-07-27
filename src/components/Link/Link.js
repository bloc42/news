import React from 'react'
import { HashLink } from 'react-router-hash-link'
import styled from 'styled-components'

const StyledLink = styled(HashLink)`
  color: ${props => props.theme.fontColor};
  font-weight: bold;
  text-decoration: none;
  border-bottom: 2px solid ${props => props.theme.borderColor};

  :hover {
    color: ${props => props.theme.primaryColor};
    border-bottom: 2px solid ${props => props.theme.primaryColor};
  }
`

const Link = props => {
  return <StyledLink {...props}>{props.children}</StyledLink>
}

export default Link
