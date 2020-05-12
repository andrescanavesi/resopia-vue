<template>
  <section class="mt-2">
    <div class="card-body">
      <h5 class="card-title">
        Login
      </h5>
      <div class="card-text">
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input
            id="exampleInputEmail1"
            v-model="email"
            type="email"
            class="form-control"
            aria-describedby="emailHelp"
            placeholder="Enter email"
          >
          <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input
            id="exampleInputPassword1"
            v-model="password"
            type="password"
            class="form-control"
            placeholder="Password"
          >
        </div>

        <button value="Enter" type="button" class="btn btn-primary" @click="login()">
          Enter
        </button>
      </div>
    </div>
  </section>
</template>

<script>

const { auth, persistenceSession } = require('~/store/Firebase')

export default {
  data () {
    return { email: 'recipes21.com@gmail.com', password: null }
  },
  methods: {
    login () {
      const e = this.email
      const pass = this.password
      //
      // TODO work in progress
      //
      auth.setPersistence(persistenceSession)
        .then(function () {
          // Existing and future Auth states are now persisted in the current
          // session only. Closing the window would clear any existing state even
          // if a user forgets to sign out.
          // ...
          // New sign-in will be persisted with session persistence.
          return auth.signInWithEmailAndPassword(e, pass)
        }).then(function (result) {
          console.info('login result', result)
        })
        .catch(function (error) {
          console.error(error)
        // const errorCode = error.code
        // const errorMessage = error.message
        // ...
        })

      auth.onAuthStateChanged(function (user) {
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

          // TODO store use vuex and display info in the menu bar
        } else {
          // User is signed out.
          console.info('user signed out', user.displayName)
        }
      })
    }
  }
}
</script>
