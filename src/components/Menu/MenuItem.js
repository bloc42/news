import React from 'react'
import styled from 'styled-components'

const StyledMenuItem = styled.li`
  font-size: 1.2rem;
  font-weight: bold;
  margin: 0.8rem;

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

const MenuItem = ({ children }) => {
  return <StyledMenuItem>{children}</StyledMenuItem>
}

export default MenuItem
