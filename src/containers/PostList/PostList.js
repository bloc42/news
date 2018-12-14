import React, { Component } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import Post from '../../components/Post'
import ScrollDetector from '../../components/ScrollDetector'
import { renderGraphiQL } from 'apollo-server-module-graphiql'

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
        channel
        upvoteCount
      }
    }
  }
`
const query = gql`
  query {
    currentUser {
      id
      username
      upvotePost
      downvotePost
    }
  }
`
class PostList extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <Query query={GET_POSTS}>
        {({ loading, data, fetchMore, client }) => {
          if (loading || !data) return null

          const {
            postFeed: { cursor, posts }
          } = data
          const postFeed = client.cache.readQuery({ query: GET_POSTS })
          console.error(postFeed)
          // const { currentUser } = client.cache.readQuery({ query })
          return (
            <Query
              query={gql`
                query GetCurrentUser {
                  currentUser {
                    id
                    username
                    notificationCount
                    upvotePost
                    downvotePost
                  }
                }
              `}
            >
              {({ loading, data, client }) => {
                if (loading) {
                  return null
                }
                const { currentUser } = data
                return (
                  <div>
                    {posts.map(post => (
                      <Post key={post.id} {...post} currentUser={currentUser} />
                    ))}
                    <ScrollDetector
                      onReachBottom={() =>
                        fetchMore({
                          query: GET_POSTS,
                          variables: { cursor },
                          updateQuery: (
                            previousResult,
                            { fetchMoreResult }
                          ) => {
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
        }}
      </Query>
    )
  }
}

export default PostList
