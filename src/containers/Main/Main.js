import React from 'react'
import { Switch, Route } from 'react-router-dom'
import HomePage from '../../pages/HomePage'
import Login from '../../pages/Login'
import Signup from '../../pages/Signup'
import SubmitPost from '../../pages/SubmitPost'
import styled from 'styled-components'
import PostPage from '../../pages/PostPage'
import UserProfile from '../../pages/UserProfile'

const StyledMain = styled.main`
  flex: 1;
  margin: 2rem auto;
  width: 100%;
`

const Main = () => (
  <StyledMain>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/submit" component={SubmitPost} />
      <Route path="/post/:id" component={PostPage} />
      <Route path="/user/:username" component={UserProfile} />
    </Switch>
  </StyledMain>
)

export default Main
