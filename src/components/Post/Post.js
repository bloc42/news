import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledPost = styled.article`
  margin: 2rem 0;
  padding: 0 1rem;

  > header {
    margin-bottom: 0.2rem;
  }

  > header a {
    font-weight: bold;
    color: ${props => props.theme.fontColor};
    text-decoration: none;
  }

  > footer {
    font-size: 0.8rem;
    color: ${props => props.theme.fontColorLight};
  }
`

const Post = ({ title, author, url, comment_count }) => {
  const postTitle = url ? <a href={url}>{title}</a> : title

  return (
    <StyledPost>
      <header>{postTitle}</header>
      <footer>
        {/* TODO: add link */}
        {`${author} | ${comment_count}条评论`}
      </footer>
    </StyledPost>
  )
}

Post.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  url: PropTypes.string,
  comment_count: PropTypes.number.isRequired
}

export default Post
