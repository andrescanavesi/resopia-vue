<template>
  <div>
    <h1 class="display-3">
      {{ title }}
    </h1>
    <img :src="`${primary_image}`" class="img-fluid">
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
    <img :src="`${secondary_image}`" class="img-fluid">
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
      let recipe
      if (doc.exists) {
        recipe = doc.data()
        const imagesUrl = process.env.NUXT_ENV_R21_IMAGES_BASE_URL
        const def = imagesUrl + 'default.jpg'
        recipe.primary_image = recipe.primary_image ? imagesUrl + recipe.primary_image : def
        recipe.secondary_image = recipe.secondary_image ? imagesUrl + recipe.secondary_image : def
      } else {
        // doc.data() will be undefined in this case
        throw new Error('Recipe not found')
      }
      return recipe
    } catch (e) {
      throw new Error(`Error getting the recipe. ${e.message}`)
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
