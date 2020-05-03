<template>
  <h1>{{ title }}</h1>
</template>

<script>
export default {
  asyncData ({ params, error, payload }) {
    if (payload) {
      // this is to optimize generation of static pages
      return { recipes: payload }
    }
    // return { user: await backend.fetchUser(params.id) }
    // const { data } = await axios.get(`https://dog.ceo/api/breed/${params.id}/images/random`)
    // return { breed: data.message, name: params.breed }
    return { title: 'text to search ' + params.text }
  }
}
</script>
