import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import Post from '../../components/Post'
import ScrollDetector from '../../components/ScrollDetector'

export const GET_POSTS = gql`
  query GetPosts($cursor: String, $channel: String) {
    postFeed(cursor: $cursor, channel: $channel) {
      cursor
      posts {
        id
        title
        url
        author
        commentCount
        createdAt
        channel
      }
    }
  }
`

const ChannelPostList = ({ channel }) => (
  <Query query={GET_POSTS} variables={{ channel }}>
    {({ loading, data, fetchMore }) => {
      if (loading || !data) return null

      const {
        postFeed: { cursor, posts }
      } = data

      return (
        <div>
          {posts.map(post => (
            <Post key={post.id} {...post} />
          ))}
          <ScrollDetector
            onReachBottom={() =>
              fetchMore({
                query: GET_POSTS,
                variables: { cursor },
                updateQuery: (previousResult, { fetchMoreResult }) => {
                  if (
                    !fetchMoreResult ||
                    fetchMoreResult.postFeed.posts.length === 0 ||
                    fetchMoreResult.postFeed.cursor >=
                      previousResult.postFeed.cursor
                  ) {
                    return previousResult
                  }
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

export default ChannelPostList
