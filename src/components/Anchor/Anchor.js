import React from 'react'
import styled, { css } from 'styled-components'

const StyledAnchor = styled.a`
  color: ${props => props.theme.fontColor};
  text-decoration: none;
  cursor: pointer;

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

const Anchor = props => {
  return <StyledAnchor {...props}>{props.children}</StyledAnchor>
}

export default Anchor
