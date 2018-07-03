import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const StyledHeader = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const StyledLogo = styled.div`
  display: flex;
`

const StyledNav = styled.nav`
  > ul {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    list-style-type: none;
  }
`

const StyledNavLink = styled(NavLink)`
  color: ${props => props.theme.fontColor};
  font-size: 1.4rem;
  font-weight: bold;
  margin: 1rem;
  text-decoration: none;

  &.active {
    color: ${props => props.theme.primaryColor};
  }
`

const Header = () => {
  return <StyledHeader>
      <StyledLogo>
        <StyledNavLink exact strict to="/">
          Blockdog
        </StyledNavLink>
      </StyledLogo>
      <StyledNav>
        <ul>
          <li>
            <StyledNavLink to="/login">登录</StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="/signup">注册</StyledNavLink>
          </li>
        </ul>
      </StyledNav>
    </StyledHeader>
}

export default Header
