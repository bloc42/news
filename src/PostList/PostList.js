import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import Post from '../Post/Post'

const Posts = () => (
  <Query
    query={gql`
    {
      posts {
        title,
        author
      }
    }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>
      if (error) {
        console.log(error)
        return <p>Error :(</p>
      }

      return data.posts.map(({ title, author }) => (
        <Post key={title} title={title} author={author} />
      ))
    }}
  </Query>
)

export default Posts
