import React from 'react'
import upvote from './upvote.svg'
import downvote from './downvote.svg'
import upvotegray from './upvotegray.svg'
import downvotegray from './downvotegray.svg'
import styled, { css } from 'styled-components'

const StyledVoteicon = styled.span`
  width: 20px;
  height: 10px;
  background-size: cover;
  ${props =>
    props.upvote &&
    css`
      background-image: url(${upvote});
    `};
  ${props =>
    props.downvote &&
    css`
      background-image: url(${downvote});
      background-position-y: 10px;
    `};
  ${props =>
    props.upvotegray &&
    css`
      background-image: url(${upvotegray});
    `};
  ${props =>
    props.downvotegray &&
    css`
      background-image: url(${downvotegray});
      background-position-y: 10px;
    `};
`

const Voteicon = props => {
  return <StyledVoteicon {...props} />
}

export default Voteicon
