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
import AddChannelPage from '../../pages/AddChannelPage'
import ChannelPage from '../../pages/ChannelPage'
import creatNewEtherAccountPage from '../../pages/CreatNewEtherAccountPage'
import ImportEtherAccountPage from '../../pages/ImportEtherAccountPage'
import BindUserAccountPage from '../../pages/BindUserAccountPage'

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
      <Route
        path="/creatNewEtherAccount"
        component={creatNewEtherAccountPage}
      />
      <Route path="/binduseraccount" component={BindUserAccountPage} />
      <Route path="/importEtherAccount" component={ImportEtherAccountPage} />
      <Route path="/submit" component={SubmitPostPage} />
      <Route path="/post/:id" component={PostPage} />
      <Route path="/user/:username" component={UserProfilePage} />
      <Route path="/activation" component={ActivationPage} />
      <Route path="/sendactivation" component={SendActivationPage} />
      <Route path="/addchannel" component={AddChannelPage} />
      <Route path="/channel/:channel" component={ChannelPage} />
    </Switch>
  </StyledMain>
)

export default Main
