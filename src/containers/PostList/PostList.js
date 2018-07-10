import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import Post from '../../components/Post'

export const GET_POSTS = gql`
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
  <Query query={GET_POSTS}>
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>
      if (error) {
        console.log(error)
        return <p>Error :(</p>
      }

      return data.posts.map(({ title, author, url, comment_count }, index) => (
        <Post
          key={index}
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
