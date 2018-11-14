import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

const StyledAlert = styled.div`
  margin: 0.4rem 0;
  padding: 1rem;
  border-radius: ${props => props.theme.borderRadius};
  color: ${props => props.theme.fontColorLight};
  /* Error Alert */
  ${props =>
    props.error &&
    css`
      border: 1px solid #ffa39e;
      background-color: #fff1f0;
    `};
  ${props =>
    props.success &&
    css`
      border: 1px solid #c3ff9e;
      background-color: #f8fff0;
    `};
  ${props =>
    props.info &&
    css`
      border: 1px solid #bce8f1;
      background-color: #d9edf7;
    `};
`

const Alert = props => (
  <StyledAlert {...props}>
    {props.message}
    {props.children}
  </StyledAlert>
)

Alert.propTypes = {
  message: PropTypes.string.isRequired
}

export default Alert
