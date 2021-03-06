const { fireDb } = require('./plugins/firebase')

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
      { hid: 'cache-control', name: 'cache-control', content: 'public max-age=2592000' },
      { name: 'robots', content: 'Index, Follow' },
      { hid: 'og:author', name: 'og:author', content: 'recipes21.com' },
      { hid: 'author', name: 'author', content: 'recipes21.com' },
      { hid: 'og:site_name', name: 'og:site_name', content: 'recipes21.com' },
      { hid: 'og:locale', name: 'og:locale', content: 'en_EN' },
      { hid: 'og:type', name: 'og:type', content: 'article' },
      { hid: 'og:url', name: 'og:url', content: 'https://recipes21.com' },
      { hid: 'og:description', name: 'og:description', content: 'Recipes21 The best recipes for cooking' },
      { hid: 'og:image', name: 'og:image', content: 'https://res.cloudinary.com/dniiru5xy/image/upload/c_scale,w_900,q_auto:low/v1564258209/recipes21/default.jpg' }
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
    '~/plugins/jsonld',
    '~/plugins/fireauth.js'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/google-analytics'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    'bootstrap-vue/nuxt',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/sitemap',
    '@nuxtjs/google-adsense',
    'nuxt-lazy-load'
  ],
  googleAnalytics: {
    id: 'UA-139523568-1',
    debug: {
      enabled: true,
      sendHitTask: true
    }
  },
  'google-adsense': {
    id: 'ca-pub-9559827534748081',
    pageLevelAds: true,
    analyticsUacct: 'UA-139523568-1',
    analyticsDomainName: 'recipes21.com',
    test: false
  },
  sitemap: {
    hostname: 'https://recipes21.com',
    gzip: true,
    exclude: [
      '/dashboard/**'
    ],
    defaults: {
      changefreq: 'monthly',
      priority: 1,
      lastmod: new Date()
    },
    async routes () {
      const recipes = []
      const recipesCol = await fireDb.collection('recipes').get()
      if (!recipesCol) {
        throw new Error('No recipes found')
      }
      recipesCol.forEach((doc) => {
        recipes.push({ route: `/recipes/${doc.id}` })
      })
      return recipes
    }
  },
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
    analyze: false,
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  },
  serverMiddleware: [
    '~/middleware/redirect301.js'
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
      const recipesCol = await fireDb.collection('recipes').get()
      if (!recipesCol) {
        throw new Error('No recipes found')
      }
      recipesCol.forEach((doc) => {
        recipes.push({ route: `/recipes/${doc.id}` })
      })
      return recipes
    }
  },

  env: {
    NUXT_ENV_R21_IMAGES_BASE_URL: process.env.NUXT_ENV_R21_IMAGES_BASE_URL || 'https://res.cloudinary.com/dniiru5xy/image/upload/c_scale,w_900,q_auto:low/v1564258209/recipes21/'
  },

  render: {
    static: {
      maxAge: 1000 * 60 * 60 * 24 * 7
    }
  }
}
