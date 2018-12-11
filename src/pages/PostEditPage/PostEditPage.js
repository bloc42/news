import React, { Component } from 'react'
import Section from '../../components/Section'
import Container from '../../components/Container'
import EditPostForm from '../../containers/EditPostForm'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { renderGraphiQL } from 'apollo-server-module-graphiql'

class EditPostPage extends Component {
  render() {
    const { id } = this.props.match.params
    const GET_POST = gql`
      query GetPost($id: ID!) {
        postById(id: $id) {
          id
          title
          url
          content
          author
          commentCount
          channel
          createdAt
          comments {
            id
            author
            content
            fullSlug
            level
            postId
            parentId
            createdAt
          }
        }
      }
    `
    return (
      <Container>
        <Section padded>
          <Query query={GET_POST} variables={{ id }}>
            {({ loading, data }) => {
              if (loading) return '加载中...'
              const { title, url, content, author, channel } = data.postById
              return (
                <EditPostForm
                  id={id}
                  title={title}
                  url={url}
                  content={content}
                  channel={channel}
                />
              )
            }}
          </Query>
        </Section>
      </Container>
    )
  }
}

export default EditPostPage
