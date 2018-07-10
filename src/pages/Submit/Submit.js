import React, { Component } from 'react'
import Container from '../../components/Container'
import Form from '../../components/Form'
import Input from '../../components/Input'
import Button from '../../components/Button'
import TextArea from '../../components/TextArea'

class Submit extends Component {
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
  }

  render() {
    return (
      <Container>
        <Form onSubmit={this.handleSubmit}>
          <h2>发布文章</h2>

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
            <Button primary fullWidth>
              提交
            </Button>
          </Form.Item>
        </Form>
      </Container>
    )
  }
}

export default Submit
