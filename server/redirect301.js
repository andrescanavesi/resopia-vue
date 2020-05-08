/**
 * Redirect routes from the old site
 */

const redirects = [
  { from: '/recipe/76/fluffy-vanilla-cake', to: '/recipes/fluffy-vanilla-cake' },
  { from: '/veryold', to: '/recipes/1' },
  { from: '/too-old', to: '/recipes2' }
]
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
