import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import Post from '../../components/Post'
import Button from '../../components/Button'

export const GET_POSTS = gql`
  query GetPosts($cursor: String) {
    postFeed(cursor: $cursor) {
      cursor
      posts {
        id
        title
        url
        author
        commentCount
        createdAt
      }
    }
  }
`

const LoadMore = ({ onClick }) => {
  return (
    <Button onClick={onClick} fullWidth>
      加载更多
    </Button>
  )
}

const PostList = () => (
  <Query query={GET_POSTS}>
    {({ loading, data, fetchMore }) => {
      if (loading) return null
      const {
        postFeed: { cursor, posts }
      } = data

      return (
        <div>
          {posts.map((post, index) => (
            <Post
              key={index}
              title={post.title}
              url={post.url}
              author={post.author}
              commentCount={post.commentCount}
              createdAt={post.createdAt}
            />
          ))}
          <LoadMore
            onClick={() =>
              fetchMore({
                query: GET_POSTS,
                variables: { cursor },
                updateQuery: (previousResult, { fetchMoreResult }) => {
                  console.log(previousResult)

                  console.log(fetchMoreResult)
                  return {
                    postFeed: {
                      cursor: fetchMoreResult.postFeed.cursor,
                      posts: [
                        ...previousResult.postFeed.posts,
                        ...fetchMoreResult.postFeed.posts
                      ],
                      __typename: 'PostFeed'
                    }
                  }
                }
              })
            }
          />
        </div>
      )
    }}
  </Query>
)

export default PostList
