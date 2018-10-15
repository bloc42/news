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
  margin-bottom: 0px;
`
const StyledItem = styled(Menu.Item)`
  margin-right: 1rem;
  a {
    color: #777;
  }
`
const StyledTitle = styled.a`
  font-weight: bold;
`
const StyledLink = styled(NavLink)`
  color: #777;
  font-size: 0.8rem;
  font-weight: lighter;
`

const StyledArrow = styled(Arrow)`
  float: right;
  cursor: pointer;
  margin-top: -0.5rem;
`

const StyledAdd = styled(NavLink)`
  font-size: 0.8rem;
  font-weight: lighter;
  color: #ff6246 !important;
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
                      <StyledLink to={`/channel/${channel.name}`}>
                        {channel.name}
                      </StyledLink>
                    </StyledItem>
                  ))}
                  <StyledItem small>
                    <StyledAdd to="/addchannel" title="创建分论坛">
                      创建分论坛
                    </StyledAdd>
                  </StyledItem>
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
