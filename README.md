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

### Folder structure

#### Client

Under `src` folder:

- `components`: Dumb components. Cares about how things look.
- `containers`: Smart components. Cares about how things work.
- `pages`: Page components. Each corresponds to an url route.
- `theme.js`: Theme provider for [styled-components](https://www.styled-components.com/). Define global CSS variables here.

#### Server

Under `server` folder:

- `entities`: A collection of data entities. Everything releated to an entity, e.g., model and API, is defined within the entity folder.
- `passport.js`: Configurations and strategy definitions for [passport](http://www.passportjs.org/).
- `schema.js`: Exports merged schema for GraphQL API.

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
    username
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

We use [bcrypt](https://github.com/kelektiv/node.bcrypt.js) to hash the password before we save a new user to the databse. The implementation is in `server/entities/user/model.js`.

After a user logged in or signed up, we update the `currentUser` in [Apollo cache](https://www.apollographql.com/docs/react/essentials/mutations.html#update). Once the user logs out, we reset the Apollo cache to make sure `currentUser` is cleared.