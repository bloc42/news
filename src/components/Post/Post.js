import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Tag from '../Tag'

const StyledPost = styled.article`
  margin: 2rem 0;
  padding: 0 1rem;

  > header span {
    font-weight: bold;
    margin-bottom: 0.2rem;
  }

  > footer {
    font-size: 0.8rem;
    color: ${props => props.theme.fontColorLight};
  }
`

const Post = ({ title, author, source, createtime, comment_count }) => {
  return (
    <StyledPost>
      <header>
        <span> {title}</span>
        <Tag source tagname={source} tagurl="/from?site=" />
      </header>
      <footer>
        By <Tag author tagname={author} tagurl="/from?author=" /> |{' '}
        <Tag time tagname={createtime} tagurl="/from?time=" /> |{' '}
        <Tag operation tagname={'hide'} tagurl="" /> |{' '}
        <Tag
          comment
          tagname={comment_count + ' comments'}
          tagurl="/topic?id="
        />
      </footer>
    </StyledPost>
  )
}

Post.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired
}

export default Post
