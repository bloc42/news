import React, { Component } from 'react'
import PropTypes from 'prop-types'
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'
import Container from '../../components/Container'
import Form from '../../components/Form'
import Button from '../../components/Button'
import TextArea from '../../components/TextArea'
import Alert from '../../components/Alert'

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
          console.log(data)
          // TODO: update comments
        }
      })

      if (errors && errors.length > 0) {
        this.setState({ errors })
      } else {
        this.setState({ errors: [] })
      }
    } catch (err) {
      console.error(err)
    }
  }

  render() {
    return (
      <Container>
        <Form onSubmit={this.handleSubmit}>
          {this.state.errors.map((error, index) => (
            <Alert key={index} message={error.message} error />
          ))}

          <Form.Item>
            <TextArea
              name="content"
              value={this.state.content}
              onChange={this.handleChange}
              placeholder="回复"
              rows="6"
            />
          </Form.Item>
          <Form.Item>
            <Button primary>提交评论</Button>
          </Form.Item>
        </Form>
      </Container>
    )
  }
}

SubmitCommentForm.propTypes = {
  postId: PropTypes.string.isRequired,
  parentId: PropTypes.string
}

const Add_COMMENT_MUTATION = gql`
  mutation AddComment($content: String!, $postId: ID!, $parentId: ID) {
    addComment(content: $content, postId: $postId, parentId: $parentId) {
      id
      author
      content
      parentId
      fullSlug
      createdAt
    }
  }
`

const SubmitCommentFormWithMutation = compose(
  graphql(Add_COMMENT_MUTATION, { name: 'addCommentMutation' })
)(SubmitCommentForm)

export default SubmitCommentFormWithMutation
