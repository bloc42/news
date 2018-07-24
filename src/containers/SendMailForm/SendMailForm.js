import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import Form from '../../components/Form'
import Input from '../../components/Input'
import Button from '../../components/Button'
import Alert from '../../components/Alert'
import { withRouter } from 'react-router-dom'

class SendmailForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      errors: [],
      successes: []
    }
  }

  handleChange = e => {
    const { target } = e
    this.setState({ email: target.value })
  }

  handleSubmit = async e => {
    e.preventDefault()
    const { email } = this.state

    try {
      const { errors } = await this.props.sendActivationMailMutation({
        variables: {
          email
        }
      })

      if (errors && errors.length > 0) {
        this.setState({ errors })
      } else {
        this.setState({ errors: [] })
        this.setState({
          successes: [{ message: '激活邮件已发送,请前往邮箱查看' }]
        })
      }
    } catch (err) {
      console.error(err)
    }
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <h2>重新发送激活邮件</h2>
        {this.state.errors.map((error, index) => (
          <Alert key={index} message={error.message} error />
        ))}
        {this.state.successes.map((success, index) => (
          <Alert key={index} message={success.message} success />
        ))}
        <Form.Item>
          <Input
            type="text"
            name="email"
            value={this.state.email}
            placeholder="邮箱"
            onChange={this.handleChange}
            required
          />
        </Form.Item>
        <Form.Item>
          <Button primary fullWidth>
            发送
          </Button>
        </Form.Item>
      </Form>
    )
  }
}

const SENDACTIVATIONMAIL_MUTATION = gql`
  mutation sendActivationMail($email: String!) {
    sendActivationMail(email: $email) {
      id
      username
    }
  }
`

const sendActivationMailFormWithMutation = compose(
  graphql(SENDACTIVATIONMAIL_MUTATION, { name: 'sendActivationMailMutation' })
)(SendmailForm)

export default withRouter(sendActivationMailFormWithMutation)
