import React from 'react'
import { Switch, Route } from 'react-router-dom'
import HomePage from '../../pages/HomePage'
import LoginPage from '../../pages/LoginPage'
import SignupPage from '../../pages/SignupPage'
import SubmitPostPage from '../../pages/SubmitPostPage'
import styled from 'styled-components'
import PostPage from '../../pages/PostPage'
import UserProfilePage from '../../pages/UserProfilePage'

const StyledMain = styled.main`
  flex: 1;
  margin: 0 auto 2rem;
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
    </Switch>
  </StyledMain>
)

export default Main
