import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { withClientState } from 'apollo-link-state'
import { InMemoryCache } from 'apollo-cache-inmemory'
import config from './config'

const cache = new InMemoryCache()

const httpLink = new HttpLink({
  uri: `${config.serverHost}/graphql`,
  // credentials: 'include' if your backend is a different domain
  // https://www.apollographql.com/docs/react/recipes/authentication.html#Cookie
  credentials: 'include'
})
const stateLink = withClientState({
  cache
})

const client = new ApolloClient({
  // By default, this client will send queries to the
  //  `/graphql` endpoint on the same host
  // Pass the configuration option { uri: YOUR_GRAPHQL_API_URL } to the `HttpLink` to connect
  // to a different host
  link: ApolloLink.from([stateLink, httpLink]),
  cache: new InMemoryCache(),
  defaults: {
    currentUser: null
  },
  defaultOptions: {
    mutate: {
      // https://www.apollographql.com/docs/react/features/error-handling.html#policies
      errorPolicy: 'all'
    }
  }
})

export default client
