import React, { Component } from 'react'
import styled, { css } from 'styled-components'

const StyledButton = styled.button`
  border: 1px solid ${props => props.theme.borderColor};
  border-radius: ${props => props.theme.borderRadius};
  padding: 0.6rem 1.2rem;
  outline: none;
  font-size: ${props => props.theme.fontSize};
  color: ${props => props.theme.fontColor};
  letter-spacing: 0.1rem;
  background: white;
  border-color: ${props => props.theme.borderColor};
  transition: background 0.3s;
  cursor: pointer;

  /* Primary Button */
  ${props =>
    props.primary &&
    css`
      color: white;
      background: ${props => props.theme.primaryColor};
      border-color: ${props => props.theme.primaryColor};
      &:hover {
        background: ${props => props.theme.primaryColorLight};
      }
    `};

  ${props =>
    props.fullWidth &&
    css`
      width: 100%;
    `};
  ${props =>
    props.small &&
    css`
      font-size: 0.6rem;
      padding: 0.2rem 0.2rem;
    `};
  ${props =>
    props.disabled &&
    css`
      cursor: not-allowed;
      background-color: #ccc;
      border-color: #ccc;
      &:hover {
        background: #ccc;
      }
    `};
`

class Button extends Component {
  render() {
    const { onClick } = this.props

    return (
      <StyledButton onClick={onClick} {...this.props}>
        {this.props.children}
      </StyledButton>
    )
  }
}

export default Button
