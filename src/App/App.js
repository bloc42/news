import React, { Component } from 'react'
import PostList from '../PostList'
import styled from 'styled-components'

const StyledApp = styled.div`
  margin: 0 auto;
  padding: 0;
  font-family: sans-serif;
  font-size: 1rem;
  max-width: 800px;
`

class App extends Component {
  render () {
    return (
      <StyledApp>
        <header>TODO: header</header>

        <hr />

        <main>
          <PostList />
        </main>
      </StyledApp>
    )
  }
}

export default App
