import gql from 'graphql-tag'

export const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    currentUser {
      id
      username
    }
  }
`

export const GET_USER = gql`
  query GetUser($username: String!) {
    user(username: $username) {
      id
      username
      email
      createdAt
    }
  }
`
