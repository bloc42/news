import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'
import Form from '../../components/Form'
import Input from '../../components/Input'
import Button from '../../components/Button'
import TextArea from '../../components/TextArea'
import Alert from '../../components/Alert'
import { GET_POSTS } from '../PostList'

class SubmitPostForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      url: '',
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
    let { title, url, content } = this.state
    const searchParams = new URLSearchParams(this.props.location.search)
    const channel = searchParams.get('channel')
      ? searchParams.get('channel')
      : ''
    try {
      const { errors } = await this.props.submitPostMutation({
        variables: {
          title,
          url,
          content,
          channel
        },
        update: (cache, { data }) => {
          const newPost = data.submitPost
          const { postFeed } = cache.readQuery({ query: GET_POSTS })
          const { posts } = postFeed
          const mergedPosts = [newPost, ...posts]

          cache.writeQuery({
            query: GET_POSTS,
            data: {
              postFeed: {
                ...postFeed,
                posts: mergedPosts
              }
            }
          })
        }
      })

      if (errors && errors.length > 0) {
        this.setState({ errors })
      } else {
        this.setState({ errors: [] })
        this.props.history.push('/')
      }
    } catch (err) {
      console.error(err)
    }
  }

  render() {
    const searchParams = new URLSearchParams(this.props.location.search)
    const channel = searchParams.get('channel')
      ? searchParams.get('channel')
      : ''
    return (
      <Form onSubmit={this.handleSubmit}>
        <h2>
          在{channel === '' ? 'Bloc42' : channel}
          中创建新帖
        </h2>

        {this.state.errors.map((error, index) => (
          <Alert key={index} message={error.message} error />
        ))}

        <Form.Item>
          <Input
            type="text"
            name="title"
            value={this.state.title}
            placeholder="标题"
            onChange={this.handleChange}
            required
          />
        </Form.Item>
        <p>请发布链接或内容</p>
        <Form.Item>
          <Input
            type="url"
            name="url"
            placeholder="链接"
            value={this.state.url}
            onChange={this.handleChange}
          />
        </Form.Item>
        <Form.Item>
          <TextArea
            name="content"
            value={this.state.content}
            onChange={this.handleChange}
            placeholder="内容"
            rows="10"
          />
        </Form.Item>
        <Form.Item>
          <Button primary>提交</Button>
        </Form.Item>
      </Form>
    )
  }
}

const SUBMIT_POST_MUTATION = gql`
  mutation SubmitPost(
    $title: String!
    $url: String
    $content: String
    $channel: String
  ) {
    submitPost(title: $title, url: $url, content: $content, channel: $channel) {
      id
      title
      url
      author
      commentCount
      channel
    }
  }
`

const SubmitPostWithMutation = compose(
  graphql(SUBMIT_POST_MUTATION, { name: 'submitPostMutation' })
)(SubmitPostForm)

export default withRouter(SubmitPostWithMutation)
