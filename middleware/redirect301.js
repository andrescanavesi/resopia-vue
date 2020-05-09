/**
 * Redirect routes from the old site
 */

const redirects = require('../server/redirects')

export default function (req, res, next) {
  const redirect = redirects.find(r => r.from === req.url)
  if (redirect) {
    console.log(`redirect: ${redirect.from} => ${redirect.to}`)
    res.writeHead(301, { Location: redirect.to })
    res.end()
  } else {
    next()
  }
}
