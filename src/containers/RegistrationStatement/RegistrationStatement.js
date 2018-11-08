import React, { Component } from 'react'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import StatementArticle from '../../components/StatementArticle'
import Button from '../../components/Button'

const StyledStatement = styled.a`
  color: ${props => props.theme.primaryColor};
  cursor: pointer;
`
const Styledp = styled.p`
  text-align: center;
`
class RegistrationStatement extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isRead: false,
      showStatement: false,
      isAgree: false
    }
  }

  toggleStatement = () => {
    this.setState({ showStatement: !this.state.showStatement })
  }
  changeisRead = () => {
    this.setState({ isRead: !this.state.isRead })
  }
  agreeStatement = () => {
    this.setState({ showStatement: false })
    this.setState({ isAgree: true })
  }
  render() {
    return (
      <div>
        <StyledStatement onClick={this.toggleStatement}>
          《Knock注册声明》
        </StyledStatement>
        {this.state.showStatement ? (
          <div>
            <StatementArticle />
            {this.state.isAgree ? (
              <Styledp>
                <span>已阅读并同意《Knock注册声明》</span>
              </Styledp>
            ) : (
              <div>
                <Styledp>
                  <input
                    type="checkbox"
                    defaultChecked={this.state.isRead}
                    onClick={this.changeisRead}
                  />
                  <span>我已阅读并同意《Knock注册声明》</span>
                </Styledp>
                <Styledp>
                  <Button
                    primary
                    small
                    disabled={!this.state.isRead}
                    onClick={this.agreeStatement}
                  >
                    确认
                  </Button>
                </Styledp>
              </div>
            )}
          </div>
        ) : (
          ''
        )}
      </div>
    )
  }
}

export default withRouter(RegistrationStatement)
