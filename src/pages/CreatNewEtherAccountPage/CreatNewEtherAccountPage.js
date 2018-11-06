import React from 'react'
import Section from '../../components/Section'
import Container from '../../components/Container'
import Link from '../../components/Link'
import Form from '../../components/Form'
import Button from '../../components/Button'
import Small from '../../components/Small'
import CustomSteps from '../../components/CustomSteps'
import SignupForm from '../../containers/SignupForm'

const CustomStep = CustomSteps.CustomStep
const CreatNewEtherAccountPage = props => {
  const steps = [
    {
      title: '请阅读并同意免责声明',
      description: '阅读免责声明'
    },
    {
      title: '请创建并保存钱包',
      description: '点击并生成钱包'
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
