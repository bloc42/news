import React from 'react'
import styled from 'styled-components'

const StyledInput = styled.input`
  font-size: 1rem;
  padding: 1rem;
  width: 100%;
  border: 1px solid ${props => props.theme.borderColor};
  border-radius: ${props => props.theme.borderRadius};
  outline: none;

  &:focus {
    border: 1px solid ${props => props.theme.primaryColor};
  }
`

const Input = props => {
  return <StyledInput {...props} />
}

export default Input
