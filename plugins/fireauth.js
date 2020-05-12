
import { fireAuth } from '@/plugins/firebase.js'

export default (context) => {
  const { store } = context

  return new Promise((resolve, reject) => {
    fireAuth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        // const displayName = user.displayName
        // const email = user.email
        // const emailVerified = user.emailVerified
        // const photoURL = user.photoURL
        // const isAnonymous = user.isAnonymous
        // const uid = user.uid
        // const providerData = user.providerData
        console.info('user signed in', user.email)
      } else {
        console.info('user signed out')
      }
      store.commit('setUser', user)
      resolve()
    })
  })
}
