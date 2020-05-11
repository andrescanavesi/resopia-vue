const firebase = require('firebase')
// Required for side-effects
require('firebase/firestore')

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

module.exports = db
