import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import Form from '../../components/Form'
import Input from '../../components/Input'
import Button from '../../components/Button'
import Container from '../../components/Container'
import { CURRENT_USER_QUERY } from '../../apollo/query'

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

  handleSubmit = async e => {
    e.preventDefault()
    const { username, password } = this.state

    try {
      const { data } = await this.props.loginMutation({
        variables: {
          username,
          password
        },
        update: (cache, { data }) => {
          const currentUser = data.login

          // Update currentUser in cache
          cache.writeQuery({
            query: CURRENT_USER_QUERY,
            data: {
              currentUser
            }
          })
        }
      })

      this.props.history.push('/')
    } catch (err) {
      // TODO: show error message in UI
      console.log(err)
    }
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
              placeholder="用户名/邮箱"
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

const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      username
    }
  }
`

const LoginWithMutation = compose(
  graphql(LOGIN_MUTATION, { name: 'loginMutation' })
)(Login)

export default LoginWithMutation
