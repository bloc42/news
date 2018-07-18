import React, { Component } from 'react'
import gql from 'graphql-tag'
import { withApollo } from 'react-apollo'
import { graphql, compose } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import Section from '../../components/Section'
import Container from '../../components/Container'
import Alert from '../../components/Alert'

class Active extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      active_code: '',
      errors: []
    }
  }
  handleActive = async e => {
    const { username, active_code } = this.state
    try {
      const { errors } = await this.props.activeMutation({
        variables: {
          username,
          active_code
        }
      })

      if (errors && errors.length > 0) {
        this.setState({ errors })
      } else {
        this.setState({ errors: [] })
        //   this.props.history.push('/')
      }
    } catch (err) {
      console.error(err)
    }
  }
  componentDidMount() {
    const searchParams = new URLSearchParams(this.props.location.search)
    this.state.username = searchParams.get('username')
    this.state.active_code = searchParams.get('active')
    this.handleActive()
  }
  render() {
    return (
      <Container small>
        <Section padded>
          <h2>激活邮箱</h2>
          {this.state.errors.map((error, index) => (
            <Alert key={index} message={error.message} error />
          ))}
        </Section>
      </Container>
    )
  }
}
const ACTIVE_MUTATION = gql`
  mutation Active($username: String!, $active_code: String!) {
    active(username: $username, active_code: $active_code) {
      username
    }
  }
`

const ActiveWithMutation = compose(
  graphql(ACTIVE_MUTATION, { name: 'activeMutation' })
)(Active)

export default withRouter(withApollo(ActiveWithMutation))
