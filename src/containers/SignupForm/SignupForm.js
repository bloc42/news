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
import { GET_CURRENT_USER } from '../../query'
import Alert from '../../components/Alert'

class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      email: '',
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
    const { username, email, password } = this.state

    try {
      const { errors } = await this.props.signupMutation({
        variables: {
          username,
          email,
          password
        },
        update: (cache, { data }) => {
          const currentUser = data.signup

          // Update currentUser in cache
          cache.writeQuery({
            query: GET_CURRENT_USER,
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
      // TODO: show error message in UI
      console.error(err)
    }
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <h2>创建你的Blockdog账号。</h2>

        {this.state.errors.map((error, index) => (
          <Alert key={index} message={error.message} error />
        ))}

        <Form.Item>
          <Input
            type="text"
            name="username"
            placeholder="用户名"
            value={this.state.username}
            onChange={this.handleChange}
            required
          />
        </Form.Item>
        <Form.Item>
          <Input
            type="email"
            name="email"
            placeholder="邮箱"
            value={this.state.email}
            onChange={this.handleChange}
            required
          />
        </Form.Item>
        <Form.Item>
          <Input
            type="password"
            name="password"
            placeholder="密码（不少于6位）"
            value={this.state.password}
            onChange={this.handleChange}
            minlength="6"
            required
          />
        </Form.Item>
        <Form.Item>
          <Button primary fullWidth>
            注册
          </Button>
        </Form.Item>
      </Form>
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
