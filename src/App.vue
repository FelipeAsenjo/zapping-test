<script setup>
import { onMounted } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import ChannelService from '@/services/channel.js'
import LanguageService from '@/services/language.js'

const channelService = new ChannelService()
const languageService = new LanguageService()

onMounted(async () => {
  try {
    await channelService.getAvailableChannels()
    await languageService.getAvailableLanguages()
    await languageService.getTranslations()
  } catch(err) {
    console.log('error', err)
  }
})
</script>

<template>
  <Transition name="slide-fade" mode="out-in">
    <RouterView />
  </Transition>
</template>

<style lang="scss" scoped>
.slide-fade-enter-active {
  transition: transform 0.5s ease, opacity 0.5s ease;
}
.slide-fade-enter-from {
  transform: translateX(100%);
  opacity: 0;
}
.slide-fade-enter-to {
  transform: translateX(0);
  opacity: 1;
}

.slide-fade-leave-active {
  transition: transform 0.5s ease, opacity 0.5s ease;
  position: absolute;
  width: 100%;
}
.slide-fade-leave-from {
  transform: translateX(0);
  opacity: 1;
}
.slide-fade-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>
