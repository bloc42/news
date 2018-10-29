import React from 'react'
import mute from './mute.svg'
import speak from './speak.svg'
import styled, { css } from 'styled-components'

const StyledMuteicon = styled.span`
  width: 20px;
  height: 20px;
  background-size: cover;
  cursor: pointer;
  ${props =>
    props.mute &&
    css`
      background-image: url(${mute});
    `};
  ${props =>
    props.allow &&
    css`
      background-image: url(${speak});
    `};
`

const Muteicon = props => {
  return <StyledMuteicon {...props} />
}

export default Muteicon
