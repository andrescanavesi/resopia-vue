// import firebase from '~/store/Firebase'
const db = require('./store/Firebase')

module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: 'Recipes21',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Recipes21 The best recipes for cooking' },
      { 'http-equiv': 'cache-control', content: 'public, max-age=50000' },
      { name: 'robots', content: 'Index, Follow' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    'bootstrap-vue/nuxt',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa'
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  /*
  ** Build configuration
  */
  build: {
    analyze: true,
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  },
  serverMiddleware: [
    '~/server/redirect301.js'
  ],

  generate: {
    concurrency: 100,
    devtools: true,
    exclude: [
      /^(?=.*\bignore\b).*$/
    ],
    fallback: true,
    async routes () {
      const recipes = []
      const recipesCol = await db.collection('recipes').get()
      if (!recipesCol) {
        throw new Error('No recipes found')
      }
      recipesCol.forEach((doc) => {
        recipes.push({ route: `/recipes/${doc.id}` })
      })
      return recipes
    }
  }
}
