import koa from 'koa' // koa@2
import cors from 'koa2-cors'
import koaRouter from 'koa-router'
import koaBody from 'koa-bodyparser'
import session from 'koa-session'
import passport from 'koa-passport'
import morgan from 'koa-morgan'
import mongoose from 'mongoose'
import { graphqlKoa, graphiqlKoa } from 'apollo-server-koa'
import { formatError } from 'graphql/error/formatError'
import schema from './schema'
import config from '../config'

mongoose.connect(
  config.DBURL,
  { useNewUrlParser: true }
)

const app = new koa()
const PORT = config.serverPort

app.proxy = true
app.keys = [config.secret]
app.use(session({}, app))

// koaBody is needed just for POST.
app.use(koaBody())
app.use(
  cors({
    credentials: true,
    origin: config.allowOrigin
  })
)

require('./passport')
app.use(passport.initialize())
app.use(passport.session())

app.use(morgan('tiny'))

const router = new koaRouter()

// Endpoint to read stuff
router.get('/graphql', graphqlKoa({ schema }))

// Endpoint to write stuff
router.post('/graphql', async (ctx, next) => {
  await graphqlKoa({
    schema,
    context: {
      // Pass koa ctx to graphql context
      ctx
    },
    formatError: err =>
      err.originalError
        ? formatError(err.originalError.errors[0].originalError)
        : formatError(err)
  })(ctx, next)
})

// Setup the /graphiql route to show the GraphiQL UI
router.get(
  '/graphiql',
  graphiqlKoa({
    endpointURL: '/graphql' // a POST endpoint that GraphiQL will make the actual requests to
  })
)

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(PORT)
console.log(`Server listening on port: ${PORT}`)
