<script setup>
import Overlay from '@/components/Overlay.vue'
import VideoControlOverlay from '@/components/VideoControlOverlay.vue'
// import { onMounted } from 'vue'
// import LanguageService from '../services/language.js'

// const languageService = new LanguageService()

// onMounted(async () => {
//   try {
//     languageService.getAvailableLanguages() 
//   } catch(err) {
//     console.log('error', err)
//   }
// })
</script>
<template>
  <main class="movie_player--page">
    <section class="movie_player--player">
      <img src="../assets/images/playing-movie_bg_image.webp" />
    </section>
    <Overlay>
      <VideoControlOverlay />
    </Overlay>
  </main>
</template>

<style lang="scss" scoped>
.movie_player--page {
  display: grid;
  place-items: center;
  height: 100vh;
  background-color: $color-black;
}

.movie_player--player {
  height: 80%;
  display: flex;
  align-items: center;

  img {
    width: 100vw;
    height: auto;
  }
}
</style>
