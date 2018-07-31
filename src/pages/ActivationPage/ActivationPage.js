import React, { Component } from 'react'
import gql from 'graphql-tag'
import { withApollo } from 'react-apollo'
import { graphql, compose } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import Section from '../../components/Section'
import Container from '../../components/Container'
import Alert from '../../components/Alert'
import { Link } from 'react-router-dom'

class ActivationPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      errors: [],
      successes: []
    }
  }
  handleActivation = async e => {
    const searchParams = new URLSearchParams(this.props.location.search)
    const username = searchParams.get('username')
    const activationCode = searchParams.get('activationcode')
    try {
      const { errors } = await this.props.activationMutation({
        variables: {
          username,
          activationCode
        }
      })

      if (errors && errors.length > 0) {
        this.setState({ errors })
      } else {
        this.setState({ successes: [{ message: '邮件激活成功,请登录' }] })
      }
    } catch (err) {
      console.error(err)
    }
  }
  componentDidMount() {
    this.handleActivation()
  }
  render() {
    return (
      <Container small>
        <Section padded>
          <h2>激活邮箱</h2>
          {this.state.errors.map((error, index) => {
            let template = <Alert key={index} message={error.message} error />
            if (error.code === '223') {
              template = (
                <Alert key={index} message={error.message} error>
                  <br />
                  <Link to="/sendactivation">立即发送</Link>
                </Alert>
              )
            }
            return template
          })}
          {this.state.successes.map((success, index) => (
            <Alert key={index} message={success.message} success />
          ))}
        </Section>
      </Container>
    )
  }
}
const ACTIVATION_MUTATION = gql`
  mutation Activation($username: String!, $activationCode: String!) {
    activation(username: $username, activationCode: $activationCode) {
      id
      username
    }
  }
`

const ActivationWithMutation = compose(
  graphql(ACTIVATION_MUTATION, { name: 'activationMutation' })
)(ActivationPage)

export default withRouter(withApollo(ActivationWithMutation))
