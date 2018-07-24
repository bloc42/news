import React from 'react'
import { Switch, Route } from 'react-router-dom'
import HomePage from '../../pages/HomePage'
import LoginPage from '../../pages/LoginPage'
import SignupPage from '../../pages/SignupPage'
import SubmitPostPage from '../../pages/SubmitPostPage'
import styled from 'styled-components'
import PostPage from '../../pages/PostPage'
import UserProfilePage from '../../pages/UserProfilePage'
import ActivationPage from '../../pages/ActivationPage'
import SendActivationPage from '../../pages/SendActivationPage'

const StyledMain = styled.main`
  flex: 1;
  margin: 2rem auto;
  width: 100%;
`

const Main = () => (
  <StyledMain>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/signup" component={SignupPage} />
      <Route path="/submit" component={SubmitPostPage} />
      <Route path="/post/:id" component={PostPage} />
      <Route path="/user/:username" component={UserProfilePage} />
      <Route path="/activation" component={ActivationPage} />
      <Route path="/sendactivation" component={SendActivationPage} />
    </Switch>
  </StyledMain>
)

export default Main
