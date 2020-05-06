<template>
  <div>
    <h1 class="display-3">
      {{ title }}
    </h1>
    <img class="img-fluid" src="https://res.cloudinary.com/dniiru5xy/image/upload/c_scale,w_900,q_auto:low/v1577283800/resopia.com/torta-de-jamon-y-queso-5.jpg">
    <p class="text-muted">
      Description.
    </p>
    <h2 class="display-4">
      Ingredients
    </h2>
    <ul class="list-group">
      <li class="list-group-item d-flex justify-content-between align-items-center">
        Ingredient 1
      </li>
      <li class="list-group-item d-flex justify-content-between align-items-center">
        Ingredient 2
      </li>
      <li class="list-group-item d-flex justify-content-between align-items-center">
        Ingredient 3
      </li>
      <li class="list-group-item d-flex justify-content-between align-items-center">
        Ingredient 4
      </li>
    </ul>
    <h2 class="display-4">
      Steps
    </h2>
    <ul class="list-group">
      <li class="list-group-item d-flex justify-content-between align-items-center">
        Step 1
      </li>
      <li class="list-group-item d-flex justify-content-between align-items-center">
        Step 2
      </li>
      <li class="list-group-item d-flex justify-content-between align-items-center">
        Step 3
      </li>
      <li class="list-group-item d-flex justify-content-between align-items-center">
        Step 4
      </li>
    </ul>
    <img class="img-fluid" src="https://res.cloudinary.com/dniiru5xy/image/upload/c_scale,w_900,q_auto:low/v1577283800/resopia.com/torta-de-jamon-y-queso-1.jpg">
    <div>
      <p>Tips para preparar esta receta</p>
      <span>
        Tamizar la harina consiste en pasarla por un colador o tamiz (de aquí viene lo de tamizar) para conseguir que la harina se separe en pequeñas partículas. De esta forma obtenemos una harina con la que es más fácil trabajar y que da mejores resultados
      </span>
    </div>
    <div>
      <span class="badge badge-pill badge-info py-2 px-3">Tag 1</span>
      <span class="badge badge-pill badge-info py-2 px-3">Tag 2</span>
      <span class="badge badge-pill badge-info py-2 px-3">Tag 3</span>
    </div>
  </div>
</template>

<script>
// import axios from 'Axios'

import firebase from '~/store/Firebase'

export default {
  validate ({ params }) {
    // Must be a number
    return /^\d+$/.test(params.id)
  },

  async asyncData ({ params, error, payload }) {
    if (payload) {
      // this is to optimize generation of static pages
      return { recipe: payload }
    }
    const db = firebase.firestore()
    const docRef = await db.collection('recipes').doc(params.id)

    try {
      const doc = await docRef.get()
      let result
      if (doc.exists) {
        result = doc.data()
      } else {
        // doc.data() will be undefined in this case
        throw new Error('Recipe not found')
      }
      return result
    } catch (e) {
      throw new Error(`Error getting recipe. ${error.message}`)
    }

    // return { user: await backend.fetchUser(params.id) }
    // const { data } = await axios.get(`https://dog.ceo/api/breed/${params.id}/images/random`)
    // return { breed: data.message, name: params.breed }
    // return { title: 'recipe ' + params.id }
  }
}
</script>
