<template>
  <section class="mt-2">
    <div v-for="recipe in recipes" :key="recipe.id" class="card mb-3">
      <div class="card-body">
        <h5 class="card-title">
          <nuxt-link class="card-link text-right mr-2 my-2" :to="{ name: 'recipes-id', params: { id: recipe.id }}">
            {{ recipe.title }}
          </nuxt-link>
        </h5>

        <p class="card-text">
          {{ recipe.description }}
        </p>
      </div>
      <img :src="`${recipe.primary_image}`" class="img-fluid card-img-bottom px-2">

      <nuxt-link class="card-link text-right mr-2 my-2" :to="{ name: 'recipes-id', params: { id: recipe.id }}">
        More
      </nuxt-link>
    </div>
  </section>
</template>

<script>

// import axios from 'axios'
// import db from '~/store/Firebase'
const db = require('~/store/Firebase')

export default {
  async asyncData () {
    // const { data } = await axios.get('https://dog.ceo/api/breeds/list')
    // return { breeds: data.message }
    // const db = firebase.firestore()

    const recipes = []
    const recipesCol = await db.collection('recipes').get()
    recipesCol.forEach((doc) => {
      let image = process.env.NUXT_ENV_R21_IMAGES_BASE_URL + 'default.jpg'
      if (doc.data().primary_image) {
        image = process.env.NUXT_ENV_R21_IMAGES_BASE_URL + doc.data().primary_image
      }
      recipes.push({
        id: doc.id,
        title: doc.data().title,
        description: doc.data().description,
        primary_image: image
      })
    })
    return {
      recipes
    }
  }
}
</script>
