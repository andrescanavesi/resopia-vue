const express = require('express')
const consola = require('consola')
// TODO evaluate nuxt-start https://medium.com/likecoin/quick-nuxt-js-ssr-prototyping-with-firebase-cloud-functions-5277553610a8
// like this const { Nuxt, Builder } = require('nuxt-start')
// https://www.npmjs.com/package/nuxt-start
const { Nuxt, Builder } = require('nuxt-start')
const app = express()

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'
// config.debug = process.env.NODE_ENV !== 'production'
config.debug = true

async function start () {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  await nuxt.ready()
  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()

module.exports = app
