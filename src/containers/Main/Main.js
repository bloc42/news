import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from '../../pages/Home'
import Login from '../../pages/Login'
import Signup from '../../pages/Signup'
import SubmitPost from '../../pages/SubmitPost'
import styled from 'styled-components'

const StyledMain = styled.main`
  flex: 1;
  margin: 2rem auto;
  width: 100%;
`

const Main = () => (
  <StyledMain>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/submit" component={SubmitPost} />
    </Switch>
  </StyledMain>
)

export default Main
