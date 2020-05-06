<template>
  <section class="mt-2">
    <div v-for="recipe in recipes" :key="recipe.id" class="card mb-1">
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
      <img class="img-fluid card-img-bottom px-2" src="https://res.cloudinary.com/dniiru5xy/image/upload/c_scale,w_600,q_auto:low/v1577283800/resopia.com/torta-de-jamon-y-queso-5.jpg">

      <nuxt-link class="card-link text-right mr-2 my-2" :to="{ name: 'recipes-id', params: { id: recipe.id }}">
        More
      </nuxt-link>
    </div>
  </section>
</template>

<script>

// import axios from 'axios'
import firebase from '~/store/Firebase'

export default {
  async asyncData () {
    // const { data } = await axios.get('https://dog.ceo/api/breeds/list')
    // return { breeds: data.message }
    const db = firebase.firestore()

    const recipes = []
    const recipesCol = await db.collection('recipes').get()
    recipesCol.forEach((doc) => {
      recipes.push({
        id: doc.id,
        title: doc.data().title
      })
    })
    return {
      recipes
    }
  }
}
</script>
