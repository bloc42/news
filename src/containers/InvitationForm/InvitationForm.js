import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import Form from '../../components/Form'
import Input from '../../components/Input'
import Button from '../../components/Button'
import Alert from '../../components/Alert'
import { withRouter } from 'react-router-dom'

class InvitationForm extends Component {
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
    const emails = email.split(',')
    try {
      const { errors } = await this.props.sendInvitationFormMailMutation({
        variables: {
          emails
        }
      })

      if (errors && errors.length > 0) {
        this.setState({ errors })
      } else {
        this.setState({ errors: [] })
        this.setState({
          successes: [{ message: '邀请邮件已发送至朋友' }]
        })
      }
    } catch (err) {
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
            name="email"
            value={this.state.email}
            placeholder="被邀请人邮箱"
            onChange={this.handleChange}
            required
          />
        </Form.Item>
        <Form.Item>
          <Button primary fullWidth>
            发送邀请
          </Button>
        </Form.Item>
      </Form>
    )
  }
}

const SENDINVITATIONMAIL_MUTATION = gql`
  mutation sendInvitationMail($emails: [String!]) {
    sendInvitationMail(emails: $emails) {
      invitationCodes {
        id
        invitor
      }
    }
  }
`

const sendInvitationFormMailWithMutation = compose(
  graphql(SENDINVITATIONMAIL_MUTATION, { name: 'sendInvitationFormMailMutation' })
)(InvitationForm)

export default withRouter(sendInvitationFormMailWithMutation)
