import React from 'react'
import { Query } from 'react-apollo'
import styled from 'styled-components'
import gql from 'graphql-tag'
const StyledTitle = styled.p`
  font-weight: bold;
  text-align: center;
`
const StyledLine = styled.p`
  text-align: center;
`
export const GET_POINT = gql`
  query GetPoint {
    point {
      author
      userpoint
    }
  }
`

const UserPoint = () => (
  <Query query={GET_POINT}>
    {({ loading, data }) => {
      if (loading) return '加载中...'

      const { point } = data
      return (
        <div>
          <StyledTitle>当前积分</StyledTitle>
          <StyledLine>{point.userpoint}</StyledLine>
        </div>
      )
    }}
  </Query>
)

export default UserPoint
