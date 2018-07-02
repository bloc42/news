import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const Books = () => (
  <Query
    query={gql`
    {
      books {
        title,
        author
      }
    }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>
      if (error) {
        console.log(error)
        return <p>Error :(</p>
      }

      return data.books.map(({ title, author }) => (
        <div key={title}>
          <p>{`Title: ${title}, By: ${author}`}</p>
        </div>
      ))
    }}
  </Query>
)

export default Books
