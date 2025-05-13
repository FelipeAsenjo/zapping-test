<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Overlay from '@/components/Overlay.vue'
import OverlayHorizontal from '@/components/OverlayHorizontal.vue'
import VideoControlOverlay from '@/components/VideoControlOverlay.vue'
import ChannelSelectionOverlay from '@/components/ChannelSelectionOverlay.vue'
import { useVisibilityStore } from '@/stores/visibility.js'
import { usePlayerStatusStore } from '@/stores/player.js'
import { useLanguageStore } from '@/stores/language.js'
import { useMouseMovementListener, useTimeOutListener, useKeyListener } from '@/utils/listeners'

const { visibilityStatus, showVideoControls, hideVideoControls, showChannelsMenu } = useVisibilityStore()
const { playerStatus, setChannel } = usePlayerStatusStore()
const { languageStatus } = useLanguageStore()
const router = useRouter()

const { reset: resetOverlayTimeOut } = useTimeOutListener(() => {
  hideVideoControls()
}, 5000)

useMouseMovementListener(() => {
  if(visibilityStatus.areChannelsVisible) return

  showVideoControls()
  resetOverlayTimeOut()
}, 15)

const findChannelIndex = (availableChannels, selectedChannel) => {
  const channelIdx = availableChannels.findIndex(ch => ch.id === selectedChannel.id)
  return channelIdx === -1 ? 0 : channelIdx
}

useKeyListener((e) => {
  const { availableChannels, selectedChannel } = playerStatus

  switch(e.key) {
    case 'Escape':
      if(!visibilityStatus.areControlsVisible) return

      hideVideoControls()
      break
    case 'ArrowUp':
      const channelIdx = findChannelIndex(availableChannels, selectedChannel)
      if(channelIdx === 0) return

      setChannel(availableChannels[channelIdx - 1])
      break
    case 'ArrowDown':
      const channelIndex = findChannelIndex(availableChannels, selectedChannel)
      if(channelIndex === availableChannels.length -1) return

      setChannel(availableChannels[channelIndex + 1])
      break
    case 'ArrowLeft':
      router.push('/details')
      break
    case 'ArrowRight':
      if(visibilityStatus.areChannelsVisible) return
      if(visibilityStatus.areControlsVisible) hideVideoControls()

      showChannelsMenu()
      break
  }
}, ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Escape'])
</script>

<template>
  <main class="movie_player--page">
    <section class="movie_player--player">
      <img src="/images/playing-movie_bg_image.webp" />
    </section>
    <Transition name="fade">
      <Overlay v-if="visibilityStatus.areControlsVisible">
        <VideoControlOverlay />
      </Overlay>
    </Transition>
    <Transition name="fade">
      <OverlayHorizontal v-if="visibilityStatus.areChannelsVisible">
        <ChannelSelectionOverlay />
      </OverlayHorizontal>
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
    max-width: 1440px;
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
