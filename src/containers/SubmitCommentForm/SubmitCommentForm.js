import React, { Component } from 'react'
import PropTypes from 'prop-types'
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'
import Form from '../../components/Form'
import Button from '../../components/Button'
import TextArea from '../../components/TextArea'
import Alert from '../../components/Alert'
import { GET_POST } from '../../pages/PostPage/PostPage'

class SubmitCommentForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      content: '',
      errors: []
    }
  }

  handleChange = e => {
    const { target } = e
    const { name, value } = target

    this.setState({
      [name]: value
    })
  }

  handleSubmit = async e => {
    e.preventDefault()
    const { content } = this.state
    const { postId, parentId } = this.props

    try {
      const { errors } = await this.props.addCommentMutation({
        variables: {
          content,
          postId,
          parentId
        },
        update: (cache, { data }) => {
          const newComment = data.addComment
          const { post } = cache.readQuery({
            query: GET_POST,
            variables: { id: postId }
          })
          const { commentCount, comments } = post
          const mergedComments = [...comments, newComment].sort((a, b) =>
            a.fullSlug.localeCompare(b.fullSlug)
          )

          cache.writeQuery({
            query: GET_POST,
            variables: { id: postId },
            data: {
              post: {
                ...post,
                commentCount: commentCount + 1,
                comments: mergedComments
              }
            }
          })
        }
      })

      if (errors && errors.length > 0) {
        this.setState({ errors })
      } else {
        this.setState({ errors: [], content: '' })
      }
    } catch (err) {
      console.error(err)
    }
  }

  render() {
    const { parentAuthor } = this.props

    return (
      <Form onSubmit={this.handleSubmit}>
        {this.state.errors.map((error, index) => (
          <Alert key={index} message={error.message} error />
        ))}

        <Form.Item>
          <TextArea
            name="content"
            value={this.state.content}
            onChange={this.handleChange}
            placeholder={`回复 ${parentAuthor}`}
            rows="6"
          />
        </Form.Item>
        <Form.Item>
          <Button primary>提交评论</Button>
        </Form.Item>
      </Form>
    )
  }
}

SubmitCommentForm.propTypes = {
  postId: PropTypes.string.isRequired,
  parentAuthor: PropTypes.string.isRequired,
  parentId: PropTypes.string
}

const Add_COMMENT_MUTATION = gql`
  mutation AddComment($content: String!, $postId: ID!, $parentId: ID) {
    addComment(content: $content, postId: $postId, parentId: $parentId) {
      id
      author
      content
      postId
      parentId
      fullSlug
      createdAt
      level
    }
  }
`

const SubmitCommentFormWithMutation = compose(
  graphql(Add_COMMENT_MUTATION, { name: 'addCommentMutation' })
)(SubmitCommentForm)

export default SubmitCommentFormWithMutation
