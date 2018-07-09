import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledMenuItem = styled.li`
  font-size: 1.2rem;
  font-weight: bold;
  margin: 1rem;

  a {
    color: ${props => props.theme.fontColor};
    text-decoration: none;

    &.active {
      color: ${props => props.theme.primaryColor};
    }
  }
`

const MenuItem = ({ children }) => {
  return <StyledMenuItem>{children}</StyledMenuItem>
}

MenuItem.propTypes = {}

export default MenuItem
