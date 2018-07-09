/**
 * Use esm to enable ES6 module loader for Node.
 * https://github.com/standard-things/esm
 */

require = require('esm')(module)
module.exports = require('./main.js')
