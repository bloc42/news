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
import styled from 'styled-components'
import ReactMarkdown from 'react-markdown'

const StyledDisplay = styled.div`
  width: 50%;
  padding: 1em;
  border: 1px solid #e8e8e8;
  border-radius: 4px;
  margin-left: 10px;
`
const StyledItem = styled.div`
  display: flex;
`
const StyledTitle = styled.h4`
  color: #b7b7b7;
  margin-bottom: 0.5rem;
`
const StyledReactMarkdown = styled(ReactMarkdown)`
  overflow-wrap: break-word;
  word-break: break-all;

  h1,
  h2,
  h3 {
    margin-bottom: 0.1rem;
  }
`
const StyledTips = styled.i`
  background: #8c8c8c;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  display: inline-block;
  text-align: center;
  color: #fff;
  font-style: normal;
  cursor: pointer;
  font-size: 0.8rem;
`
class SubmitPostForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      url: '',
      content: '',
      errors: [],
      mdeValue: { text: '', selection: null },
      tips: `
      MarkDown语法支持

      #h1级标题
      ##h2级标题
      ###h3级标题
      ####h4级标题
      ---分割线
      [超链接名称](超链接网站)
      code反引号
      *斜体强调*
      **粗体强调**
      换行:2个空格符结束回车
      `
    }
  }
  handleValueChange(value) {
    this.setState({ mdeValue: value })
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
          在{channel === '' ? '唠嗑' : channel}
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
          <StyledItem flex>
            <TextArea
              name="content"
              value={this.state.content}
              onChange={this.handleChange}
              placeholder="内容 (支持MarkDown)"
              rows="10"
              halfwidth
            />
            <StyledDisplay>
              <StyledTitle>
                内容预览 <StyledTips title={this.state.tips}>?</StyledTips>
              </StyledTitle>
              <StyledReactMarkdown
                source={this.state.content}
                className="showContent"
              />
            </StyledDisplay>
          </StyledItem>
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
