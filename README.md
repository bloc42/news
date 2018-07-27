# News

## Development

Make sure you have [MongoDB](https://docs.mongodb.com/manual/installation/) installed and running on your local.

Initialize config file:

```bash
cp config.example.js config.js
```

Install dependencies:

```bash
yarn
```

Seed database:

```bash
yarn run seed
```

Start client and server in separate terminals:

```bash
yarn run client
yarn run server
```

Always make your changes in a feature branch and create a PR against `develop` branch. Our release branch is `master`, which should only accept PR from `develop` branch and hotfix branch.

## Documentation

### Tech stack

Client: 

- [React](https://reactjs.org/). Bootstrapped with [create-react-app](https://github.com/facebook/create-react-app).
- [GraphQL](http://graphql.github.io/)
- [Apollo Client](https://www.apollographql.com/docs/react/)

Server:

- [Koa](https://github.com/koajs/koa)
- [MongoDB](https://www.mongodb.com/)
- [Apollo Server](https://www.apollographql.com/docs/apollo-server/)

Read [here](https://github.com/block-dog/news/issues/1) for more details.

### Folder structure

#### Client

Under `src` folder:

- `index.js`: Entry point.
- `components`: Dumb components. Cares about how things look.
- `containers`: Smart components. Cares about how things work.
- `pages`: Page components. Each corresponds to an url route.
- `theme.js`: Theme provider for [styled-components](https://www.styled-components.com/). Define global CSS variables here.

#### Server

Under `server` folder:

- `index.js`: Entry point.
- `entities`: A collection of data entities. Everything releated to an entity, e.g., model and API, is defined within the entity folder.
- `passport.js`: Configurations and strategy definitions for [passport](http://www.passportjs.org/).
- `schema.js`: Exports merged schema for GraphQL API.

### Naming convention

Use `camelCase` for:

- Variables.
- MongoDB document fields.
- GraphQL schema.

Use `PascalCase` for:

- React component name and filename.

Use `UPPER_CASE` for:

- Constants.

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

We use [bcrypt](https://github.com/kelektiv/node.bcrypt.js) to hash the password before we save a new user to the database. The implementation is in `server/entities/user/model.js`.

After a user logged in or signed up, we update the `currentUser` in [Apollo cache](https://www.apollographql.com/docs/react/essentials/mutations.html#update). Once the user logs out, we reset the Apollo cache to make sure `currentUser` is cleared.

#### Local Testing

After `yarn run seed`, fake users will be created with password `123456`.

An admin account will also be created with username `admin`.