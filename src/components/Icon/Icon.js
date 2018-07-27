import React from 'react'
import ticket from './ticket.svg'
import styled from 'styled-components'

const StyledTicket = styled.img`
border-radius: 50%;
display: inline-block;
text-align: center;
width: 3rem;
height: 3rem;
padding: 0.5rem;
border: 1px solid ${props => props.theme.primaryColor};
`

const Ticket = () => {
  return <StyledTicket src={ticket} title="邀请好友"/>
}

export default Ticket
