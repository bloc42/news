import React from 'react'
import add from './add.svg'
import styled from 'styled-components'

const StyledAddicon = styled.img`
  width: 1rem;
`

const Addicon = () => {
  return <StyledAddicon src={add} />
}

export default Addicon
