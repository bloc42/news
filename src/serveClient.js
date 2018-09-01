const Koa = require('koa')
const serve = require('koa-static')
const send = require('koa-send')
const config = require('./config')
const Router = require('koa-router')

const app = new Koa()
app.use(serve('./build'))
// Serve 'index.html' for any unknown paths
app.use(async function(ctx) {
  await send(ctx, '/index.html', { root: './build' })
})
app.listen(config.clientPort)
console.log(`Client listening on port: ${config.clientPort}`)
