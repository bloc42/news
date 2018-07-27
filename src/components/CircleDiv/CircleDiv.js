import React, { Component } from 'react'
import styled, { css } from 'styled-components'

const StyledCircleSpan = styled.div`
text-align: center;
display: inline-flex;
flex-direction: column;
width: 4rem;
align-items: center;
margin-bottom: 0.5rem;
color: ${props => props.theme.primaryColor};
`

class CircleSpan extends Component {
  render() {
    return (
      <StyledCircleSpan {...this.props}>
        {this.props.children}
      </StyledCircleSpan>
    )
  }
}

export default CircleSpan 
