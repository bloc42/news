import React from 'react'
import styled, { css } from 'styled-components'
import MenuItem from './MenuItem'

const StyledMenu = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  list-style-type: none;
  padding: 0;

  ${props =>
    props.underline &&
    css`
      li > a {
        padding: 0.2rem 0;
        border-bottom: 3px solid ${props.theme.borderColor};
      }

      li > a.active {
        border-bottom: 3px solid ${props.theme.primaryColor};
      }
    `};
`

const Menu = props => {
  return <StyledMenu {...props}>{props.children}</StyledMenu>
}

Menu.Item = MenuItem

export default Menu
