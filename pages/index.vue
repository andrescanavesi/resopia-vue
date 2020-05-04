<template>
  <section class="mt-2">
    <div>
      Total: {{ total }}
      <ul class="list-group">
        <li v-for="recipe in recipes" :key="recipe.id" class="list-group-item d-flex justify-content-between align-items-center">
          {{ recipe.title }}
        </li>
      </ul>
    </div>
  </section>
</template>

<script>

// import axios from 'axios'
import firebase from '~/store/Firebase'

export default {
  asyncData () {
    // const { data } = await axios.get('https://dog.ceo/api/breeds/list')
    // return { breeds: data.message }
    const recipes = firebase.firestore().collection('recipes')
    return {
      recipes: [{
        id: 1,
        title: 'recipe 1'
      }, {
        id: 2,
        title: 'recipe 2'
      }],
      total: recipes.length
    }
  }
}
</script>
