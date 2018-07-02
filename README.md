# News

Read [here](https://github.com/block-dog/news/issues/1) for tech stack details.

## Development

```bash
yarn
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