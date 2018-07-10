import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from '../../pages/Home'
import Login from '../../pages/Login'
import Signup from '../../pages/Signup'
import styled from 'styled-components'
import Container from '../Container'

const StyledMain = styled.main`
  flex: 1;
  margin: 1rem auto;
  width: 100%;
`

const Main = () => (
  <StyledMain>
    <Container>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
      </Switch>
    </Container>
  </StyledMain>
)

export default Main
