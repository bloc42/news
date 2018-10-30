import React, { Component } from 'react'
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'
import Form from '../../components/Form'
import Input from '../../components/Input'
import Button from '../../components/Button'
import { withRouter } from 'react-router-dom'
import Alert from '../../components/Alert'
import TextArea from '../../components/TextArea'

class AddChannel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      logo: '',
      info: '',
      code: '',
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
  handleSubmit = async e => {
    e.preventDefault()
    this.setState({ errors: [] })
    const { name, logo, info, code } = this.state
    if (code === '') {
      this.setState({ errors: [{ message: '请填写邀请码' }] })
      return
    }
    try {
      const { errors } = await this.props.addchannelMutation({
        variables: {
          name,
          logo,
          info,
          code
        },
        update: (cache, { data }) => {
          this.setState({
            successes: [{ message: '小唠嗑创建已完成' }]
          })
          this.setState({
            name: '',
            logo: '',
            info: '',
            code: ''
          })
          setTimeout(this.props.history.push(`/channel/${name}`), 1000)
        }
      })

      if (errors && errors.length > 0) {
        this.setState({ errors })
      } else {
        this.setState({ errors: [] })
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
            name="name"
            placeholder="小唠嗑名称"
            value={this.state.name}
            onChange={this.handleChange}
            required
          />
        </Form.Item>
        {/* <Form.Item>
          <Input
            type="text"
            name="logo"
            placeholder="logo"
            value={this.state.logo}
            onChange={this.handleChange}
          />
        </Form.Item> */}
        <Form.Item>
          <TextArea
            type="text"
            name="info"
            placeholder="小唠嗑简介"
            value={this.state.info}
            onChange={this.handleChange}
            required
          />
        </Form.Item>
        <Form.Item>
          <Input
            type="text"
            name="code"
            placeholder="邀请码"
            value={this.state.code}
            onChange={this.handleChange}
            required
          />
        </Form.Item>
        <Form.Item>
          <Button primary fullWidth>
            开通小唠嗑
          </Button>
        </Form.Item>
      </Form>
    )
  }
}

const ADDCHANNEL_MUTATION = gql`
  mutation Addchannel(
    $name: String!
    $logo: String
    $info: String!
    $code: String!
  ) {
    addchannel(name: $name, logo: $logo, info: $info, code: $code) {
      id
      name
      info
      creator
    }
  }
`

const AddchannelWithMutation = compose(
  graphql(ADDCHANNEL_MUTATION, { name: 'addchannelMutation' })
)(AddChannel)

export default withRouter(AddchannelWithMutation)
