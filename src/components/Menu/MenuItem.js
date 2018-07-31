import React from 'react'
import styled from 'styled-components'

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
`

const MenuItem = props => {
  return <StyledMenuItem {...props}>{props.children}</StyledMenuItem>
}

export default MenuItem
