/**
 * Reference: https://www.howtographql.com/react-apollo/5-authentication/
 */

import React, { Component } from 'react'
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'
import Form from '../../components/Form'
import Input from '../../components/Input'
import Button from '../../components/Button'
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
      invitationCode: '',
      errors: [],
      successes: []
    }
  }

  handleChange = e => {
    const { target } = e
    const { name, value } = target

    this.setState({
      [name]: value
    })
  }
  componentDidMount() {
    const searchParams = new URLSearchParams(this.props.location.search)
    this.state.invitationCode = searchParams.get('code')

  }
  handleSubmit = async e => {
    e.preventDefault()
    const { username, email, password, invitationCode } = this.state
    console.log(invitationCode)
    if(invitationCode == ''){
      this.setState({ errors: [{ message: '目前只可通过邀请链接注册'}] })
      return 
    }
    try {
      const { errors } = await this.props.signupMutation({
        variables: {
          username,
          email,
          password
        },
        update: (cache, { data }) => {
          const currentUser = data.signup
          this.setState({
            successes: [{ message: '激活邮件已发送,请前往邮箱查看' }]
          })
          this.state.username = ''
          this.state.password = ''
          this.state.email = ''
          // Update currentUser in cache
          // cache.writeQuery({
          //   query: GET_CURRENT_USER,
          //   data: {
          //     currentUser
          //   }
          // })
        }
      })

      if (errors && errors.length > 0) {
        this.setState({ errors })
      } else {
        this.setState({ errors: [] })
        //this.props.history.push('/login')
      }
    } catch (err) {
      // TODO: show error message in UI
      console.error(err)
    }
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        {this.state.errors.map((error, index) => (
          <Alert key={index} message={error.message} error />
        ))}
        {this.state.successes.map((success, index) => (
          <Alert key={index} message={success.message} success />
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
