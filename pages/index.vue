<template>
  <section>
    <div>
      <ul class="list-group">
        <li v-for="breed in breeds" :key="breed" class="list-group-item d-flex justify-content-between align-items-center">
          {{ breed }}
        </li>
      </ul>
    </div>
  </section>
</template>

<script>

import axios from 'axios'

export default {
  async asyncData () {
    const { data } = await axios.get('https://dog.ceo/api/breeds/list')
    return { breeds: data.message }
  }
}
</script>
