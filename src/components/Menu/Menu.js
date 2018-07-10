import React from 'react'
import styled from 'styled-components'
import MenuItem from './MenuItem'

const StyledMenu = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  list-style-type: none;
  padding: 0;
`

const Menu = ({ children }) => {
  return <StyledMenu>{children}</StyledMenu>
}

Menu.Item = MenuItem

export default Menu
