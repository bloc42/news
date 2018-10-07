import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import gql from 'graphql-tag'
import { Query, graphql, compose } from 'react-apollo'
import Logo from '../../components/Logo'
import Menu from '../../components/Menu'
import Container from '../../components/Container'
import Avatar from '../../components/Avatar'

const StyledChannelInfo = styled.div`
  padding: 1.2rem 1.2rem 1.2rem 1.2rem;
  margin-bottom: 2rem;
`
const StyledBoard = styled.div`
  display: flex;
  justify-content: space-between;
`
const StyledInfo = styled.div`
  margin-left: 2rem;
  margin-right: 2rem;
  flex: 1;
`
const StyledMenu = styled(Menu)`
  margin-right: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`
const StyledTitle = styled.a`
  font-weight: bold;
`
class ChannelInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hasjoin: false
    }
  }
  changeJoin(bool) {
    this.setState({ hasjoin: bool })
  }
  joinChannel(name, currentUser) {
    // try{
    //     const channel=name
    //     const { errors } = await this.props.sendInvitationFormMailMutation({
    //         variables: {
    //           channel
    //         }
    //       })
    //     if(errors && errors.length > 0){
    //     }else{
    //         this.setState({ hasjoin: true })
    //     }
    // }
    // catch(err){
    //     console.error(err)
    // }
  }
  renderInfo(name, currentUser) {
    const that = this
    return (
      <Query
        query={gql`
          query GetChannelInfo($name: String!) {
            channel(name: $name) {
              id
              name
              info
              logo
              creator
            }
          }
        `}
        variables={{ name }}
      >
        {({ loading, data }) => {
          if (loading) {
            return null
          }
          const { channel } = data
          const { name, info, logo, creator } = channel

          return (
            <StyledBoard>
              <Logo large src={logo} />
              <StyledInfo>
                <StyledTitle>{name}</StyledTitle>
                <p>
                  创建者:
                  {creator}
                </p>
                <p>
                  简介:
                  {info}
                </p>
              </StyledInfo>
              <StyledMenu>
                {/* {that.state.hasjoin && 
                        <Menu.Item small>
                            <NavLink to={``} onClick={this.joinChannel(name,currentUser)}>退出论坛</NavLink>
                        </Menu.Item>
                    }
                    {!that.state.hasjoin && 
                        <Menu.Item small>
                            <NavLink to={``} onClick={this.joinChannel(name,currentUser)}>加入论坛</NavLink>
                        </Menu.Item>
                    } */}
                <Menu.Item small>
                  <NavLink to={`/user/admin/invite?channel=${name}`}>
                    邀请加入
                  </NavLink>
                </Menu.Item>
              </StyledMenu>
            </StyledBoard>
          )
        }}
      </Query>
    )
  }
  render() {
    const { name } = this.props
    return (
      <Query
        query={gql`
          query GetCurrentUser {
            currentUser {
              id
              username
              following
            }
          }
        `}
      >
        {({ loading, data }) => {
          if (loading) {
            return null
          }

          const { currentUser } = data
          const names = currentUser.following
          //   if(names.indexOf(name) !== -1){
          //     this.changeJoin(true)
          //   }
          return (
            <StyledChannelInfo>
              {this.renderInfo(name, currentUser)}
            </StyledChannelInfo>
          )
        }}
      </Query>
    )
  }
}
export default ChannelInfo
