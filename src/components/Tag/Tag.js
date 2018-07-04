import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

const StyledTag = styled.a`
  color: ${props => props.theme.fontColorLight};
  font-size: 0.8rem;
  text-decoration: none;

  /* source Tag*/
  ${props =>
    props.source &&
    css`
      margin: 0.5rem;
      &:hover {
        color: ${props => props.theme.fontColor};
      }
    `};

  /* author Tag*/
  ${props =>
    props.author &&
    css`
      &:hover {
        color: ${props => props.theme.fontColor};
      }
    `};

  /* time Tag*/
  ${props =>
    props.time &&
    css`
      &:hover {
        color: ${props => props.theme.fontColor};
      }
    `};
`

const Tag = ({ tagname, tagurl }) => {
  return <StyledTag href={tagurl + tagname}>{tagname}</StyledTag>
}

Tag.propTypes = {
  tagname: PropTypes.string.isRequired,
  tagurl: PropTypes.string.isRequired
}

export default Tag
