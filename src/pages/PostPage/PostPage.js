import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import Container from '../../components/Container'
import Section from '../../components/Section'
import Anchor from '../../components/Anchor'
import RelativeTime from '../../components/RelativeTime'
import Link from '../../components/Link'
import SubmitCommentForm from '../../containers/SubmitCommentForm'
import styled from 'styled-components'
import Comment from '../../components/Comment'
import Divider from '../../components/Divider'

const StyledArticle = styled.article`
  footer ul {
    list-style-type: none;
    display: flex;
    flex-direction: row;
    padding: 0;
    color: ${props => props.theme.fontColorLight};
    font-size: ${props => props.theme.fontSizeSmall};
  }

  footer ul a {
    color: ${props => props.theme.fontColorLight};
  }
`

export const GET_POST = gql`
  query GetPost($id: ID!) {
    postById(id: $id) {
      id
      title
      url
      content
      author
      commentCount
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

const PostPage = props => {
  const { id } = props.match.params

  return (
    <Container>
      <Section padded>
        <Query query={GET_POST} variables={{ id }}>
          {({ loading, data }) => {
            if (loading) return '加载中。。。'

            const {
              title,
              url,
              content,
              author,
              createdAt,
              commentCount,
              comments
            } = data.post

            const postTitle = url ? (
              <Anchor href={url} target="_blank">
                {title}
              </Anchor>
            ) : (
              title
            )

            return (
              <div>
                <StyledArticle>
                  <h2>{postTitle}</h2>

                  <section>
                    {content.split('\n').map((paragraph, key) => {
                      return <p key={key}>{paragraph}</p>
                    })}
                  </section>

                  <footer>
                    <ul>
                      <li>
                        <Link to={`/user/${author}`}>{author}</Link>
                      </li>
                      <li>
                        <Divider />
                      </li>
                      <li>
                        <RelativeTime timestamp={createdAt} />
                      </li>
                      <li>
                        <Divider />
                      </li>
                      <li>
                        <Link
                          to={`/post/${id}`}
                        >{`${commentCount}条评论`}</Link>
                      </li>
                    </ul>
                  </footer>
                </StyledArticle>
                <section>
                  <SubmitCommentForm postId={id} parentAuthor={author} />

                  {comments.map(comment => {
                    return <Comment key={comment.id} {...comment} />
                  })}
                </section>
              </div>
            )
          }}
        </Query>
      </Section>
    </Container>
  )
}

export default PostPage
