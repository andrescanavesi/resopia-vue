
import firebase from './store/Firebase'

module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.RV_TITLE || 'Resopia Vue',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.RV_DESCRIPTION || 'Resopia Vue' }
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
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  },

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
      const db = firebase.firestore()
      return db.collection('recipes').get()
        .then((res) => {
          const recipes = []
          res.forEach((doc) => {
            recipes.push({
              route: `/recipes/${doc.id}`
            })
          })
          return recipes
        })
    }
  }
}
