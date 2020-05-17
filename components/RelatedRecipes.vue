<template>
  <div class="relatedRecipes">
    <h3>Related recipes</h3>
    <div v-for="relatedRecipe in related" :key="relatedRecipe.id" class="card border-0 mb-3" style="max-width: 540px;">
      <div class="row no-gutters">
        <div class="col-4" style="width: 390px;">
          <img class="card-img" :src="`${relatedRecipe.primary_image}`">
        </div>
        <div class="col-8">
          <div class="ml-3">
            <h5 class="card-title">
              <nuxt-link class="card-link font-weight-bold" :to="{ name: 'recipes-id', params: { id: relatedRecipe.id }}">
                {{ relatedRecipe.title }}
              </nuxt-link>
            </h5>
            <div class="card-text">
              <span class="text-muted">
                {{ relatedRecipe.description }}
              </span>
              <div class="d-flex flex-row bd-highlight mt-3">
                <span v-for="keyword in relatedRecipe.keywords" :key="keyword" class="badge badge-secondary mr-1">
                  {{ keyword }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['related']
}
</script>
