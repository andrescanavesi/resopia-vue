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
    <div class="d-flex flex-row bd-highlight mt-3">
      <span v-for="keyword in keywords" :key="keyword" class="badge badge-secondary mr-1">
        {{ keyword }}
      </span>
    </div>
    <hr>
    <RelatedRecipes :related="related" />
  </div>
</template>

<script>
import RelatedRecipes from '~/components/RelatedRecipes'
const { fireDb } = require('~/plugins/firebase')

export default {

  components: {
    RelatedRecipes
  },

  async asyncData ({ params, error, payload }) {
    // if (payload) {
    //   // this is to optimize generation of static pages
    //   return { recipe: payload }
    // }
    // const db = firebase.firestore()
    const docRef = await fireDb.collection('recipes').doc(params.id)

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

      // load related recipes
      //
      // .collection("recipes")
      // .where("keywords", "array-contains-any", ["cake", "easy"])
      const recipesCol = await fireDb.collection('recipes')
        .where('keywords', 'array-contains-any', recipe.keywords)
        .limit(5)
        .get()
      recipe.related = []
      recipesCol.forEach((doc) => {
        let image = process.env.NUXT_ENV_R21_IMAGES_BASE_URL + 'default.jpg'
        if (doc.data().primary_image) {
          image = process.env.NUXT_ENV_R21_IMAGES_BASE_URL + doc.data().primary_image
        }
        recipe.related.push({
          id: doc.id,
          title: doc.data().title,
          description: doc.data().description,
          keywords: doc.data().keywords,
          primary_image: image
        })
      })

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
        { hid: 'og:title', name: 'og:title', content: `Recipe of ${recipe.title}` },
        { hid: 'og:url', name: 'og:url', content: `https://recipes21.com/recipes/${recipe.id}` },
        { hid: 'og:description', name: 'og:description', content: `Recipe of ${recipe.title} - ${recipe.description}` },
        { hid: 'og:image', name: 'og:image', content: `${recipe.primary_image}` }
      ]
    }
  },
  validate ({ params }) {
    // Must be a number
    // return /^\d+$/.test(params.id)
    return true
  },

  jsonld () {
    const recipe = this
    let recipeInstructions = []
    if (recipe.steps) {
      recipeInstructions = recipe.steps.map((step) => {
        const jsonD = {
          '@type': 'HowToStep',
          text: step
        }
        return jsonD
      })
    }

    return {
      '@context': 'http://schema.org',
      '@type': 'recipe',
      name: recipe.title,
      description: recipe.description,
      keywords: recipe.keywords || 'recipe',
      datePublished: recipe.date_published || '2020-05-03',
      dateModified: recipe.date_modified || '2020-05-03',
      image: [
        recipe.primary_image
      ],
      recipeIngredient: recipe.ingredients,
      recipeInstructions,
      author: {
        '@type': 'Organization',
        name: 'recipes21.com'
      },
      prepTime: recipe.prep_time || 'PT10M',
      cookTime: recipe.cook_time || 'PT20M',
      totalTime: recipe.total_time || 'PT30M',
      recipeCuisine: recipe.cusine || 'American',
      recipeCategory: recipe.category || 'American',
      recipeYield: recipe.yield || '6 portions',
      video: '',
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: recipe.rating_value || 4.3,
        ratingCount: recipe.rating_count || 31
      }

    }
  }
}
</script>
