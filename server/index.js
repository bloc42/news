// Set options as a parameter, environment variable, or rc file.
require = require('esm')(module /*, options */)
module.exports = require('./main.js')

process.on('SIGINT', () => {
  console.log('do SIGINT')
  process.exit()
})
