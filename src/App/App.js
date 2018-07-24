import React from 'react'
import styled from 'styled-components'
import Header from '../containers/Header'
import Main from '../containers/Main'
import './reset.css'

const StyledApp = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  margin: 0 auto;
  padding: 0;
  font-family: ${props => props.theme.fontFamily};
  font-size: ${props => props.theme.fontSize};
  background: #f6f9fc;
`

const App = () => (
  <StyledApp>
    <Header />
    <Main />
  </StyledApp>
)

export default App
