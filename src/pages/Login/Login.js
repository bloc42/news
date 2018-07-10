import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import Form from '../../components/Form'
import Input from '../../components/Input'
import Button from '../../components/Button'
import Container from '../../components/Container'
import { CURRENT_USER_QUERY } from '../../apollo/query'
import Alert from '../../components/Alert'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
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
    const { username, password } = this.state

    try {
      const { errors } = await this.props.loginMutation({
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
    return (
      <Container small>
        <Form onSubmit={this.handleSubmit}>
          <h2>登录</h2>

          {this.state.errors.map((error, index) => (
            <Alert key={index} message={error.message} error />
          ))}

          <Form.Item>
            <Input
              type="text"
              name="username"
              value={this.state.username}
              placeholder="用户名/邮箱"
              onChange={this.handleChange}
              required
            />
          </Form.Item>
          <Form.Item>
            <Input
              type="password"
              name="password"
              placeholder="密码"
              value={this.state.password}
              onChange={this.handleChange}
              required
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
