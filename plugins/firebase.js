const firebase = require('firebase/app')
require('firebase/firestore')
require('firebase/auth')
const firebaseConf = require('../firebase.config.js')

// import firebase from 'firebase/app'
// import firebaseConf from '~/firebase.config.js'
// import 'firebase/firestore'
// import 'firebase/auth'

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConf)
}

const authProviders = {
  Google: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  Email: firebase.auth.EmailAuthProvider.PROVIDER_ID
}
const fireDb = firebase.firestore()
const fireAuth = firebase.auth()
module.exports = { fireDb, fireAuth, authProviders }
