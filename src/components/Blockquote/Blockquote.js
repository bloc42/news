import React from 'react'
import styled from 'styled-components'

const StyledBlockquote = styled.blockquote`
  color: ${props => props.theme.fontColorLight};
  margin: 1rem;
  padding: 0rem 1rem;
  border-left: 3px solid ${props => props.theme.primaryColorLight};
`

const Blockquote = props => {
  return <StyledBlockquote {...props}>{props.children}</StyledBlockquote>
}

export default Blockquote
