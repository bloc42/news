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
  font-family: -apple-system, PingFang SC, Hiragino Sans GB, Microsoft YaHei,
    Helvetica Neue, Arial, sans-serif;
  font-size: 1rem;
  background: #f1f1f1;
`

const App = () => (
  <StyledApp>
    <Header />
    <Main />
  </StyledApp>
)

export default App
