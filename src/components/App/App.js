import React, { Component } from 'react'
import styled from 'styled-components'
import Header from '../Header'
import Main from '../Main'

const StyledApp = styled.div`
  margin: 0 auto;
  padding: 0;
  font-family: -apple-system,  PingFang SC,  Hiragino Sans GB,  Microsoft YaHei,
    
    Helvetica Neue,  Arial,  sans-serif;
  font-size: 1rem;
  max-width: 800px;

  * {
    box-sizing: border-box;
  }
`

class App extends Component {
  render() {
    return (
      <StyledApp>
        <Header />
        <Main />
      </StyledApp>
    )
  }
}

export default App
