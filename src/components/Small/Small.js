import React from 'react'
import styled from 'styled-components'

const StyledSmall = styled.small`
  color: ${props => props.theme.fontColorLight};

  a {
    color: ${props => props.theme.primaryColor};
  }
`

const Small = props => {
  return <StyledSmall {...props}>{props.children}</StyledSmall>
}

export default Small
