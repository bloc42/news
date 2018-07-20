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

const StyledArticle = styled.article`
  header ul {
    list-style-type: none;
    display: flex;
    flex-direction: row;
    padding: 0;
    color: ${props => props.theme.fontColorLight};
  }

  header ul li {
    margin-right: 0.8rem;
  }

  header ul a {
    color: ${props => props.theme.fontColorLight};
  }
`

const GET_POST = gql`
  query GetPost($id: ID!) {
    post(id: $id) {
      id
      title
      url
      content
      author
      commentCount
      createdAt
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
              commentCount
            } = data.post
            const postTitle = url ? (
              <Anchor href={url} target="_blank">
                {title}
              </Anchor>
            ) : (
              title
            )

            return (
              <StyledArticle>
                <header>
                  <h2>{postTitle}</h2>
                  <section>
                    <ul>
                      <li>
                        <Link to={`/user/${author}`}>{author}</Link>
                      </li>
                      <li>
                        <RelativeTime timestamp={createdAt} />
                      </li>
                      <li>
                        <Link
                          to={`/post/${id}`}
                        >{`${commentCount}条评论`}</Link>
                      </li>
                    </ul>
                  </section>
                </header>
                <section>{content}</section>
                <section>
                  <SubmitCommentForm postId={id} />
                </section>
              </StyledArticle>
            )
          }}
        </Query>
      </Section>
    </Container>
  )
}

export default PostPage
