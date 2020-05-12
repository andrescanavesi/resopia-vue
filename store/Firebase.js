// TODO move code to /plugins

const firebase = require('firebase')
// Required for side-effects
require('firebase/firestore')
require('firebase/auth')

const config = {
  apiKey: process.env.NUXT_ENV_R21_FIREBASE_API_KEY,
  authDomain: 'recipes21.firebaseapp.com',
  databaseURL: 'https://recipes21.firebaseio.com',
  projectId: 'recipes21',
  storageBucket: 'recipes21.appspot.com',
  messagingSenderId: '995119927890',
  appId: '1:995119927890:web:ac398a00d8fbb61957c58b',
  measurementId: 'G-SE8B5DTZSL'
}
if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

const db = firebase.firestore()
const auth = firebase.auth()
const persistenceSession = firebase.auth.Auth.Persistence.LOCAL
const authProviderId = firebase.auth.EmailAuthProvider.PROVIDER_ID

// TODO see Firebase UI https://firebase.google.com/docs/auth/web/firebaseui
// FirebasUI example: https://github.com/ncwoehler/nuxt-firebaseui-starter

module.exports = { db, auth, persistenceSession, authProviderId }
