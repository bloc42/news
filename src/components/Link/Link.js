import React from 'react'
import { HashLink } from 'react-router-hash-link'
import styled, { css } from 'styled-components'

const StyledLink = styled(HashLink)`
  color: ${props => props.theme.fontColor};
  text-decoration: none;

  :hover {
    color: ${props => props.theme.primaryColor};
  }

  ${props =>
    props.bold &&
    css`
      font-weight: bold;
      border-bottom: 2px solid ${props => props.theme.borderColor};
      :hover {
        border-bottom: 2px solid ${props => props.theme.primaryColor};
      }
    `};
`

const Link = props => {
  return <StyledLink {...props}>{props.children}</StyledLink>
}

export default Link
