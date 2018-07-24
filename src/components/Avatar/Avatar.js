import React from 'react'
import unknown from './unknown.svg'
import styled from 'styled-components'

const StyledAvatar = styled.img`
  width: 2rem;
`

const Avatar = () => {
  return <StyledAvatar src={unknown} />
}

export default Avatar
