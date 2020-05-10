<template>
  <div>
    <h1 class="display-3">
      {{ title }}
    </h1>
    <img class="img-fluid" src="https://res.cloudinary.com/dniiru5xy/image/upload/c_scale,w_600,q_auto:low/v1577283800/resopia.com/torta-de-jamon-y-queso-5.jpg">
    <p class="text-muted">
      {{ description }}
    </p>
    <h2 class="display-4">
      Ingredients
    </h2>
    <ul class="list-group">
      <li v-for="(value, index) in ingredients" :key="index" class="list-group-item">
        {{ value }}
      </li>
    </ul>
    <h2 class="display-4">
      Directions
    </h2>
    <ul class="list-group mb-2">
      <li v-for="(value, index) in steps" :key="index" class="list-group-item">
        <span class="badge badge-dark mr-1">
          {{ index + 1 }}
        </span>
        {{ value }}
      </li>
    </ul>
    <img class="img-fluid" src="https://res.cloudinary.com/dniiru5xy/image/upload/c_scale,w_600,q_auto:low/v1577283800/resopia.com/torta-de-jamon-y-queso-1.jpg">
  </div>
</template>

<script>
// import db from '~/store/Firebase'
const db = require('~/store/Firebase')

export default {

  async asyncData ({ params, error, payload }) {
    // if (payload) {
    //   // this is to optimize generation of static pages
    //   return { recipe: payload }
    // }
    // const db = firebase.firestore()
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
      throw new Error(`Error getting the recipe. ${error.message}`)
    }
  },
  head () {
    const recipe = this
    return {
      title: `Recipe of ${recipe.title}`,
      meta: [
        { hid: 'description', name: 'description', content: `Recipe of ${recipe.title} - ${recipe.description}` },
        { hid: 'og:description', name: 'og:description', content: `Recipe of ${recipe.title} - ${recipe.description}` },
        { hid: 'og:title', name: 'og:title', content: `Recipe of ${recipe.title}` }
      ]
    }
  },
  validate ({ params }) {
    // Must be a number
    // return /^\d+$/.test(params.id)
    return true
  }
}
</script>
