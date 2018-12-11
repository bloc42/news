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
import ReactMarkdown from 'react-markdown'

const StyledArticle = styled.article`
  > p {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
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
const Styledflexli = styled.li`
  display: flex;
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
      channel
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
    currentUser {
      id
      username
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
            if (loading) return '加载中...'

            const {
              title,
              url,
              content,
              author,
              channel,
              createdAt,
              commentCount,
              comments
            } = data.postById

            const { currentUser } = data

            const postTitle = url ? (
              <Anchor href={url} target="_blank">
                {title}
              </Anchor>
            ) : (
              title
            )

            const postUrl = url ? (
              <p>
                <a href={url} target="_blank">
                  {url}
                </a>
              </p>
            ) : (
              ''
            )

            const postEdit =
              currentUser && currentUser.username == author ? (
                <Styledflexli>
                  <span>
                    <Divider />
                  </span>
                  <span>
                    <Anchor href={`/edit/${id}`}>编辑</Anchor>
                  </span>
                </Styledflexli>
              ) : (
                ''
              )

            const postDel =
              currentUser && currentUser.username == author ? (
                <Styledflexli>
                  <span>
                    <Divider />
                  </span>
                  <span>
                    <Anchor href={`/del/${id}`}>删除</Anchor>
                  </span>
                </Styledflexli>
              ) : (
                ''
              )

            const creatorDel = channel ? (
              <Query
                query={gql`
                  query GetChannelInfo($channel: String!) {
                    channel(name: $channel) {
                      id
                      name
                      info
                      logo
                      creator
                    }
                  }
                `}
                variables={{ channel }}
              >
                {({ loading, data }) => {
                  if (loading) {
                    return null
                  }
                  const { channel } = data
                  const { creator } = channel

                  if (
                    currentUser &&
                    creator == currentUser.username &&
                    creator !== author
                  ) {
                    return (
                      <Styledflexli>
                        <span>
                          <Divider />
                        </span>
                        <span>
                          <Anchor href={`/del/${id}`}>删除</Anchor>
                        </span>
                      </Styledflexli>
                    )
                  } else {
                    return ''
                  }
                }}
              </Query>
            ) : (
              ''
            )

            return (
              <div>
                <StyledArticle>
                  <h2>{postTitle}</h2>
                  {postUrl}
                  <section>
                    <ReactMarkdown source={content} />
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

                      {postEdit}
                      {postDel}
                      {creatorDel}
                    </ul>
                  </footer>
                </StyledArticle>
                <section>
                  <SubmitCommentForm
                    toggleReply={() => {}}
                    postId={id}
                    parentAuthor={author}
                  />

                  {comments.map(comment => {
                    return (
                      <Comment
                        key={comment.id}
                        {...comment}
                        currentUser={currentUser}
                      />
                    )
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
