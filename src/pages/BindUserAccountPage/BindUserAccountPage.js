import React, { Component } from 'react'
import Section from '../../components/Section'
import Container from '../../components/Container'
import BindUserInfoForm from '../../containers/BindUserInfoForm'

class BindUserAccountPage extends Component {
  render() {
    return (
      <Container large>
        <Section padded>
          <h3>请完成如下设置。</h3>
          <BindUserInfoForm />
        </Section>
      </Container>
    )
  }
}

export default BindUserAccountPage
