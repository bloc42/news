# News

Read [here](https://github.com/block-dog/news/issues/1) for tech stack details.

## Development

Install dependencies:

```bash
yarn
```

For debugging purpose, we can start client and server separately:

```bash
yarn run client
yarn run server
```

Or we can start both concurrently:

```bash
yarn start
```

### GraphQL

There is a useful tool to interact with GraphQL API:

`http://localhost:3001/graphiql`

Type in the following query:

```
{
  posts {
    title,
    author
  }
}
```