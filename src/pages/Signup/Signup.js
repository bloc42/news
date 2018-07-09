/**
 * Reference: https://www.howtographql.com/react-apollo/5-authentication/
 */

import React, { Component } from 'react'
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'
import Form from '../../components/Form'
import Input from '../../components/Input'
import Button from '../../components/Button'
import Container from '../../components/Container'
import { withRouter } from 'react-router-dom'

class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      email: '',
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
    const { username, email, password } = this.state

    try {
      const { data } = await this.props.signupMutation({
        variables: {
          username,
          email,
          password
        }
      })

      console.log(data)
      // TODO: save current user info ?
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
          <h2>注册</h2>

          <Form.Item>
            <Input
              type="text"
              name="username"
              placeholder="用户名"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </Form.Item>
          <Form.Item>
            <Input
              type="email"
              name="email"
              placeholder="邮箱"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </Form.Item>
          <Form.Item>
            <Input
              type="password"
              name="password"
              placeholder="密码（不少于6位）"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </Form.Item>
          <Form.Item>
            <Button primary fullWidth>
              注册
            </Button>
          </Form.Item>
        </Form>
      </Container>
    )
  }
}

const SIGNUP_MUTATION = gql`
  mutation Signup($username: String!, $email: String!, $password: String!) {
    signup(username: $username, email: $email, password: $password) {
      id
      username
    }
  }
`

const SignupWithMutation = compose(
  graphql(SIGNUP_MUTATION, { name: 'signupMutation' })
)(Signup)

export default withRouter(SignupWithMutation)
