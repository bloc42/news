import React from 'react'
import styled from 'styled-components'

const StyledSmall = styled.small`
  color: ${props => props.theme.fontColorLight};

  a {
    color: ${props => props.theme.primaryColor};
  }
`

const Small = ({ children }) => {
  return <StyledSmall>{children}</StyledSmall>
}

export default Small
