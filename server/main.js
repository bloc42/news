import koa from 'koa' // koa@2
import cors from 'koa2-cors'
import koaRouter from 'koa-router'
import koaBody from 'koa-bodyparser'
import session from 'koa-session'
import passport from 'koa-passport'
import { graphqlKoa } from 'apollo-server-koa'
import { graphiqlKoa } from 'apollo-server-koa'
import schema from './schema'
import config from '../config'

const app = new koa()
const router = new koaRouter()
const PORT = config.serverPort

app.keys = [config.secret]
app.use(session({}, app))

// koaBody is needed just for POST.
app.use(koaBody())
app.use(cors())

app.use(passport.initialize())
app.use(passport.session())
require('./passport')

// Endpoint to read stuff
router.get('/graphql', graphqlKoa({ schema }))

// Endpoint to write stuff
router.post('/graphql', graphqlKoa({ schema }))

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
