import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from '../../pages/Home'
import Login from '../../pages/Login'
import Signup from '../../pages/Signup'
import styled from 'styled-components'

const StyledMain = styled.main`
  margin: 2rem;
`

const Main = () => (
  <StyledMain>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/login' component={Login} />
      <Route path='/signup' component={Signup} />
    </Switch>
  </StyledMain>
)

export default Main
