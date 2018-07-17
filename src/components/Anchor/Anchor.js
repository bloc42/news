import React from 'react'
import styled from 'styled-components'

const StyledAnchor = styled.a`
  color: ${props => props.theme.fontColor};
  text-decoration: none;

  :hover {
    color: ${props => props.theme.primaryColor};
  }
`

const Anchor = props => {
  return <StyledAnchor {...props}>{props.children}</StyledAnchor>
}

export default Anchor
