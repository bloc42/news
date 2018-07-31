import React from 'react'
import styled from 'styled-components'

const StyledTextArea = styled.textarea`
  font-size: ${props => props.theme.fontSize};
  font-family: ${props => props.theme.fontFamily};
  padding: 1rem;
  width: 100%;
  border: 1px solid ${props => props.theme.borderColor};
  border-radius: ${props => props.theme.borderRadius};
  outline: none;

  &:focus {
    border: 1px solid ${props => props.theme.primaryColor};
  }
`

const TextArea = props => {
  return <StyledTextArea {...props} />
}

export default TextArea
