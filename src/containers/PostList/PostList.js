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
      commentCount
      createdAt
    }
  }
`

const PostList = () => (
  <Query query={GET_POSTS}>
    {({ loading, error, data }) => {
      if (error) {
        console.log(error)
        return <p>Error :(</p>
      }

      if (loading) return null

      return data.posts.map((post, index) => (
        <Post
          key={index}
          title={post.title}
          url={post.url}
          author={post.author}
          commentCount={post.commentCount}
          createdAt={post.createdAt}
        />
      ))
    }}
  </Query>
)

export default PostList
