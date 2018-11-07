import React from 'react'
import Section from '../../components/Section'
import Container from '../../components/Container'
import Button from '../../components/Button'
import CustomSteps from '../../components/CustomSteps'
import CreatEtherAccountForm from '../../containers/CreatEtherAccountForm'

const CustomStep = CustomSteps.CustomStep
const CreatNewEtherAccountPage = props => {
  const steps = [
    {
      title: '请阅读并同意免责声明',
      description: '阅读免责声明'
    },
    {
      title: '请创建并保存钱包',
      description: <CreatEtherAccountForm />
    },
    {
      title: '请再次确认已离线保存钱包',
      description: (
        <Button primary small disabled={true}>
          已确认保存
        </Button>
      )
    }
  ]
  return (
    <Container large>
      <Section padded>
        <h2>请按照如下步骤创建以太坊账户。</h2>
        <CustomSteps direction="vertical">
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

export default CreatNewEtherAccountPage
