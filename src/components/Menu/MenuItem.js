import React from 'react'
import styled, { css } from 'styled-components'

const StyledMenuItem = styled.li`
  font-size: ${props => props.theme.fontSizeLarge};
  font-weight: bold;
  margin: ${props => (props.compact ? 0 : '0.8rem')};

  a {
    color: ${props => props.theme.fontColor};
    text-decoration: none;

    :hover {
      color: ${props => props.theme.primaryColor};
    }

    &.active {
      color: ${props => props.theme.primaryColor};
    }
  }

  ${props =>
    props.small &&
    css`
      font-size: 1rem;
      margin: 0rem;
      margin-bottom: 0.5rem;
    `};
`

const MenuItem = props => {
  return <StyledMenuItem {...props}>{props.children}</StyledMenuItem>
}

export default MenuItem
