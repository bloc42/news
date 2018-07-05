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

class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      phone: '',
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
    const { username, phone, password } = this.state
    const { data } = await this.props.signupMutation({
      variables: {
        username,
        phone,
        password
      }
    })
    console.log(`data: %o`, data)

    // const { id, username } = data.signup
    // TODO: save current user info
    // TODO: redirect to homepage
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
              type="text"
              name="phone"
              placeholder="手机号"
              value={this.state.phone}
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
  mutation Signup($username: String!, $phone: String!, $password: String!) {
    signup(username: $username, phone: $phone, password: $password) {
      id
      username
    }
  }
`

export default compose(graphql(SIGNUP_MUTATION, { name: 'signupMutation' }))(
  Signup
)
