<template>
  <section class="mt-2">
    <div>
      Total: {{ total }}
      <ul class="list-group">
        <li v-for="recipe in recipes" :key="recipe.id" class="list-group-item d-flex justify-content-between align-items-center">
          <nuxt-link :to="{ name: 'recipes-id', params: { id: recipe.id }}">
            {{ recipe.title }}
          </nuxt-link>
        </li>
      </ul>
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
      total: recipes.length,
      recipes
    }
  }
}
</script>
