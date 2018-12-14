import React, { Component } from 'react'
import styled, { css } from 'styled-components'
import Button from '../Button'

const StyledMask = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.65);
  height: 100%;
  z-index: 1000;
`
const ModalCenter = styled.div`
  text-align: center;
  position: fixed;
  overflow: auto;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  -webkit-overflow-scrolling: touch;
  outline: 0;

  :before {
    display: inline-block;
    height: 100%;
    vertical-align: middle;
    width: 0;
  }
`
const ModalContainer = styled.div`
  min-width: 300px;
  display: inline-block;
  vertical-align: middle;
  top: 0;
  text-align: left;
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.65);
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  list-style: none;
  position: relative;
  width: auto;
  margin: 0 auto;
  top: 100px;
  padding-bottom: 24px;
`
const ModalContent = styled.div`
  position: relative;
  background-color: #fff;
  border: 0;
  border-radius: 4px;
  background-clip: padding-box;
  -webkit-box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`
const CloseButton = styled.button`
  cursor: pointer;
  border: 0;
  background: transparent;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 10;
  font-weight: 700;
  line-height: 1;
  text-decoration: none;
  -webkit-transition: color 0.3s;
  transition: color 0.3s;
  color: rgba(0, 0, 0, 0.45);
  width: 30px;
  height: 30px;
`
const Styledi = styled.i`
  display: inline-block;
  font-style: normal;
  vertical-align: -0.125em;
  text-align: center;
  text-transform: none;
  line-height: 0;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
`
const ModalHeader = styled.div`
  padding: 16px 24px;
  border-radius: 4px 4px 0 0;
  background: #fff;
  color: rgba(0, 0, 0, 0.65);
  border-bottom: 1px solid #e8e8e8;
`
const ModalBody = styled.div`
  padding: 24px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;
`
const ModalFooter = styled.div`
  border-top: 1px solid #e8e8e8;
  padding: 10px 16px;
  text-align: right;
  border-radius: 0 0 4px 4px;
`
const StyledBtn = styled(Button)`
  line-height: 1.499;
  display: inline-block;
  font-weight: 400;
  text-align: center;
  -ms-touch-action: manipulation;
  touch-action: manipulation;
  cursor: pointer;
  background-image: none;
  border: 1px solid transparent;
  white-space: nowrap;
  padding: 0 15px;
  font-size: 14px;
  border-radius: 4px;
  height: 32px;
`
class Modal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      display: true
    }
  }
  stopmove = e => {
    e.preventDefault()
  }
  render() {
    return this.state.display ? (
      <StyledMask onWheel={this.stopmove}>
        <ModalCenter onWheel={this.stopmove}>
          <ModalContainer>
            <ModalContent>
              <CloseButton onClick={this.props.closeModal}>
                <Styledi>
                  <svg
                    viewBox="64 64 896 896"
                    data-icon="close"
                    width="1em"
                    height="1em"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" />
                  </svg>
                </Styledi>
              </CloseButton>
              <ModalHeader />
              <ModalBody>{this.props.tips}</ModalBody>
              <ModalFooter>
                <StyledBtn onClick={this.props.closeModal}>取消</StyledBtn>
                <StyledBtn primary onClick={this.props.confirmCallback}>
                  确认
                </StyledBtn>
              </ModalFooter>
            </ModalContent>
          </ModalContainer>
        </ModalCenter>
      </StyledMask>
    ) : (
      ''
    )
  }
}

export default Modal
