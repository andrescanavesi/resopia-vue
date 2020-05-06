const firebase = require('firebase')
// Required for side-effects
require('firebase/firestore')

const config = {
  apiKey: 'AIzaSyDJwt6_p-4DHW-mWKxClupF41akMgspPCQ',
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
  // const settings = { timestampsInSnapshots: true }
  // firebase.firestore().settings(settings)
}

// firebase.analytics()
// const firestore = firebase.firestore();

export default firebase
// export default firestore;
