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
      { hid: 'description', name: 'description', content: 'Recipes21 The best recipes for cooking' }
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
    '@nuxtjs/pwa',
    './modules/firestore'
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  firestore: {

  },
  /*
  ** Build configuration
  */
  build: {
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
    // routes: [
    //   '/recipes/1',
    //   '/recipes/2',
    //   '/recipes/3',
    //   '/search/chocolate'
    // ]
    // routes () {
    //   return axios.get('https://my-api/users')
    //     .then((res) => {
    //       return res.data.map((user) => {
    //         return {
    //           route: '/users/' + user.id,
    //           payload: user
    //         }
    //       })
    //     })
    // }
    routes () {
      return firestore.collection('recipes').get()
        .then((res) => {
          const recipes = []
          res.forEach((doc) => {
            recipes.push({
              route: `/recipes/${doc.id}`
            })
            return recipes
          })
        })
    }
  }
}
