import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledPost = styled.article`
  margin: 2rem 0;

  > header {
    font-weight: bold;
    margin-bottom: 0.2rem;
  }

  > footer {
    font-size: 0.8rem;
    color: ${props => props.theme.fontColorLight};
  }
`

const Post = ({ title, author }) => {
  return (
    <StyledPost>
      <header>{title}</header>
      <footer>By {author}</footer>
    </StyledPost>
  )
}

Post.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired
}

export default Post
