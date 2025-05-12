<script setup>
import { useRouter } from 'vue-router'
import { useKeyListener } from '@/utils/listeners'

const router = useRouter()

useKeyListener(() => {

  router.push('/')
}, ['Escape'])
</script>

<template>
  <article class="movie_details--page">
    <h1>Movie Details</h1>
  </article>
</template>

<style lang="scss" scoped>
.movie_details--page {
  height: 100vh;
  background-color: $color-gray-300;
}
</style>
