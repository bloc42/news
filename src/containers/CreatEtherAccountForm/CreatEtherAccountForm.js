import React, { Component } from 'react'
import styled from 'styled-components'
import Button from '../../components/Button'
import { withRouter } from 'react-router-dom'
import { ethers } from 'ethers'
import TextArea from '../../components/TextArea'

const StyledTip = styled.span`
  color: ${props => props.theme.primaryColor};
`
const Styledli = styled.li`
  margin-bottom: 0.2rem;
`
const FloatRightButton = styled(Button)`
  float: right;
  margin-left: 0.5rem;
`
class CreatEtherAccountForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isReCreat: true,
      isWalletCreated: false,
      address: '',
      privateKey: '',
      mnemonic: '',
      countDown: 5
    }
  }
  creatRandomAccount = () => {
    const wallet = ethers.Wallet.createRandom()
    this.setState({
      isReCreat: false,
      isWalletCreated: true,
      address: wallet.address,
      privateKey: wallet.privateKey,
      mnemonic: wallet.mnemonic
    })
    this.props.getAddress(wallet.address)
    const that = this
    const countDownFn = setInterval(function() {
      if (that.state.countDown > 0) {
        that.setState({ countDown: that.state.countDown - 1 })
      } else {
        clearInterval(countDownFn)
      }
    }, 1000)
    setTimeout(function() {
      that.setState({ isReCreat: true })
      that.setState({ countDown: 5 })
    }, 6000)
  }
  hasSaved = () => {
    this.props.nextStep()
  }
  downloadWalletInfo = () => {
    const TextArray = [
      `钱包地址:${this.state.address}\r\n`,
      `助记词:${this.state.mnemonic}\r\n`
    ]
    var blob = new Blob(TextArray, { type: 'text/plain' })
    var url = window.URL.createObjectURL(blob)
    var a = document.createElement('a')
    a.href = url
    a.download = 'walletInfo.txt'
    a.click()
  }
  render() {
    return (
      <div>
        <Button
          primary
          small
          onClick={this.creatRandomAccount}
          disabled={
            this.props.currentStep == 1 && this.state.isReCreat ? false : true
          }
        >
          {!this.state.isReCreat
            ? `已更新(${this.state.countDown})`
            : '随机生成钱包'}
        </Button>
        {this.state.isWalletCreated ? (
          <div>
            <ul>
              <Styledli>
                钱包地址:
                <StyledTip>(保存钱包地址,此地址作为唠嗑账号)</StyledTip>
                <TextArea readOnly intagli value={this.state.address} />
              </Styledli>
              <Styledli>
                助记词:
                <StyledTip>
                  (导出助记词并抄写到安全的地方同时备份,千万不要保存到网络上)
                </StyledTip>
                <TextArea readOnly intagli value={this.state.mnemonic} />
              </Styledli>
            </ul>
            <FloatRightButton
              primary
              small
              disabled={!this.state.isWalletCreated}
              onClick={this.downloadWalletInfo}
            >
              导出钱包信息为txt格式
            </FloatRightButton>
            <FloatRightButton
              primary
              small
              disabled={
                this.props.currentStep == 1 && this.state.isWalletCreated
                  ? false
                  : true
              }
              onClick={this.hasSaved}
            >
              已保存
            </FloatRightButton>
          </div>
        ) : (
          ''
        )}
      </div>
    )
  }
}

export default withRouter(CreatEtherAccountForm)
