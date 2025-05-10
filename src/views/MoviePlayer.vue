<script setup>
import Overlay from '@/components/Overlay.vue'
import VideoControlOverlay from '@/components/VideoControlOverlay.vue'
import { useVisibilityStore } from '@/stores/visibility.js'
import { useMouseMovementListener, useTimeOutListener } from '@/utils/listeners'

const { visibilityStatus, showVideoControls, hideVideoControls } = useVisibilityStore()

const { reset: resetOverlayTimeOut } = useTimeOutListener(() => {
  hideVideoControls()
}, 5000)

useMouseMovementListener(() => {
  showVideoControls()
  resetOverlayTimeOut()
}, 15)

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
    <Transition name="fade">
      <Overlay v-if="visibilityStatus.areControlsVisible">
        <VideoControlOverlay />
      </Overlay>
    </Transition>
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
