<script setup>
import { ref, watch, onMounted } from 'vue'
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
const { playerStatus, setChannel, togglePlayVideo, toggleVideoMute, toggleVideoFullScreen } = usePlayerStatusStore()
const { languageStatus } = useLanguageStore()
const router = useRouter()
const videoRef = ref(null)

const { reset: resetOverlayTimeOut } = useTimeOutListener(() => {
  hideVideoControls()
}, 5000)

useMouseMovementListener(() => {
  if(visibilityStatus.areChannelsVisible) return

  showVideoControls()
  resetOverlayTimeOut()
}, 15)

const findChannelIndex = (availableChannels, selectedChannel) => {
  const channelIdx = availableChannels.findIndex(ch => ch.number === selectedChannel.number)
  return channelIdx === -1 ? 0 : channelIdx
}

const togglePlay = () => {
  const video = videoRef.value
  if (!video) return

  if (video.paused) {
    video.play()
    togglePlayVideo()
  } else {
    video.pause()
    togglePlayVideo()
  }
}

function toggleMute() {
  const video = videoRef.value
  if (!video) return

  video.muted = !video.muted
  toggleVideoMute()
}

function toggleFullScreen() {
  const video = videoRef.value
  if (!video) return

  if (document.fullscreenElement) {
    document.exitFullscreen()
  } else {
    video.requestFullscreen()
  }

  toggleVideoFullScreen()
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
    case 'm':
      toggleMute()
      break
    case 'f':
      toggleFullScreen()
      break
  }
}, ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Escape', 'm', 'f'])

watch(() => playerStatus.volume, (newVolume) => {
  if (videoRef.value) {
    videoRef.value.volume = newVolume / 100
  }
})

onMounted(() => {
  if (videoRef.value) {
    videoRef.value.volume = playerStatus.volume / 100
  }
})
</script>

<template>
  <main class="movie_player--page">
    <section class="movie_player--player">
      <video 
        ref="videoRef"
        src="/videos/SampleVideo_1280x720_1mb.mp4" 
        class="video"
      />
    </section>
    <Transition name="fade">
      <Overlay v-if="visibilityStatus.areControlsVisible">
        <VideoControlOverlay :onVideoPlay="togglePlay" />
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

  video {
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
