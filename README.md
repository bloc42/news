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

## Documentation

### GraphQL

There is a useful tool to interact with GraphQL API:

`http://localhost:3001/graphiql`

You can explore available query and mutation in Documentation Explorer on the right panel.

#### Examples

Get posts:

```
query {
  posts {
    title,
    author
  }
}
```

Get current login user:

```
query {
  currentUser {
    id,
    username,
    email
  }
}
```

Sign up a user:

```
mutation {
  signup(username: "foo", email: "foo@bar.com", password: "89hf9&*H") {
    id,
    username
  }
}
```

### User Authentication

A user is authenticated via [koa-passport](https://github.com/rkusa/koa-passport) middleware after signup/login. The server will send back a session id and the browser saves the session id in cookie. The subsequent requests initiated by the browser will include this session id which allows the server to identify a specific user.

After a user logged in or signed up, we update the `currentUser` in [Apollo cache](https://www.apollographql.com/docs/react/essentials/mutations.html#update). Once the user logs out, we reset the Apollo cache to make sure `currentUser` is cleared.