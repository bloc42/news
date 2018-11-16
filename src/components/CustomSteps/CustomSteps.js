import React from 'react'
import styled from 'styled-components'
import Steps, { Step } from 'rc-steps'
import 'rc-steps/assets/index.css'
import 'rc-steps/assets/iconfont.css'

const StyledSteps = styled(Steps)`
  .rc-steps-item-process .rc-steps-item-icon {
    border-color: ${props => props.theme.primaryColor};
    background-color: #fff;
  }
  .rc-steps-item-process .rc-steps-item-icon > .rc-steps-icon {
    color: ${props => props.theme.primaryColor};
  }
  .rc-steps-item-process
    .rc-steps-item-icon
    > .rc-steps-icon
    .rc-steps-icon-dot {
    background: ${props => props.theme.primaryColor};
  }
  .rc-steps-item-process .rc-steps-item-icon {
    background: ${props => props.theme.primaryColor};
  }
  .rc-steps-item-process .rc-steps-item-icon > .rc-steps-icon {
    color: #fff;
  }
  .rc-steps-item-finish .rc-steps-item-icon {
    border-color: ${props => props.theme.primaryColor};
    background-color: #fff;
  }
  .rc-steps-item-finish .rc-steps-item-icon > .rc-steps-icon {
    color: ${props => props.theme.primaryColor};
  }
  .rc-steps-item-finish
    .rc-steps-item-icon
    > .rc-steps-icon
    .rc-steps-icon-dot {
    background: ${props => props.theme.primaryColor};
  }
  .rc-steps-item-finish .rc-steps-item-title {
    color: rgba(0, 0, 0, 0.43);
  }
  .rc-steps-item-finish .rc-steps-item-title:after {
    background-color: ${props => props.theme.primaryColor};
  }
  .rc-steps-item-finish .rc-steps-item-description {
    color: rgba(0, 0, 0, 0.43);
  }
  .rc-steps-item-finish .rc-steps-item-tail:after {
    background-color: ${props => props.theme.primaryColor};
  }
  .rc-steps-item-custom.rc-steps-item-process
    .rc-steps-item-icon
    > .rc-steps-icon {
    color: ${props => props.theme.primaryColor};
  }
`

class CustomSteps extends React.Component {
  static CustomStep = Step
  render() {
    return <StyledSteps {...this.props} />
  }
}
export default CustomSteps
