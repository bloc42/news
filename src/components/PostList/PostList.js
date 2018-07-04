import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import Post from '../Post'

const PostList = () => (
  <Query
    query={gql`
      {
        posts {
          title
          author
          source
          createtime
          comment_count
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

      return data.posts.map(
        ({ title, author, source, createtime, comment_count }) => (
          <Post
            key={title}
            title={title}
            author={author}
            source={source}
            createtime={createtime}
            comment_count={comment_count}
          />
        )
      )
    }}
  </Query>
)

export default PostList
