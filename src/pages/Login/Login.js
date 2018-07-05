import React, { Component } from 'react'
import Form from '../../components/Form'
import Input from '../../components/Input'
import Button from '../../components/Button'
import Container from '../../components/Container'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }

  handleChange = e => {
    const { target } = e
    const { name, value } = target

    this.setState({
      [name]: value
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    // TODO
  }

  render() {
    return (
      <Container small>
        <Form onSubmit={this.handleSubmit}>
          <h2>登录</h2>
          <Form.Item>
            <Input
              type="text"
              name="username"
              value={this.state.username}
              placeholder="用户名/手机号"
              onChange={this.handleChange}
            />
          </Form.Item>
          <Form.Item>
            <Input
              type="password"
              name="password"
              placeholder="密码"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </Form.Item>
          <Form.Item>
            <Button primary fullWidth>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Container>
    )
  }
}

export default Login
