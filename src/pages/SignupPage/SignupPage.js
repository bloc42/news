import React from 'react'
import Section from '../../components/Section'
import Container from '../../components/Container'
import Link from '../../components/Link'
import Form from '../../components/Form'
import Button from '../../components/Button'
import Small from '../../components/Small'

const SignupPage = props => {
  return (
    <Container small>
      <Section padded>
        <h2>创建属于你的唠嗑账号。</h2>
        <Form>
          <Form.Item>
            <Link to="/creatNewEtherAccount">
              <Button primary fullWidth>
                未拥有以太坊账户
              </Button>
            </Link>
          </Form.Item>
          <Form.Item>
            <Link to="/importEtherAccount">
              <Button primary fullWidth>
                我已拥有以太坊账户
              </Button>
            </Link>
          </Form.Item>
        </Form>
        <Small>
          <span>已经有账号？</span>
          <Link to="/login">登录</Link>
        </Small>
      </Section>
    </Container>
  )
}

export default SignupPage
