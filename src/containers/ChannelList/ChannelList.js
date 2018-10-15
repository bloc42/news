import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import styled, { css } from 'styled-components'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import Arrow from '../../components/Arrow'
import Menu from '../../components/Menu'
const StyledChannelList = styled.div`
  padding: 1.2rem 1.2rem 1.2rem 1.2rem;
  margin-bottom: 2rem;

  ${props =>
    props.hide &&
    css`
      height: 3.5rem;
      overflow: hidden;
    `};
`
const StyledBoard = styled.div`
  display: flex;
  justify-content: space-between;
`

const StyledMenu = styled(Menu)`
  display: flex;
  width: 100%;
  justify-content: flex-start;
  flex-wrap: wrap;
`
const StyledItem = styled(Menu.Item)`
  width: 33%;
`
const StyledTitle = styled.a`
  font-weight: bold;
`

const StyledArrow = styled(Arrow)`
  float: right;
  cursor: pointer;
`
class ChannelList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hide: false
    }
  }
  toggleInfoShow = e => {
    this.setState({
      hide: !this.state.hide
    })
  }
  render() {
    return (
      <Query
        query={gql`
          query ALLCHANNELS {
            allchannels {
              id
              name
              info
              logo
              creator
            }
          }
        `}
      >
        {({ loading, data }) => {
          if (loading) {
            return null
          }
          const { allchannels } = data
          return (
            <StyledChannelList hide={this.state.hide}>
              <StyledTitle>分论坛列表</StyledTitle>
              <StyledArrow
                onClick={this.toggleInfoShow}
                up={!this.state.hide}
                down={this.state.hide}
              />
              <StyledBoard>
                <StyledMenu>
                  {allchannels.map(channel => (
                    <StyledItem small key={channel.id}>
                      <NavLink to={`/channel/${channel.name}`}>
                        {channel.name}
                      </NavLink>
                    </StyledItem>
                  ))}
                </StyledMenu>
              </StyledBoard>
            </StyledChannelList>
          )
        }}
      </Query>
    )
  }
}
export default ChannelList
