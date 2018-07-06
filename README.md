# News

Read [here](https://github.com/block-dog/news/issues/1) for tech stack details.

## Development

Initialize config file:

```bash
cp config.example.js config.js
```

Install dependencies:

```bash
yarn
```

Start client and server separately:

```bash
yarn run client
yarn run server
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