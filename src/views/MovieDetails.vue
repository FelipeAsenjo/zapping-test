<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useKeyListener } from '@/utils/listeners'
import { useLanguageStore } from '@/stores/language'
import zappingLogo from '../assets/svg/zapping_logo_gray.svg'

import SquaredButtonGroup from '@/components/SquaredButtonGroup.vue'
import SquaredButton from '@/components/SquaredButton.vue'

const router = useRouter()
const { languageStatus } = useLanguageStore()

useKeyListener(() => {
  router.push('/')
}, ['Escape']) 

const movieTitle = computed(() => {
  const movieDetails = languageStatus.translations.detailsPage.movieDetails
  return movieDetails.title || movieDetails.originalTitle
})

const movieInfo = computed(() => {
  const movieDetails = languageStatus.translations.detailsPage.movieDetails
  return `${movieDetails.releaseYear} - ${movieDetails.classification} - ${movieDetails.duration}`
})
</script>

<template>
  <section class="movie_details--page">
    <div class="hotkeys">
      <SquaredButtonGroup :label="languageStatus.translations.homePage.mediaControl.hotkeyLabels.exit">
        <SquaredButton icon="[ESC]"/>
      </SquaredButtonGroup> 
    </div>
    <div>
      <img class="bg-image" src="/images/cover-movie_bg_image.webp"/>

      <article class="details-wrapper">
        <img class="movie-image" src="/images/playing-movie_bg_image.webp"/>
        <div class="description">
          <h2>{{ movieTitle }}</h2>
          <span>{{ movieInfo }}</span>
          <div class="tags">
            <div v-for="tag in languageStatus.translations.detailsPage.movieDetails.tags">{{ tag }}</div>
          </div>
          <p>{{ languageStatus.translations.detailsPage.movieDetails.details }}</p>
          <img class="logo" :src="zappingLogo" />
        </div>
      </article>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.movie_details--page {
  position: relative;
  max-width: 1440px;
  height: 100vh;
  background-color: $color-gray-300;

  .bg-image {
    position: absolute;
    right: 0;
    max-width: 80%;
    max-height: 50vh;
  }

  .hotkeys {
    position: absolute;
    margin: 45px 53px;
    z-index: 1000;
  }

  .details-wrapper {
    position: absolute;
    top: 270px;
    right: 62px;
    display: flex;
    max-width: 90%;

    .movie-image {
      width: 780px;
      max-width: 80%;
      height: auto;
      margin-right: $spacing-2xl;
      background-color: $color-black;
      border-radius: $radius-lg;
    }

    span {
      font-size: calc($text-sm + 2px);
    }

    .description {
      display: flex;
      flex-direction: column;
      gap: $spacing-lg;
      margin-bottom: $spacing-lg;
      width: 360px;

      .tags  {
        display: flex;
        font-size: $text-sm;

        div {
          margin-right: $spacing-xs;
          padding: $spacing-3xs $spacing-xs;
          background-color: rgba($color: $color-white, $alpha: $opacity-xs);
          width: fit-content;
          border-radius: $radius-lg;
        }
      }

      p {
        line-height: $spacing-md;
      }

      .logo {
        width: 108px;
        opacity: $opacity-sm;
      }
    }

    @media (max-width: 1200px) {
      flex-direction: column;

      & .movie-image {
        margin: 0;
        margin-bottom: $spacing-lg;
      }

    }

    @media (max-width: 780px) {
      top: 200px;
      right: 12px;
      margin: 0;
      display: flex;
      align-items: center;
    }
  }
}
</style>
