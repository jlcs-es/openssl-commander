const openssl = require('./index.js')

console.log(openssl.cmd("version").exec().stdout)