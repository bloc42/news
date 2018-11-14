import React, { Component } from 'react'
import Section from '../../components/Section'
import Container from '../../components/Container'
import Button from '../../components/Button'
import CustomSteps from '../../components/CustomSteps'
import CreatEtherAccountForm from '../../containers/CreatEtherAccountForm'
import RegistrationStatement from '../../containers/RegistrationStatement'

const CustomStep = CustomSteps.CustomStep
class CreatNewEtherAccountPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentStep: 0,
      address: ''
    }
  }
  getAddress = address => {
    this.setState({ address: address })
  }
  nextStep = () => {
    this.setState({ currentStep: this.state.currentStep + 1 })
  }
  reConfirm = () => {
    this.nextStep()
    this.props.history.push(`/binduseraccount?address=${this.state.address}`)
  }
  render() {
    const steps = [
      {
        title: '请阅读并同意注册声明',
        description: (
          <RegistrationStatement
            nextStep={currentStep => this.nextStep(currentStep)}
          />
        )
      },
      {
        title: '请创建并保存钱包',
        description: (
          <CreatEtherAccountForm
            nextStep={currentStep => this.nextStep(currentStep)}
            getAddress={address => this.getAddress(address)}
            currentStep={this.state.currentStep}
          />
        )
      },
      {
        title: '请再次确认已离线保存钱包',
        description: (
          <Button
            primary
            small
            disabled={this.state.currentStep == 2 ? false : true}
            onClick={this.reConfirm}
          >
            已确认保存
          </Button>
        )
      }
    ]
    const icons = {
      finish: <i className={`rcicon rcicon-check`} />
    }
    return (
      <Container large>
        <Section padded>
          <h2>请按照如下步骤创建以太坊账户。</h2>
          <CustomSteps
            direction="vertical"
            current={this.state.currentStep}
            icons={icons}
          >
            {steps.map(item => (
              <CustomStep
                key={item.title}
                title={item.title}
                description={item.description}
              />
            ))}
          </CustomSteps>
        </Section>
      </Container>
    )
  }
}

export default CreatNewEtherAccountPage
