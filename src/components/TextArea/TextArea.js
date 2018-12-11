import React from 'react'
import styled, { css } from 'styled-components'

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
  ${props =>
    props.intagli &&
    css`
      font-size: 0.6rem;
      vertical-align: top;
      padding: 0.2rem;
    `};
  ${props =>
    props.halfwidth &&
    css`
      width: 50%;
    `};
`

const TextArea = props => {
  return <StyledTextArea {...props} />
}

export default TextArea
