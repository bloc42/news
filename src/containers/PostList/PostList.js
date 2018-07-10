import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import Post from '../../components/Post'

const POSTS_QUERY = gql`
  {
    posts {
      title
      url
      author
      comment_count
    }
  }
`

const PostList = () => (
  <Query query={POSTS_QUERY}>
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>
      if (error) {
        console.log(error)
        return <p>Error :(</p>
      }

      return data.posts.map(({ title, author, url, comment_count }) => (
        <Post
          key={title}
          title={title}
          url={url}
          author={author}
          comment_count={comment_count}
        />
      ))
    }}
  </Query>
)

export default PostList
