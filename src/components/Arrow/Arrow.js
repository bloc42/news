import React from 'react'
import leftarrow from './leftarrow.svg'
import rightarrow from './rightarrow.svg'
import uparrow from './uparrow.svg'
import downarrow from './downarrow.svg'
import styled, { css } from 'styled-components'

const StyledArrow = styled.span`
  width: 20px;
  height: 20px;
  ${props =>
    props.left &&
    css`
      background-image: url(${leftarrow});
    `};
  ${props =>
    props.right &&
    css`
      background-image: url(${rightarrow});
    `};
  ${props =>
    props.up &&
    css`
      background-image: url(${uparrow});
    `};
  ${props =>
    props.down &&
    css`
      background-image: url(${downarrow});
    `};
`

const Arrow = props => {
  return <StyledArrow {...props} />
}

export default Arrow
